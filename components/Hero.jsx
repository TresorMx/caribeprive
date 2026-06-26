"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LanguageProvider";

const openChat = () => window.dispatchEvent(new CustomEvent("ns-open-chat"));

// Asesoras que rotan en el hero cada 3 s
const advisors = [
  { photo: "/anafoto.png", name: "Ana Paula Quiroga" },
  { photo: "/betyfoto.png", name: "Beatriz Ávila" },
];

export default function Hero() {
  const { t } = useLang();

  const [adv, setAdv] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAdv((i) => (i + 1) % advisors.length), 3000);
    return () => clearInterval(id);
  }, []);
  const advisor = advisors[adv];

  return (
    <header
      id="posicionamiento"
      className="relative flex flex-col justify-center overflow-hidden bg-blue-deep min-h-[600px]"
      style={{ minHeight: "100svh" }}
    >
      {/* background image */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="https://cdn.grupodaxi.com/images/mukta-largas/mukta-larga-grupo-daxi-01.webp"
          alt=""
          className="h-full w-full object-cover opacity-[0.45] animate-unblur grayscale"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(35,46,57,.55) 0%,rgba(35,46,57,.15) 35%,rgba(52,67,81,.85) 100%),radial-gradient(120% 80% at 80% 0%,rgba(63,176,160,.18),transparent 55%)",
          }}
        />
      </div>



      {/* scroll cue */}
      <div className="hidden md:flex absolute bottom-48 right-8 z-[3] items-center gap-3 text-white/60 text-[11px] tracking-[0.18em] uppercase [writing-mode:vertical-rl]">
        {t("common.scroll")}
        <span className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </div>

      {/* foto asesora (rota cada 3 s) — crossfade por opacidad, sin remontar (Safari-safe) */}
      <div className="absolute bottom-0 z-[3] hidden md:block" style={{ height: "85%", right: "8%" }}>
        <div className="relative h-full">
          {/* sizer: define el ancho del contenedor */}
          <img src={advisors[0].photo} alt="" aria-hidden className="h-full w-auto object-bottom object-contain opacity-0 pointer-events-none" />
          {advisors.map((a, i) => (
            <img
              key={a.photo}
              src={a.photo}
              alt={a.name}
              className="absolute inset-0 h-full w-full object-bottom object-contain transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === adv ? 1 : 0 }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-[3] flex items-center pt-20">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 flex items-stretch">
          {/* left column */}
          <div className="flex-1 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-7 text-white text-xs tracking-[0.08em] bg-white/10 border border-white/20 glass self-start"
            >
              <span className="w-[7px] h-[7px] rounded-full bg-yellow" />
              {t("hero.tag")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-white max-w-[15ch] mb-6"
              style={{ fontSize: "clamp(42px,7.4vw,104px)" }}
            >
              {t("hero.title_a")} <span className="text-yellow">{t("hero.title_hl")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#dbe3ef] max-w-[46ch] mb-8"
              style={{ fontSize: "clamp(16px,1.5vw,19px)" }}
            >
              {t("hero.sub")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-3.5 flex-wrap items-center"
            >
              <button
                onClick={openChat}
                className="text-[13px] font-semibold tracking-wide rounded-full px-6 py-3 bg-yellow text-ink hover:bg-yellow-bright transition-colors"
              >
                {t("hero.cta1")}
              </button>
              <a
                href="#propiedades"
                className="text-[13px] tracking-wide rounded-full px-6 py-3 border border-white/50 text-white hover:bg-white hover:text-ink transition-colors"
              >
                {t("hero.cta2")}
              </a>
            </motion.div>

            {/* foto mobile — solo visible en móvil (altura fija para evitar saltos al rotar) */}
            <div className="md:hidden mt-8 flex flex-col items-center relative">
              <div className="relative w-64 h-[340px]">
                {advisors.map((a, i) => (
                  <img
                    key={a.photo}
                    src={a.photo}
                    alt={a.name}
                    className="absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-700 ease-in-out"
                    style={{ opacity: i === adv ? 1 : 0 }}
                  />
                ))}
              </div>
              <span
                className="absolute bottom-16 left-1/2 -translate-x-1/2 inline-flex items-center px-6 py-1.5 text-ink text-xs font-semibold tracking-[0.08em] whitespace-nowrap"
                style={{ background: "#3FB0A0", clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
              >
                <motion.span
                  key={advisor.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {advisor.name} | Property Matchmaker
                </motion.span>
              </span>
            </div>
          </div>

          {/* right column: tag alineado al bottom = misma altura que botones */}
          <div className="hidden md:flex items-end pb-[2px]" style={{ width: "40%" }}>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center px-6 py-1.5 text-ink text-xs font-semibold tracking-[0.08em] whitespace-nowrap"
              style={{ background: "#3FB0A0", clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
            >
              <motion.span
                key={advisor.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {advisor.name} | Property Matchmaker
              </motion.span>
            </motion.span>
          </div>
        </div>
      </div>

      {/* Grado de color film sobre todo el hero */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          backdropFilter: "contrast(1.07) saturate(0.9) brightness(1.02)",
          WebkitBackdropFilter: "contrast(1.07) saturate(0.9) brightness(1.02)",
        }}
      />
      {/* Grano / textura film sobre todo el hero */}
      <div className="absolute inset-0 z-[6] pointer-events-none mix-blend-overlay opacity-[0.28]">
        <svg className="w-full h-full">
          <filter id="heroGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroGrain)" />
        </svg>
      </div>
    </header>
  );
}
