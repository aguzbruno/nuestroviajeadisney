"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getShoppingCenter } from "@/data/shopping";
import { BrandLogo } from "@/components/BrandLogo";

export default function ShoppingCenterPage({
  params,
}: Readonly<{
  params: Promise<{ centro: string }>;
}>) {
  const { centro } = use(params);
  const center = getShoppingCenter(centro);

  if (!center) notFound();

  return (
    <div className="min-h-screen">
      <div className="relative h-52 md:h-64 overflow-hidden">
        {center.image && (
          <Image
            src={center.image}
            alt={center.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-950/80 to-mk-blue/50" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white max-w-6xl mx-auto w-full">
          <Link
            href="/shopping#centros"
            className="text-sm opacity-80 hover:underline w-fit"
          >
            ← Shopping Orlando
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-90">
              {center.type}
            </p>
            {center.chosen && (
              <span className="text-[10px] uppercase font-bold tracking-wider bg-white text-mk-blue rounded-full px-2.5 py-1">
                ✓ Vamos
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold mt-1">
            {center.name}
          </h1>
          <p className="mt-1 text-sm opacity-90">{center.address}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-ink/80 max-w-2xl">{center.description}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="bg-mk-blue/10 text-mk-blue border border-mk-blue/15 rounded-full px-3 py-1 font-medium">
            Ideal: {center.bestFor}
          </span>
          <span className="bg-ink/5 text-ink/70 border border-ink/10 rounded-full px-3 py-1">
            Desde Endless Summer: {center.distanceFromEndlessSummer}
          </span>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-3xl font-bold mb-1">Marcas</h2>
          <p className="text-ink/60 text-sm mb-6">
            {center.brands.length} tiendas destacadas en este centro
          </p>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {center.brands.map((b, i) => (
              <motion.li
                key={b.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="card-magic rounded-2xl p-4 flex flex-col items-center text-center gap-3"
              >
                <BrandLogo brand={b} size={64} />
                <span className="font-display font-semibold text-sm leading-snug">
                  {b.name}
                </span>
              </motion.li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold mb-4">Tips</h2>
          <ul className="card-magic rounded-2xl p-5 space-y-2 text-sm">
            {center.tips.map((t) => (
              <li key={t}>✨ {t}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
