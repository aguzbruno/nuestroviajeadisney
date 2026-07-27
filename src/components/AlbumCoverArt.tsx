"use client";

import { images } from "@/data/images";

/** Tapa scrapbook — layout flex (sin absolute que colapse ni Image fill). */
export function AlbumCoverArt() {
  return (
    <div className="album-cover-art relative flex h-full min-h-[280px] flex-col overflow-hidden text-[#1a3a6b]">
      <div className="pointer-events-none absolute inset-[0.55rem] z-20 border border-[#c9a86c]/80 sm:inset-2.5" />
      <div className="pointer-events-none absolute inset-[0.7rem] z-20 border border-[#c9a86c]/35" />

      {/* Zona superior: fotos + tipografía */}
      <div className="relative z-10 mx-[0.85rem] mt-[0.85rem] flex min-h-0 flex-[1.55] flex-col overflow-hidden sm:mx-3.5 sm:mt-3.5">
        <div className="absolute inset-0 grid grid-cols-2">
          <div
            className="relative bg-[#1a5fb4] bg-cover bg-center"
            style={{ backgroundImage: `url(${images.coverOrlando})` }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <MickeyHead className="absolute bottom-[18%] left-2 h-10 w-10 text-white/85 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
              <MinnieBow className="absolute bottom-[14%] left-11 h-4 w-4 text-[#ff6b8a]/95 drop-shadow" />
              <CastleMini className="absolute left-2.5 top-[40%] h-9 w-9 text-[#f5e6c0]/8 drop-shadow" />
              <MagicWand className="absolute bottom-[22%] left-[40%] h-6 w-6 rotate-12 text-[#ffe08a]/9 drop-shadow" />
            </div>
          </div>
          <div
            className="relative bg-[#0a1628] bg-cover bg-[center_30%]"
            style={{ backgroundImage: `url(${images.coverNyc})` }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <EmpireState className="absolute bottom-[16%] right-2.5 h-12 w-5 text-white/85 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
              <StatueOfLiberty className="absolute bottom-[16%] right-9 h-11 w-6 text-[#f5e6c0]/9 drop-shadow" />
              <ChryslerBuilding className="absolute bottom-[18%] right-[36%] h-10 w-4 text-white/55 drop-shadow" />
              <YellowTaxi className="absolute bottom-2 right-3 h-3.5 w-7 text-[#f0c14b]/95 drop-shadow" />
              <BrooklynBridge className="absolute bottom-[14%] left-1.5 h-6 w-12 text-white/45" />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] w-px -translate-x-1/2 bg-white/55" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/55" />

        <div className="relative z-[2] mx-auto mt-[8%] flex w-[min(100%,15.5rem)] flex-col items-center rounded-sm bg-[#0a1e3a]/72 px-3 py-3 text-center shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/15 backdrop-blur-[2px]">
          <p className="font-cover-sans text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#ffe9b0] sm:text-[0.68rem]">
            Nuestro inolvidable
          </p>
          <h1
            className="album-cover-title font-script mt-1 text-[2.35rem] leading-[0.95] text-[#fff8e8] sm:text-[2.7rem]"
          >
            Viaje Familiar
          </h1>
          <p className="font-cover-sans mt-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white sm:text-[0.8rem]">
            A Orlando + Nueva York
          </p>
        </div>
      </div>

      {/* Emblema */}
      <div className="relative z-30 -mt-5 flex flex-col items-center">
        <div
          className="relative flex h-[4.2rem] w-[4.2rem] items-center justify-center bg-[#f4ebe0] shadow-[0_6px_18px_rgba(40,30,10,0.28)]"
          style={{
            clipPath:
              "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
          }}
        >
          <div
            className="absolute inset-[3px] bg-[#1a3a6b]"
            style={{
              clipPath:
                "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-0.5">
            <MickeyHead className="h-7 w-7 text-[#f4ebe0]" />
            <MiniSkyline className="h-2.5 w-9 text-[#f4ebe0]/85" />
          </div>
        </div>
        <div className="relative -mt-1.5 border border-[#c9a86c]/70 bg-[#f3e7d2] px-3.5 py-1 shadow-sm">
          <div className="absolute -left-1.5 top-0 bottom-0 w-1.5 bg-[#e2d2b4] [clip-path:polygon(100%_0,100%_100%,0_50%)]" />
          <div className="absolute -right-1.5 top-0 bottom-0 w-1.5 bg-[#e2d2b4] [clip-path:polygon(0_0,0_100%,100%_50%)]" />
          <p className="whitespace-nowrap font-cover-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-[#1a3a6b] sm:text-[0.56rem]">
            29 septiembre — 17 octubre
          </p>
        </div>
        <div className="mt-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-[#c9a86c]/80 bg-[#f4ebe0] shadow-sm">
          <span className="font-cover-sans text-[0.48rem] font-bold tracking-wide text-[#1a3a6b]">
            2026
          </span>
        </div>
      </div>

      {/* Mapa */}
      <div className="relative z-10 mx-[0.85rem] mb-6 mt-1 min-h-[4.5rem] flex-1 overflow-hidden sm:mx-3.5 sm:mb-7">
        <CoverMap />
        <div className="absolute bottom-1 left-1 flex h-10 w-10 -rotate-[16deg] items-center justify-center rounded-full border-[1.5px] border-dashed border-[#1a3a6b]/45 opacity-55">
          <MickeyHead className="h-4 w-4 text-[#1a3a6b]/55" />
        </div>
        <div className="absolute bottom-2 right-1.5 flex h-10 w-10 rotate-[14deg] scale-90 items-center justify-center rounded-full border-[1.5px] border-dashed border-[#1a3a6b]/45 opacity-50">
          <StatueOfLiberty className="h-5 w-3 text-[#1a3a6b]/55" />
        </div>
      </div>

      <p className="absolute bottom-1.5 left-0 right-0 z-30 text-center font-cover-sans text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#1a3a6b]/80">
        Abrir álbum
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

function MinnieBow({ className }: Readonly<{ className?: string }>) {
  return (
    <svg aria-hidden viewBox="0 0 40 28" className={className} fill="currentColor">
      <ellipse cx="10" cy="14" rx="10" ry="8" />
      <ellipse cx="30" cy="14" rx="10" ry="8" />
      <circle cx="20" cy="14" r="5" />
    </svg>
  );
}

function CastleMini({ className }: Readonly<{ className?: string }>) {
  return (
    <svg aria-hidden viewBox="0 0 48 48" className={className} fill="currentColor">
      <rect x="6" y="28" width="8" height="16" />
      <polygon points="6,28 10,18 14,28" />
      <rect x="34" y="30" width="8" height="14" />
      <polygon points="34,30 38,20 42,30" />
      <rect x="16" y="24" width="16" height="20" />
      <polygon points="16,24 24,10 32,24" />
      <rect x="22" y="4" width="4" height="10" />
      <circle cx="24" cy="3" r="2" />
    </svg>
  );
}

function MagicWand({ className }: Readonly<{ className?: string }>) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className} fill="currentColor">
      <rect
        x="18"
        y="14"
        width="3"
        height="22"
        rx="1"
        transform="rotate(-35 19.5 25)"
      />
      <path d="M26 6l1.8 4.2H32l-3.4 2.6 1.2 4.2L26 14.4l-3.8 2.6 1.2-4.2L20 10.2h4.2z" />
    </svg>
  );
}

function EmpireState({ className }: Readonly<{ className?: string }>) {
  return (
    <svg aria-hidden viewBox="0 0 24 56" className={className} fill="currentColor">
      <rect x="4" y="20" width="16" height="36" />
      <rect x="7" y="12" width="10" height="8" />
      <rect x="9" y="6" width="6" height="6" />
      <rect x="11" y="0" width="2" height="6" />
    </svg>
  );
}

function ChryslerBuilding({ className }: Readonly<{ className?: string }>) {
  return (
    <svg aria-hidden viewBox="0 0 20 48" className={className} fill="currentColor">
      <rect x="5" y="22" width="10" height="26" />
      <polygon points="5,22 10,4 15,22" />
      <rect x="9" y="0" width="2" height="5" />
    </svg>
  );
}

function StatueOfLiberty({ className }: Readonly<{ className?: string }>) {
  return (
    <svg aria-hidden viewBox="0 0 28 56" className={className} fill="currentColor">
      <rect x="10" y="28" width="8" height="22" />
      <rect x="8" y="50" width="12" height="6" />
      <circle cx="14" cy="18" r="5" />
      <path d="M14 8l1.5 5H20l-3.5 2.8L18 21l-4-2.6L10 21l1.5-5.2L8 13h4.5z" />
      <rect x="20" y="20" width="2" height="14" />
    </svg>
  );
}

function BrooklynBridge({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 28"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path
        d="M4 24 V10 h6 V24 M54 24 V10 h6 V24"
        fill="currentColor"
        stroke="none"
        opacity="0.7"
      />
      <path d="M7 10 Q32 0 57 10" />
      <path d="M7 14 Q32 6 57 14" opacity="0.6" />
      <path d="M2 24 H62" />
    </svg>
  );
}

function YellowTaxi({ className }: Readonly<{ className?: string }>) {
  return (
    <svg aria-hidden viewBox="0 0 40 18" className={className} fill="currentColor">
      <rect x="2" y="7" width="36" height="7" rx="2" />
      <path d="M8 7l3-5h14l4 5z" />
      <circle cx="10" cy="15" r="2.5" />
      <circle cx="30" cy="15" r="2.5" />
    </svg>
  );
}

function MiniSkyline({ className }: Readonly<{ className?: string }>) {
  return (
    <svg aria-hidden viewBox="0 0 40 10" className={className} fill="currentColor">
      <rect x="1" y="4" width="3" height="6" />
      <rect x="5" y="2" width="2.5" height="8" />
      <rect x="9" y="3.5" width="3" height="6.5" />
      <path d="M14 10V1.5h1.2V0h1.1v1.5H17.5V10h-1V5.5h-1.3V10z" />
      <rect x="20" y="5" width="2.5" height="5" />
      <path d="M24 10V4h1.3V2.2L26 1.2l.7 1V4H28v6z" />
      <rect x="30" y="3" width="2.2" height="7" />
      <rect x="34" y="5.5" width="4" height="4.5" />
    </svg>
  );
}

function CoverMap() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 320 140"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="coverMapGrid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M16 0H0V16"
            fill="none"
            stroke="#1a3a6b"
            strokeOpacity="0.06"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="320" height="140" fill="url(#coverMapGrid)" />
      <path
        d="M95 110 C110 88 125 65 140 50 C155 35 175 30 195 42 C215 54 235 70 255 78"
        fill="#1a3a6b"
        fillOpacity="0.06"
        stroke="#1a3a6b"
        strokeOpacity="0.18"
        strokeWidth="1"
      />
      <path
        d="M128 78 c4 8 6 16 4 24 c-1 5-4 8-8 6 c-3-2-3-8-2-14 c1-6 3-12 6-16z"
        fill="#1a3a6b"
        fillOpacity="0.18"
      />
      <g transform="translate(108,78)" fill="#1a3a6b" fillOpacity="0.35">
        <circle cx="4" cy="3" r="3.2" />
        <circle cx="12" cy="3" r="3.2" />
        <circle cx="8" cy="8" r="4.5" />
      </g>
      <g transform="translate(218,34)" fill="#1a3a6b" fillOpacity="0.4">
        <rect x="0" y="10" width="4" height="12" />
        <rect x="5" y="4" width="3.5" height="18" />
        <rect x="10" y="8" width="4" height="14" />
        <rect x="15" y="2" width="3" height="20" />
        <rect x="16" y="0" width="1" height="2" />
        <rect x="20" y="11" width="5" height="11" />
      </g>
      <path
        d="M132 92 C160 70 195 52 232 48"
        fill="none"
        stroke="#1a3a6b"
        strokeOpacity="0.45"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      <path d="M220 46 l10 1 -6 4 z" fill="#1a3a6b" fillOpacity="0.55" />
      <text
        x="118"
        y="112"
        fill="#1a3a6b"
        fillOpacity="0.4"
        fontSize="7"
        fontFamily="var(--font-oswald), sans-serif"
      >
        ORL
      </text>
      <text
        x="246"
        y="46"
        fill="#1a3a6b"
        fillOpacity="0.4"
        fontSize="7"
        fontFamily="var(--font-oswald), sans-serif"
      >
        NYC
      </text>
    </svg>
  );
}
