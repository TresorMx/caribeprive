"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { VISIT, formatDateEs } from "@/lib/muktaVisit";
import { MuktaFooter } from "@/components/mukta/MuktaLanding";

const WHATSAPP = "529981543151";

function to24(time) {
  const [hm, ampm] = time.split(" ");
  let [h, m] = hm.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

// Google Calendar en hora local de Cancún (ctz), sin conversiones a UTC
function gcalUrl({ date, time }) {
  const start = to24(time);
  const end = Math.min(start + VISIT.durationMin, 23 * 60 + 59);
  const ymd = date.replace(/-/g, "");
  const hhmm = (mins) => `${String(Math.floor(mins / 60)).padStart(2, "0")}${String(mins % 60).padStart(2, "0")}00`;
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: "Visita al cenote — Mukta Residencial",
    dates: `${ymd}T${hhmm(start)}/${ymd}T${hhmm(end)}`,
    ctz: "America/Cancun",
    details: "Lleva traje de baño, toalla, tu hielera y protector biodegradable. Te enviamos la ubicación exacta por WhatsApp.",
    location: VISIT.place,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

export default function MuktaThanks() {
  const [visit, setVisit] = useState(null);

  useEffect(() => {
    try {
      const v = JSON.parse(sessionStorage.getItem("mukta-visit") || "null");
      if (v?.date && v?.time) setVisit(v);
    } catch { /* sin datos: texto genérico */ }
  }, []);

  const first = visit?.name?.split(" ")[0];
  const fecha = visit ? formatDateEs(visit.date) : "";
  const waText = visit
    ? `Hola, soy ${visit.name}. Me registré para visitar el cenote de Mukta el ${fecha} a las ${visit.time}, somos ${visit.people} personas.`
    : "Hola, me registré para visitar el cenote de Mukta Residencial.";

  return (
    <main className="bg-paper text-ink min-h-screen flex flex-col">
      <section className="relative overflow-hidden bg-blue-deep">
        <img src="/mukta/cenote.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(12,22,38,.6),rgba(12,22,38,.85))" }} />
        <div className="relative z-10 max-w-[720px] mx-auto px-6 pt-6">
          <img src="/logowhite.svg" alt="Caribe Privé" className="h-6 w-auto" />
        </div>
        <div className="relative z-10 max-w-[720px] mx-auto px-6 pt-14 pb-20 text-center">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-[#3FB0A0] to-[#2f8f82] shadow-[0_10px_28px_rgba(63,176,160,0.45)]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h1 className="text-white mt-6" style={{ fontSize: "clamp(34px,5vw,56px)" }}>
            {first ? `¡Listo, ${first}!` : "¡Recibimos tu registro!"}
          </h1>
          <p className="text-[#dbe3ef] mt-4 text-[16px] leading-relaxed">
            {visit
              ? <>Tu visita está solicitada para el <strong className="text-white">{fecha}</strong> a las <strong className="text-white">{visit.time}</strong> ({visit.people} {visit.people === 1 ? "persona" : "personas"}).</>
              : "Tu solicitud para visitar el cenote quedó registrada."}
          </p>
        </div>
      </section>

      <section className="max-w-[720px] w-full mx-auto px-6 -mt-10 relative z-10 pb-20 flex-1">
        <div className="rounded-[24px] bg-white border border-line shadow-[0_24px_60px_rgba(12,22,38,0.12)] p-6 md:p-8">
          <h2 className="text-[22px] mb-5">Lo que sigue</h2>
          <ol className="flex flex-col gap-4">
            {[
              ["Te escribimos por WhatsApp", "Un asesor de Caribe Privé confirma tu día y horario."],
              ["Te enviamos la ubicación", "Recibes la ubicación exacta de Mukta Residencial en Puerto Morelos."],
              ["Ven a nadar", "Trae traje de baño, toalla, tu hielera y protector biodegradable."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-blue text-white flex items-center justify-center font-display text-[16px]">{i + 1}</span>
                <div>
                  <p className="font-medium text-[15px]">{t}</p>
                  <p className="text-muted text-[14px]">{d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-3 mt-8">
            {visit && (
              <a href={gcalUrl(visit)} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full py-3 border border-ink/15 text-[13.5px] hover:bg-ink hover:text-paper transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                Agregar a Google Calendar
              </a>
            )}
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full py-3.5 bg-[#25D366] text-white text-[13.5px] font-semibold hover:opacity-90 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" /></svg>
              Escríbenos por WhatsApp
            </a>
            <Link href="/propiedades/mukta-residencial" className="text-center text-[13px] text-muted hover:text-ink transition-colors pt-1">
              Mientras tanto, conoce Mukta Residencial →
            </Link>
          </div>
        </div>
      </section>

      <MuktaFooter />
    </main>
  );
}
