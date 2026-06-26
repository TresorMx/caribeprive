"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

const WHATSAPP = "529981543151";

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" />
  </svg>
);
const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
  </svg>
);

export default function Footer() {
  const { lang, t } = useLang();
  const L = (es, en) => (lang === "en" ? en : es);

  const explore = [
    { href: "/guia-inversionista", label: L("Guía del inversionista", "Investor guide") },
    { href: "/zonas", label: L("Guía de zonas", "Zones guide") },
    { href: "/como-trabajamos", label: L("Cómo trabajamos", "How we work") },
    { href: "/nosotros", label: L("Sobre nosotros", "About us") },
  ];
  const site = [
    { href: "/propiedades", label: L("Propiedades", "Properties") },
    { href: "/#mercado", label: L("Mercado", "Market") },
    { href: "/agendar", label: L("Agendar cita", "Book a call") },
  ];
  const zones = ["Cancún", "Puerto Morelos", "Riviera Maya"];

  return (
    <footer className="relative overflow-hidden bg-ink text-[#9aa4b4]">
      {/* hairline + glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#3FB0A0]/45 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 w-[480px] h-[480px] rounded-full blur-3xl opacity-[0.12]"
        style={{ background: "radial-gradient(circle,#3FB0A0,transparent 70%)" }} />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 pt-16 pb-10">
        {/* Marca + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-12 border-b border-white/10">
          <div className="max-w-[40ch]">
            <img src="/logowhite.svg" alt="Caribe Privé" className="h-7 w-auto opacity-95 mb-6" />
            <p className="font-display text-white/90 leading-[1.15]" style={{ fontSize: "clamp(22px,2.6vw,32px)" }}>
              {t("footer.tagline")}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link href="/agendar"
              className="inline-flex items-center text-[13px] font-semibold tracking-wide rounded-full px-6 py-3 bg-yellow text-ink hover:bg-yellow-bright transition-colors">
              {L("Agendar una llamada", "Book a call")}
            </Link>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] tracking-wide rounded-full px-6 py-3 border border-white/25 text-white/85 hover:border-[#3FB0A0] hover:text-white transition-colors">
              <WaIcon /> WhatsApp
            </a>
          </div>
        </div>

        {/* Columnas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 py-12">
          <div>
            <h4 className="text-white/80 text-[11px] tracking-[0.18em] uppercase font-semibold mb-4">
              {L("Explorar", "Explore")}
            </h4>
            <ul className="flex flex-col gap-2.5 text-[13.5px]">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-yellow transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 text-[11px] tracking-[0.18em] uppercase font-semibold mb-4">
              {L("Sitio", "Site")}
            </h4>
            <ul className="flex flex-col gap-2.5 text-[13.5px]">
              {site.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-yellow transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 text-[11px] tracking-[0.18em] uppercase font-semibold mb-4">
              {L("Dónde operamos", "Where we operate")}
            </h4>
            <ul className="flex flex-col gap-3 text-[13.5px]">
              {zones.map((z) => (
                <li key={z} className="flex items-center gap-2">
                  <span className="text-[#3FB0A0]"><PinIcon /></span> {z}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between flex-wrap gap-3 pt-8 border-t border-white/10 text-[12px] text-[#6b7689]">
          <span>© {new Date().getFullYear()} Caribe Privé · {L("Todos los derechos reservados", "All rights reserved")}</span>
          <span>{L("Real estate advisory · Caribe Mexicano", "Real estate advisory · Mexican Caribbean")}</span>
        </div>
      </div>
    </footer>
  );
}
