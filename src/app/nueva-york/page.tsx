import { nyc } from "@/data/nyc";
import { hotels } from "@/data/hotels";
import { transfers } from "@/data/flights";
import { StickerUnlock } from "@/components/StickerUnlock";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/data/images";

export default function NuevaYorkPage() {
  const apt = hotels.find((h) => h.id === "166a-chelsea")!;
  const nycTransfers = transfers.filter((t) =>
    ["lga-chelsea", "chelsea-jfk"].includes(t.id),
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <StickerUnlock unlockKey="nyc" />
      <div className="relative h-52 md:h-64 rounded-3xl overflow-hidden mb-8">
        <Image src={images.nyc} alt="Nueva York" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-mk-blue/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold">Nueva York</h1>
          <p className="opacity-90 mt-1">
            10–16 oct · base {nyc.base.name} · {nyc.base.neighborhood}
          </p>
        </div>
      </div>

      <article className="card-magic rounded-3xl overflow-hidden mb-8">
        <div className="relative h-48">
          <Image
            src={apt.image ?? images.apartment}
            alt={apt.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 text-white flex flex-wrap justify-between gap-2">
            <div>
              <h2 className="font-display text-3xl font-bold">{apt.name}</h2>
              <p className="text-sm opacity-90">{apt.location}</p>
            </div>
            <a
              href={nyc.base.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold underline self-end"
            >
              509nyc.com →
            </a>
          </div>
        </div>
        <div className="p-6 md:p-8">
          {apt.description && (
            <p className="text-sm text-ink/70 leading-relaxed mb-4">{apt.description}</p>
          )}
          <div className="flex flex-wrap gap-2 text-sm">
            {nyc.base.highlights.map((h) => (
              <span key={h} className="bg-slate-100 rounded-full px-3 py-1">
                {h}
              </span>
            ))}
          </div>
          <ul className="mt-5 text-sm space-y-1 text-ink/80">
            {apt.notes.map((n) => (
              <li key={n}>• {n}</li>
            ))}
          </ul>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-sm text-amber-900">
            ⚠️ Sin ascensor — 1 piso por escalera. Pensar valijas.
          </div>
        </div>
      </article>

      <h2 className="font-display text-3xl font-bold mb-4">Traslados aeropuerto</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {nycTransfers.map((t) => {
          const img = t.id === "lga-chelsea" ? images.lga : images.jfk;
          return (
            <div key={t.id} className="card-magic rounded-2xl overflow-hidden">
              <div className="relative h-28">
                <Image src={img} alt={t.from} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-2 left-3 text-white text-xs font-semibold uppercase">
                  {t.when}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold">
                  {t.from} → {t.to}
                </h3>
                <p className="text-sm mt-2">
                  <strong>Recomendado:</strong> {t.recommended}
                </p>
                <p className="text-sm text-ink/60">{t.alternative}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-amber-100/80 border border-amber-300 rounded-2xl px-4 py-3 text-sm text-amber-900 mb-6">
        ⏳ {nyc.pendingNote}
      </div>

      <h2 className="font-display text-3xl font-bold mb-4">Ideas / deseos</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nyc.ideas.map((idea) => (
          <div key={idea.title} className="card-magic rounded-2xl p-5">
            <h3 className="font-display text-lg font-bold">{idea.title}</h3>
            <p className="text-sm text-ink/70 mt-1">{idea.detail}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink/60">
        También en{" "}
        <Link href="/hoteles" className="text-mk-blue underline font-semibold">
          Hoteles
        </Link>{" "}
        y el{" "}
        <Link href="/calendario" className="text-mk-blue underline font-semibold">
          calendario
        </Link>
        .
      </p>
    </div>
  );
}
