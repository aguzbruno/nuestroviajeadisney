"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { ItineraryDay } from "@/types/trip";
import { dayDescriptions, dayImages } from "@/data/images";
import { useVisitor } from "@/components/VisitorProvider";
import {
  activitiesForVisitor,
  earlyEntryForDay,
  highlightForVisitor,
} from "@/lib/itinerary";
import { EarlyEntryChip } from "@/components/EarlyEntryChip";

const themeStyles: Record<string, string> = {
  travel: "from-sky/40 to-white",
  disney: "from-mk-blue/20 to-gold/20",
  universal: "from-purple-200/50 to-white",
  halloween: "from-hhn-purple/40 to-hhn-orange/20",
  shopping: "from-pink-100 to-white",
  nyc: "from-slate-200/60 to-white",
  rest: "from-emerald-100 to-white",
  birthday: "from-gold/40 to-mickey/10",
};

const chapterLabels: Record<string, string> = {
  travel: "Viaje",
  disney: "Disney",
  universal: "Universal",
  halloween: "Halloween HHN",
  nyc: "Nueva York",
};

function detailHref(day: ItineraryDay) {
  if (!day.parkId) return null;
  if (day.theme === "halloween") return "/universal/halloween";
  if (day.chapter === "disney") return `/disney/${day.parkId}`;
  return `/universal/${day.parkId}`;
}

export function DayDetailModal({
  day,
  onClose,
}: Readonly<{
  day: ItineraryDay | null;
  onClose: () => void;
}>) {
  const { visitor } = useVisitor();

  useEffect(() => {
    if (!day) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [day, onClose]);

  const image = day ? (day.image ?? dayImages[day.day]) : undefined;
  const description = day
    ? (day.description ?? dayDescriptions[day.day])
    : undefined;
  const href = day ? detailHref(day) : null;
  const highlight = day
    ? highlightForVisitor(day, visitor?.id)
    : undefined;
  const activities = day
    ? activitiesForVisitor(day, visitor?.id)
    : [];
  const earlyEntry = day ? earlyEntryForDay(day) : undefined;

  return (
    <AnimatePresence>
      {day && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`day-modal-title-${day.day}`}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className={`relative z-10 w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-gradient-to-br shadow-2xl pb-[var(--safe-bottom)] ${themeStyles[day.theme] ?? "from-white to-white"}`}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-white/95 shadow flex items-center justify-center text-ink/70 hover:text-ink"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {image && (
              <div className="relative h-48 w-full">
                <Image
                  src={image}
                  alt={day.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 512px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-14 text-white">
                  <div className="text-[10px] uppercase tracking-widest font-semibold opacity-90">
                    Día {day.day} · {day.dateLabel}
                  </div>
                  <h2
                    id={`day-modal-title-${day.day}`}
                    className="font-display text-2xl md:text-3xl font-bold leading-tight drop-shadow"
                  >
                    {day.title}
                  </h2>
                </div>
              </div>
            )}

            <div className="p-5 md:p-6">
              {!image && (
                <div className="pr-10 mb-3">
                  <div className="text-xs uppercase tracking-widest text-ink/50 font-semibold">
                    Día {day.day} · {day.dateLabel}
                  </div>
                  <h2
                    id={`day-modal-title-${day.day}`}
                    className="font-display text-2xl font-bold text-ink mt-1"
                  >
                    {day.title}
                  </h2>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-display font-semibold px-2.5 py-1 rounded-full bg-white/80 text-mk-blue">
                  {chapterLabels[day.chapter] ?? day.chapter}
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/80 text-ink/60">
                  {day.date}
                </span>
              </div>

              <p className="text-ink/70 text-sm font-medium">{day.subtitle}</p>
              {earlyEntry && (
                <div className="mt-3">
                  <EarlyEntryChip earlyEntry={earlyEntry} />
                </div>
              )}
              {description && (
                <p className="text-ink/60 text-sm mt-2 leading-relaxed">
                  {description}
                </p>
              )}

              {highlight && (
                <div className="mt-4 text-sm font-semibold bg-white/80 rounded-xl px-3 py-2.5 border border-gold/30">
                  {highlight}
                </div>
              )}

              <h3 className="font-display font-bold text-lg mt-5 mb-2">
                Plan del día
              </h3>
              <ul className="space-y-2.5">
                {activities.map((a) => (
                  <li
                    key={`${a.time ?? ""}-${a.title}`}
                    className="flex gap-2.5 text-sm text-ink/80 bg-white/70 rounded-xl px-3 py-2.5"
                  >
                    {a.time ? (
                      <span className="font-mono text-xs bg-mk-blue/10 text-mk-blue rounded px-1.5 py-0.5 shrink-0 h-fit">
                        {a.time}
                      </span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-mk-blue/40 mt-2 shrink-0" />
                    )}
                    <span>
                      <strong>{a.title}</strong>
                      {a.detail ? ` — ${a.detail}` : ""}
                    </span>
                  </li>
                ))}
              </ul>

              {day.pending && day.pending.length > 0 && (
                <div className="mt-4 text-xs bg-amber-100/90 border border-amber-300/60 rounded-xl px-3 py-2.5 text-amber-900">
                  <div className="font-display font-semibold mb-1">
                    Pendiente
                  </div>
                  <ul className="space-y-1">
                    {day.pending.map((p) => (
                      <li key={p}>⏳ {p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(day.theme === "birthday" || day.day === 6) && (
                <Link
                  href="/disney#cena"
                  onClick={onClose}
                  className="mt-5 inline-flex w-full items-center justify-center font-display font-semibold bg-mickey text-white rounded-2xl px-4 py-3 text-sm hover:opacity-90 transition-opacity"
                >
                  Elegir dónde cenamos 🎂
                </Link>
              )}

              {(day.day === 7 || day.day === 11) && (
                <Link
                  href="/shopping#centros"
                  onClick={onClose}
                  className="mt-5 inline-flex w-full items-center justify-center font-display font-semibold bg-mk-blue text-white rounded-2xl px-4 py-3 text-sm hover:bg-mk-deep transition-colors"
                >
                  Ver shoppings y marcas →
                </Link>
              )}

              {href && (
                <Link
                  href={href}
                  onClick={onClose}
                  className="mt-5 inline-flex w-full items-center justify-center font-display font-semibold bg-mk-blue text-white rounded-2xl px-4 py-3 text-sm hover:bg-mk-deep transition-colors"
                >
                  Ver detalle completo →
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
