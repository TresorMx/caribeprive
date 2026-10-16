// ============================================================
//  Campaña "Nada en nuestro cenote" — Mukta Residencial
//  Config compartida por el landing (/mukta) y la API (/api/mukta-visita).
//  Para cambiar horarios o días de visita, edita SOLO este archivo.
// ============================================================

export const VISIT = {
  slots: ["11:00 AM", "1:00 PM", "3:00 PM"], // horarios ofrecidos (hora de Cancún)
  closedWeekdays: [],     // días sin visitas: 0=Dom … 6=Sáb (ej. [1] = sin lunes)
  minDaysAhead: 1,        // no se puede agendar para hoy
  maxDaysAhead: 21,       // ventana visible del calendario
  maxPeople: 12,
  durationMin: 180,       // duración del bloque en el calendario de GHL
  place: "Mukta Residencial, Puerto Morelos, Q. Roo",
};

export const INTERESTS = [
  { id: "conocer",  label: "Solo conocer el cenote" },
  { id: "vivir",    label: "Me interesa vivir aquí" },
  { id: "invertir", label: "Me interesa invertir" },
];

const TZ = "America/Cancun";

/** "YYYY-MM-DD" de hoy en Cancún */
export function todayCancun() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

/** Suma días a un "YYYY-MM-DD" (aritmética en UTC, sin desfases) */
export function addDays(ymd, n) {
  const d = new Date(`${ymd}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function weekdayOf(ymd) {
  return new Date(`${ymd}T12:00:00Z`).getUTCDay();
}

/** Fechas disponibles ("YYYY-MM-DD") según la config */
export function availableDates() {
  const today = todayCancun();
  const out = [];
  for (let i = VISIT.minDaysAhead; i <= VISIT.maxDaysAhead; i++) {
    const ymd = addDays(today, i);
    if (!VISIT.closedWeekdays.includes(weekdayOf(ymd))) out.push(ymd);
  }
  return out;
}

/** "sábado 18 de octubre" */
export function formatDateEs(ymd, opts = { weekday: "long", day: "numeric", month: "long" }) {
  return new Date(`${ymd}T12:00:00Z`).toLocaleDateString("es-MX", { ...opts, timeZone: "UTC" });
}
