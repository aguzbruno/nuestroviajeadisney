"use client";

import { packingItems, tips } from "@/data/tips";
import { pendingItems } from "@/data/trip";
import { getPackingChecked, togglePacking } from "@/lib/storage";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function IdeasPage() {
  const [checked, setChecked] = useState<string[]>([]);
  const categories = useMemo(
    () => [...new Set(packingItems.map((p) => p.category))],
    [],
  );

  useEffect(() => {
    setChecked(getPackingChecked());
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-mk-blue">
        Ideas & checklist
      </h1>
      <p className="text-ink/70 mt-2 mb-8">
        Packing, tips y lo que todavía falta confirmar
      </p>

      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold mb-4">⏳ Pendientes</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {pendingItems.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl p-4 border ${
                p.status === "default"
                  ? "bg-sky-50 border-sky-200"
                  : "bg-amber-50 border-amber-300"
              }`}
            >
              <div className="font-display font-bold">{p.label}</div>
              <p className="text-sm text-ink/70 mt-1">{p.detail}</p>
              <span className="text-[10px] uppercase font-bold tracking-wider mt-2 inline-block opacity-60">
                {p.status === "default" ? "default del plan" : "por confirmar"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold mb-4">Packing checklist</h2>
        {categories.map((cat) => (
          <div key={cat} className="mb-6">
            <h3 className="font-semibold text-ink/50 text-sm uppercase tracking-wider mb-2">
              {cat}
            </h3>
            <ul className="space-y-2">
              {packingItems
                .filter((p) => p.category === cat)
                .map((p) => {
                  const on = checked.includes(p.id);
                  return (
                    <motion.li key={p.id} layout>
                      <button
                        type="button"
                        onClick={() => setChecked(togglePacking(p.id))}
                        className={`w-full text-left card-magic rounded-xl px-4 py-3 flex items-center gap-3 ${
                          on ? "opacity-60 line-through" : ""
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                            on
                              ? "bg-mk-blue border-mk-blue text-white"
                              : "border-ink/20"
                          }`}
                        >
                          {on ? "✓" : ""}
                        </span>
                        {p.label}
                      </button>
                    </motion.li>
                  );
                })}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold mb-4">Tips rápidos</h2>
        <ul className="space-y-2">
          {tips.map((t) => (
            <li key={t} className="card-magic rounded-xl px-4 py-3 text-sm">
              ✨ {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
