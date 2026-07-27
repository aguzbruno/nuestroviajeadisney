import { hotels } from "@/data/hotels";
import Link from "next/link";
import Image from "next/image";

export default function HotelesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-mk-blue">
        Hoteles & depto
      </h1>
      <p className="text-ink/70 mt-2 mb-8">
        All-Star Music · Endless Summer · 166A Chelsea — bases del viaje
      </p>

      <div className="grid gap-6">
        {hotels.map((h) => (
          <article key={h.id} className="card-magic rounded-3xl overflow-hidden">
            {h.image && (
              <div className="relative h-48 md:h-56">
                <Image
                  src={h.image}
                  alt={h.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h2 className="font-display text-2xl md:text-3xl font-bold">{h.name}</h2>
                  <p className="text-sm opacity-90">{h.location}</p>
                </div>
              </div>
            )}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap justify-between gap-3">
                {!h.image && (
                  <div>
                    <h2 className="font-display text-3xl font-bold">{h.name}</h2>
                    <p className="text-ink/60">{h.location}</p>
                  </div>
                )}
                {h.url && (
                  <a
                    href={h.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-mk-blue underline"
                  >
                    Ver ficha 509.nyc →
                  </a>
                )}
              </div>
              {h.description && (
                <p className="text-sm text-ink/70 mt-3 leading-relaxed">{h.description}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="bg-mk-blue/10 text-mk-blue px-3 py-1 rounded-full font-semibold">
                  In {h.checkIn}
                </span>
                <span className="bg-mickey/10 text-mickey px-3 py-1 rounded-full font-semibold">
                  Out {h.checkOut}
                </span>
                <span className="bg-white/80 px-3 py-1 rounded-full">{h.room}</span>
                {h.capacity && (
                  <span className="bg-gold/30 px-3 py-1 rounded-full">{h.capacity}</span>
                )}
              </div>
              <ul className="mt-5 space-y-2 text-sm text-ink/80">
                {h.notes.map((n) => (
                  <li key={n}>• {n}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {h.amenities.map((a) => (
                  <span
                    key={a}
                    className="text-xs bg-white/80 border border-ink/5 rounded-full px-2.5 py-1"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink/60">
        Más sobre Chelsea y traslados LGA/JFK en{" "}
        <Link href="/nueva-york" className="text-mk-blue font-semibold underline">
          Nueva York
        </Link>
        .
      </p>
    </div>
  );
}
