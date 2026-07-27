"use client";

import { images } from "@/data/images";

/** Tapa en el mismo estilo lúdico que el interior del álbum. */
export function AlbumCoverArt() {
  return (
    <div className="relative flex h-full min-h-[280px] flex-col overflow-hidden bg-gradient-to-b from-[#fff9ef] via-[#fff4e8] to-[#ffeef5] text-[#1a2a44]">
      <span className="album-blob -left-10 -top-6 h-36 w-36 bg-[#7ec8e3]/4" />
      <span className="album-blob -right-8 top-20 h-28 w-28 bg-[#f0c14b]/35" />
      <span className="album-blob bottom-16 left-8 h-24 w-24 bg-[#ff8fab]/3" />

      {/* Stickers */}
      <span className="album-float absolute left-3 top-4 z-20">
        <span className="album-sticker flex h-11 w-11 items-center justify-center -rotate-12">
          <MickeyHead className="h-7 w-7 text-[#1a1a2e]" />
        </span>
      </span>
      <span className="album-float absolute right-3 top-6 z-20" style={{ animationDelay: "0.5s" }}>
        <span className="album-sticker flex h-10 w-10 items-center justify-center text-xl rotate-12">
          ✨
        </span>
      </span>
      <span className="album-float absolute right-5 bottom-28 z-20" style={{ animationDelay: "1s" }}>
        <span className="album-sticker flex h-9 w-9 items-center justify-center text-lg -rotate-6">
          🗽
        </span>
      </span>

      {/* Polaroids split */}
      <div className="relative z-10 mx-3 mt-12 flex min-h-0 flex-[1.4] items-center justify-center gap-2 px-1 sm:mx-4 sm:mt-14">
        <div className="album-polaroid w-[48%] max-w-[11rem] shrink-0">
          <span className="album-washi -top-2 left-1/2 w-14 -translate-x-1/2 bg-[#7ec8e3]/85 -rotate-3" />
          <div
            className="h-[7.5rem] rounded-md bg-cover bg-center sm:h-[8.5rem]"
            style={{ backgroundImage: `url(${images.coverOrlando})` }}
          />
          <p className="mt-1 text-center font-display text-[0.7rem] font-bold text-[#1a2a44]">
            Orlando
          </p>
        </div>
        <div className="album-polaroid album-polaroid-alt w-[48%] max-w-[11rem] shrink-0">
          <span className="album-washi -top-2 left-1/2 w-14 -translate-x-1/2 bg-[#ff8fab]/85 rotate-4" />
          <div
            className="h-[7.5rem] rounded-md bg-cover bg-[center_30%] sm:h-[8.5rem]"
            style={{ backgroundImage: `url(${images.coverNyc})` }}
          />
          <p className="mt-1 text-center font-display text-[0.7rem] font-bold text-[#1a2a44]">
            Nueva York
          </p>
        </div>
      </div>

      {/* Título */}
      <div className="relative z-10 mx-4 -mt-1 mb-2 rounded-[1.5rem] bg-white/95 px-4 py-3 text-center shadow-[0_10px_28px_rgba(26,60,120,0.12)]">
        <span className="album-washi -top-2 left-6 w-12 bg-[#f0c14b]/8 -rotate-6" />
        <span className="album-washi -top-1.5 right-7 w-10 bg-[#7ec8e3]/8 rotate-8" />
        <p className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-[#1a5fb4]">
          Nuestro inolvidable
        </p>
        <h1 className="font-display mt-0.5 text-[1.85rem] font-bold leading-none text-[#1a2a44] sm:text-[2.1rem]">
          Viaje Familiar
        </h1>
        <p className="mt-1 font-display text-sm font-bold text-[#e31c23]">
          Orlando + Nueva York
        </p>
        <div className="mt-2 inline-flex items-center rounded-full bg-[#1a5fb4] px-3 py-1 font-display text-[0.65rem] font-bold text-white">
          29 sep — 17 oct 2026
        </div>
      </div>

      <p className="relative z-10 mb-3 text-center font-display text-sm font-bold text-[#1a5fb4]">
        Tocá para abrir →
      </p>
    </div>
  );
}

function MickeyHead({ className }: Readonly<{ className?: string }>) {
  return (
    <svg aria-hidden viewBox="0 0 64 64" className={className} fill="currentColor">
      <circle cx="16" cy="16" r="13" />
      <circle cx="48" cy="16" r="13" />
      <circle cx="32" cy="36" r="20" />
    </svg>
  );
}
