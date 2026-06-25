/**
 * Go High Level (GHL) API helper — Caribe Privé
 *
 * Variables de entorno requeridas (agregar a .env.local):
 *   GHL_API_KEY          → API key de GHL (Settings → API Keys)
 *   GHL_LOCATION_ID      → Location ID (Settings → Business Profile)
 *   GHL_CALENDAR_ID      → Calendar ID para citas (Calendars → Settings → Calendar ID)
 *   GHL_ASSIGNED_USER_ID → User ID de Ana en GHL (Settings → My Staff → ID) — opcional
 *
 * Documentación: https://highlevel.stoplight.io/docs/integrations/
 */

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

function ghlHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.GHL_API_KEY}`,
    "Version": GHL_VERSION,
  };
}

function isGHLConfigured() {
  return !!(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
}

// ── Contacts ──────────────────────────────────────────────────────────────────

/**
 * Crea o actualiza un contacto en GHL.
 * Si ya existe por email o teléfono, GHL lo fusiona automáticamente.
 *
 * @param {Object} data
 * @param {string} data.name         - Nombre completo
 * @param {string} [data.phone]      - Teléfono / WhatsApp
 * @param {string} [data.email]      - Email
 * @param {string[]} [data.tags]     - Tags adicionales
 * @param {Object} [data.customFields] - Campos personalizados
 * @param {string} [data.source]     - Origen del lead
 * @returns {Promise<{contactId: string|null, error: string|null}>}
 */
export async function createOrUpdateContact({
  name = "",
  phone = "",
  email = "",
  tags = [],
  customFields = {},
  source = "Caribe Privé Website",
}) {
  if (!isGHLConfigured()) {
    console.warn("[GHL] No configurado — omitiendo createOrUpdateContact");
    return { contactId: null, error: "GHL no configurado" };
  }

  const [firstName, ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ") || "";

  // Construir customFields array para GHL v2
  const customFieldsArray = Object.entries(customFields).map(([key, value]) => ({
    key,
    field_value: value,
  }));

  const payload = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName,
    ...(phone && { phone }),
    ...(email && { email }),
    source,
    tags: ["caribeprive-web", ...tags],
    ...(customFieldsArray.length > 0 && { customFields: customFieldsArray }),
  };

  try {
    const res = await fetch(`${GHL_BASE}/contacts/`, {
      method: "POST",
      headers: ghlHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[GHL] createOrUpdateContact error:", data);
      return { contactId: null, error: data.message || "Error GHL" };
    }

    const contactId = data.contact?.id || data.id || null;
    return { contactId, error: null };
  } catch (err) {
    console.error("[GHL] createOrUpdateContact exception:", err);
    return { contactId: null, error: err.message };
  }
}

// ── Appointments ──────────────────────────────────────────────────────────────

/**
 * Crea una cita en el calendario de GHL.
 *
 * @param {Object} data
 * @param {string} data.contactId    - ID del contacto en GHL
 * @param {Date}   data.date         - Fecha de la cita
 * @param {string} data.time         - Hora en formato "9:00 AM"
 * @param {string} data.title        - Título de la cita
 * @param {string} [data.notes]      - Notas adicionales
 * @returns {Promise<{appointmentId: string|null, error: string|null}>}
 */
export async function createAppointment({ contactId, date, time, title, notes = "" }) {
  if (!isGHLConfigured() || !process.env.GHL_CALENDAR_ID) {
    console.warn("[GHL] No configurado — omitiendo createAppointment");
    return { appointmentId: null, error: "GHL Calendar no configurado" };
  }

  if (!contactId || !date || !time) {
    return { appointmentId: null, error: "Faltan datos para la cita" };
  }

  // Parsear hora "9:00 AM" → horas y minutos
  const [hm, ampm] = time.split(" ");
  let [h, m] = hm.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;

  const startTime = new Date(date);
  startTime.setHours(h, m, 0, 0);
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hora

  const payload = {
    calendarId: process.env.GHL_CALENDAR_ID,
    locationId: process.env.GHL_LOCATION_ID,
    contactId,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    title: title || "Cita Caribe Privé",
    appointmentStatus: "confirmed",
    address: "Zoom / Videollamada",
    ...(notes && { notes }),
    ...(process.env.GHL_ASSIGNED_USER_ID && {
      assignedUserId: process.env.GHL_ASSIGNED_USER_ID,
    }),
  };

  try {
    const res = await fetch(`${GHL_BASE}/appointments/`, {
      method: "POST",
      headers: ghlHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[GHL] createAppointment error:", data);
      return { appointmentId: null, error: data.message || "Error GHL" };
    }

    const appointmentId = data.appointment?.id || data.id || null;
    return { appointmentId, error: null };
  } catch (err) {
    console.error("[GHL] createAppointment exception:", err);
    return { appointmentId: null, error: err.message };
  }
}

// ── Notes ─────────────────────────────────────────────────────────────────────

/**
 * Agrega una nota al contacto en GHL (útil para conversaciones del chatbot).
 *
 * @param {string} contactId
 * @param {string} noteText
 */
export async function addNoteToContact(contactId, noteText) {
  if (!isGHLConfigured() || !contactId) return;

  try {
    await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: "POST",
      headers: ghlHeaders(),
      body: JSON.stringify({
        userId: process.env.GHL_ASSIGNED_USER_ID || "",
        body: noteText,
      }),
    });
  } catch (err) {
    console.error("[GHL] addNoteToContact exception:", err);
  }
}

export { isGHLConfigured };
