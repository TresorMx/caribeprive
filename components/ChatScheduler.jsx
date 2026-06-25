"use client";

import { useMemo, useState } from "react";

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
];
const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["D","L","M","M","J","V","S"];

export default function ChatScheduler({ lang, submitting, onConfirm }) {
  const es = lang === "es";
  const [calMonth, setCalMonth] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");

  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const isPastMonth = calMonth.getFullYear() === today.getFullYear() && calMonth.getMonth() <= today.getMonth();

  const calDays = useMemo(() => {
    const y = calMonth.getFullYear(), mo = calMonth.getMonth();
    const first = new Date(y, mo, 1), last = new Date(y, mo + 1, 0);
    const days = [];
    for (let i = 0; i < first.getDay(); i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++) days.push(new Date(y, mo, d));
    return days;
  }, [calMonth]);

  const isAvailable = (d) => {
    if (!d) return false;
    const x = new Date(d); x.setHours(0,0,0,0);
    if (x < today) return false;
    return x.getDay() !== 0 && x.getDay() !== 6;
  };

  const months = es ? MONTHS : MONTHS_EN;

  return (
    <div className="self-stretch bg-white border border-blue/20 rounded-xl p-3 flex flex-col gap-2">
      <p className="text-[12.5px] text-ink font-medium">
        {es ? "Elige día y hora 📅" : "Pick a day and time 📅"}
      </p>

      <div className="flex items-center justify-between">
        <button onClick={() => setCalMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
          disabled={isPastMonth}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-bone disabled:opacity-20 text-muted">‹</button>
        <span className="text-[12px] font-semibold text-ink">{months[calMonth.getMonth()]} {calMonth.getFullYear()}</span>
        <button onClick={() => setCalMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-bone text-muted">›</button>
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {DAYS.map((d, i) => <div key={i} className="text-center text-[9px] text-muted py-0.5">{d}</div>)}
        {calDays.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const avail = isAvailable(d);
          const selected = date && d.toDateString() === date.toDateString();
          return (
            <button key={i} disabled={!avail} onClick={() => { setDate(d); setTime(""); }}
              className={`aspect-square rounded-md text-[11px] flex items-center justify-center transition-colors ${
                selected ? "bg-blue text-white font-bold" :
                avail ? "hover:bg-[#3FB0A0]/15 text-ink" : "text-line cursor-not-allowed"
              }`}>
              {d.getDate()}
            </button>
          );
        })}
      </div>

      {date && (
        <div className="grid grid-cols-4 gap-1 pt-1">
          {TIME_SLOTS.map(s => (
            <button key={s} onClick={() => setTime(s)}
              className={`text-[10px] py-1 rounded-md border transition-colors ${
                time === s ? "bg-blue text-white border-blue font-semibold"
                           : "border-line text-muted hover:border-[#3FB0A0]/50"
              }`}>
              {s.replace(":00", "")}
            </button>
          ))}
        </div>
      )}

      <button
        disabled={!date || !time || submitting}
        onClick={() => onConfirm(date, time)}
        className="mt-1 text-[12px] font-semibold rounded-full py-2 bg-yellow text-ink hover:bg-yellow-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {submitting ? (es ? "Agendando…" : "Booking…") : (es ? "Confirmar cita" : "Confirm appointment")}
      </button>
    </div>
  );
}
