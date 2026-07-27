"use client";

import Image from "next/image";
import type { ParkAttraction } from "@/types/trip";
import { attractionCategoryMeta } from "@/data/attractionCategories";

export function AttractionCard({
  attraction,
  wishKey,
  wanted,
  feared,
  onWant,
  onFear,
}: Readonly<{
  attraction: ParkAttraction;
  wishKey: string;
  wanted: boolean;
  feared: boolean;
  onWant: (key: string) => void;
  onFear: (key: string) => void;
}>) {
  const meta = attractionCategoryMeta[attraction.category];

  return (
    <li className="card-magic rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square w-full">
        <Image
          src={attraction.image}
          alt={attraction.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/45 text-white backdrop-blur-sm">
          {meta.emoji} {meta.labelSingular}
        </span>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-display font-bold text-lg leading-tight drop-shadow">
            {attraction.mustDo && "⭐ "}
            {attraction.name}
          </h3>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <p className="text-sm text-ink/75 leading-relaxed flex-1">
          {attraction.description}
        </p>
        {attraction.tip && (
          <p className="text-xs text-ink/55">💡 {attraction.tip}</p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 mt-auto">
          <a
            href={attraction.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-mk-blue underline underline-offset-2"
          >
            Ver ficha oficial →
          </a>
          <fieldset
            className="inline-flex rounded-full border border-ink/10 bg-white p-0.5 shrink-0 m-0"
            aria-label="Preferencia de atracción"
          >
            <button
              type="button"
              onClick={() => onWant(wishKey)}
              className={`text-xs font-display font-semibold px-3 py-1.5 rounded-full transition ${
                wanted
                  ? "bg-mickey text-white shadow-sm"
                  : "text-ink/70 hover:bg-ink/5"
              }`}
            >
              {wanted ? "¡Lo quiero!" : "Quiero"}
            </button>
            <button
              type="button"
              onClick={() => onFear(wishKey)}
              className={`text-xs font-display font-semibold px-3 py-1.5 rounded-full transition ${
                feared
                  ? "bg-hhn-purple text-white shadow-sm"
                  : "text-ink/70 hover:bg-ink/5"
              }`}
            >
              {feared ? "¡Me da miedo!" : "Me da miedo"}
            </button>
          </fieldset>
        </div>
      </div>
    </li>
  );
}
