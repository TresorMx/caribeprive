import Anthropic from "@anthropic-ai/sdk";
import { properties } from "@/lib/properties";
import { createOrUpdateContact, addNoteToContact } from "@/lib/ghl";

export const runtime = "nodejs";

const MARKET = `
DATOS DE MERCADO (2025-2026), Caribe Mexicano:
- Cancún: ~$2,900–4,000+ USD/m² (premium en Puerto Cancún). Plusvalía 8–12% anual. Rendimiento de renta 6–12%.
- Puerto Morelos: ~$2,000 USD/m² (la zona más accesible). Plusvalía 8–12% anual. Rendimiento 6–10% (beachfront hasta 10%).
- Riviera Maya (Playa del Carmen / Tulum): ~$2,000–4,500 USD/m², beachfront hasta $10,800/m². Plusvalía 12–14% nominal. Rendimiento 6.5–8%.
- Dato honesto importante: la administración de rentas suele llevarse 20–30% del ingreso bruto.
- El m² en zonas del Tren Maya subió ~400% desde el anuncio. Ocupación de renta vacacional ~75%.
`;

function buildSystemPrompt(lang) {
  const propText = properties
    .map(
      (p) =>
        `- ${p.name} (${p.zone}): ${p.type.es}. Plusvalía estimada ${p.appreciation}. ${p.cardDesc.es}`
    )
    .join("\n");

  const langLine =
    lang === "en" ? "Respond in English." : "Responde en español.";

  return `Eres Ana Paula Quiroga, asesora inmobiliaria EXPERTA de Caribe Privé para el Caribe Mexicano (Cancún, Puerto Morelos, Riviera Maya).

TU OBJETIVO #1: que la persona AGENDE UNA CITA (llamada/Zoom). Aporta valor rápido y guía siempre hacia la cita.

ESTILO (muy importante):
- Respuestas BREVES: 2-3 frases como máximo. Nada de textos largos ni listas enormes.
- Habla como experta, con datos concretos (precio por m², plusvalía, rendimiento), pero sin abrumar.
- Cálida, directa y profesional. Claridad radical: si algo no conviene o no es buen momento, dilo.
- ${langLine}

CÓMO CIERRAS (cada respuesta):
- Después de aportar valor, invita al siguiente paso: dejar sus datos o agendar.
- En el chat aparece un FORMULARIO para nombre y teléfono y un BOTÓN "Agendar cita". NO pidas los datos en párrafos largos: di algo como "déjame tu nombre y teléfono aquí abajo y lo vemos en una llamada" o "agenda tu cita con el botón 📅 de abajo".
- Nunca inventes el precio exacto de una unidad: da un rango y propón confirmarlo en la cita.

DATOS DE MERCADO:
${MARKET}

DESARROLLOS QUE REPRESENTAMOS:
${propText}

Recuerda en cada turno: brevedad + un dato útil + invitación a la cita.`;
}

// Extrae __LEAD__ del final del reply y lo separa del texto visible
function extractLead(rawReply) {
  const marker = "__LEAD__:";
  const idx = rawReply.indexOf(marker);
  if (idx === -1) return { reply: rawReply.trim(), lead: null };

  const replyText = rawReply.slice(0, idx).trim();
  const jsonStr   = rawReply.slice(idx + marker.length).trim();

  try {
    const lead = JSON.parse(jsonStr);
    // Solo válido si tiene al menos nombre y un contacto
    if (lead.name && (lead.phone || lead.email)) {
      return { reply: replyText, lead };
    }
  } catch {
    // JSON malformado — ignorar
  }
  return { reply: replyText, lead: null };
}

export async function POST(req) {
  try {
    const { messages = [], lang = "es" } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        {
          reply:
            lang === "en"
              ? "The advisor isn't configured yet (missing API key). Please add ANTHROPIC_API_KEY."
              : "El asesor aún no está configurado (falta la API key). Agrega ANTHROPIC_API_KEY.",
        },
        { status: 200 }
      );
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const cleaned = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-12)
      .map((m) => ({ role: m.role, content: String(m.content || "") }));

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 700,
      system: buildSystemPrompt(lang),
      messages: cleaned,
    });

    const rawReply = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    // Separar texto visible del bloque de lead
    const { reply, lead } = extractLead(rawReply);

    // Si hay datos de lead → push a GHL en background (no bloquea la respuesta)
    if (lead) {
      (async () => {
        try {
          // Reconstruir contexto de la conversación para la nota
          const conversationText = messages
            .slice(-10)
            .map((m) => `${m.role === "user" ? "Cliente" : "Ana"}: ${m.content}`)
            .join("\n");

          const { contactId } = await createOrUpdateContact({
            name:   lead.name,
            phone:  lead.phone  || "",
            email:  lead.email  || "",
            tags:   ["chatbot-lead"],
            source: "Caribe Privé - Chatbot Web",
            customFields: {
              datos_informativos: "Lead capturado vía chatbot web. Ver la nota del contacto con la conversación completa.",
            },
          });

          if (contactId) {
            await addNoteToContact(
              contactId,
              `Lead capturado vía chatbot web.\n\n--- Conversación ---\n${conversationText}`
            );
          }
        } catch (err) {
          console.error("[chat] GHL push error:", err);
        }
      })();
    }

    return Response.json({ reply, leadCaptured: !!lead });
  } catch (err) {
    console.error("chat error", err);
    return Response.json(
      { reply: "Lo siento, ocurrió un error. Intenta de nuevo." },
      { status: 200 }
    );
  }
}
