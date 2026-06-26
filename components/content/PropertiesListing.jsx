"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { properties } from "@/lib/properties";
import Reveal from "@/components/Reveal";
import { PageHero, Section, CTABand } from "@/components/content/ui";

export default function PropertiesListing() {
  const { lang, t } = useLang();
  const L = (es, en) => (lang === "en" ? en : es);
  const [zone, setZone] = useState("all");

  const zones = useMemo(() => [...new Set(properties.map((p) => p.zone))], []);
  const visible = zone === "all" ? properties : properties.filter((p) => p.zone === zone);

  return (
    <>
      <PageHero
        image="/articulos/F.jpg"
        eyebrow={L("Propiedades", "Properties")}
        title={L("Desarrollos seleccionados, no un catálogo.", "Selected developments, not a catalog.")}
        sub={L(
          "Solo representamos proyectos que cumplen criterios reales de ubicación, estructura comercial y potencial de plusvalía. Explóralos y agenda una visita.",
          "We only represent projects that meet real criteria of location, commercial structure and appreciation potential. Explore them and book a visit.",
        )}
      />

      <Section className="py-16 md:py-24">
        {/* Filtros */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex gap-2.5 flex-wrap">
              <Chip active={zone === "all"} onClick={() => setZone("all")}>{L("Todas", "All")}</Chip>
              {zones.map((z) => (
                <Chip key={z} active={zone === z} onClick={() => setZone(z)}>{z}</Chip>
              ))}
            </div>
            <span className="text-[13px] text-muted">
              {visible.length} {visible.length === 1 ? L("desarrollo", "development") : L("desarrollos", "developments")}
            </span>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {visible.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <Link href={`/propiedades/${p.slug}`} className="group block h-full">
                <article className="bg-white border border-line overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_46px_rgba(52,67,81,0.16)]">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={p.cardImage}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <span className="absolute top-3.5 left-3.5 bg-yellow text-ink text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full">
                      {p.zone}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-[11px] tracking-[0.12em] uppercase text-muted mb-2">{p.type[lang]}</div>
                    <h3 className="text-[32px] mb-2">{p.name}</h3>
                    <p className="text-[13px] text-muted mb-5 flex-1">{p.cardDesc[lang]}</p>
                    <div className="flex justify-between items-center border-t border-line pt-4">
                      <div>
                        <div className="font-display text-[30px] text-blue">{p.appreciation}</div>
                        <div className="text-[10px] tracking-[0.08em] uppercase text-muted">{t("props.appreciation")}</div>
                      </div>
                      <span className="text-blue text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand
        title={L("¿No sabes cuál encaja contigo?", "Not sure which one fits you?")}
        sub={L("Cuéntanos qué buscas y te decimos —con números— cuál tiene más sentido para tu objetivo.", "Tell us what you're after and we'll show you —with numbers— which one makes the most sense for your goal.")}
        primary={L("Agendar una llamada", "Book a call")}
        secondary={L("Preguntar al asesor", "Ask the advisor")}
      />
    </>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs tracking-wide px-4 py-2 rounded-full border transition-colors ${
        active ? "bg-blue text-white border-blue" : "border-line text-muted hover:text-ink hover:border-[#3FB0A0]/50 bg-white"
      }`}
    >
      {children}
    </button>
  );
}
