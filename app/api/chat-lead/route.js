/**
 * POST /api/chat-lead
 * Guarda en GHL el lead capturado por el formulario del chatbot (nombre + teléfono).
 */
import { createOrUpdateContact } from "@/lib/ghl";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { name, phone, email = "", context = "" } = await req.json();
    if (!name || !phone) {
      return Response.json({ ok: false, error: "Faltan datos" }, { status: 400 });
    }

    const { contactId, error } = await createOrUpdateContact({
      name,
      phone,
      email,
      tags: ["chatbot-lead"],
      source: "Caribe Privé - Chatbot Web",
      customFields: {
        datos_informativos: ["Lead capturado vía chatbot web.", context].filter(Boolean).join("\n"),
      },
    });

    if (error) console.warn("[chat-lead] GHL:", error);
    return Response.json({ ok: true, contactId });
  } catch (err) {
    console.error("[chat-lead] error:", err);
    return Response.json({ ok: true, error: err.message });
  }
}
