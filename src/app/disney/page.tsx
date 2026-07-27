import Image from "next/image";
import { getDisneyParks } from "@/data/parks";
import { birthdayRestaurants } from "@/data/hhn";
import { images } from "@/data/images";
import { ParkCard } from "@/components/ParkCard";
import { RestaurantCard } from "@/components/RestaurantCard";

export default function DisneyPage() {
  const parks = getDisneyParks();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden mb-8">
        <Image
          src={images.magicKingdom}
          alt="Disney"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mk-deep/80 to-mk-blue/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold">Disney World</h1>
          <p className="opacity-90 mt-1">
            01–04 oct · Entrada temprana hotel Disney · MK → EPCOT → Hollywood → Animal Kingdom
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {parks.map((p) => (
          <ParkCard key={p.id} park={p} basePath="/disney" />
        ))}
      </div>

      <section
        id="cena"
        className="mt-12 scroll-mt-24 card-magic rounded-3xl overflow-hidden border-2 border-gold/50"
      >
        <div className="relative h-36">
          <Image
            src={images.birthdayDinner}
            alt="Cena cumpleaños"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex items-end p-6 text-white">
            <h2 className="font-display text-3xl font-bold">
              🎂 Cena cumpleaños — 04/10
            </h2>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <p className="text-ink/70 mb-6">
            Maria Alejandra Diaz cumple 60. El propuesto: <strong>Capa</strong>.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {birthdayRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
