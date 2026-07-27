import Image from "next/image";
import type { RestaurantOption } from "@/types/trip";

export function RestaurantCard({
  restaurant,
}: Readonly<{
  restaurant: RestaurantOption;
}>) {
  return (
    <article
      className={`card-magic rounded-2xl overflow-hidden flex flex-col h-full ${
        restaurant.isDefault ? "ring-2 ring-gold" : ""
      }`}
    >
      <div className="relative h-44 w-full">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {restaurant.isDefault && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold text-amber-900">
            Default
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-display text-xl font-bold leading-tight drop-shadow">
            {restaurant.name}
          </h3>
          <p className="text-xs text-white/80 mt-0.5">{restaurant.location}</p>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <p className="text-[11px] uppercase tracking-wider text-ink/45">
          {restaurant.cuisine} · {restaurant.priceRange}
        </p>
        <p className="text-sm text-ink/80 leading-relaxed">
          {restaurant.description}
        </p>
        <p className="text-sm text-ink/70">
          <span className="font-semibold text-ink/85">Por qué:</span>{" "}
          {restaurant.why}
        </p>
        <p className="text-xs text-ink/55">
          {restaurant.vibe} · {restaurant.tip}
        </p>
        <dl className="text-xs text-ink/60 space-y-1 mt-1">
          <div>
            <dt className="inline font-semibold text-ink/70">Horario: </dt>
            <dd className="inline">{restaurant.hours}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-ink/70">Dress code: </dt>
            <dd className="inline">{restaurant.dressCode}</dd>
          </div>
          {restaurant.address && (
            <div>
              <dt className="inline font-semibold text-ink/70">Dirección: </dt>
              <dd className="inline">{restaurant.address}</dd>
            </div>
          )}
        </dl>
        {restaurant.notes.length > 0 && (
          <ul className="text-xs text-ink/55 space-y-1 mt-1">
            {restaurant.notes.map((note) => (
              <li key={note}>💡 {note}</li>
            ))}
          </ul>
        )}
        <a
          href={restaurant.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-mk-blue underline underline-offset-2 mt-auto pt-2"
        >
          Ver ficha oficial →
        </a>
      </div>
    </article>
  );
}
