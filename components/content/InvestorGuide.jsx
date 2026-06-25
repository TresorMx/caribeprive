"use client";

import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import {
  PageHero, Section, SectionHead, StatCard, FeatureCard,
  FaqList, Note, CTABand, ImageBand, Icons,
} from "@/components/content/ui";

export default function InvestorGuide() {
  const { lang } = useLang();
  const L = (o) => o[lang];

  const steps = [
    {
      t: { es: "1 · Definición y selección", en: "1 · Define & select" },
      d: { es: "Aclaramos tu objetivo —vivir, rentar o invertir— y filtramos solo los desarrollos que cumplen criterios de ubicación, precio y absorción.", en: "We clarify your goal —live, rent or invest— and filter only the developments that meet location, price and absorption criteria." },
    },
    {
      t: { es: "2 · Oferta y apartado", en: "2 · Offer & reservation" },
      d: { es: "Se firma una carta de intención y un apartado que congela el precio y la unidad mientras se revisan los documentos.", en: "You sign a letter of intent and a reservation that locks the price and the unit while documents are reviewed." },
    },
    {
      t: { es: "3 · Notario y due diligence", en: "3 · Notary & due diligence" },
      d: { es: "Un Notario Público (abogado del Estado) revisa títulos, libertad de gravamen y permisos. Es quien da fe legal de la operación.", en: "A Notario Público (state-appointed attorney) reviews titles, liens and permits. They give the deal its legal validity." },
    },
    {
      t: { es: "4 · Fideicomiso bancario", en: "4 · Bank trust" },
      d: { es: "En la zona costera, el extranjero compra a través de un fideicomiso: un banco mexicano tiene el título y tú eres el beneficiario con todos los derechos.", en: "On the coast, foreigners buy through a fideicomiso: a Mexican bank holds title and you are the beneficiary with full rights." },
    },
    {
      t: { es: "5 · Escrituración", en: "5 · Closing / deed" },
      d: { es: "Se firma la escritura ante notario, se liquida el saldo y se pagan los gastos de cierre e impuestos de adquisición.", en: "The deed is signed before the notary, the balance is settled and closing costs and acquisition tax are paid." },
    },
    {
      t: { es: "6 · Registro y entrega", en: "6 · Registry & handover" },
      d: { es: "La propiedad se inscribe en el Registro Público a tu nombre (vía fideicomiso) y recibes llaves o tu plan de pagos de preventa.", en: "The property is registered in the Public Registry under your name (via the trust) and you get keys or your pre-sale payment plan." },
    },
  ];

  const faqs = [
    {
      q: { es: "¿Un extranjero puede ser dueño de una propiedad en el Caribe Mexicano?", en: "Can a foreigner own property in the Mexican Caribbean?" },
      a: { es: "Sí. La Constitución restringe la propiedad directa de extranjeros dentro de los 50 km de la costa, pero la solución legal y cotidiana es el fideicomiso bancario: tienes el uso, la renta, la venta y la herencia de la propiedad, exactamente como un dueño mexicano.", en: "Yes. The Constitution restricts direct foreign ownership within 50 km of the coast, but the standard legal solution is the bank trust (fideicomiso): you hold the right to use, rent, sell and bequeath the property, exactly like a Mexican owner." },
    },
    {
      q: { es: "¿Qué es exactamente el fideicomiso?", en: "What exactly is the fideicomiso?" },
      a: { es: "Es un contrato por el que un banco mexicano autorizado mantiene el título legal y tú eres el beneficiario. Se constituye por 50 años, es renovable, transferible y heredable. No es una renta ni un alquiler: tú decides todo sobre la propiedad.", en: "It's a contract where an authorized Mexican bank holds legal title and you are the beneficiary. It runs for 50 years, is renewable, transferable and inheritable. It is not a lease: you decide everything about the property." },
    },
    {
      q: { es: "¿Cuánto cuesta cerrar, además del precio?", en: "What does closing cost beyond the price?" },
      a: { es: "Como referencia general, los gastos de cierre suelen rondar el 5–8% del valor: impuesto de adquisición (ISAI, ~3% en Quintana Roo), honorarios de notario, registro y la constitución del fideicomiso, más una cuota bancaria anual. El monto exacto lo confirma el notario para tu operación.", en: "As a general reference, closing costs usually run 5–8% of the price: acquisition tax (ISAI, ~3% in Quintana Roo), notary fees, registry and the setup of the trust, plus an annual bank fee. The exact figure is confirmed by the notary for your transaction." },
    },
    {
      q: { es: "¿Conviene preventa o entrega inmediata?", en: "Pre-sale or move-in ready?" },
      a: { es: "La preventa suele ofrecer mejor precio y mayor plusvalía durante la construcción, con planes de pago; a cambio asumes el tiempo de obra. La entrega inmediata da certeza y renta desde el día uno. Lo importante en preventa: verificar permisos, fideicomiso y la trayectoria del desarrollador.", en: "Pre-sale usually offers a better price and more appreciation during construction, with payment plans; in exchange you take on the build time. Move-in ready gives certainty and rental income from day one. The key in pre-sale: verify permits, the trust and the developer's track record." },
    },
    {
      q: { es: "¿Puedo rentar mi propiedad como inversión?", en: "Can I rent my property as an investment?" },
      a: { es: "Sí, tanto a largo plazo como vacacional. Ten en cuenta dos cosas reales: necesitas registro fiscal (RFC) para facturar y la administración de renta vacacional suele llevarse entre 20% y 30% del ingreso bruto. Por eso calculamos siempre el rendimiento neto, no el bruto.", en: "Yes, both long-term and vacation rentals. Keep two real things in mind: you need a tax ID (RFC) to invoice, and vacation-rental management typically takes 20%–30% of gross income. That's why we always model net yield, not gross." },
    },
    {
      q: { es: "¿Necesito estar en México para comprar?", en: "Do I need to be in Mexico to buy?" },
      a: { es: "No necesariamente. Gran parte del proceso se hace a distancia y la firma puede realizarse mediante un poder notarial. Te acompañamos en cada paso, en español o inglés.", en: "Not necessarily. Much of the process is done remotely and signing can be handled through a power of attorney. We guide you through every step, in Spanish or English." },
    },
  ];

  return (
    <>
      <PageHero
        image="/articulos/A.jpg"
        eyebrow={L({ es: "Guía del inversionista", en: "Investor guide" })}
        title={L({ es: "Comprar en el Caribe Mexicano, sin letras chiquitas.", en: "Buying in the Mexican Caribbean, no fine print." })}
        sub={L({
          es: "Todo lo que un comprador —nacional o extranjero— necesita entender antes de invertir: cómo se compra de forma legal y segura, cuánto cuesta de verdad y qué rendimiento es realista.",
          en: "Everything a buyer —local or foreign— needs to understand before investing: how to buy legally and safely, what it really costs, and what return is realistic.",
        })}
      />

      {/* Sí puedes ser dueño */}
      <Section className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "Lo primero", en: "First things first" })}
          title={L({ es: "Sí, puedes ser dueño. Y es más simple de lo que crees.", en: "Yes, you can own it. And it's simpler than you think." })}
          intro={L({
            es: "La pregunta número uno del comprador extranjero es si realmente puede ser propietario en la playa. La respuesta es sí: a través de una figura legal, segura y usada por miles de personas cada año, el fideicomiso bancario.",
            en: "The number-one question from foreign buyers is whether they can truly own beachfront property. The answer is yes: through a legal, safe figure used by thousands every year, the bank trust.",
          })}
        />
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <FeatureCard accent icon={<Icons.shield />}
            title={L({ es: "Propiedad protegida", en: "Protected ownership" })}
            body={L({ es: "El fideicomiso te da el uso, la renta, la venta y la herencia. Mismos derechos que un dueño mexicano.", en: "The trust grants you use, rental, sale and inheritance. The same rights as a Mexican owner." })} />
          <FeatureCard icon={<Icons.doc />}
            title={L({ es: "Validez ante notario", en: "Notarized validity" })}
            body={L({ es: "Un Notario Público da fe legal de cada operación y revisa que el título esté limpio.", en: "A Notario Público legally validates every transaction and checks the title is clean." })} />
          <FeatureCard icon={<Icons.key />}
            title={L({ es: "50 años renovables", en: "50 renewable years" })}
            body={L({ es: "El fideicomiso se constituye por 50 años, se renueva y se transfiere sin perder tus derechos.", en: "The trust runs for 50 years, renews and transfers without losing your rights." })} />
        </div>
      </Section>

      {/* Proceso paso a paso */}
      <Section tone="white" className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "El proceso", en: "The process" })}
          title={L({ es: "De la primera visita a las llaves, en 6 pasos.", en: "From first visit to keys, in 6 steps." })}
        />
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mt-10">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-blue text-white flex items-center justify-center font-display text-[18px]">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-ink text-[17px] font-medium mb-1.5">{L(s.t).replace(/^\d+ · /, "")}</h3>
                  <p className="text-muted text-[14.5px] leading-relaxed">{L(s.d)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Costos */}
      <Section className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "Los números reales", en: "The real numbers" })}
          title={L({ es: "Cuánto cuesta de verdad cerrar.", en: "What closing really costs." })}
          intro={L({
            es: "Más allá del precio de la propiedad, conviene presupuestar los gastos de cierre. Estos son los rangos de referencia para Quintana Roo; el monto exacto lo confirma siempre el notario.",
            en: "Beyond the property price, you should budget for closing costs. These are reference ranges for Quintana Roo; the exact amount is always confirmed by the notary.",
          })}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          <StatCard value="5–8%" label={L({ es: "Gastos de cierre", en: "Closing costs" })} sub={L({ es: "Sobre el valor de la propiedad", en: "Of the property value" })} />
          <StatCard value="~3%" label={L({ es: "Impuesto de adquisición", en: "Acquisition tax" })} sub={L({ es: "ISAI en Quintana Roo", en: "ISAI in Quintana Roo" })} />
          <StatCard value="50 años" label={L({ es: "Vigencia del fideicomiso", en: "Trust term" })} sub={L({ es: "Renovable y transferible", en: "Renewable & transferable" })} />
          <StatCard value="20–30%" label={L({ es: "Costo de administrar renta", en: "Rental management cost" })} sub={L({ es: "Sobre el ingreso bruto vacacional", en: "Of gross vacation income" })} />
        </div>
        <div className="mt-8">
          <Note>
            {L({
              es: "Esta guía es información general orientativa, no asesoría legal ni fiscal. Cada operación se confirma con tu notario y contador. En Caribe Privé te conectamos con ellos y revisamos los números contigo, sin presión.",
              en: "This guide is general orientation, not legal or tax advice. Every transaction is confirmed with your notary and accountant. At Caribe Privé we connect you with them and review the numbers with you, no pressure.",
            })}
          </Note>
        </div>
      </Section>

      <ImageBand
        image="/articulos/C.jpg"
        alt={L({ es: "Costa del Caribe Mexicano", en: "Mexican Caribbean coast" })}
        kicker={L({ es: "El activo del Caribe", en: "The Caribbean asset" })}
        title={L({
          es: "Arena blanca y agua turquesa que sostienen la plusvalía.",
          en: "White sand and turquoise water that sustain appreciation.",
        })}
        ctaLabel={L({ es: "Agendar una llamada", en: "Book a call" })}
        ctaHref="/agendar"
      />

      {/* FAQ */}
      <Section tone="white" className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "Preguntas frecuentes", en: "Frequently asked" })}
          title={L({ es: "Las dudas que todos tienen.", en: "The questions everyone has." })}
        />
        <div className="mt-10">
          <FaqList items={faqs.map((f) => ({ q: L(f.q), a: L(f.a) }))} />
        </div>
      </Section>

      <CTABand
        title={L({ es: "¿Listo para ver los números de tu caso?", en: "Ready to see the numbers for your case?" })}
        sub={L({ es: "Agenda una llamada y te explicamos el proceso completo aplicado a tu objetivo y presupuesto.", en: "Book a call and we'll walk you through the full process applied to your goal and budget." })}
        primary={L({ es: "Agendar una llamada", en: "Book a call" })}
        secondary={L({ es: "Preguntar al asesor", en: "Ask the advisor" })}
      />
    </>
  );
}
