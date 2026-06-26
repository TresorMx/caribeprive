"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import ChatScheduler from "@/components/ChatScheduler";

const ANA_WHATSAPP = "529981543151";

function buildWaUrl({ name, date, time }, es) {
  const fecha = date.toLocaleDateString(es ? "es-MX" : "en-US", { weekday: "long", day: "numeric", month: "long" });
  const msg = es
    ? `Hola, soy ${name}. Acabo de agendar una cita para el ${fecha} a las ${time}. Me gustaría confirmarla.`
    : `Hi, I'm ${name}. I just booked an appointment for ${fecha} at ${time}. I'd like to confirm it.`;
  return `https://wa.me/${ANA_WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function buildGcalUrl(date, time, name) {
  const [hm, ampm] = time.split(" ");
  let [h, m] = hm.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  const start = new Date(date); start.setHours(h, m, 0, 0);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (d) => d.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  const text = encodeURIComponent("Cita con Ana Quiroga – Caribe Privé");
  const details = encodeURIComponent(`Asesoría inmobiliaria con Ana Quiroga, Caribe Privé.${name ? ` (${name})` : ""}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=${encodeURIComponent("Cancún, México")}`;
}

export default function Chat({ propertyName = null }) {
  const { lang, t } = useLang();
  const es = lang === "es";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const [lead, setLead] = useState(null);            // { name, phone, email }
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [booking, setBooking] = useState(false);     // mini-agenda abierta
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [booked, setBooked] = useState(null);        // { date, time }
  const [offerBooking, setOfferBooking] = useState(false); // el bot pidió ofrecer cita

  const bodyRef = useRef(null);

  useEffect(() => {
    setMessages((m) =>
      m.length === 0 ? [{ role: "assistant", content: t("chat.greeting") }] : m
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("ns-open-chat", handler);
    return () => window.removeEventListener("ns-open-chat", handler);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading, lead, booking, booked]);

  const quickReplies = [
    { es: "Propiedades en Cancún",          en: "Properties in Cancún" },
    { es: "Propiedades en Puerto Morelos",  en: "Properties in Puerto Morelos" },
    { es: "Propiedades en Riviera Maya",    en: "Properties in Riviera Maya" },
    { es: "Quiero agendar una cita / Zoom", en: "I'd like to schedule a Zoom call" },
  ];

  const sendText = async (text) => {
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          messages: next.filter((m) => m.role === "user" || m.role === "assistant"),
        }),
      });
      const data = await res.json();
      if (data.offer) setOfferBooking(true);
      setMessages([...next, { role: "assistant", content: data.reply || t("chat.error") }]);
    } catch {
      setMessages([...next, { role: "assistant", content: t("chat.error") }]);
    } finally {
      setLoading(false);
    }
  };

  const send = () => sendText(input.trim());

  const captureLead = async ({ name, phone, email }) => {
    setLeadSubmitting(true);
    try {
      const context = messages.slice(-6)
        .map((m) => `${m.role === "user" ? "Cliente" : "Ana"}: ${m.content}`)
        .join("\n");
      await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, context }),
      });
    } catch { /* no bloquear */ }
    setLead({ name, phone, email });
    setLeadSubmitting(false);
    const first = name.split(" ")[0];
    setMessages((m) => [...m, {
      role: "assistant",
      content: es
        ? `¡Gracias, ${first}! Elige el día y la hora aquí abajo 👇`
        : `Thanks, ${first}! Pick a day and time below 👇`,
    }]);
    setBooking(true); // abre la agenda de inmediato (flujo continuo)
  };

  const confirmBooking = async (date, time) => {
    setBookingSubmitting(true);
    try {
      const context = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-12)
        .map((m) => `${m.role === "user" ? "Cliente" : "Ana"}: ${m.content}`)
        .join("\n");
      const res = await fetch("/api/submit-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name, whatsapp: lead.phone, email: lead.email || "",
          propertyTypes: [], destinations: [], budget: "",
          date: date.toISOString(), time, context,
        }),
      });
      const data = await res.json().catch(() => ({}));
      const ok = !!data.appointmentId;
      setBooked({ date, time });
      setBooking(false);
      const fecha = date.toLocaleDateString(es ? "es-MX" : "en-US", { weekday: "long", day: "numeric", month: "long" });
      setMessages((m) => [...m, {
        role: "assistant",
        content: ok
          ? (es
              ? `¡Listo! Tu cita quedó para el ${fecha} a las ${time}. Te confirmamos por WhatsApp. 🎉`
              : `Done! Your appointment is set for ${fecha} at ${time}. We'll confirm via WhatsApp. 🎉`)
          : (es
              ? `Recibí tu solicitud para el ${fecha} a las ${time}. Te confirmamos el horario por WhatsApp.`
              : `Got your request for ${fecha} at ${time}. We'll confirm the time via WhatsApp.`),
      }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: t("chat.error") }]);
    } finally {
      setBookingSubmitting(false);
    }
  };

  const userMsgCount = messages.filter((m) => m.role === "user").length;
  // El formulario aparece cuando el bot lo señala ([[BOOK]]); o como respaldo tras varias respuestas.
  const showLeadForm = (offerBooking || userMsgCount >= 5) && !lead && !loading && !booking && !booked;
  const showBookChip = lead && !booking && !booked;

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {open && (
        <div className="absolute bottom-16 right-0 w-[340px] max-w-[calc(100vw-3rem)] bg-paper border border-line rounded-2xl shadow-[0_24px_60px_rgba(12,22,38,0.25)] overflow-hidden">
          <div className="bg-blue text-white px-5 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/anachat.png" alt="Ana" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-[15px]">Ana Paula Quiroga</div>
                <div className="text-[11px] text-green-300 tracking-wide flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-xl leading-none">×</button>
          </div>

          <div ref={bodyRef} className="chat-scroll p-4 flex flex-col gap-3 max-h-[460px] min-h-[260px] overflow-auto">
            {messages.map((m, i) => (
              m.role === "user" ? (
                <div key={i} className="text-[13.5px] px-3.5 py-2.5 rounded-xl rounded-br-sm max-w-[85%] whitespace-pre-wrap bg-blue text-white self-end">
                  {m.content}
                </div>
              ) : (
                <div key={i} className="flex items-end gap-2 self-start max-w-[85%]">
                  <img src="/anachat.png" alt="Ana" className="w-6 h-6 rounded-full object-cover flex-shrink-0 mb-0.5" />
                  <div className="text-[13.5px] px-3.5 py-2.5 rounded-xl rounded-bl-sm whitespace-pre-wrap bg-bone text-ink">
                    {m.content}
                  </div>
                </div>
              )
            ))}

            {messages.length === 1 && !loading && (
              <div className="flex flex-col gap-2 pl-8 mt-1">
                {quickReplies.map((qr) => (
                  <button key={qr.es} onClick={() => sendText(es ? qr.es : qr.en)}
                    className="text-left text-[12px] px-3.5 py-2 rounded-full border border-blue/30 text-blue hover:bg-blue hover:text-white transition-colors bg-white">
                    {es ? qr.es : qr.en}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex items-end gap-2 self-start">
                <img src="/anachat.png" alt="Ana" className="w-6 h-6 rounded-full object-cover flex-shrink-0 mb-0.5" />
                <div className="bg-bone text-ink rounded-xl rounded-bl-sm px-3.5 py-2.5 text-[13.5px]">
                  <span className="inline-flex gap-1"><Dot /> <Dot d="150ms" /> <Dot d="300ms" /></span>
                </div>
              </div>
            )}

            {showLeadForm && <LeadForm es={es} submitting={leadSubmitting} onSubmit={captureLead} />}

            {showBookChip && (
              <button onClick={() => setBooking(true)}
                className="self-stretch text-[12.5px] font-semibold rounded-full py-2.5 bg-yellow text-ink hover:bg-yellow-bright transition-colors">
                📅 {es ? "Agendar cita" : "Book appointment"}
              </button>
            )}

            {booking && !booked && (
              <ChatScheduler lang={lang} submitting={bookingSubmitting} onConfirm={confirmBooking} />
            )}

            {booked && (
              <div className="self-stretch flex flex-col gap-2">
                <a href={buildGcalUrl(booked.date, booked.time, lead?.name)} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-[12.5px] font-medium rounded-full py-2.5 border border-ink/15 bg-white text-ink hover:bg-ink hover:text-paper hover:border-ink transition-colors">
                  <IconCalendar /> {es ? "Agregar a Google Calendar" : "Add to Google Calendar"}
                </a>
                <a href={buildWaUrl({ name: lead?.name || "", date: booked.date, time: booked.time }, es)} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-[12.5px] font-semibold rounded-full py-2.5 bg-[#25D366] text-white hover:opacity-90 transition-opacity">
                  <IconMessage /> {es ? "Confirmar por WhatsApp" : "Confirm on WhatsApp"}
                </a>
              </div>
            )}
          </div>

          <div className="border-t border-line p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={t("chat.placeholder")}
              className="flex-1 border border-line rounded-full px-3.5 py-2 text-[13px] outline-none bg-white focus:border-blue"
            />
            <button onClick={send} disabled={loading}
              className="bg-blue text-white rounded-full w-9 h-9 flex items-center justify-center disabled:opacity-50">↑</button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-end gap-2">
        {!open && (
          <div className="relative mr-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-br-none shadow-[0_4px_16px_rgba(12,22,38,0.12)] px-3.5 py-2 text-ink/80 text-[12px] w-[160px] leading-snug">
              {propertyName
                ? (es ? `¿Te interesa ${propertyName}? 🏠` : `Interested in ${propertyName}? 🏠`)
                : (es ? "¿Buscas una propiedad en el Caribe? 🌴" : "Looking for a property in the Caribbean? 🌴")}
            </div>
            <div className="absolute -bottom-2.5 right-0 w-0 h-0"
              style={{ borderLeft: "10px solid transparent", borderTop: "10px solid rgba(255,255,255,0.9)" }} />
          </div>
        )}
        <button onClick={() => setOpen((o) => !o)}
          className="relative w-14 h-14 rounded-full shadow-[0_12px_30px_rgba(10,53,113,0.4)] overflow-visible">
          <img src="/anachat.png" alt="Ana" className="w-14 h-14 rounded-full object-cover" />
          <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full" />
        </button>
      </div>
    </div>
  );
}

function LeadForm({ es, submitting, onSubmit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const valid = name.trim() && phone.trim();
  const field = "w-full border border-line rounded-lg px-3 py-2 text-[12.5px] outline-none bg-white focus:border-[#3FB0A0]";
  return (
    <div className="self-stretch bg-white border border-blue/20 rounded-xl p-3.5 flex flex-col gap-2">
      <p className="text-[12.5px] text-ink font-medium">
        {es ? "Para continuar, déjame tu nombre completo y teléfono 👇" : "To continue, leave your full name and phone 👇"}
      </p>
      <input className={field} placeholder={es ? "Nombre completo" : "Full name"} value={name} onChange={(e) => setName(e.target.value)} />
      <input className={field} type="tel" placeholder={es ? "WhatsApp / Teléfono" : "WhatsApp / Phone"} value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className={field} type="email" placeholder={es ? "Email (opcional)" : "Email (optional)"} value={email} onChange={(e) => setEmail(e.target.value)} />
      <button disabled={!valid || submitting}
        onClick={() => onSubmit({ name: name.trim(), phone: phone.trim(), email: email.trim() })}
        className="text-[12px] font-semibold rounded-full py-2 bg-blue text-white hover:bg-blue-deep transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
        {submitting ? (es ? "Enviando…" : "Sending…") : (es ? "Continuar" : "Continue")}
      </button>
    </div>
  );
}

function IconCalendar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconMessage() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
    </svg>
  );
}

function Dot({ d = "0ms" }) {
  return <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce inline-block" style={{ animationDelay: d }} />;
}
