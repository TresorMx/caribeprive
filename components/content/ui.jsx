"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const openChat = () => window.dispatchEvent(new CustomEvent("ns-open-chat"));

// ── Hero de página de contenido ─────────────────────────────────────────────────
export function PageHero({ image, eyebrow, title, sub }) {
  return (
    <header className="relative min-h-[68vh] flex items-end overflow-hidden bg-blue-deep">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(12,22,38,.35) 0%,rgba(12,22,38,.25) 40%,rgba(35,46,57,.92) 100%)",
        }}
      />
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-8 pb-16 pt-32">
        <Reveal>
          <div className="eyebrow text-yellow mb-4">{eyebrow}</div>
          <h1 className="text-white max-w-[18ch]" style={{ fontSize: "clamp(34px,5.6vw,72px)" }}>
            {title}
          </h1>
          {sub && (
            <p className="text-[#dbe3ef] max-w-[60ch] mt-5 text-[clamp(15px,1.6vw,19px)] leading-relaxed">
              {sub}
            </p>
          )}
        </Reveal>
      </div>
    </header>
  );
}

// ── Banner CTA con imagen de fondo ──────────────────────────────────────────────
export function ImageBand({ image, alt = "", kicker, title, ctaLabel, ctaHref = "/agendar" }) {
  return (
    <section className="relative h-[380px] md:h-[480px] overflow-hidden flex items-center justify-center text-center">
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(12,22,38,.5) 0%,rgba(35,46,57,.55) 50%,rgba(12,22,38,.8) 100%)" }} />
      <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle,#3FB0A0,transparent 70%)" }} />
      <Reveal className="relative z-10">
        <div className="max-w-[820px] mx-auto px-6">
          {kicker && <div className="eyebrow text-yellow mb-4">{kicker}</div>}
          {title && (
            <h3 className="text-white font-display leading-[1.05]" style={{ fontSize: "clamp(26px,4.4vw,50px)" }}>
              {title}
            </h3>
          )}
          {ctaLabel && (
            <div className="mt-8">
              <Link href={ctaHref}
                className="inline-flex text-[13px] font-semibold tracking-wide rounded-full px-7 py-3.5 bg-yellow text-ink hover:bg-yellow-bright transition-colors shadow-[0_10px_30px_rgba(63,176,160,0.35)]">
                {ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

// ── Contenedor de sección ───────────────────────────────────────────────────────
export function Section({ children, className = "", tone = "paper" }) {
  const bg = tone === "white" ? "bg-white" : tone === "bone" ? "bg-bone" : "bg-paper";
  return (
    <section className={`${bg} ${className}`}>
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, intro }) {
  return (
    <Reveal>
      {eyebrow && <div className="eyebrow text-blue mb-4">{eyebrow}</div>}
      <h2 className="text-ink max-w-[20ch]" style={{ fontSize: "clamp(28px,4vw,52px)" }}>
        {title}
      </h2>
      {intro && <p className="text-muted max-w-[62ch] mt-5 text-[16px] leading-relaxed">{intro}</p>}
    </Reveal>
  );
}

// ── Tarjeta numérica ────────────────────────────────────────────────────────────
export function StatCard({ value, label, sub }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="font-display text-blue leading-none" style={{ fontSize: "clamp(34px,4vw,52px)" }}>
        {value}
      </div>
      <div className="text-ink font-medium text-[14px] mt-3">{label}</div>
      {sub && <div className="text-muted text-[13px] mt-1 leading-relaxed">{sub}</div>}
    </div>
  );
}

// ── Tarjeta con ícono ───────────────────────────────────────────────────────────
export function FeatureCard({ icon, title, body, accent = false }) {
  return (
    <div className={`rounded-2xl border p-6 h-full ${accent ? "border-[#3FB0A0]/40 bg-[#3FB0A0]/[0.06]" : "border-line bg-white"}`}>
      {icon && <div className="text-[#3FB0A0] mb-4">{icon}</div>}
      <h3 className="text-ink text-[19px] font-medium mb-2">{title}</h3>
      <p className="text-muted text-[14.5px] leading-relaxed">{body}</p>
    </div>
  );
}

// ── Gráfica de barras comparativa ───────────────────────────────────────────────
export function BarChart({ title, unit, rows, max }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="flex items-baseline justify-between mb-5">
        <h3 className="text-ink text-[16px] font-semibold">{title}</h3>
        {unit && <span className="text-muted text-[12px]">{unit}</span>}
      </div>
      <div className="flex flex-col gap-4">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-[13px] text-ink font-medium">{r.label}</span>
              <span className="text-[13px] text-muted">{r.display}</span>
            </div>
            <div className="h-2.5 rounded-full bg-bone overflow-hidden">
              <Reveal y={0}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, Math.round((r.value / max) * 100))}%`,
                    background: r.highlight
                      ? "linear-gradient(90deg,#3FB0A0,#2f8f82)"
                      : "linear-gradient(90deg,#5d6b78,#344351)",
                  }}
                />
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Lista de preguntas (acordeón) ───────────────────────────────────────────────
export function FaqList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="rounded-2xl border border-line bg-white divide-y divide-line overflow-hidden">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-paper/60 transition-colors"
            >
              <span className="text-ink font-medium text-[15.5px]">{it.q}</span>
              <span className={`text-[#3FB0A0] text-xl shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 -mt-1">
                <p className="text-muted text-[14.5px] leading-relaxed max-w-[68ch]">{it.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Nota / disclaimer ───────────────────────────────────────────────────────────
export function Note({ children }) {
  return (
    <div className="rounded-xl border border-line bg-bone/60 px-5 py-4 text-[13px] text-muted leading-relaxed">
      {children}
    </div>
  );
}

// ── Banda CTA al final ──────────────────────────────────────────────────────────
export function CTABand({ title, sub, primary, secondary }) {
  return (
    <section className="relative overflow-hidden bg-blue-deep text-white py-24 md:py-28">
      <BackgroundGradientAnimation interactive={false} containerClassName="absolute inset-0 z-0" />
      <div className="absolute inset-0 z-[1] bg-blue-deep/40" />
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-8 text-center">
        <Reveal>
          <h2 className="text-white max-w-[22ch] mx-auto" style={{ fontSize: "clamp(28px,4vw,48px)" }}>
            {title}
          </h2>
          {sub && <p className="text-[#c2cee0] max-w-[54ch] mx-auto mt-5 text-[16px] leading-relaxed">{sub}</p>}
          <div className="flex gap-3.5 flex-wrap justify-center mt-9">
            <Link
              href="/agendar"
              className="text-[13px] font-semibold tracking-wide rounded-full px-7 py-3.5 bg-yellow text-ink hover:bg-yellow-bright transition-colors"
            >
              {primary}
            </Link>
            <button
              onClick={openChat}
              className="text-[13px] tracking-wide rounded-full px-7 py-3.5 border border-white/50 text-white hover:bg-white hover:text-ink transition-colors"
            >
              {secondary}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Íconos outline ──────────────────────────────────────────────────────────────
const I = (paths) => () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {paths}
  </svg>
);
export const Icons = {
  shield: I(<><path d="M12 3l8 3v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6z" /><path d="m9 12 2 2 4-4" /></>),
  doc:    I(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h6" /></>),
  coins:  I(<><ellipse cx="9" cy="7" rx="5" ry="2.5" /><path d="M4 7v5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7" /><path d="M10 14.5V17c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-5c0-1.2-1.6-2.2-4-2.45" /></>),
  key:    I(<><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8 2 2-2 2 2 2-2 2-2-2-2 2" /></>),
  chart:  I(<><path d="M3 3v18h18" /><rect x="7" y="11" width="3" height="6" /><rect x="12" y="7" width="3" height="10" /><rect x="17" y="13" width="3" height="4" /></>),
  pin:    I(<><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  handshake: I(<><path d="M11 17l2 2a2 2 0 0 0 3 0l4-4" /><path d="M3 11l4-4 5 5" /><path d="M13 8l3-3 5 5-3 3" /><path d="M3 11l3 3" /></>),
  compass: I(<><circle cx="12" cy="12" r="9" /><polygon points="16 8 10 10 8 16 14 14 16 8" /></>),
  home:   I(<><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" /><polyline points="9 21 9 12 15 12 15 21" /></>),
  refresh: I(<><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></>),
  eye:    I(<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>),
  clock:  I(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
};
