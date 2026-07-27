"use client";

import { use, useEffect, useState } from "react";
import { getPark } from "@/data/parks";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StickerUnlock } from "@/components/StickerUnlock";
import { AttractionCard } from "@/components/AttractionCard";
import { AttractionCategoryStats } from "@/components/AttractionCategoryStats";
import { countAttractionCategories } from "@/data/attractionCategories";
import {
  getFearlist,
  getWishlist,
  toggleFearlist,
  toggleWishlist,
} from "@/lib/storage";

export default function UniversalParkPage({
  params,
}: {
  params: Promise<{ parque: string }>;
}) {
  const { parque } = use(params);
  const park = getPark(parque);
  const [wish, setWish] = useState<string[]>([]);
  const [fear, setFear] = useState<string[]>([]);

  useEffect(() => {
    setWish(getWishlist());
    setFear(getFearlist());
  }, []);

  if (!park || park.resort !== "universal") notFound();

  function handleWant(key: string) {
    setWish(toggleWishlist(key));
    setFear(getFearlist());
  }

  function handleFear(key: string) {
    setFear(toggleFearlist(key));
    setWish(getWishlist());
  }

  return (
    <div>
      <StickerUnlock unlockKey={park.slug} />
      <div
        className="py-16 px-4 text-white"
        style={{
          background: `linear-gradient(135deg, ${park.color}, #1a0a2e)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <Link href="/universal" className="text-sm opacity-80 hover:underline">
            ← Universal
          </Link>
          <div className="text-5xl mt-4">{park.emoji}</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-2">
            {park.name}
          </h1>
          <p className="mt-2 opacity-90">
            {park.date} · {park.closesApprox}
          </p>
          {park.earlyEntry && (
            <p className="mt-3 inline-flex flex-col gap-0.5 bg-white/15 border border-white/30 rounded-2xl px-4 py-2.5 text-sm max-w-md">
              <span className="font-display font-semibold">
                ⏰ {park.earlyEntry.short} {park.earlyEntry.approxTime}
              </span>
              <span className="opacity-90 text-xs">{park.earlyEntry.detail}</span>
            </p>
          )}
          <p className="mt-4 max-w-2xl opacity-90">{park.description}</p>
          <Link
            href={`/universal/${park.slug}/mapa`}
            className="inline-flex mt-6 items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur px-5 py-2.5 rounded-full font-display font-semibold text-sm transition"
          >
            🗺️ Ver parque interactivo
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold mb-4">Atracciones</h2>
          <AttractionCategoryStats
            counts={countAttractionCategories(park.attractions)}
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {park.attractions.map((a) => {
              const key = `${park.slug}:${a.name}`;
              return (
                <AttractionCard
                  key={a.name}
                  attraction={a}
                  wishKey={key}
                  wanted={wish.includes(key)}
                  feared={fear.includes(key)}
                  onWant={handleWant}
                  onFear={handleFear}
                />
              );
            })}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold mb-4">Tips</h2>
          <ul className="card-magic rounded-2xl p-5 space-y-2 text-sm">
            {park.tips.map((t) => (
              <li key={t}>✨ {t}</li>
            ))}
          </ul>
          {park.slug === "islands-of-adventure" && (
            <Link
              href="/universal/halloween"
              className="mt-6 block hhn-bg text-white rounded-2xl p-5 font-display font-semibold text-center"
            >
              🎃 Continuar a HHN de noche →
            </Link>
          )}
        </section>
      </div>
    </div>
  );
}
