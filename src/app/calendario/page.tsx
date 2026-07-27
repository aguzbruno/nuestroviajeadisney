"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ItineraryDay } from "@/types/trip";
import { TripCalendar } from "@/components/TripCalendar";
import { DayDetailModal } from "@/components/DayDetailModal";
import { exploreDay, getExploredDays } from "@/lib/storage";

export default function CalendarioPage() {
  const [explored, setExplored] = useState<number[]>([]);
  const [selected, setSelected] = useState<ItineraryDay | null>(null);

  useEffect(() => {
    setExplored(getExploredDays());
  }, []);

  const handleSelect = useCallback((day: ItineraryDay) => {
    exploreDay(day.day);
    setExplored(getExploredDays());
    setSelected(day);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 lg:py-5 lg:h-[calc(100dvh-9.5rem)] lg:overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-6 h-full min-h-0">
        <aside className="lg:w-56 xl:w-64 shrink-0 flex flex-col justify-center gap-4 lg:gap-5">
          <div>
            <h1 className="font-display text-3xl xl:text-4xl font-bold text-mk-blue leading-tight">
              Calendario
            </h1>
            <p className="text-ink/70 text-sm mt-1.5 leading-snug">
              Tocá un día del viaje para ver el plan completo
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold">Magic Band</span>
              <span className="text-xs text-ink/60">
                {explored.length}/19
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-white/70 overflow-hidden">
              <motion.div
                className="h-full magic-band"
                initial={{ width: 0 }}
                animate={{ width: `${(explored.length / 19) * 100}%` }}
              />
            </div>
          </div>

          <p className="hidden lg:block text-xs text-ink/50 leading-relaxed">
            Del 29 sep al 17 oct · llegada EZE 11:05
          </p>
        </aside>

        <div className="flex-1 min-h-0 min-w-0">
          <TripCalendar
            explored={explored}
            selectedDay={selected?.day ?? null}
            onSelectDay={handleSelect}
          />
        </div>
      </div>

      <DayDetailModal day={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
