"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { ItineraryDay } from "@/types/trip";
import { exploreDay } from "@/lib/storage";
import { dayDescriptions, dayImages } from "@/data/images";
import { useVisitor } from "@/components/VisitorProvider";
import { DayBadge } from "@/components/DayBadge";
import {
  activitiesForVisitor,
  earlyEntryForDay,
  highlightForVisitor,
} from "@/lib/itinerary";
import { EarlyEntryChip } from "@/components/EarlyEntryChip";
import { BirthdayModal } from "@/components/BirthdayModal";
import { unlockAudio } from "@/lib/happyBirthdaySound";

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

export function DayCard({
  day,
  index = 0,
}: {
  day: ItineraryDay;
  index?: number;
}) {
  const { visitor } = useVisitor();
  const image = day.image ?? dayImages[day.day];
  const description = day.description ?? dayDescriptions[day.day];
  const activities = activitiesForVisitor(day, visitor?.id);
  const highlight = highlightForVisitor(day, visitor?.id);
  const earlyEntry = earlyEntryForDay(day);
  const isBirthday = day.theme === "birthday" || day.day === 6;
  const [birthdayOpen, setBirthdayOpen] = useState(false);

  const onEnter = useCallback(() => {
    exploreDay(day.day);
    if (isBirthday) {
      unlockAudio();
      setBirthdayOpen(true);
    }
  }, [day.day, isBirthday]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.45 }}
      onViewportEnter={onEnter}
      className={`card-magic rounded-3xl overflow-hidden bg-gradient-to-br ${themeStyles[day.theme] ?? "from-white to-white"}`}
    >
      {isBirthday && (
        <BirthdayModal
          open={birthdayOpen}
          onClose={() => setBirthdayOpen(false)}
        />
      )}
      {image && (
        <div className="relative h-40 w-full">
          <Image
            src={image}
            alt={day.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-3 right-3">
            <DayBadge day={day} />
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="text-[10px] uppercase tracking-widest font-semibold opacity-90">
              {day.sharedPart
                ? `Día ${day.day} · parte ${day.sharedPart.index}/${day.sharedPart.total} · ${day.dateLabel}`
                : day.dateLabel}
            </div>
            <h3 className="font-display text-xl font-bold leading-tight drop-shadow">
              {day.title}
            </h3>
          </div>
        </div>
      )}

      <div className="p-5 md:p-6">
        {!image && (
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-ink/50 font-semibold">
                {day.sharedPart
                  ? `Día ${day.day} · parte ${day.sharedPart.index}/${day.sharedPart.total} · ${day.dateLabel}`
                  : `Día ${day.day} · ${day.dateLabel}`}
              </div>
              <h3 className="font-display text-2xl font-bold text-ink mt-1">
                {day.title}
              </h3>
            </div>
            <DayBadge day={day} />
          </div>
        )}

        <p className="text-ink/70 text-sm font-medium">{day.subtitle}</p>
        {earlyEntry && (
          <div className="mt-2">
            <EarlyEntryChip earlyEntry={earlyEntry} />
          </div>
        )}
        {description && (
          <p className="text-ink/60 text-sm mt-2 leading-relaxed">{description}</p>
        )}

        {highlight && (
          <div className="mt-3 text-sm font-semibold bg-white/70 rounded-xl px-3 py-2">
            {highlight}
          </div>
        )}

        <ul className="space-y-2 mt-3">
          {activities.map((a, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink/80">
              {a.time && (
                <span className="font-mono text-xs bg-white/80 rounded px-1.5 py-0.5 shrink-0">
                  {a.time}
                </span>
              )}
              <span>
                <strong>{a.title}</strong>
                {a.detail ? ` — ${a.detail}` : ""}
              </span>
            </li>
          ))}
        </ul>

        {day.pending && day.pending.length > 0 && (
          <div className="mt-3 text-xs bg-amber-100/80 border border-amber-300/60 rounded-xl px-3 py-2 text-amber-900">
            ⏳ {day.pending.join(" · ")}
          </div>
        )}

        {isBirthday && !birthdayOpen && (
          <button
            type="button"
            onClick={() => {
              unlockAudio();
              setBirthdayOpen(true);
            }}
            className="mt-4 inline-flex items-center font-display font-semibold text-sm rounded-full bg-mickey text-white px-4 py-2"
          >
            🎂 Feliz cumpleaños
          </button>
        )}

        {day.theme === "halloween" && day.sharedPart?.index === 2 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/universal/halloween#casas"
              className="inline-flex items-center font-display font-semibold text-sm rounded-full bg-hhn-orange text-white px-4 py-2"
            >
              Ver todas las casas 🎃
            </Link>
            <Link
              href="/universal/halloween"
              className="inline-flex items-center text-sm font-display font-semibold text-hhn-orange px-2 py-2"
            >
              Abrir portal HHN →
            </Link>
          </div>
        ) : day.day === 7 || (day.theme === "shopping" && day.day === 11) ? (
          <Link
            href="/shopping#centros"
            className="inline-flex mt-4 items-center font-display font-semibold text-sm rounded-full bg-mk-blue text-white px-4 py-2"
          >
            Ver shoppings y marcas →
          </Link>
        ) : (
          day.parkId && (
            <Link
              href={
                day.theme === "halloween"
                  ? "/universal/halloween"
                  : day.chapter === "disney"
                    ? `/disney/${day.parkId}`
                    : `/universal/${day.parkId}`
              }
              className="inline-block mt-4 text-sm font-display font-semibold text-mk-blue hover:underline"
            >
              Ver detalle →
            </Link>
          )
        )}
      </div>
    </motion.article>
  );
}
