"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import AppointmentForm from "@/components/AppointmentForm";
import PropertyMap from "@/components/PropertyMap";

const openChat = () => window.dispatchEvent(new CustomEvent("ns-open-chat"));

function IconTag() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}

export default function PropertyView({ property: p }) {
  const { lang, t } = useLang();

  return (
    <main>
      <Link
        href="/#propiedades"
        className="fixed top-[84px] left-6 md:left-8 z-40 text-[13px] font-semibold text-ink bg-yellow rounded-full px-4 py-2 hover:bg-yellow-bright transition-colors"
      >
        ← {t("pl.back")}
      </Link>

      {/* HERO */}
      <header
        className="relative flex items-end overflow-hidden bg-blue-deep pb-16 min-h-[560px]"
        style={{ height: "100svh" }}
      >
        <div className="absolute inset-0 z-[1]">
          <img src={p.heroImage} alt={p.name} fetchPriority="high" decoding="async" className="h-full w-full object-cover opacity-60" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg,rgba(35,46,57,.3),rgba(35,46,57,.9))" }}
          />
        </div>
        <div className="relative z-[2] w-full max-w-[1200px] mx-auto px-6 md:px-8">
          <span className="inline-block bg-yellow text-ink text-xs font-semibold tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full mb-5">
            {p.region[lang]}
          </span>
          <h1 className="text-white mb-6" style={{ fontSize: "clamp(56px,12vw,150px)" }}>
            {p.name}
          </h1>
          {/* Info bar */}
          {(p.price || p.deliveryStatus || p.projectType) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/90" style={{ fontSize: "clamp(13px,1.2vw,16px)" }}>
              {p.price && (
                <span className="flex items-center gap-2 font-semibold tracking-[0.08em] uppercase text-yellow">
                  <IconTag /> {p.price[lang]}
                </span>
              )}
              {p.price && (p.deliveryStatus || p.projectType) && (
                <span className="text-white/30 font-light">|</span>
              )}
              {p.deliveryStatus && (
                <span className="flex items-center gap-2 font-semibold tracking-[0.08em] uppercase">
                  {p.deliveryStatus.es === "Preventa" ? <IconClock /> : <IconCheck />}
                  {p.deliveryStatus[lang]}
                </span>
              )}
              {p.deliveryStatus && p.projectType && (
                <span className="text-white/30 font-light">|</span>
              )}
              {p.projectType && (
                <span className="flex items-center gap-2 font-semibold tracking-[0.08em] uppercase">
                  <IconBuilding /> {p.projectType[lang]}
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      {/* STATS */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 border border-line">
          {p.stats.map((s, i) => (
            <div
              key={i}
              className={`p-10 md:p-12 text-center border-line ${
                i < p.stats.length - 1 ? "md:border-r" : ""
              } ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}
            >
              <div className="font-display text-[64px] text-blue leading-none">{s.value}</div>
              <div className="text-[11px] tracking-[0.1em] uppercase text-muted mt-3">
                {s.label[lang]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESARROLLADOR */}
      {p.developer && (
        <section className="py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <Reveal>
              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-0">
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center justify-center w-full md:w-[280px] md:pr-10">
                  {p.developer.logo ? (
                    <img
                      src={p.developer.logo}
                      alt={p.developer.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[109px] w-auto object-contain"
                      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
                    />
                  ) : null}
                  <span className="hidden font-display text-[28px] text-blue">{p.developer.name}</span>
                </div>
                {/* Divisor */}
                <div className="hidden md:block w-px self-stretch bg-line flex-shrink-0" />
                {/* Descripción */}
                <div className="flex-1 md:pl-10">
                  <div className="eyebrow text-blue mb-3">Desarrollador</div>
                  <h3 className="text-[22px] font-semibold text-ink mb-3">{p.developer.name}</h3>
                  <p className="text-blue-soft text-[15px] leading-relaxed">
                    {p.developer.description[lang]}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* BODY + GALLERY */}
      <section className="py-28 md:py-32 border-t border-line">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
            <Reveal>
              <div className="eyebrow text-blue mb-6">{t("pl.dev")}</div>
              <h2 className="max-w-[18ch]" style={{ fontSize: "clamp(30px,4.4vw,58px)" }}>
                {p.headline[lang]}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                {p.body[lang].map((para, i) => (
                  <p key={i} className="text-blue-soft text-base mb-4">
                    {para}
                  </p>
                ))}
                <div className="grid grid-cols-2 gap-x-12 gap-y-1 mt-6">
                  {p.features.map((f, i) => (
                    <div key={i} className="py-4 border-t border-line text-[15px] flex gap-3.5">
                      <span className="text-yellow font-bold">+</span>
                      <span>{f[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 grid grid-cols-3 gap-2 h-[420px] md:h-[580px]">
              {/* Imagen principal */}
              <div className="col-span-2 overflow-hidden rounded-none">
                <img
                  src={p.gallery[0]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              {/* Dos imágenes secundarias */}
              <div className="flex flex-col gap-2">
                {p.gallery.slice(1, 3).map((g, i) => (
                  <div key={i} className="flex-1 overflow-hidden rounded-none">
                    <img
                      src={g}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AMENIDADES */}
      {p.amenities?.length > 0 && (
        <section className="py-28 md:py-32 border-t border-line">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <Reveal>
              <div className="eyebrow text-blue mb-6">Amenidades</div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
                <h2 style={{ fontSize: "clamp(30px,4.4vw,58px)" }} className="max-w-[22ch]">
                  {lang === "es"
                    ? "18 amenidades extra luxury integradas en la naturaleza."
                    : "18 extra-luxury amenities integrated in nature."}
                </h2>
                <p className="text-blue-soft text-[15px] max-w-[42ch] md:text-right">
                  {lang === "es"
                    ? "Cada espacio fue diseñado para darle sentido a cada momento del día, no solo para acumular lujo."
                    : "Each space was designed to give meaning to every moment of the day, not just to accumulate luxury."}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {p.amenities.map((item, i) => (
                  <AmenityCard key={item.id} item={item} lang={lang} index={i} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* UBICACIÓN */}
      {p.location && (
        <section className="py-28 md:py-32 border-t border-line">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <Reveal>
              <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
                {/* Texto */}
                <div>
                  <div className="eyebrow text-blue mb-6">Ubicación</div>
                  <h2 className="max-w-[18ch] mb-6" style={{ fontSize: "clamp(30px,4.4vw,58px)" }}>
                    {p.zone}
                  </h2>
                  <p className="text-blue-soft text-[15px] leading-relaxed mb-4">
                    {p.location.description[lang]}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${p.location.lat},${p.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-blue hover:text-blue-soft transition-colors mt-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    Ver en Google Maps →
                  </a>
                </div>
                {/* Mapa */}
                <div className="w-full h-[420px] rounded-none overflow-hidden shadow-[0_24px_60px_rgba(6,35,77,0.18)]">
                  <PropertyMap
                    lat={p.location.lat}
                    lng={p.location.lng}
                    name={p.name}
                    address={p.location.address}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* AGENDAR CITA */}
      <section className="py-28 md:py-32 border-t border-line bg-paper">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <div className="eyebrow text-blue mb-4">Agendar cita</div>
              <h2 style={{ fontSize: "clamp(26px,4vw,38px)" }}>
                Agenda tu llamada con un asesor
              </h2>
            </div>
          </Reveal>
          <AppointmentForm inlined />
        </div>
      </section>
    </main>
  );
}

function AmenityCard({ item, lang, index }) {
  const accents = ["#3FB0A0", "#344351", "#3FB0A0", "#344351"];
  const accent = accents[index % accents.length];

  return (
    <div className="group flex flex-col overflow-hidden rounded-none border border-line bg-white hover:shadow-[0_12px_40px_rgba(6,35,77,0.12)] transition-shadow duration-300">
      {/* Imagen */}
      <div className="overflow-hidden h-[200px]">
        <img
          src={item.image}
          alt={item.title[lang]}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Cuerpo */}
      <div className="flex flex-col flex-1 p-5">
        {/* Accent top border */}
        <div
          className="w-10 h-[3px] rounded-full mb-4 transition-all duration-300 group-hover:w-16"
          style={{ background: accent }}
        />
        <h3 className="text-ink font-semibold text-[16px] mb-2 leading-snug">
          {item.title[lang]}
        </h3>
        <p className="text-muted text-[13px] leading-relaxed flex-1">
          {item.desc[lang]}
        </p>
      </div>
    </div>
  );
}
