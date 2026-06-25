"use client";

import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import {
  PageHero, Section, SectionHead, FeatureCard, CTABand, Icons,
} from "@/components/content/ui";

const TEAM = [
  {
    photo: "/anafoto.png",
    name: "Ana Paula Quiroga",
    role: { es: "Property Matchmaker", en: "Property Matchmaker" },
    bio: {
      es: "Acompaña al comprador desde la primera pregunta hasta las llaves: entiende su objetivo real y solo pone sobre la mesa lo que tiene sentido para él. En español o inglés, sin presión.",
      en: "Walks the buyer from the first question to the keys: she understands their real goal and only puts on the table what makes sense for them. In Spanish or English, no pressure.",
    },
  },
  {
    photo: "/betyfoto.png",
    name: "Beatriz Ávila",
    role: { es: "Property Matchmaker", en: "Property Matchmaker" },
    bio: {
      es: "Conecta a cada cliente con la propiedad y la estrategia correctas, y se queda para la renta, la administración y la salida. Criterio claro y números reales, siempre del mismo lado.",
      en: "Connects each client with the right property and strategy, and stays for the rental, management and exit. Clear judgment and real numbers, always on the same side.",
    },
  },
];

export default function AboutUs() {
  const { lang } = useLang();
  const L = (o) => o[lang];

  return (
    <>
      <PageHero
        image="https://cdn.grupodaxi.com/images/web-puerto369/generales/puerto369-grupo-daxi-28.webp"
        eyebrow={L({ es: "Sobre nosotros", en: "About us" })}
        title={L({ es: "Asesoría inmobiliaria que no desaparece al firmar.", en: "Real estate advisory that doesn't vanish at signing." })}
        sub={L({
          es: "Caribe Privé nace de una idea simple: en bienes raíces casi nadie te dice toda la verdad. Nosotros sí, y nos quedamos para todo el ciclo de tu propiedad en el Caribe Mexicano.",
          en: "Caribe Privé was born from a simple idea: in real estate, almost no one tells you the whole truth. We do, and we stay for the entire life of your property in the Mexican Caribbean.",
        })}
      />

      {/* Enfoque */}
      <Section className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "Nuestro enfoque", en: "Our approach" })}
          title={L({ es: "Una contraparte, no un vendedor.", en: "A counterpart, not a salesperson." })}
          intro={L({
            es: "No trabajamos un catálogo infinito ni cerramos a toda costa. Seleccionamos desarrollos que cumplen criterios reales, decimos la verdad aunque cueste la operación y acompañamos al propietario años después de la compra.",
            en: "We don't push an endless catalog or close at all costs. We select developments that meet real criteria, tell the truth even when it costs the deal, and stay with the owner years after the purchase.",
          })}
        />
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <FeatureCard accent icon={<Icons.eye />}
            title={L({ es: "Claridad radical", en: "Radical clarity" })}
            body={L({ es: "Si no es buen momento o está fuera de precio, lo decimos. Criterio, no humo.", en: "If it's not the right time or it's overpriced, we say so. Judgment, not hype." })} />
          <FeatureCard icon={<Icons.clock />}
            title={L({ es: "Largo plazo", en: "Long term" })}
            body={L({ es: "Comprar, rentar, administrar y vender bajo una misma relación con contexto acumulado.", en: "Buy, rent, manage and sell under one relationship with accumulated context." })} />
          <FeatureCard icon={<Icons.chart />}
            title={L({ es: "Decisiones con datos", en: "Data-driven decisions" })}
            body={L({ es: "Trabajamos con rendimiento neto real y datos de mercado, no con promesas de folleto.", en: "We work with real net yield and market data, not brochure promises." })} />
        </div>
      </Section>

      {/* Equipo */}
      <Section tone="white" className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "El equipo", en: "The team" })}
          title={L({ es: "Quién te acompaña.", en: "Who walks with you." })}
        />
        <div className="grid sm:grid-cols-2 gap-6 mt-10 max-w-[760px]">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <article className="rounded-2xl border border-line bg-paper overflow-hidden flex flex-col h-full">
                <div className="relative h-[280px] bg-blue-deep overflow-hidden">
                  <div className="absolute inset-0" style={{ background: "radial-gradient(120% 100% at 50% 0%, #344351, #232e39)" }} />
                  <img src={m.photo} alt={m.name} className="relative h-full w-full object-contain object-bottom" />
                </div>
                <div className="p-6">
                  <h3 className="text-ink text-[20px] font-medium">{m.name}</h3>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2f8f82] bg-[#3FB0A0]/10 rounded-full px-3 py-1 mt-2 mb-3">
                    {L(m.role)}
                  </div>
                  <p className="text-muted text-[14.5px] leading-relaxed">{L(m.bio)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Zonas */}
      <Section className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "Dónde operamos", en: "Where we operate" })}
          title={L({ es: "El corredor del Caribe Mexicano.", en: "The Mexican Caribbean corridor." })}
          intro={L({
            es: "Cancún, Puerto Morelos y la Riviera Maya (Playa del Carmen y Tulum): las zonas con mayor proyección de plusvalía y renta del país.",
            en: "Cancún, Puerto Morelos and the Riviera Maya (Playa del Carmen and Tulum): the areas with the highest appreciation and rental projection in the country.",
          })}
        />
        <div className="flex flex-wrap gap-3 mt-8">
          {["Cancún", "Puerto Morelos", "Playa del Carmen", "Tulum", "Riviera Maya"].map((z) => (
            <span key={z} className="inline-flex items-center gap-2 text-[14px] text-ink border border-line bg-white rounded-full px-5 py-2.5">
              <span className="text-[#3FB0A0]"><Icons.pin /></span> {z}
            </span>
          ))}
        </div>
      </Section>

      <CTABand
        title={L({ es: "Hablemos. Sin presión, con la verdad por delante.", en: "Let's talk. No pressure, the truth up front." })}
        sub={L({ es: "Agenda una llamada o pregúntale a nuestro asesor, en español o inglés, 24/7.", en: "Book a call or ask our advisor, in Spanish or English, 24/7." })}
        primary={L({ es: "Agendar una llamada", en: "Book a call" })}
        secondary={L({ es: "Preguntar al asesor", en: "Ask the advisor" })}
      />
    </>
  );
}
