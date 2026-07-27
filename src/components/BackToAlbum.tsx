"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getAlbumReturnHref } from "@/lib/albumNav";

function BackToAlbumInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const href = getAlbumReturnHref(searchParams);

  // El álbum vive en inicio: no mostrar el volver ahí.
  if (!href || pathname === "/") return null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-4 pb-1">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-[#1a5fb4] transition hover:text-[#0d3a7a]"
      >
        ← Volver al álbum
      </Link>
    </div>
  );
}

/** Arriba a la izquierda de cada sección, solo si se llegó desde el álbum. */
export function BackToAlbum() {
  return (
    <Suspense fallback={null}>
      <BackToAlbumInner />
    </Suspense>
  );
}
