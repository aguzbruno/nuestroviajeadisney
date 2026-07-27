"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { ItineraryDay } from "@/types/trip";
import { itinerary } from "@/data/itinerary";
import { earlyEntryForDay } from "@/lib/itinerary";

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const themeDot: Record<string, string> = {
  travel: "bg-sky",
  disney: "bg-mk-blue",
  universal: "bg-purple-500",
  halloween: "bg-hhn-orange",
  shopping: "bg-pink-400",
  nyc: "bg-slate-600",
  rest: "bg-emerald-500",
  birthday: "bg-gold",
};

const themeCell: Record<string, string> = {
  travel: "bg-sky/25 hover:bg-sky/40 border-sky/40",
  disney: "bg-mk-blue/15 hover:bg-mk-blue/25 border-mk-blue/30",
  universal: "bg-purple-200/50 hover:bg-purple-200/80 border-purple-300/50",
  halloween: "bg-hhn-orange/20 hover:bg-hhn-orange/35 border-hhn-orange/40",
  shopping: "bg-pink-100 hover:bg-pink-200/80 border-pink-300/50",
  nyc: "bg-slate-200/60 hover:bg-slate-300/70 border-slate-300/60",
  rest: "bg-emerald-100 hover:bg-emerald-200/80 border-emerald-300/50",
  birthday: "bg-gold/35 hover:bg-gold/50 border-gold/50",
};

const MONTH_LABEL = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const MONTH_SHORT = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** Monday-first weekday index (0 = Mon … 6 = Sun) */
function mondayIndex(date: Date) {
  return (date.getDay() + 6) % 7;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** Continuous grid: week of first trip day → week of last trip day. */
function buildTripRangeGrid() {
  const first = parseDate(itinerary[0].date);
  const last = parseDate(itinerary[itinerary.length - 1].date);
  const start = addDays(first, -mondayIndex(first));
  const endPad = 6 - mondayIndex(last);
  const end = addDays(last, endPad);

  const cells: Array<{ date: Date; key: string }> = [];
  for (let cursor = new Date(start); cursor <= end; cursor = addDays(cursor, 1)) {
    cells.push({ date: new Date(cursor), key: toKey(cursor) });
  }
  return cells;
}

export function TripCalendar({
  explored,
  selectedDay,
  onSelectDay,
}: Readonly<{
  explored: number[];
  selectedDay: number | null;
  onSelectDay: (day: ItineraryDay) => void;
}>) {
  const byDate = useMemo(() => {
    const map = new Map<string, ItineraryDay>();
    for (const d of itinerary) map.set(d.date, d);
    return map;
  }, []);

  const cells = useMemo(() => buildTripRangeGrid(), []);
  const weekCount = cells.length / 7;

  const rangeLabel = useMemo(() => {
    const first = parseDate(itinerary[0].date);
    const last = parseDate(itinerary[itinerary.length - 1].date);
    const sameYear = first.getFullYear() === last.getFullYear();
    const start = `${first.getDate()} ${MONTH_SHORT[first.getMonth()]}`;
    const end = `${last.getDate()} ${MONTH_SHORT[last.getMonth()]}${sameYear ? "" : ` ${last.getFullYear()}`}`;
    return `${start} – ${end} ${first.getFullYear()} · llegada 17 oct 11:05`;
  }, []);

  return (
    <div className="card-magic rounded-2xl md:rounded-3xl bg-white/80 p-3 md:p-4 lg:p-5 h-full min-h-0 flex flex-col">
      <div className="mb-2 shrink-0 text-center">
        <h2 className="font-display text-lg md:text-xl font-bold text-mk-blue">
          Septiembre – Octubre
        </h2>
        <p className="text-[11px] md:text-xs text-ink/55 mt-0.5">{rangeLabel}</p>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1 shrink-0">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="text-center text-[10px] font-display font-semibold text-ink/45 uppercase tracking-wide py-0.5"
          >
            {w}
          </div>
        ))}
      </div>

      <div
        className="grid grid-cols-7 gap-1 flex-1 min-h-[280px] lg:min-h-0"
        style={{ gridTemplateRows: `repeat(${weekCount}, minmax(0, 1fr))` }}
      >
        {cells.map(({ date, key }) => {
          const tripDay = byDate.get(key);
          const dayNum = date.getDate();
          const monthName = MONTH_LABEL[date.getMonth()];
          const isSeptember = date.getMonth() === 8;

          if (!tripDay) {
            return (
              <div
                key={key}
                className={`min-h-0 rounded-lg md:rounded-xl flex flex-col items-start justify-start p-1 md:p-1.5 ${
                  isSeptember ? "text-ink/25" : "text-ink/20"
                }`}
              >
                <span className="text-[7px] md:text-[8px] font-display font-semibold leading-none mb-0.5 capitalize truncate w-full">
                  {monthName}
                </span>
                <span className="text-xs md:text-sm font-medium leading-none">
                  {dayNum}
                </span>
              </div>
            );
          }

          const isSelected = selectedDay === tripDay.day;
          const isExplored = explored.includes(tripDay.day);
          const hasEarly = Boolean(earlyEntryForDay(tripDay));

          return (
            <motion.button
              key={key}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectDay(tripDay)}
              className={`min-h-0 rounded-lg md:rounded-xl border text-left p-1 md:p-1.5 transition-shadow relative overflow-hidden flex flex-col ${
                themeCell[tripDay.theme] ?? "bg-white border-ink/10"
              } ${isSelected ? "ring-2 ring-mk-blue shadow-md" : "shadow-sm"}`}
              aria-label={`${monthName} ${dayNum}, día ${tripDay.day}: ${tripDay.title}${hasEarly ? ", entrada temprana" : ""}`}
            >
              <div className="flex items-start justify-between gap-0.5 min-w-0">
                <div className="min-w-0 flex-1">
                  <span
                    className={`block text-[7px] md:text-[8px] font-display font-bold leading-none mb-0.5 capitalize truncate ${
                      isSeptember ? "text-sky/90" : "text-mk-blue/80"
                    }`}
                  >
                    {monthName}
                  </span>
                  <span className="text-xs md:text-sm font-display font-bold text-ink leading-none">
                    {dayNum}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-0.5 shrink-0">
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-0.5 ${themeDot[tripDay.theme] ?? "bg-ink/40"}`}
                  />
                  {hasEarly && (
                    <span
                      className="text-[8px] leading-none"
                      title="Entrada temprana"
                      aria-hidden
                    >
                      ⏰
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-0.5 hidden md:block min-h-0 overflow-hidden flex-1">
                <div className="text-[9px] lg:text-[10px] font-semibold text-ink/70 leading-tight line-clamp-2">
                  {tripDay.title}
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-0.5 pt-0.5 min-w-0">
                <span className="text-[8px] md:text-[9px] font-display font-semibold text-ink/55 truncate">
                  día {tripDay.day}
                </span>
                {isExplored && (
                  <span className="text-[8px] shrink-0" aria-hidden>
                    ✨
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-2 pt-2 border-t border-ink/5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] md:text-xs text-ink/60 shrink-0">
        {(
          [
            ["disney", "Disney"],
            ["universal", "Universal"],
            ["halloween", "HHN"],
            ["nyc", "NYC"],
            ["travel", "Viajes"],
            ["shopping", "Shopping"],
            ["birthday", "Cumpleaños"],
          ] as const
        ).map(([theme, label]) => (
          <span key={theme} className="inline-flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${themeDot[theme]}`} />
            {label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1">
          <span aria-hidden>⏰</span>
          Entrada temprana
        </span>
      </div>
    </div>
  );
}
