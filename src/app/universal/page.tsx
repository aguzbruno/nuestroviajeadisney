import Link from "next/link";
import Image from "next/image";
import { getUniversalParks } from "@/data/parks";
import { images } from "@/data/images";
import { ParkCard } from "@/components/ParkCard";

export default function UniversalPage() {
  const parks = getUniversalParks();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden mb-8">
        <Image src={images.universalStudios} alt="Universal" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/80 to-orange-900/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold">Universal Orlando</h1>
          <p className="opacity-90 mt-1">
            Entrada temprana hotel Universal · 06 Epic · 07 Islands+HHN · 08 Studios
          </p>
        </div>
      </div>

      <Link
        href="/universal/halloween"
        className="block relative rounded-3xl overflow-hidden mb-8 min-h-[180px] group"
      >
        <Image
          src={images.halloween}
          alt="HHN"
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative p-6 md:p-8 text-white">
          <div className="text-4xl mb-2">🎃</div>
          <h2 className="font-display text-3xl font-bold">Halloween Horror Nights</h2>
          <p className="text-white/80 mt-2 max-w-xl">
            07/10 — la noche estrella. Modo valiente o miedoso. Tocá para entrar al portal.
          </p>
        </div>
      </Link>

      <div className="grid md:grid-cols-3 gap-5">
        {parks.map((p) => (
          <ParkCard key={p.id} park={p} basePath="/universal" />
        ))}
      </div>
    </div>
  );
}
