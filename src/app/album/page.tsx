"use client";

import { stickers } from "@/data/tips";
import { useVisitor } from "@/components/VisitorProvider";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AlbumPage() {
  const { unlockedStickers, mickeyFinds } = useVisitor();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-mk-blue">
        Álbum de stickers
      </h1>
      <p className="text-ink/70 mt-2 mb-2">
        Explorá páginas para desbloquear pegatinas del viaje
      </p>
      <p className="text-sm text-ink/50 mb-8">
        Mickeys encontrados: {mickeyFinds.length}/3{" "}
        {mickeyFinds.length >= 3 ? "· ¡Mickey Hunter!" : ""}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {stickers.map((s, i) => {
          const unlocked = unlockedStickers.includes(s.id);
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className={`rounded-3xl p-4 text-center border-2 ${
                unlocked
                  ? "bg-white border-gold shadow-lg"
                  : "bg-ink/5 border-dashed border-ink/20 opacity-60"
              }`}
            >
              <div className={`text-4xl mb-2 ${unlocked ? "" : "grayscale blur-[1px]"}`}>
                {unlocked ? s.emoji : "❔"}
              </div>
              <div className="font-display font-bold text-sm">
                {unlocked ? s.name : "???"}
              </div>
              <div className="text-[10px] text-ink/50 mt-1">{s.unlockHint}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="text-sm font-semibold text-mk-blue underline">
          Seguir explorando
        </Link>
        <Link href="/universal/halloween" className="text-sm font-semibold text-hhn-orange underline">
          Ir a HHN
        </Link>
      </div>
    </div>
  );
}
