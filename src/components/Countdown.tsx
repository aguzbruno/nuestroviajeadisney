"use client";

import { useEffect, useState } from "react";
import { trip } from "@/data/trip";
import { motion } from "framer-motion";

function getTarget() {
  const departure = new Date(trip.departureLocal).getTime();
  const now = Date.now();
  if (now < departure) {
    return { label: "Despegue EZE → MIA", target: departure };
  }
  const birthday = new Date(`${trip.birthdayDate}T18:30:00-04:00`).getTime();
  if (now < birthday) {
    return { label: "Cena cumpleaños Alejandra", target: birthday };
  }
  const end = new Date("2026-10-16T23:20:00-04:00").getTime();
  if (now < end) {
    return { label: "Vuelo de vuelta JFK", target: end };
  }
  return { label: "¡Ya volvieron!", target: now };
}

export function Countdown({ compact = false }: { compact?: boolean }) {
  const [{ label, target }, setMeta] = useState(getTarget);
  const [parts, setParts] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const meta = getTarget();
      setMeta(meta);
      const diff = Math.max(0, meta.target - Date.now());
      setParts({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { v: parts.d, l: "días" },
    { v: parts.h, l: "hs" },
    { v: parts.m, l: "min" },
    { v: parts.s, l: "seg" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`card-magic rounded-3xl text-center ${compact ? "p-4" : "p-6"}`}
    >
      <p
        className={`uppercase tracking-widest text-ink/50 mb-2 ${
          compact ? "text-[10px]" : "text-sm"
        }`}
      >
        {label}
      </p>
      <div className={`flex justify-center flex-wrap ${compact ? "gap-2" : "gap-3"}`}>
        {cells.map((c) => (
          <div
            key={c.l}
            className={`bg-mk-blue text-white rounded-2xl ${
              compact ? "px-3 py-2 min-w-[58px]" : "px-4 py-3 min-w-[72px]"
            }`}
          >
            <div
              className={`font-display font-bold tabular-nums ${
                compact ? "text-2xl" : "text-3xl"
              }`}
            >
              {String(c.v).padStart(2, "0")}
            </div>
            <div className="text-xs opacity-80">{c.l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
