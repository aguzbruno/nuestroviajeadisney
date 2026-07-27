"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Brand, ShoppingCenter } from "@/types/trip";
import { BrandLogo } from "@/components/BrandLogo";

type BrandHit = {
  brand: Brand;
  centers: Pick<ShoppingCenter, "id" | "name" | "type">[];
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

export function BrandSearch({
  centers,
}: Readonly<{
  centers: ShoppingCenter[];
}>) {
  const [query, setQuery] = useState("");

  const brandIndex = useMemo(() => {
    const map = new Map<string, BrandHit>();
    for (const center of centers) {
      for (const brand of center.brands) {
        const existing = map.get(brand.id);
        if (existing) {
          if (!existing.centers.some((c) => c.id === center.id)) {
            existing.centers.push({
              id: center.id,
              name: center.name,
              type: center.type,
            });
          }
        } else {
          map.set(brand.id, {
            brand,
            centers: [{ id: center.id, name: center.name, type: center.type }],
          });
        }
      }
    }
    return [...map.values()].sort((a, b) =>
      a.brand.name.localeCompare(b.brand.name, "es"),
    );
  }, [centers]);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (q.length < 1) return [];
    return brandIndex.filter((hit) => normalize(hit.brand.name).includes(q));
  }, [brandIndex, query]);

  const showEmpty = query.trim().length > 0 && results.length === 0;

  return (
    <div className="card-magic rounded-3xl p-5 mb-10">
      <label htmlFor="brand-search" className="block">
        <span className="text-xs uppercase tracking-wider text-ink/50 font-semibold">
          Buscar marca
        </span>
        <span className="block font-display text-xl font-bold mt-1 mb-3">
          ¿Dónde está…?
        </span>
      </label>
      <div className="relative">
        <input
          id="brand-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nike, Sephora, Coach…"
          autoComplete="off"
          className="w-full rounded-2xl border border-ink/15 bg-white/80 px-4 py-3 pl-11 text-base text-ink placeholder:text-ink/40 outline-none focus:border-mk-blue focus:ring-2 focus:ring-mk-blue/20 transition"
        />
        <span
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40"
          aria-hidden
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-ink/50 hover:text-ink px-2 py-1 rounded-lg"
          >
            Limpiar
          </button>
        )}
      </div>

      {results.length > 0 && (
        <ul className="mt-4 space-y-3" aria-label="Resultados de marcas">
          {results.map(({ brand, centers: brandCenters }) => (
            <li
              key={brand.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl bg-white/70 border border-ink/8 p-3"
            >
              <div className="flex items-center gap-3 min-w-0 sm:w-48 shrink-0">
                <BrandLogo brand={brand} size={44} />
                <span className="font-display font-bold text-lg truncate">
                  {brand.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 flex-1">
                {brandCenters.map((c) => (
                  <Link
                    key={c.id}
                    href={`/shopping/${c.id}`}
                    className="inline-flex flex-col rounded-xl bg-mk-blue/8 hover:bg-mk-blue/15 border border-mk-blue/15 px-3 py-1.5 transition"
                  >
                    <span className="text-sm font-semibold text-mk-blue leading-tight">
                      {c.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-ink/50 font-semibold">
                      {c.type}
                    </span>
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      {showEmpty && (
        <p className="mt-4 text-sm text-ink/60">
          No encontramos “{query.trim()}” en los shoppings del viaje. Probá otro
          nombre o mirá las marcas de cada centro abajo.
        </p>
      )}
    </div>
  );
}
