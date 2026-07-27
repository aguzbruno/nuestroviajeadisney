import Link from "next/link";
import Image from "next/image";
import type { Park } from "@/types/trip";
import { countAttractionCategories } from "@/data/attractionCategories";

export function ParkCard({
  park,
  basePath,
}: Readonly<{
  park: Park;
  basePath: "/disney" | "/universal";
}>) {
  const categoryCounts = countAttractionCategories(park.attractions);

  return (
    <article className="card-magic rounded-3xl overflow-hidden hover:scale-[1.01] transition flex flex-col">
      <Link href={`${basePath}/${park.slug}`} className="block relative h-40 group">
        {park.image && (
          <Image
            src={park.image}
            alt={park.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 text-white">
          <span className="text-2xl mr-1">{park.emoji}</span>
          <span className="font-display text-2xl font-bold">{park.name}</span>
        </div>
      </Link>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <p className="text-sm text-ink/60">
          {park.date}
          {park.closesApprox ? ` · cierra ${park.closesApprox}` : ""}
        </p>
        {park.earlyEntry && (
          <p className="text-xs font-semibold text-mk-blue bg-gold/15 border border-gold/30 rounded-lg px-2.5 py-1.5">
            ⏰ {park.earlyEntry.short} {park.earlyEntry.approxTime}
            <span className="font-normal text-ink/60 block mt-0.5">
              {park.earlyEntry.detail}
            </span>
          </p>
        )}
        <p className="text-sm text-ink/80 flex-1">{park.description}</p>
        {categoryCounts.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Tipos de atracciones">
            {categoryCounts.map(({ category, count, emoji, label }) => (
              <li
                key={category}
                className="text-[11px] font-medium text-ink/70 bg-ink/5 rounded-full px-2 py-0.5"
              >
                {emoji} {count} {label}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            href={`${basePath}/${park.slug}`}
            className="text-sm font-semibold text-mk-blue underline underline-offset-2"
          >
            Ver atracciones →
          </Link>
          <Link
            href={`${basePath}/${park.slug}/mapa`}
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-display font-semibold px-3.5 py-2 rounded-full text-white shadow-sm"
            style={{ background: park.color }}
          >
            🗺️ Parque interactivo
          </Link>
        </div>
      </div>
    </article>
  );
}
