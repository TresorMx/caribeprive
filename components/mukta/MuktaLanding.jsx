"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getProperty } from "@/lib/properties";
import { VISIT, INTERESTS, availableDates, formatDateEs } from "@/lib/muktaVisit";

const mukta = getProperty("mukta-residencial");

const STEPS = [
  { t: "Reserva tu día", d: "Déjanos tus datos y elige día y hora para tu visita." },
  { t: "Te confirmamos", d: "Te escribimos por WhatsApp y te enviamos la ubicación exacta." },
  { t: "Ven con tu familia", d: "Nada en el cenote y disfruta la tarde en la casa club." },
];

const BRING = [
  "Traje de baño y toalla",
  "Tu hielera con lo que más te guste",
  "Protector solar biodegradable (el cenote es un ecosistema vivo)",
  "Ganas de quedarte toda la tarde",
];

export default function MuktaLanding() {
  const router = useRouter();
  const formRef = useRef(null);
  // Se calculan en el cliente: la página es estática y no debe congelar las fechas del día del build
  const [dates, setDates] = useState([]);
  useEffect(() => setDates(availableDates()), []);

  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "", time: "", people: 2, interest: "", consent: false, website: "",
  });
  const [utm, setUtm] = useState({});
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setError(""); };

  // UTMs del QR / anuncios
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setUtm({ source: q.get("utm_source") || "", medium: q.get("utm_medium") || "", campaign: q.get("utm_campaign") || "" });
  }, []);

  // Botón fijo en móvil solo mientras el formulario no está a la vista
  useEffect(() => {
    if (!formRef.current) return;
    const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(formRef.current);
    return () => io.disconnect();
  }, []);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const phoneDigits = form.phone.replace(/\D/g, "");
  const valid = form.name.trim().length >= 3 && phoneDigits.length >= 10 && form.date && form.time && form.consent;

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/mukta-visita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, utm }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "No pudimos registrar tu visita. Intenta de nuevo.");
      try {
        sessionStorage.setItem("mukta-visit", JSON.stringify({ name: form.name.trim(), date: form.date, time: form.time, people: form.people }));
      } catch { /* modo privado: la página de gracias usa texto genérico */ }
      router.push("/mukta/gracias");
    } catch (err) {
      setError(err.message);
      setSending(false);
    }
  };

  return (
    <main className="bg-paper text-ink">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-blue-deep">
        <img src="/mukta/entrada-cenote.webp" alt="Entrada al cenote de Mukta Residencial" fetchPriority="high" decoding="async"
          className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(12,22,38,.55) 0%,rgba(35,46,57,.45) 45%,rgba(12,22,38,.88) 100%)" }} />

        <header className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 pt-6 flex items-center justify-between">
          <img src="/logowhite.svg" alt="Caribe Privé" className="h-6 md:h-7 w-auto" />
          <span className="text-[11px] tracking-[0.18em] uppercase text-white/70">Puerto Morelos</span>
        </header>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 pt-14 pb-16 md:pt-24 md:pb-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <Reveal>
            <div className="eyebrow text-yellow mb-5">Mukta Residencial</div>
            <h1 className="text-white max-w-[13ch] leading-[0.98]" style={{ fontSize: "clamp(40px,6.4vw,84px)" }}>
              Cualquiera puede nadar en un cenote.
            </h1>
            <p className="italic text-white/90 mt-5 max-w-[30ch] leading-snug" style={{ fontSize: "clamp(19px,2.2vw,26px)" }}>
              Pero no cualquiera puede decir que tiene <span className="text-yellow not-italic font-medium">un cenote en casa</span>.
            </p>
            <p className="text-[#dbe3ef] mt-7 max-w-[46ch] text-[15.5px] leading-relaxed">
              Te invitamos a nadar en nuestro cenote con tu familia. Es privado y es hermoso: lleva tu hielera y disfruta
              una tarde en nuestra casa club.
            </p>
            <button onClick={scrollToForm}
              className="lg:hidden mt-8 text-[13px] font-semibold tracking-wide rounded-full px-7 py-3.5 bg-yellow text-ink hover:bg-yellow-bright transition-colors">
              Reservar mi visita
            </button>
          </Reveal>

          {/* ── FORMULARIO ── */}
          <div ref={formRef} id="reservar" className="scroll-mt-6">
            <form onSubmit={submit} noValidate
              className="rounded-[24px] bg-white/95 backdrop-blur-xl border border-white/70 shadow-[0_30px_80px_rgba(12,22,38,0.35)] p-6 md:p-7">
              <h2 className="text-ink leading-tight" style={{ fontSize: "clamp(24px,2.6vw,30px)" }}>Reserva tu visita</h2>
              <p className="text-muted text-[13.5px] mt-1.5 mb-5 leading-relaxed">
                Elige día y hora. Te confirmamos por WhatsApp y te enviamos la ubicación.
              </p>

              <div className="flex flex-col gap-3">
                <Field icon={<IconUser />} placeholder="Nombre completo" autoComplete="name"
                  value={form.name} onChange={(v) => set("name", v)} />
                <Field icon={<IconPhone />} placeholder="WhatsApp (10 dígitos)" type="tel" inputMode="tel" autoComplete="tel"
                  value={form.phone} onChange={(v) => set("phone", v)} />
                <Field icon={<IconMail />} placeholder="Email (opcional)" type="email" autoComplete="email"
                  value={form.email} onChange={(v) => set("email", v)} />
              </div>

              <Label>¿Qué día te gustaría venir?</Label>
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x min-h-[74px]">
                {dates.map((d) => {
                  const active = form.date === d;
                  return (
                    <button type="button" key={d} onClick={() => set("date", d)}
                      className={`snap-start shrink-0 w-[62px] rounded-xl border py-2 text-center transition-colors ${
                        active ? "bg-blue border-blue text-white" : "bg-white border-line text-ink hover:border-[#3FB0A0]/60"
                      }`}>
                      <div className={`text-[10px] uppercase tracking-wide ${active ? "text-white/80" : "text-muted"}`}>
                        {formatDateEs(d, { weekday: "short" }).replace(".", "")}
                      </div>
                      <div className="font-display text-[22px] leading-tight">{Number(d.slice(8))}</div>
                      <div className={`text-[10px] ${active ? "text-white/80" : "text-muted"}`}>
                        {formatDateEs(d, { month: "short" }).replace(".", "")}
                      </div>
                    </button>
                  );
                })}
              </div>

              <Label>¿A qué hora?</Label>
              <div className="grid grid-cols-3 gap-2">
                {VISIT.slots.map((s) => (
                  <Pill key={s} active={form.time === s} onClick={() => set("time", s)}>{s}</Pill>
                ))}
              </div>

              <div className="flex items-center justify-between mt-5">
                <span className="text-[13px] font-medium text-ink">¿Cuántas personas vienen?</span>
                <div className="flex items-center gap-3">
                  <StepBtn label="Menos personas" disabled={form.people <= 1} onClick={() => set("people", form.people - 1)}>−</StepBtn>
                  <span className="font-display text-[22px] w-6 text-center">{form.people}</span>
                  <StepBtn label="Más personas" disabled={form.people >= VISIT.maxPeople} onClick={() => set("people", form.people + 1)}>+</StepBtn>
                </div>
              </div>

              <Label>¿Qué te interesa? <span className="text-muted font-normal">(opcional)</span></Label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <Pill key={i.id} active={form.interest === i.id} onClick={() => set("interest", form.interest === i.id ? "" : i.id)}>
                    {i.label}
                  </Pill>
                ))}
              </div>

              {/* honeypot anti-spam: invisible para personas */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                value={form.website} onChange={(e) => set("website", e.target.value)}
                className="absolute -left-[9999px] h-0 w-0 opacity-0" />

              <label className="flex items-start gap-2.5 mt-5 cursor-pointer select-none">
                <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#3FB0A0]" />
                <span className="text-[12.5px] text-muted leading-snug">
                  Acepto que Caribe Privé me contacte por WhatsApp para confirmar mi visita.
                </span>
              </label>

              {error && <p className="text-[13px] text-[#b4412f] mt-3" role="alert">{error}</p>}

              <button type="submit" disabled={!valid || sending}
                className="mt-5 w-full text-[14px] font-semibold tracking-wide rounded-full py-3.5 bg-yellow text-ink hover:bg-yellow-bright transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_10px_28px_rgba(63,176,160,0.35)]">
                {sending ? "Registrando…" : "Quiero visitar el cenote"}
              </button>
              <p className="text-center text-[11.5px] text-muted mt-3">Visita sin costo · Privada · Confirmación por WhatsApp</p>
            </form>
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ───────────────────────────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-24">
        <Reveal>
          <div className="eyebrow text-blue mb-4">Así funciona</div>
          <h2 className="max-w-[20ch]" style={{ fontSize: "clamp(28px,3.8vw,46px)" }}>Tres pasos para tu tarde en el cenote.</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08}>
              <div className="rounded-2xl border border-line bg-white p-6 h-full">
                <div className="w-10 h-10 rounded-full bg-blue text-white flex items-center justify-center font-display text-[18px] mb-4">{i + 1}</div>
                <h3 className="text-[19px] font-medium mb-1.5">{s.t}</h3>
                <p className="text-muted text-[14.5px] leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── GALERÍA ─────────────────────────────────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-8 pb-20 md:pb-24">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-4">
          <Figure src="/mukta/cenote.webp" alt="Cenote privado de Mukta Residencial" caption="El cenote" tall />
          <Figure src="/mukta/casa-club.webp" alt="Casa club de Mukta Residencial" caption="La casa club" tall />
        </div>
      </section>

      {/* ── QUÉ LLEVAR + MUKTA ──────────────────────────────── */}
      <section className="bg-white border-y border-line">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-24 grid md:grid-cols-2 gap-12">
          <Reveal>
            <div className="eyebrow text-blue mb-4">Para tu visita</div>
            <h2 className="mb-6" style={{ fontSize: "clamp(26px,3.2vw,38px)" }}>Qué llevar</h2>
            <ul className="flex flex-col gap-3.5">
              {BRING.map((b) => (
                <li key={b} className="flex gap-3 text-[15px]">
                  <span className="text-[#3FB0A0] mt-0.5"><IconCheck /></span>{b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="eyebrow text-blue mb-4">El desarrollo</div>
            <h2 className="mb-4" style={{ fontSize: "clamp(26px,3.2vw,38px)" }}>Mukta Residencial</h2>
            <p className="text-muted text-[15px] leading-relaxed mb-6">{mukta?.body.es[0]}</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {mukta?.stats.slice(0, 3).map((s) => (
                <div key={s.value} className="rounded-xl border border-line p-3 text-center">
                  <div className="font-display text-[28px] text-blue leading-none">{s.value}</div>
                  <div className="text-[10.5px] text-muted mt-1.5 leading-tight">{s.label.es}</div>
                </div>
              ))}
            </div>
            <Link href="/propiedades/mukta-residencial" className="text-[13px] font-semibold text-blue hover:text-[#2f8f82] transition-colors">
              Conocer Mukta Residencial →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 text-center">
        <h2 className="max-w-[20ch] mx-auto" style={{ fontSize: "clamp(28px,3.8vw,46px)" }}>Tu familia, el cenote y una tarde sin prisa.</h2>
        <button onClick={scrollToForm}
          className="mt-8 text-[13px] font-semibold tracking-wide rounded-full px-8 py-3.5 bg-blue text-white hover:bg-blue-deep transition-colors">
          Reservar mi visita
        </button>
      </section>

      <MuktaFooter stickySpace />

      {/* Botón fijo en móvil */}
      <div className={`lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-paper/90 backdrop-blur border-t border-line transition-transform duration-300 ${
        formVisible ? "translate-y-full" : "translate-y-0"
      }`}>
        <button onClick={scrollToForm} className="w-full text-[14px] font-semibold rounded-full py-3.5 bg-yellow text-ink">
          Reservar mi visita al cenote
        </button>
      </div>
    </main>
  );
}

export function MuktaFooter({ stickySpace = false }) {
  return (
    <footer className={`bg-ink text-[#9aa4b4] ${stickySpace ? "pb-24 lg:pb-0" : ""}`}>
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-5 text-[12px]">
        <div className="flex items-center gap-5">
          <img src="/logowhite.svg" alt="Caribe Privé" className="h-6 w-auto opacity-90" />
          <span className="w-px h-6 bg-white/15" />
          <span className="tracking-[0.18em] uppercase text-white/70">Mukta Residencial · Puerto Morelos</span>
        </div>
        <span>© {new Date().getFullYear()} Caribe Privé · Desarrollo de Grupo Daxi</span>
      </div>
    </footer>
  );
}

// ── Primitivas ────────────────────────────────────────────────
function Field({ icon, value, onChange, ...props }) {
  return (
    <div className="relative group">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3FB0A0] pointer-events-none">{icon}</span>
      <input {...props} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-white pl-10 pr-3.5 py-3 text-[14px] text-ink outline-none placeholder:text-muted/60 focus:border-[#3FB0A0] focus:ring-4 focus:ring-[#3FB0A0]/15 transition-all" />
    </div>
  );
}

function Label({ children }) {
  return <p className="text-[13px] font-medium text-ink mt-5 mb-2.5">{children}</p>;
}

function Pill({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick}
      className={`text-[12.5px] px-3.5 py-2.5 rounded-xl border transition-colors ${
        active ? "bg-blue border-blue text-white font-medium" : "bg-white border-line text-ink hover:border-[#3FB0A0]/60"
      }`}>
      {children}
    </button>
  );
}

function StepBtn({ label, disabled, onClick, children }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick}
      className="w-9 h-9 rounded-full border border-line bg-white text-[18px] leading-none text-ink hover:border-[#3FB0A0] disabled:opacity-30 transition-colors">
      {children}
    </button>
  );
}

function Figure({ src, alt, caption }) {
  return (
    <figure className="relative overflow-hidden rounded-2xl h-[260px] md:h-[380px]">
      <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      <figcaption className="absolute left-4 bottom-4 text-[11px] tracking-[0.16em] uppercase text-white bg-ink/45 backdrop-blur px-3 py-1.5 rounded-full">
        {caption}
      </figcaption>
    </figure>
  );
}

const svg = (d) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const IconUser = () => svg(<><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></>);
const IconPhone = () => svg(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />);
const IconMail = () => svg(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>);
const IconCheck = () => svg(<polyline points="20 6 9 17 4 12" />);
