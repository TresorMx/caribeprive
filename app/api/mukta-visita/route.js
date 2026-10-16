/**
 * POST /api/mukta-visita
 * Registro del landing "Nada en nuestro cenote" (Mukta Residencial).
 *
 *  1. Valida los datos (mismas reglas que el formulario: lib/muktaVisit.js)
 *  2. Crea/actualiza el contacto en GHL con tags de campaña  → dispara los workflows
 *  3. Agrega una nota con el detalle de la visita
 *  4. Si existe GHL_VISIT_CALENDAR_ID, aparta la visita en ese calendario (pendiente de confirmar)
 */
import { createOrUpdateContact, addNoteToContact, createAppointment, isGHLConfigured } from "@/lib/ghl";
import { VISIT, INTERESTS, availableDates, formatDateEs } from "@/lib/muktaVisit";

export const runtime = "nodejs";

// 10 dígitos MX → +52XXXXXXXXXX; si ya trae lada internacional la respeta
function normalizePhone(raw = "") {
  const digits = String(raw).replace(/\D/g, "");
  if (digits.length === 10) return `+52${digits}`;
  if (digits.length === 12 && digits.startsWith("52")) return `+${digits}`;
  if (digits.length >= 11) return `+${digits}`;
  return null;
}

const bad = (error) => Response.json({ ok: false, error }, { status: 400 });

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email = "", date, time, people, interest = "", consent, utm = {}, website } = body;

    // Honeypot: los bots llenan el campo oculto. Respondemos OK sin guardar nada.
    if (website) return Response.json({ ok: true });

    const cleanName = String(name || "").trim();
    const cleanPhone = normalizePhone(phone);
    const cleanEmail = String(email || "").trim();
    const nPeople = Number(people);
    const interestLabel = INTERESTS.find((i) => i.id === interest)?.label || "";

    if (cleanName.length < 3) return bad("Escribe tu nombre completo.");
    if (!cleanPhone) return bad("Escribe un WhatsApp válido de 10 dígitos.");
    if (cleanEmail && !/^\S+@\S+\.\S+$/.test(cleanEmail)) return bad("El email no es válido.");
    if (!availableDates().includes(date)) return bad("Elige una fecha disponible.");
    if (!VISIT.slots.includes(time)) return bad("Elige un horario disponible.");
    if (!Number.isInteger(nPeople) || nPeople < 1 || nPeople > VISIT.maxPeople) return bad("Número de personas no válido.");
    if (consent !== true) return bad("Necesitamos tu autorización para contactarte.");

    const fecha = formatDateEs(date);
    const source = [utm.source, utm.medium, utm.campaign].filter(Boolean).join(" / ") || "directo";

    const resumen = [
      "Visita al cenote — Mukta Residencial",
      `Fecha solicitada: ${fecha}, ${time}`,
      `Personas: ${nPeople}`,
      interestLabel && `Interés: ${interestLabel}`,
      `Origen: ${source}`,
    ].filter(Boolean).join("\n");

    // 1 — Contacto (upsert: si ya existe, se actualiza)
    const tags = ["mukta-cenote", "visita-solicitada", interest && `interes-${interest}`, utm.source && `utm-${String(utm.source).toLowerCase()}`].filter(Boolean);
    const { contactId, error: contactError } = await createOrUpdateContact({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      tags,
      source: "Caribe Privé - Landing Mukta Cenote",
      customFields: {
        destino_de_inters: "puerto_morelos",
        datos_informativos: resumen,
      },
    });
    if (contactError) console.warn("[mukta-visita] contacto:", contactError);
    // Con GHL configurado, un contacto no guardado = lead perdido → que el usuario reintente
    if (!contactId && isGHLConfigured()) {
      return Response.json({ ok: false, error: "No pudimos registrar tu visita. Intenta de nuevo en un momento." }, { status: 502 });
    }

    // 2 — Nota + visita en calendario (opcional)
    let appointmentId = null;
    if (contactId) {
      await addNoteToContact(contactId, resumen);

      if (process.env.GHL_VISIT_CALENDAR_ID) {
        const appt = await createAppointment({
          contactId,
          date,
          time,
          title: `Visita cenote Mukta — ${cleanName} (${nPeople} pers.)`,
          calendarId: process.env.GHL_VISIT_CALENDAR_ID,
          address: VISIT.place,
          status: "new",               // pendiente: el asesor la confirma y envía ubicación
          durationMin: VISIT.durationMin,
        });
        if (appt.error) console.warn("[mukta-visita] visita:", appt.error);
        appointmentId = appt.appointmentId;
      }
    }

    return Response.json({ ok: true, contactId, appointmentId });
  } catch (err) {
    console.error("[mukta-visita] error:", err);
    return Response.json({ ok: false, error: "No pudimos registrar tu visita. Intenta de nuevo." }, { status: 500 });
  }
}
