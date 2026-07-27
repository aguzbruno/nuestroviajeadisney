"use client";

import { shoppingCenters } from "@/data/shopping";
import { StickerUnlock } from "@/components/StickerUnlock";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandSearch } from "@/components/BrandSearch";

const foodIdeas = [
  "Chicken tenders + lemonade",
  "Burger en CityWalk",
  "Sushi rápido en el mall",
  "Helado post-outlets",
  "Pizza para compartir",
  "Tacos en I-Drive",
];

export default function ShoppingPage() {
  const [spin, setSpin] = useState(foodIdeas[0]);
  const [spinning, setSpinning] = useState(false);
  const centers = useMemo(() => shoppingCenters, []);

  function roulette() {
    setSpinning(true);
    let i = 0;
    const id = setInterval(() => {
      setSpin(foodIdeas[i % foodIdeas.length]);
      i++;
    }, 80);
    setTimeout(() => {
      clearInterval(id);
      setSpin(foodIdeas[Math.floor(Math.random() * foodIdeas.length)]);
      setSpinning(false);
    }, 1200);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <StickerUnlock unlockKey="shopping" />
      <div className="relative h-44 rounded-3xl overflow-hidden mb-6">
        <Image src={images.outlets} alt="Shopping" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/70 to-mk-blue/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold">Shopping Orlando</h1>
          <p className="opacity-90 mt-1">Día 05/10 · opcional también 09/10</p>
        </div>
      </div>
      <div className="bg-amber-100/80 border border-amber-300 rounded-2xl px-4 py-3 text-sm text-amber-900 mb-8">
        ⏳ 09/10 default: otro día de shopping. Alternativa: repetir Epic.
      </div>

      <div className="card-magic rounded-3xl p-5 mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-ink/50 font-semibold">
            Ruleta ¿qué comemos?
          </div>
          <div className="font-display text-2xl font-bold mt-1">{spin}</div>
        </div>
        <button
          type="button"
          onClick={roulette}
          disabled={spinning}
          className="bg-mickey text-white font-display font-semibold px-5 py-2.5 rounded-full"
        >
          {spinning ? "Girando…" : "Girar 🎲"}
        </button>
      </div>

      <BrandSearch centers={centers} />

      <h2
        id="centros"
        className="font-display text-3xl font-bold mb-2 scroll-mt-24"
      >
        Shoppings y marcas
      </h2>
      <p className="text-ink/60 text-sm mb-6 max-w-2xl">
        Cada centro con su página de marcas. Elegí 1–2 máx. el día del cambio de
        hotel (05/10) — o repetí el 09/10.
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {centers.map((c, i) => (
          <motion.article
            id={c.id}
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="card-magic rounded-3xl overflow-hidden scroll-mt-24 flex flex-col"
          >
            <Link href={`/shopping/${c.id}`} className="block relative h-36 group">
              {c.image && (
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-2 left-3 text-white text-xs font-semibold uppercase tracking-wider">
                {c.type}
              </div>
            </Link>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-display text-2xl font-bold">
                <Link href={`/shopping/${c.id}`} className="hover:text-mk-blue transition">
                  {c.name}
                </Link>
              </h3>
              <p className="text-xs text-ink/50 mt-1">{c.address}</p>
              <p className="text-sm text-ink/80 mt-3">{c.description}</p>
              <p className="text-sm mt-2">
                <strong>Ideal para:</strong> {c.bestFor}
              </p>
              <p className="text-xs text-ink/60 mt-1">
                Desde Endless Summer: {c.distanceFromEndlessSummer}
              </p>
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wider font-semibold text-mk-blue mb-2">
                  Marcas ({c.brands.length})
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.brands.slice(0, 6).map((b) => (
                    <BrandLogo key={b.id} brand={b} size={40} />
                  ))}
                  {c.brands.length > 6 && (
                    <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-mk-blue/10 text-mk-blue text-xs font-bold">
                      +{c.brands.length - 6}
                    </span>
                  )}
                </div>
              </div>
              <Link
                href={`/shopping/${c.id}`}
                className="mt-4 inline-flex text-sm font-semibold text-mk-blue underline underline-offset-2 w-fit"
              >
                Ver todas las marcas →
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 card-magic rounded-2xl p-5 text-sm">
        <strong>Flujo sugerido 05/10:</strong> check-out All-Star → check-in Endless
        Summer → 1–2 centros máx. → CityWalk / cena suave → descanso.
      </div>
    </div>
  );
}
