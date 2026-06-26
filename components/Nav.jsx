"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

export default function Nav({ dark = false }) {
  const { lang, toggle, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (dark) return; // en páginas dark no necesitamos detectar scroll
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [dark]);

  const solid = dark || scrolled;

  const links = [
    { href: "/#posicionamiento", label: t("nav.approach") },
    { href: "/#como-trabajamos", label: t("nav.how") },
    { href: "/propiedades", label: t("nav.properties") },
    { href: "/#mercado", label: t("nav.market") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 transition-all duration-300 ${
        solid ? "bg-paper/60 glass" : "bg-transparent"
      }`}
    >
      <Link href="/" className="flex items-center">
        <img
          src={solid ? "/logocolor.svg" : "/logowhite.svg"}
          alt="Caribe Privé"
          className="h-6 md:h-7 w-auto"
        />
      </Link>

      <div
        className={`hidden md:flex gap-8 text-[13px] tracking-wide transition-colors ${
          solid ? "text-blue" : "text-white/75"
        }`}
      >
        {links.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-yellow transition-colors">
            {l.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className={`text-xs tracking-wider rounded-full px-3 py-1.5 border transition-colors ${
            solid ? "border-blue text-blue" : "border-white/40 text-white/70"
          }`}
        >
          <span className={lang === "es" ? "font-semibold" : "opacity-60"}>ES</span>
          <span className="opacity-50"> / </span>
          <span className={lang === "en" ? "font-semibold" : "opacity-60"}>EN</span>
        </button>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("ns-open-chat"))}
          className="hidden sm:inline-block text-[13px] font-semibold tracking-wide rounded-full px-5 py-2.5 bg-yellow text-ink hover:bg-yellow-bright transition-colors"
        >
          {t("nav.cta")}
        </button>
      </div>
    </nav>
  );
}
