import { nyc } from "@/data/nyc";
import { hotels } from "@/data/hotels";
import { transfers } from "@/data/flights";
import { itinerary } from "@/data/itinerary";
import { StickerUnlock } from "@/components/StickerUnlock";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/data/images";

export default function NuevaYorkPage() {
  const apt = hotels.find((h) => h.id === "166a-chelsea")!;
  const nycTransfers = transfers.filter((t) =>
    ["lga-chelsea", "chelsea-jfk"].includes(t.id),
  );
  const nycDays = itinerary.filter((d) => d.chapter === "nyc");

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

      <h2 className="font-display text-3xl font-bold mb-4">Plan día a día</h2>
      <div className="space-y-4 mb-10">
        {nycDays.map((day) => (
          <article key={day.day} className="card-magic rounded-2xl p-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-xs uppercase tracking-widest font-semibold text-mk-blue">
                {day.dateLabel}
              </span>
              <h3 className="font-display text-xl font-bold">{day.title}</h3>
            </div>
            <p className="text-sm text-ink/60 mt-0.5">{day.subtitle}</p>
            {day.highlight && (
              <div className="mt-3 text-sm font-semibold bg-white/80 rounded-xl px-3 py-2 border border-gold/40">
                {day.highlight}
              </div>
            )}
            <ul className="mt-3 space-y-2">
              {day.activities.map((a) => (
                <li
                  key={`${a.time ?? ""}-${a.title}`}
                  className="flex gap-2.5 text-sm text-ink/80"
                >
                  {a.time ? (
                    <span className="font-mono text-xs bg-mk-blue/10 text-mk-blue rounded px-1.5 py-0.5 shrink-0 h-fit">
                      {a.time}
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-mk-blue/40 mt-2 shrink-0" />
                  )}
                  <span>
                    <strong>{a.title}</strong>
                    {a.detail ? ` — ${a.detail}` : ""}
                  </span>
                </li>
              ))}
            </ul>
            {day.pending && day.pending.length > 0 && (
              <div className="mt-3 text-xs bg-amber-100 border border-amber-300 rounded-xl px-3 py-2 text-amber-900">
                ⏳ {day.pending.join(" · ")}
              </div>
            )}
          </article>
        ))}
      </div>

      <h2 className="font-display text-3xl font-bold mb-4">
        🏒 {nyc.rangers.title}
      </h2>
      <div className="card-magic rounded-2xl p-5 md:p-6 mb-10">
        <p className="font-display text-lg font-bold">{nyc.rangers.venue}</p>
        <p className="text-sm text-ink/70">{nyc.rangers.when}</p>
        <dl className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
          <div className="bg-white rounded-xl px-3 py-2 border border-ink/10">
            <dt className="text-xs uppercase tracking-wider text-ink/50 font-semibold">
              Precio
            </dt>
            <dd>{nyc.rangers.price}</dd>
          </div>
          <div className="bg-white rounded-xl px-3 py-2 border border-ink/10">
            <dt className="text-xs uppercase tracking-wider text-ink/50 font-semibold">
              Total grupo
            </dt>
            <dd>{nyc.rangers.total}</dd>
          </div>
          <div className="bg-white rounded-xl px-3 py-2 border border-ink/10">
            <dt className="text-xs uppercase tracking-wider text-ink/50 font-semibold">
              Preventa
            </dt>
            <dd>{nyc.rangers.presale}</dd>
          </div>
          <div className="bg-white rounded-xl px-3 py-2 border border-ink/10">
            <dt className="text-xs uppercase tracking-wider text-ink/50 font-semibold">
              Dónde comprar
            </dt>
            <dd>{nyc.rangers.where}</dd>
          </div>
        </dl>
        <ul className="mt-4 text-sm space-y-1 text-ink/70">
          {nyc.rangers.tips.map((t) => (
            <li key={t}>• {t}</li>
          ))}
        </ul>
      </div>

      <h2 className="font-display text-3xl font-bold mb-4">Miradores</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {nyc.viewpoints.map((v) => (
          <div
            key={v.id}
            className={`card-magic rounded-2xl p-5 ${v.recommended ? "border-2 border-gold" : ""}`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-lg font-bold">{v.name}</h3>
              {v.recommended && (
                <span className="text-[10px] uppercase font-bold tracking-wider bg-gold/25 text-amber-900 rounded-full px-2 py-0.5 shrink-0">
                  Recomendado
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-mk-blue mt-1">{v.price}</p>
            <p className="text-sm text-ink/70 mt-1">{v.detail}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-3xl font-bold mb-4">Traslados aeropuerto</h2>
      <div className="card-magic rounded-2xl p-5 mb-4">
        <p className="text-sm text-ink/75 leading-relaxed">
          {nyc.airportTransfer.detail}
        </p>
        <ul className="mt-3 text-sm space-y-1 text-ink/70">
          {nyc.airportTransfer.notes.map((n) => (
            <li key={n}>• {n}</li>
          ))}
        </ul>
      </div>
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

      <h2 className="font-display text-3xl font-bold mb-4">Para tener en cuenta</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-magic rounded-2xl p-5">
          <h3 className="font-display text-lg font-bold">
            🎃 {nyc.halloween.title}
          </h3>
          <p className="text-sm text-ink/70 mt-1 leading-relaxed">
            {nyc.halloween.detail}
          </p>
        </div>
        <div className="card-magic rounded-2xl p-5">
          <h3 className="font-display text-lg font-bold">
            🦖 {nyc.naturalHistory.title}
          </h3>
          <p className="text-sm font-semibold text-mk-blue mt-1">
            {nyc.naturalHistory.when}
          </p>
          <p className="text-sm text-ink/70 mt-1 leading-relaxed">
            {nyc.naturalHistory.detail}
          </p>
        </div>
      </div>

      <p className="mt-6 text-xs text-ink/55 leading-relaxed">
        ℹ️ {nyc.priceNote}
      </p>

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
