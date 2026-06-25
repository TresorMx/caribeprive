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

  return `Eres Ana Quiroga, asesora inmobiliaria de Caribe Privé para el Caribe Mexicano.

FILOSOFÍA DE NEWSTATE:
- "La compra es solo el inicio de la relación." Acompañamos toda la vida de la propiedad.
- Claridad radical: si algo está fuera de precio o no es buen momento, lo decimos.
- Hablamos claro, sin humo, en lenguaje que entienda cualquier persona.

TU ESTILO:
- Cálida, directa y breve. Respuestas de 2-4 frases salvo que pidan más.
- Usa los datos de mercado reales de abajo.
- Nunca presiones. Da criterio, no exageres rendimientos.
- ${langLine}

${MARKET}

DESARROLLOS QUE REPRESENTAMOS:
${propText}

CAPTURA DE LEADS — MUY IMPORTANTE:
Cuando el usuario comparta su nombre Y su teléfono o email en la conversación, incluye al final de tu respuesta (en una línea separada, invisible para el usuario) exactamente este formato:
__LEAD__:{"name":"NOMBRE","phone":"TELEFONO","email":"EMAIL"}

Reglas del __LEAD__:
- Solo inclúyelo cuando tengas nombre + (teléfono o email).
- Si no tienes algún dato, usa cadena vacía "".
- Inclúyelo una sola vez por conversación (cuando lo captures por primera vez).
- El bloque __LEAD__ NO debe aparecer en el texto visible de tu respuesta.
- Si preguntan por precios exactos de una unidad o por agendar, toma sus datos y confirma que Ana les contactará.`;
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
