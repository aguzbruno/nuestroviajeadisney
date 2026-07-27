"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { hhn, hhnHouses } from "@/data/hhn";
import { HhnHouseCard } from "@/components/HhnHouseCard";
import { StickerUnlock } from "@/components/StickerUnlock";
import { useVisitor } from "@/components/VisitorProvider";

export default function HalloweenPage() {
  const [mode, setMode] = useState<"brave" | "scared">("brave");
  const { visitor } = useVisitor();
  const copy = mode === "brave" ? hhn.braveCopy : hhn.scaredCopy;

  return (
    <div className="hhn-bg min-h-screen text-white relative overflow-hidden">
      <StickerUnlock unlockKey="halloween" />
      {/* fog / moon */}
      <div className="pointer-events-none absolute top-10 right-10 w-28 h-28 rounded-full bg-yellow-100/80 blur-[1px] shadow-[0_0_60px_#ff6b35]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_70%)]" />

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        <Link href="/universal" className="text-sm text-white/60 hover:text-white">
          ← Universal
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <div className="text-6xl mb-4">🎃</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold">
            {hhn.name}
          </h1>
          <p className="text-hhn-orange mt-2 font-semibold">
            {hhn.date} · {hhn.park}
          </p>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            De día: {hhn.dayPark}. De noche: casas, scarezones y gritos. Inicio ~{hhn.startApprox}.
          </p>
          <p className="text-xs text-amber-200/80 mt-3 bg-black/30 inline-block px-3 py-1 rounded-full">
            ⏳ {hhn.ticketNote}
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => setMode("brave")}
            className={`px-5 py-2 rounded-full font-display font-semibold ${
              mode === "brave" ? "bg-hhn-orange text-white" : "bg-white/10"
            }`}
          >
            Modo valiente
          </button>
          <button
            type="button"
            onClick={() => setMode("scared")}
            className={`px-5 py-2 rounded-full font-display font-semibold ${
              mode === "scared" ? "bg-hhn-purple text-white" : "bg-white/10"
            }`}
          >
            Modo miedoso
          </button>
        </div>

        <motion.div
          key={mode}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 max-w-xl mx-auto text-center bg-black/30 rounded-3xl p-6 border border-white/10"
        >
          <h2 className="font-display text-2xl font-bold">{copy.title}</h2>
          <p className="text-white/70 mt-2">{copy.body}</p>
          {mode === "scared" && (
            <div className="mt-4 flex justify-center gap-2 text-2xl">
              🎃 👻 🎃
            </div>
          )}
          {(visitor?.id === "alejandra" || visitor?.id === "marcelo") &&
            mode === "scared" && (
              <p className="mt-3 text-sm text-hhn-orange">
                Tip para vos: CityWalk chill mientras el resto hace casas intensas.
              </p>
            )}
          {visitor?.id === "emma" && (
            <p className="mt-3 text-sm text-pink-200">
              Emma: contenido de terror real — vas a amar u odiar las casas 😈
            </p>
          )}
        </motion.div>

        <h2 className="font-display text-3xl font-bold mt-14 mb-6 text-center">
          Timeline de la noche
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {hhn.flow.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-black/35 border border-white/10 rounded-2xl p-5"
            >
              <div className="text-xs text-hhn-orange font-semibold uppercase tracking-wider">
                {step.time}
              </div>
              <h3 className="font-display text-xl font-bold mt-1">{step.title}</h3>
              <p className="text-sm text-white/60 mt-1">{step.detail}</p>
            </motion.div>
          ))}
        </div>

        <h2
          id="casas"
          className="font-display text-3xl font-bold mt-14 mb-2 text-center scroll-mt-24"
        >
          Casas embrujadas
        </h2>
        <p className="text-center text-white/50 text-sm mb-6 max-w-xl mx-auto">
          HHN 35 · 9 de 10 casas anunciadas. Cada ficha tiene foto, tip y link oficial.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hhnHouses.map((h, i) => (
            <HhnHouseCard key={h.id} house={h} index={i} />
          ))}
        </div>

        <h2 className="font-display text-3xl font-bold mt-14 mb-4 text-center">Tips</h2>
        <ul className="max-w-xl mx-auto space-y-2 text-sm text-white/80">
          {hhn.tips.map((t) => (
            <li key={t} className="bg-black/25 rounded-xl px-4 py-2">
              🔦 {t}
            </li>
          ))}
        </ul>

        <p className="text-center mt-10 text-white/50 text-sm">
          Sticker desbloqueado: Sobreviví HHN 🎃
        </p>
      </div>
    </div>
  );
}
