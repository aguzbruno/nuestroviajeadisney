import Image from "next/image";
import { flights, transfers } from "@/data/flights";
import { airportInfo, images } from "@/data/images";
import { StickerUnlock } from "@/components/StickerUnlock";
import { Plane } from "lucide-react";

export default function VuelosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <StickerUnlock unlockKey="vuelos" />

      <div className="flex flex-wrap items-center gap-4 mb-2">
        <Image
          src={images.aaLogo}
          alt="American Airlines"
          width={200}
          height={40}
          className="h-10 w-auto rounded-md"
        />
        <h1 className="font-display text-4xl md:text-5xl font-bold text-mk-blue flex items-center gap-3">
          <Plane className="hidden sm:block" /> Vuelos & traslados
        </h1>
      </div>
      <p className="text-ink/70 mt-2 mb-8 max-w-2xl">
        Tres tramos con <strong>American Airlines</strong>: Buenos Aires → Miami, Orlando →
        Nueva York (LaGuardia) y regreso desde JFK. Más la van MIA→Orlando.
      </p>

      <div className="grid gap-6">
        {flights.map((f) => {
          const fromInfo = airportInfo[f.from.code];
          const toInfo = airportInfo[f.to.code];
          return (
            <article key={f.id} className="card-magic rounded-3xl overflow-hidden">
              <div className="relative h-44 md:h-52">
                <Image
                  src={f.image ?? images.plane}
                  alt={f.flightNumber}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-3">
                  <Image
                    src={images.aaLogo}
                    alt="AA"
                    width={160}
                    height={32}
                    className="h-8 w-auto rounded"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-sm opacity-80">
                    {f.date} · {f.duration}
                  </div>
                  <h2 className="font-display text-3xl font-bold">{f.flightNumber}</h2>
                </div>
              </div>

              <div className="p-6">
                {f.description && (
                  <p className="text-sm text-ink/70 mb-5 leading-relaxed">{f.description}</p>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden border border-ink/5 bg-white/60">
                    <div className="relative h-28">
                      <Image
                        src={fromInfo?.image ?? images.plane}
                        alt={f.from.code}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-mk-blue/50" />
                      <div className="absolute inset-0 flex items-end p-3 text-white">
                        <div>
                          <div className="font-display text-2xl font-bold">{f.from.code}</div>
                          <div className="text-xs opacity-90">{fromInfo?.city}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="font-mono text-lg font-bold">{f.from.time}</div>
                      <div className="text-xs text-ink/60">{f.from.name}</div>
                      {fromInfo && (
                        <p className="text-xs text-ink/55 mt-2 leading-relaxed">
                          {fromInfo.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-ink/5 bg-white/60">
                    <div className="relative h-28">
                      <Image
                        src={toInfo?.image ?? images.plane}
                        alt={f.to.code}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-mickey/45" />
                      <div className="absolute inset-0 flex items-end p-3 text-white">
                        <div>
                          <div className="font-display text-2xl font-bold">{f.to.code}</div>
                          <div className="text-xs opacity-90">{toInfo?.city}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="font-mono text-lg font-bold">
                        {f.to.time}
                        {f.to.nextDay
                          ? f.id === "aa953"
                            ? " · sáb 17 oct"
                            : " (+1 día)"
                          : ""}
                      </div>
                      <div className="text-xs text-ink/60">{f.to.name}</div>
                      {toInfo && (
                        <p className="text-xs text-ink/55 mt-2 leading-relaxed">
                          {toInfo.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {f.notes && (
                  <p className="mt-4 text-sm text-ink/70 bg-white/60 rounded-xl px-3 py-2">
                    💡 {f.notes}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <h2 className="font-display text-3xl font-bold mt-12 mb-4">Traslados</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {transfers.map((t) => {
          const img =
            t.id === "mia-orlando"
              ? images.roadTrip
              : t.id === "lga-chelsea"
                ? images.chelsea
                : images.jfk;
          return (
            <article key={t.id} className="card-magic rounded-2xl overflow-hidden">
              <div className="relative h-32">
                <Image src={img} alt={t.from} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-3 text-white text-xs font-semibold uppercase tracking-wider">
                  {t.when}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold">
                  {t.from} → {t.to}
                </h3>
                <p className="text-sm mt-3">
                  <strong>Recomendado:</strong> {t.recommended}
                </p>
                <p className="text-sm text-ink/70 mt-1">
                  <strong>Alt:</strong> {t.alternative}
                </p>
                <ul className="mt-3 text-xs text-ink/60 space-y-1">
                  {t.notes.map((n) => (
                    <li key={n}>• {n}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
