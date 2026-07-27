"use client";

import Image from "next/image";
import type { HhnHouse } from "@/types/trip";

const intensityStyle: Record<HhnHouse["intensity"], string> = {
  intensa: "bg-red-500/85",
  media: "bg-orange-500/85",
  risa: "bg-green-500/75",
};

export function HhnHouseCard({
  house,
  index,
}: Readonly<{
  house: HhnHouse;
  index: number;
}>) {
  return (
    <article className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
      <div className="relative h-44 w-full">
        <Image
          src={house.image}
          alt={house.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white ${intensityStyle[house.intensity]}`}
          >
            {house.intensity}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 text-white/90">
            {house.type === "ip" ? "IP" : "Original"}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-xl font-bold leading-tight drop-shadow">
            {house.name}
          </h3>
          <p className="text-xs text-hhn-orange mt-0.5 font-semibold">
            {house.tagline}
          </p>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <p className="text-[11px] uppercase tracking-wider text-white/45">
          {house.location}
        </p>
        <p className="text-sm text-white/75 leading-relaxed flex-1">
          {house.description}
        </p>
        <p className="text-xs text-white/50">💡 {house.tip}</p>
        <a
          href={house.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-hhn-orange underline underline-offset-2 hover:text-orange-300 transition"
        >
          Ver ficha oficial →
        </a>
      </div>
    </article>
  );
}
