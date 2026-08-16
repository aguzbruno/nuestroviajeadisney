"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Park, ParkAttraction } from "@/types/trip";
import {
  getFearlist,
  getWishlist,
  toggleFearlist,
  toggleWishlist,
} from "@/lib/storage";

/** Posiciones fijas en % para pins (mapa estilizado, no geográfico) */
const PIN_LAYOUT: { x: number; y: number }[] = [
  { x: 50, y: 18 },
  { x: 22, y: 32 },
  { x: 78, y: 30 },
  { x: 35, y: 52 },
  { x: 65, y: 48 },
  { x: 18, y: 68 },
  { x: 82, y: 66 },
  { x: 50, y: 78 },
];

function attractionKey(slug: string, name: string) {
  return `${slug}:${name}`;
}

export function InteractiveParkMap({
  park,
  backHref,
}: Readonly<{
  park: Park;
  backHref: string;
}>) {
  const [wish, setWish] = useState<string[]>([]);
  const [fear, setFear] = useState<string[]>([]);
  const [selected, setSelected] = useState<ParkAttraction | null>(null);

  useEffect(() => {
    setWish(getWishlist());
    setFear(getFearlist());
  }, []);

  const pins = useMemo(
    () =>
      park.attractions.map((a, i) => ({
        attraction: a,
        ...PIN_LAYOUT[i % PIN_LAYOUT.length],
        key: attractionKey(park.slug, a.name),
      })),
    [park],
  );

  const selectedKey = selected
    ? attractionKey(park.slug, selected.name)
    : null;
  const wanted = selectedKey ? wish.includes(selectedKey) : false;
  const feared = selectedKey ? fear.includes(selectedKey) : false;

  function handleWant(key: string) {
    const nextWish = toggleWishlist(key);
    setWish(nextWish);
    setFear(getFearlist());
  }

  function handleFear(key: string) {
    const nextFear = toggleFearlist(key);
    setFear(nextFear);
    setWish(getWishlist());
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="px-4 py-8 text-white"
        style={{
          background: `linear-gradient(135deg, ${park.color}, #0d1b2a)`,
        }}
      >
        <div className="max-w-5xl mx-auto">
          <Link href={backHref} className="text-sm opacity-80 hover:underline">
            ← {park.name}
          </Link>
          <h1 className="font-display text-3xl md:text-5xl font-bold mt-3">
            {park.emoji} Parque interactivo
          </h1>
          <p className="mt-2 opacity-90 max-w-xl text-sm md:text-base">
            Tocá cada pin para ver la atracción y marcar{" "}
            <strong>Quiero</strong> o <strong>Me da miedo</strong>.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 md:py-10">
        <div className="relative aspect-[4/5] md:aspect-[16/10] rounded-3xl overflow-hidden border border-white/40 shadow-xl">
          {park.image && (
            <Image
              src={park.image}
              alt={park.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 960px"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${park.color}55 0%, #00000066 45%, #00000088 100%)`,
            }}
          />
          {/* paths decorativos */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M50 10 C 40 30, 30 40, 25 55 S 20 80, 50 90 S 80 70, 75 50 S 65 25, 50 10"
              fill="none"
              stroke="white"
              strokeWidth="0.6"
              strokeDasharray="2 2"
            />
            <circle cx="50" cy="50" r="22" fill="none" stroke="white" strokeWidth="0.4" />
          </svg>

          {pins.map((pin, i) => {
            const isWant = wish.includes(pin.key);
            const isFear = fear.includes(pin.key);
            const isActive = selected?.name === pin.attraction.name;
            let ringClass = "ring-white/40";
            if (isActive) ringClass = "ring-gold scale-110";
            else if (isWant) ringClass = "ring-mickey";
            else if (isFear) ringClass = "ring-hhn-purple";
            return (
              <motion.button
                key={pin.key}
                type="button"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 260 }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(pin.attraction)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1 group"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                aria-label={pin.attraction.name}
              >
                <span
                  className={`w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-white shadow-lg overflow-hidden ring-2 transition ${ringClass}`}
                >
                  <Image
                    src={pin.attraction.image}
                    alt=""
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </span>
                <span className="max-w-[7.5rem] text-[10px] md:text-xs font-display font-semibold text-white text-center leading-tight drop-shadow px-1.5 py-0.5 rounded-md bg-black/45 group-hover:bg-black/65">
                  {pin.attraction.mustDo ? "⭐ " : ""}
                  {pin.attraction.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        <p className="text-center text-xs text-ink/50 mt-3">
          ❤️ Quiero · 💜 Me da miedo — el anillo del pin refleja tu voto
        </p>
      </div>

      <AnimatePresence>
        {selected && selectedKey && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-ink/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal
              aria-labelledby="attraction-dialog-title"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md modal-panel rounded-3xl overflow-hidden"
            >
              <div className="relative h-44">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white text-sm"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
                <h2
                  id="attraction-dialog-title"
                  className="absolute bottom-3 left-4 right-4 font-display text-xl font-bold text-white"
                >
                  {selected.mustDo && "⭐ "}
                  {selected.name}
                </h2>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <p className="text-sm text-ink/75 leading-relaxed">
                  {selected.description}
                </p>
                {selected.tip && (
                  <p className="text-xs text-ink/55">💡 {selected.tip}</p>
                )}
                <fieldset
                  className="inline-flex self-stretch rounded-full border border-ink/10 bg-white p-0.5 m-0 min-w-0"
                  aria-label="Preferencia de atracción"
                >
                  <button
                    type="button"
                    onClick={() => handleWant(selectedKey)}
                    className={`flex-1 text-sm font-display font-semibold px-3 py-2.5 rounded-full transition ${
                      wanted
                        ? "bg-mickey text-white shadow-sm"
                        : "text-ink/70 hover:bg-ink/5"
                    }`}
                  >
                    {wanted ? "¡Lo quiero!" : "Quiero"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFear(selectedKey)}
                    className={`flex-1 text-sm font-display font-semibold px-3 py-2.5 rounded-full transition ${
                      feared
                        ? "bg-hhn-purple text-white shadow-sm"
                        : "text-ink/70 hover:bg-ink/5"
                    }`}
                  >
                    {feared ? "¡Me da miedo!" : "Me da miedo"}
                  </button>
                </fieldset>
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-center text-sm font-semibold text-mk-blue underline underline-offset-2"
                >
                  Ver ficha oficial →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
