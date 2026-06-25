"use client";

import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import {
  PageHero, Section, SectionHead, FeatureCard, CTABand, ImageBand, Icons,
} from "@/components/content/ui";

export default function HowWeWork() {
  const { lang } = useLang();
  const L = (o) => o[lang];

  const cycle = [
    { icon: <Icons.key />,     t: { es: "Comprar", en: "Buy" },       d: { es: "Te ayudamos a elegir bien: solo desarrollos que pasan filtros de ubicación, precio y absorción. Sin presión y con la verdad por delante.", en: "We help you choose well: only developments that pass location, price and absorption filters. No pressure, the truth up front." } },
    { icon: <Icons.home />,    t: { es: "Rentar", en: "Rent" },       d: { es: "Estructuramos la renta —vacacional o de largo plazo— y calculamos el rendimiento neto real, no el bruto de folleto.", en: "We structure the rental —vacation or long-term— and model the real net yield, not the brochure gross." } },
    { icon: <Icons.refresh />, t: { es: "Administrar", en: "Manage" }, d: { es: "Cuidamos la propiedad y su operación: mantenimiento, ocupación y seguimiento de rendimiento, con reportes claros.", en: "We look after the property and its operation: maintenance, occupancy and performance tracking, with clear reports." } },
    { icon: <Icons.handshake />, t: { es: "Vender", en: "Sell" },     d: { es: "Cuando llega el momento, diseñamos la estrategia de salida y comercializamos con representación exclusiva.", en: "When the moment comes, we design the exit strategy and market it under exclusive representation." } },
  ];

  const fronts = [
    { t: { es: "Advisory y comercialización", en: "Advisory & sales" }, d: { es: "Representamos desarrollos seleccionados que cumplen criterios de ubicación, estructura comercial, absorción y potencial operativo.", en: "We represent selected developments that meet criteria of location, commercial structure, absorption and operating potential." } },
    { t: { es: "Venta estratégica", en: "Strategic sale" }, d: { es: "Trabajamos propiedades seleccionadas bajo esquemas de representación exclusiva.", en: "We work selected properties under exclusive representation." } },
    { t: { es: "Operación y administración", en: "Operations & management" }, d: { es: "Administramos propiedades residenciales y vacacionales para propietarios que buscan estructura y seguimiento continuo.", en: "We manage residential and vacation properties for owners seeking structure and continuous follow-up." } },
  ];

  return (
    <>
      <PageHero
        image="/articulos/F.jpg"
        eyebrow={L({ es: "Cómo trabajamos", en: "How we work" })}
        title={L({ es: "La compra es solo el inicio de la relación.", en: "The purchase is only the start of the relationship." })}
        sub={L({
          es: "La mayoría de las inmobiliarias desaparecen al firmar. Nosotros nos quedamos durante toda la vida de tu propiedad: comprarla, rentarla, cuidarla y, si lo decides, venderla. Una sola contraparte, con contexto acumulado.",
          en: "Most agencies vanish at signing. We stay for the whole life of your property: buying it, renting it, caring for it and, if you decide to, selling it. A single counterpart, with accumulated context.",
        })}
      />

      {/* El ciclo */}
      <Section className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "El ciclo completo", en: "The full cycle" })}
          title={L({ es: "Cuatro etapas, una misma relación.", en: "Four stages, one relationship." })}
          intro={L({
            es: "Comprar, rentar, administrar y vender no son trámites sueltos: son partes de la misma historia. Acompañarte en todas evita que pierdas contexto, tiempo y dinero al cambiar de contraparte en cada etapa.",
            en: "Buying, renting, managing and selling aren't separate errands: they're parts of the same story. Walking with you through all of them keeps you from losing context, time and money switching counterparts at every stage.",
          })}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {cycle.map((c, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <FeatureCard icon={c.icon} title={L(c.t)} body={L(c.d)} />
            </Reveal>
          ))}
        </div>
      </Section>

      <ImageBand
        image="/articulos/H.jpg"
        alt={L({ es: "Riviera Maya desde el aire", en: "Riviera Maya from above" })}
        kicker={L({ es: "De principio a fin", en: "Start to finish" })}
        title={L({
          es: "Del primer recorrido a la estrategia de salida, contigo en todo el ciclo.",
          en: "From the first tour to the exit strategy, with you through the whole cycle.",
        })}
        ctaLabel={L({ es: "Hablar con un asesor", en: "Talk to an advisor" })}
        ctaHref="/agendar"
      />

      {/* Los compromisos */}
      <Section tone="white" className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "Los dos compromisos", en: "The two commitments" })}
          title={L({ es: "Claridad para tomar mejores decisiones.", en: "Clarity to make better decisions." })}
        />
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <Reveal>
            <div className="rounded-2xl border border-[#3FB0A0]/40 bg-[#3FB0A0]/[0.06] p-7 h-full">
              <div className="text-[#3FB0A0] mb-4"><Icons.eye /></div>
              <h3 className="text-ink text-[21px] font-medium mb-3">{L({ es: "Claridad radical", en: "Radical clarity" })}</h3>
              <p className="text-muted text-[15px] leading-relaxed mb-4">
                {L({ es: "Si un desarrollo no tiene fundamentos sólidos, lo decimos. Si una unidad está fuera de precio, lo decimos. Si no es el momento de comprar, también lo decimos.", en: "If a development lacks solid fundamentals, we say so. If a unit is overpriced, we say so. If it's not the time to buy, we say that too." })}
              </p>
              <p className="italic text-ink text-[16px] border-l-[3px] border-[#3FB0A0] pl-4">
                {L({ es: "“Preferimos perder una operación que recomendar una mala decisión.”", en: "“We'd rather lose a deal than recommend a bad decision.”" })}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-paper p-7 h-full">
              <div className="text-[#3FB0A0] mb-4"><Icons.clock /></div>
              <h3 className="text-ink text-[21px] font-medium mb-3">{L({ es: "La relación no termina en el cierre", en: "The relationship doesn't end at closing" })}</h3>
              <p className="text-muted text-[15px] leading-relaxed">
                {L({ es: "El propietario que compra hoy puede necesitar administración, renta, seguimiento de rendimiento o una estrategia de salida años después. Todo bajo una misma relación, con contexto acumulado.", en: "The owner who buys today may need management, rental, performance tracking or an exit strategy years later — all under one relationship, with accumulated context." })}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Los frentes */}
      <Section className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "Nuestros frentes", en: "Our fronts" })}
          title={L({ es: "Una sola contraparte durante todo el ciclo.", en: "A single counterpart across the whole life of the property." })}
        />
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {fronts.map((f, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <FeatureCard icon={<Icons.compass />} title={L(f.t)} body={L(f.d)} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand
        title={L({ es: "Hablemos de tu propiedad, en la etapa que estés.", en: "Let's talk about your property, whatever stage you're in." })}
        sub={L({ es: "Comprar, rentar, administrar o vender. Una contraparte de largo plazo para todo el ciclo.", en: "Buy, rent, manage or sell. A long-term counterpart for the whole cycle." })}
        primary={L({ es: "Agendar una llamada", en: "Book a call" })}
        secondary={L({ es: "Preguntar al asesor", en: "Ask the advisor" })}
      />
    </>
  );
}
