"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ANA_WHATSAPP = "529981543151";

// ── Íconos outline ─────────────────────────────────────────────────────────────
const IconBuilding = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="0"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="9" y2="9"/><line x1="3" y1="15" x2="9" y2="15"/><line x1="15" y1="9" x2="21" y2="9"/><line x1="15" y1="15" x2="21" y2="15"/>
  </svg>
);
const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/>
  </svg>
);
const IconLand = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 20h18"/><path d="M5 20V10l7-7 7 7v10"/><path d="M9 20v-5h6v5"/>
  </svg>
);
const IconStore = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7l1-4h18l1 4"/><path d="M2 7h20v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1-4 4 4 4 0 0 1-4-4V7z"/><path d="M4 13v8h16v-8"/>
  </svg>
);
const IconCrane = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22"/><polyline points="5 9 12 4 19 9"/><line x1="5" y1="22" x2="5" y2="12"/><line x1="19" y1="22" x2="19" y2="12"/><line x1="5" y1="17" x2="19" y2="17"/>
  </svg>
);
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>
  </svg>
);
const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>
  </svg>
);
const IconWallet = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v0H5"/><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5"/><circle cx="16.5" cy="13" r="1.2"/>
  </svg>
);
const IconCheck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconMessage = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/>
  </svg>
);

// ── Datos ──────────────────────────────────────────────────────────────────────
const PROPERTY_TYPES = [
  { id: "departamento", label: "Departamento",    Icon: IconBuilding },
  { id: "casa",         label: "Casa / Villa",    Icon: IconHome },
  { id: "terreno",      label: "Terreno",         Icon: IconLand },
  { id: "local",        label: "Local Comercial", Icon: IconStore },
  { id: "preventa",     label: "Preventa",        Icon: IconCrane },
];

const DESTINATIONS = [
  { id: "cancun",  label: "Cancún" },
  { id: "pm",      label: "Puerto Morelos" },
  { id: "playa",   label: "Playa del Carmen" },
  { id: "tulum",   label: "Tulum" },
  { id: "riviera", label: "Riviera Maya" },
];

const BUDGETS = [
  { id: "sub100",  label: "Hasta $100,000 USD" },
  { id: "100_250", label: "$100,000 – $250,000 USD" },
  { id: "250_500", label: "$250,000 – $500,000 USD" },
  { id: "500plus", label: "+$500,000 USD" },
  { id: "unknown", label: "Prefiero conversarlo en la cita" },
];

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM",  "2:00 PM",
  "3:00 PM",  "4:00 PM",  "5:00 PM",  "6:00 PM",
];

const STEPS = ["Tú", "Propiedad", "Destino", "Fecha"];

// ── Componente principal ───────────────────────────────────────────────────────
// inlined: true  → modo embebido en una sección (sin Nav/Footer, fondo transparente)
// inlined: false → página completa standalone (/agendar)
export default function AppointmentForm({ inlined = false }) {
  const [step, setStep]             = useState(0);
  const [dir, setDir]               = useState(1);
  const [done, setDone]             = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [calMonth, setCalMonth]     = useState(() => { const d = new Date(); d.setDate(1); return d; });

  const [form, setForm] = useState({
    name: "", whatsapp: "", email: "",
    propertyTypes: [], destinations: [],
    budget: "", date: null, time: "",
  });

  const update      = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggleArray = (key, val) => setForm(f => ({
    ...f,
    [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val],
  }));

  const canNext = () => {
    if (step === 0) return form.name.trim() && form.whatsapp.trim();
    if (step === 1) return form.propertyTypes.length > 0;
    if (step === 2) return form.destinations.length > 0 && form.budget;
    if (step === 3) return form.date && form.time;
    return true;
  };

  const go   = (n) => { setDir(n > step ? 1 : -1); setStep(n); };
  const next = async () => {
    if (step < STEPS.length - 1) { go(step + 1); return; }
    setSubmitting(true);
    try {
      await fetch("/api/submit-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error("submit-appointment:", err);
    } finally {
      setSubmitting(false);
      setDone(true);
    }
  };

  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);

  const calDays = useMemo(() => {
    const y = calMonth.getFullYear(), mo = calMonth.getMonth();
    const first = new Date(y, mo, 1), last = new Date(y, mo + 1, 0);
    const days = [];
    for (let i = 0; i < first.getDay(); i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++) days.push(new Date(y, mo, d));
    return days;
  }, [calMonth]);

  const isAvailable = (date) => {
    if (!date) return false;
    const d = new Date(date); d.setHours(0,0,0,0);
    if (d < today) return false;
    return d.getDay() !== 0 && d.getDay() !== 6;
  };

  const formatDate = (date) => !date ? "" : date.toLocaleDateString("es-MX", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const waSummary = [
    "Hola, acabo de agendar una cita. Les comparto mi resumen:",
    "",
    `Nombre: ${form.name}`,
    `WhatsApp: ${form.whatsapp}`,
    form.email ? `Email: ${form.email}` : null,
    `Propiedad: ${form.propertyTypes.join(", ")}`,
    `Destino: ${form.destinations.join(", ")}`,
    `Presupuesto: ${BUDGETS.find(b => b.id === form.budget)?.label || ""}`,
    `Fecha: ${formatDate(form.date)} - ${form.time}`,
    "",
    "Me gustaría charlar en este momento.",
  ].filter(Boolean).join("\n");
  const waMessage = encodeURIComponent(waSummary);
  const waUrl = `https://wa.me/${ANA_WHATSAPP}?text=${waMessage}`;

  const gcalUrl = () => {
    if (!form.date || !form.time) return "#";
    const [hm, ampm] = form.time.split(" ");
    let [h, m] = hm.split(":").map(Number);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    const start = new Date(form.date); start.setHours(h, m, 0);
    const end   = new Date(start.getTime() + 60 * 60 * 1000);
    const fmt   = (d) => d.toISOString().replace(/[-:.]/g,"").slice(0,15) + "Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cita+con+Ana+Quiroga+%E2%80%93+Caribe+Priv%C3%A9&dates=${fmt(start)}/${fmt(end)}&details=Asesoría+inmobiliaria+con+Ana+Quiroga,+Caribe+Priv%C3%A9.&location=Cancún,+México`;
  };

  // ── Thank you ────────────────────────────────────────────────────────────────
  if (done) {
    const firstName = form.name.split(" ")[0];
    return (
      <Shell inlined={inlined}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[540px]"
        >
          <div className="rounded-[28px] border border-white/70 bg-white/70 backdrop-blur-xl shadow-[0_24px_70px_rgba(52,67,81,0.16)] p-7 md:p-9">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-[#3FB0A0] to-[#2f8f82] shadow-[0_10px_28px_rgba(63,176,160,0.45)]"><IconCheck /></div>
            </div>
            <h2 className="text-center font-display text-[clamp(28px,5vw,44px)] text-ink mb-2">
              ¡Todo listo, {firstName}!
            </h2>
            <p className="text-center text-muted text-[15px] mb-8 leading-relaxed">
              Tu cita está agendada para el <strong className="text-ink">{formatDate(form.date)}</strong> a las <strong className="text-ink">{form.time}</strong>.<br />
              Ana te confirmará por WhatsApp a la brevedad.
            </p>
            <div className="rounded-2xl border border-white/70 bg-white/55 backdrop-blur p-5 mb-6 text-[13.5px] space-y-3">
              <SRow label="Nombre"      value={form.name} />
              <SRow label="WhatsApp"    value={form.whatsapp} />
              {form.email && <SRow label="Email" value={form.email} />}
              <div className="border-t border-line/70 pt-3 space-y-3">
                <SRow label="Propiedad"   value={form.propertyTypes.join(", ")} />
                <SRow label="Destino"     value={form.destinations.join(", ")} />
                <SRow label="Presupuesto" value={BUDGETS.find(b => b.id === form.budget)?.label} />
              </div>
              <div className="border-t border-line/70 pt-3 space-y-3">
                <SRow label="Fecha" value={formatDate(form.date)} />
                <SRow label="Hora"  value={form.time} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a href={gcalUrl()} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-full px-6 py-3 border border-ink/15 bg-white/60 backdrop-blur text-ink text-[13px] hover:bg-ink hover:text-paper hover:border-ink transition-colors">
                <IconCalendar /> Agregar recordatorio a Google Calendar
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 bg-[#25D366] text-white text-[13px] font-semibold hover:opacity-90 transition-opacity shadow-[0_8px_20px_rgba(37,211,102,0.3)]">
                <IconMessage /> Conversar con un asesor por WhatsApp
              </a>
              <Link href="/" className="text-center text-[13px] text-muted hover:text-ink transition-colors pt-1">
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </motion.div>
      </Shell>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <Shell inlined={inlined}>
      <div className="relative w-full max-w-[560px]">
        {!inlined && (
          <div className="mb-7 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3FB0A0]/30 bg-[#3FB0A0]/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#2f8f82] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3FB0A0]" /> Agendar cita
            </div>
            <h1 className="font-display text-[clamp(28px,4.4vw,42px)] text-ink leading-[1.05]">Agenda tu llamada con un asesor</h1>
          </div>
        )}

        <div className="rounded-[28px] border border-white/70 bg-white/70 backdrop-blur-xl shadow-[0_24px_70px_rgba(52,67,81,0.14)] p-6 md:p-8">
          {/* Progress */}
          <div className="flex items-center mb-9">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all duration-300 ${
                    i < step   ? "bg-gradient-to-br from-[#3FB0A0] to-[#2f8f82] text-white shadow-[0_6px_16px_rgba(63,176,160,0.4)]" :
                    i === step ? "bg-blue text-white scale-110 shadow-[0_6px_16px_rgba(52,67,81,0.35)] ring-4 ring-[#3FB0A0]/20" :
                                 "bg-white/70 text-muted border border-line"
                  }`}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className={`text-[10px] tracking-wide whitespace-nowrap ${i === step ? "text-blue font-semibold" : "text-muted"}`}>
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2 mb-4 rounded-full transition-colors duration-500"
                    style={{ background: i < step ? "#3FB0A0" : "#d8d3c6" }} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={{
                enter:  (d) => ({ x: d * 48, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit:   (d) => ({ x: d * -48, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && <StepContact form={form} update={update} />}
              {step === 1 && <StepPropertyType form={form} toggleArray={toggleArray} />}
              {step === 2 && <StepDestination form={form} toggleArray={toggleArray} update={update} />}
              {step === 3 && (
                <StepDateTime
                  form={form} update={update}
                  calMonth={calMonth} setCalMonth={setCalMonth}
                  calDays={calDays} isAvailable={isAvailable}
                  formatDate={formatDate} today={today}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-line/70">
            {step > 0 ? (
              <button onClick={() => go(step - 1)} className="text-[13px] text-muted hover:text-ink transition-colors">
                ← Atrás
              </button>
            ) : <div />}
            <button
              onClick={next}
              disabled={!canNext() || submitting}
              className="relative text-[13px] font-semibold tracking-wide rounded-full px-7 py-3.5 bg-blue text-white hover:bg-blue-deep transition-all disabled:opacity-25 disabled:cursor-not-allowed shadow-[0_8px_24px_rgba(52,67,81,0.3)]"
            >
              {submitting ? "Confirmando..." : step === STEPS.length - 1 ? "Confirmar cita ✓" : "Continuar →"}
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ── Shell: fondo liquid con blobs (solo standalone) ─────────────────────────────
function Shell({ inlined, children }) {
  if (inlined) {
    return <div className="flex flex-col items-center justify-center px-6 py-10">{children}</div>;
  }
  return (
    <div className="min-h-[92vh] bg-paper py-24 px-6 flex flex-col items-center justify-center">
      {children}
    </div>
  );
}

// ── Steps ──────────────────────────────────────────────────────────────────────

function StepContact({ form, update }) {
  return (
    <div>
      <p className="text-muted text-[14px] mb-6">Con esta información podremos preparar tu cita personalizada.</p>
      <div className="flex flex-col gap-4">
        <Field label="Nombre completo *" value={form.name}     onChange={v => update("name", v)}     placeholder="Ana García"        Icon={IconUser} />
        <Field label="WhatsApp *"        value={form.whatsapp} onChange={v => update("whatsapp", v)} placeholder="+52 998 123 4567"  type="tel"   Icon={IconPhone} />
        <Field label="Email (opcional)"  value={form.email}    onChange={v => update("email", v)}    placeholder="ana@email.com"     type="email" Icon={IconMail} />
      </div>
    </div>
  );
}

function StepPropertyType({ form, toggleArray }) {
  return (
    <div>
      <p className="text-muted text-[14px] mb-6">Puedes seleccionar más de una opción.</p>
      <div className="grid grid-cols-2 gap-3">
        {PROPERTY_TYPES.map(pt => (
          <Chip
            key={pt.id}
            label={pt.label}
            Icon={pt.Icon}
            active={form.propertyTypes.includes(pt.label)}
            onClick={() => toggleArray("propertyTypes", pt.label)}
          />
        ))}
      </div>
    </div>
  );
}

function StepDestination({ form, toggleArray, update }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[13px] font-medium text-ink mb-3">
        <span className="text-[#3FB0A0]"><IconPin /></span> ¿Dónde imaginas tu propiedad?
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {DESTINATIONS.map(d => (
          <button
            key={d.id}
            onClick={() => toggleArray("destinations", d.label)}
            className={`text-[13px] px-4 py-2 rounded-full border transition-all ${
              form.destinations.includes(d.label)
                ? "bg-blue text-white border-blue font-medium shadow-[0_4px_12px_rgba(52,67,81,0.22)]"
                : "border-line text-ink hover:border-[#3FB0A0]/60 bg-white/60 backdrop-blur"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>
      <p className="flex items-center gap-2 text-[13px] font-medium text-ink mb-3">
        <span className="text-[#3FB0A0]"><IconWallet /></span> Presupuesto aproximado
      </p>
      <div className="flex flex-col gap-2">
        {BUDGETS.map(b => (
          <button
            key={b.id}
            onClick={() => update("budget", b.id)}
            className={`flex items-center justify-between text-left text-[13px] px-4 py-3 rounded-2xl border transition-all ${
              form.budget === b.id
                ? "border-[#3FB0A0] bg-[#3FB0A0]/10 text-blue font-semibold"
                : "border-line text-muted hover:border-[#3FB0A0]/40 hover:text-ink bg-white/60 backdrop-blur"
            }`}
          >
            <span>{b.label}</span>
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
              form.budget === b.id ? "border-[#3FB0A0]" : "border-line"
            }`}>
              {form.budget === b.id && <span className="w-2 h-2 rounded-full bg-[#3FB0A0]" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDateTime({ form, update, calMonth, setCalMonth, calDays, isAvailable, formatDate, today }) {
  const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const DAYS   = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  const isPastMonth = calMonth.getFullYear() === today.getFullYear() && calMonth.getMonth() <= today.getMonth();

  return (
    <div>
      <p className="text-muted text-[14px] mb-5">Lunes a viernes, de 9 AM a 6 PM.</p>
      <div className="rounded-2xl border border-white/70 bg-white/55 backdrop-blur p-4 mb-5">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCalMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
            disabled={isPastMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3FB0A0]/15 transition-colors disabled:opacity-20 text-muted text-lg">‹</button>
          <span className="text-[14px] font-semibold text-ink">{MONTHS[calMonth.getMonth()]} {calMonth.getFullYear()}</span>
          <button onClick={() => setCalMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3FB0A0]/15 transition-colors text-muted text-lg">›</button>
        </div>
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => <div key={d} className="text-center text-[11px] text-muted font-medium py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {calDays.map((date, i) => {
            if (!date) return <div key={`e-${i}`} />;
            const avail    = isAvailable(date);
            const selected = form.date && date.toDateString() === form.date.toDateString();
            return (
              <button key={i} disabled={!avail} onClick={() => update("date", date)}
                className={`aspect-square rounded-xl text-[13px] flex items-center justify-center transition-all ${
                  selected ? "bg-blue text-white font-bold shadow-[0_4px_12px_rgba(52,67,81,0.3)]" :
                  avail    ? "hover:bg-[#3FB0A0]/15 text-ink" : "text-line cursor-not-allowed"
                }`}>
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {form.date && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <p className="text-[13px] font-medium text-ink mb-3 capitalize">Hora — {formatDate(form.date)}</p>
            <div className="grid grid-cols-5 gap-2">
              {TIME_SLOTS.map(t => (
                <button key={t} onClick={() => update("time", t)}
                  className={`text-[12px] py-2 rounded-xl border transition-all ${
                    form.time === t
                      ? "bg-blue text-white border-blue font-semibold shadow-[0_4px_12px_rgba(52,67,81,0.25)]"
                      : "border-line text-muted hover:border-[#3FB0A0]/50 hover:text-ink bg-white/60 backdrop-blur"
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Primitives ─────────────────────────────────────────────────────────────────

function Field({ label, value, onChange, placeholder, type = "text", Icon }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-muted mb-1.5 tracking-widest uppercase">{label}</label>
      <div className="relative group">
        {Icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3FB0A0] group-focus-within:text-[#2f8f82] transition-colors pointer-events-none">
            <Icon />
          </span>
        )}
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className={`w-full rounded-2xl border border-white/70 bg-white/55 backdrop-blur ${Icon ? "pl-11" : "pl-4"} pr-4 py-3.5 text-[14px] outline-none focus:border-[#3FB0A0] focus:ring-4 focus:ring-[#3FB0A0]/15 transition-all placeholder:text-muted/40 text-ink`} />
      </div>
    </div>
  );
}

function Chip({ label, Icon, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-2.5 rounded-2xl border px-4 py-3.5 text-[14px] text-left transition-all ${
        active ? "border-blue bg-blue text-white font-medium shadow-[0_6px_16px_rgba(52,67,81,0.28)]"
               : "border-line text-ink hover:border-[#3FB0A0]/50 bg-white/60 backdrop-blur"
      }`}>
      {Icon && <span className={active ? "text-[#7FD0C4]" : "text-[#3FB0A0]"}><Icon /></span>}
      <span>{label}</span>
    </button>
  );
}

function SRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 items-start">
      <span className="text-muted shrink-0">{label}</span>
      <span className="text-ink font-medium text-right">{value}</span>
    </div>
  );
}
