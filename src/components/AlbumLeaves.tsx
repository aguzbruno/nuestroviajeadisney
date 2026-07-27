"use client";

import Image from "next/image";
import Link from "next/link";
import type { ItineraryDay } from "@/types/trip";
import { dayDescriptions, dayImages, images } from "@/data/images";
import { useVisitor } from "@/components/VisitorProvider";
import {
  activitiesForVisitor,
  earlyEntryForDay,
  highlightForVisitor,
} from "@/lib/itinerary";
import { trip } from "@/data/trip";
import { useEffect, useState, type CSSProperties } from "react";

export function AlbumWelcomeLeaf() {
  const { visitor } = useVisitor();
  const name = visitor?.shortName;
  const accent = visitor?.color ?? "#1a5fb4";

  return (
    <div className="album-leaf justify-center">
      <span
        className="album-blob -left-8 -top-6 h-28 w-28 bg-[#7ec8e3]/35"
        style={{ borderRadius: "70% 30% 60% 40% / 40% 60% 30% 70%" }}
      />
      <span className="album-blob -right-10 top-16 h-24 w-24 bg-[#f0c14b]/30" />
      <span className="album-blob bottom-4 left-10 h-16 w-20 bg-[#ff8fab]/25" />

      <MickeySticker className="album-float absolute right-2 top-3 z-[1] h-11 w-11" />
      <StarSticker className="album-float absolute left-3 top-10 z-[1] h-6 w-6 text-[#f0c14b]" style={{ animationDelay: "0.6s" }} />

      <div className="relative z-[1]">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-display font-bold text-white shadow-sm"
          style={{ background: accent }}
        >
          ¡Hola!
        </span>
        <h2 className="font-display mt-3 text-[2.1rem] xl:text-[2.45rem] font-bold leading-[1.05] text-[#1a2a44]">
          {name ? name : "¡El viaje empieza!"}
        </h2>
        <p className="mt-2 max-w-[17rem] text-sm leading-relaxed text-[#1a2a44]/65">
          18 días de magia. Pasá las hojas y descubrí cada capítulo de la
          aventura.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {[
            { label: "Avión", color: "#7ec8e3", icon: "plane" as const, rot: "-rotate-2" },
            { label: "Disney", color: "#f0c14b", icon: "castle" as const, rot: "rotate-2" },
            { label: "Universal", color: "#ff8fab", icon: "ride" as const, rot: "rotate-1" },
            { label: "NYC", color: "#9b59b6", icon: "liberty" as const, rot: "-rotate-1" },
          ].map((item) => (
            <div
              key={item.label}
              className={`album-sticker flex items-center gap-2 px-2.5 py-2 ${item.rot}`}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                style={{ background: item.color }}
              >
                <ChapterGlyph kind={item.icon} className="h-4 w-4" />
              </span>
              <span className="font-display text-sm font-bold text-[#1a2a44]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AlbumIntroRightLeaf({
  surprise,
  onShuffle,
}: Readonly<{
  surprise: string;
  onShuffle: () => void;
}>) {
  return (
    <div className="album-leaf justify-center gap-4 min-h-0">
      <span className="album-blob -right-6 -top-4 h-24 w-28 bg-[#ff8fab]/25" />
      <span className="album-blob -left-8 bottom-8 h-20 w-20 bg-[#7ec8e3]/30" />
      <BalloonSticker className="album-float absolute right-1 top-6 z-[1] h-10 w-8" style={{ animationDelay: "1s" }} />

      <div className="relative z-[1] space-y-4">
        <AlbumCountdown />

        <div className="relative rounded-[1.4rem] bg-white p-4 shadow-[0_10px_28px_rgba(26,60,120,0.1)] -rotate-1">
          <span className="album-washi left-6 -top-2 w-16 bg-[#ff8fab]/70 -rotate-3" />
          <span className="album-washi right-8 -top-1.5 w-12 bg-[#7ec8e3]/75 rotate-6" />
          <p className="font-display text-sm font-bold text-[#e31c23]">
            Sorpresa del día
          </p>
          <p className="mt-1.5 text-sm leading-snug text-[#1a2a44]/75 line-clamp-4">
            {surprise}
          </p>
          <button
            type="button"
            onClick={onShuffle}
            className="mt-3 font-display text-sm font-bold text-[#1a5fb4]"
          >
            ¡Otra! ✨
          </button>
        </div>
      </div>
    </div>
  );
}

function AlbumCountdown() {
  const [{ label, target }, setMeta] = useState(() => getCountdownTarget());
  const [parts, setParts] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const meta = getCountdownTarget();
      setMeta(meta);
      const diff = Math.max(0, meta.target - Date.now());
      setParts({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { v: parts.d, l: "días", color: "#1a5fb4" },
    { v: parts.h, l: "hs", color: "#e31c23" },
    { v: parts.m, l: "min", color: "#f0c14b" },
    { v: parts.s, l: "seg", color: "#9b59b6" },
  ];

  return (
    <div className="relative rounded-[1.6rem] bg-white p-4 shadow-[0_10px_28px_rgba(26,60,120,0.1)] rotate-1">
      <p className="text-center font-display text-xs font-bold uppercase tracking-wide text-[#1a2a44]/45">
        {label}
      </p>
      <div className="mt-3 flex justify-center gap-1.5">
        {cells.map((c) => (
          <div
            key={c.l}
            className="min-w-[3rem] rounded-2xl px-2 py-2 text-center text-white shadow-sm"
            style={{ background: c.color }}
          >
            <div className="font-display text-xl font-bold tabular-nums leading-none">
              {String(c.v).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[0.55rem] font-semibold uppercase opacity-80">
              {c.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getCountdownTarget() {
  const departure = new Date(trip.departureLocal).getTime();
  const now = Date.now();
  if (now < departure) {
    return { label: "Despegue EZE → MIA", target: departure };
  }
  const birthday = new Date(`${trip.birthdayDate}T18:30:00-04:00`).getTime();
  if (now < birthday) {
    return { label: "Cena cumpleaños Alejandra", target: birthday };
  }
  const end = new Date("2026-10-16T23:20:00-04:00").getTime();
  if (now < end) {
    return { label: "Vuelo de vuelta JFK", target: end };
  }
  return { label: "¡Ya volvieron!", target: now };
}

const CHAPTER_THEME: Record<
  string,
  {
    blob: string;
    badge: string;
    image: string;
    sticker: "plane" | "castle" | "ride" | "liberty" | "moon" | "mickey";
  }
> = {
  "✈️": {
    blob: "#7ec8e355",
    badge: "#1a5fb4",
    image: images.plane,
    sticker: "plane",
  },
  "🏰": {
    blob: "#f0c14b55",
    badge: "#1a5fb4",
    image: images.coverOrlando,
    sticker: "castle",
  },
  "🎢": {
    blob: "#ff8fab55",
    badge: "#e31c23",
    image: images.epicUniverse,
    sticker: "ride",
  },
  "🗽": {
    blob: "#9b59b655",
    badge: "#6c3483",
    image: images.coverNyc,
    sticker: "liberty",
  },
  "🎃": {
    blob: "#ff6b3555",
    badge: "#ff6b35",
    image: images.halloween,
    sticker: "moon",
  },
};

export function AlbumChapterLeaf({
  title,
  subtitle,
  cta,
  href,
  emoji,
  dark,
  image,
}: Readonly<{
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  emoji: string;
  dark?: boolean;
  image?: string;
}>) {
  const kind = glyphFromEmoji(emoji);
  const theme = CHAPTER_THEME[emoji] ?? CHAPTER_THEME["🏰"];
  const bg = image ?? theme.image;

  return (
    <div className="album-leaf relative isolate -m-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)] overflow-hidden xl:-m-7 xl:h-[calc(100%+3.5rem)] xl:w-[calc(100%+3.5rem)]">
      {/* Imagen de fondo incrustada */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div
        className={`absolute inset-0 ${
          dark
            ? "bg-gradient-to-t from-[#12081f] via-[#1a0a2e]/75 to-[#1a0a2e]/25"
            : "bg-gradient-to-t from-[#fff4e8] via-[#fff4e8]/45 to-black/20"
        }`}
      />

      {/* Stickers flotantes sobre la foto */}
      <span className="album-float absolute right-4 top-5 z-[2]">
        <span className="album-sticker flex h-12 w-12 items-center justify-center text-lg rotate-12">
          {emoji}
        </span>
      </span>
      <MickeySticker
        className="album-float absolute left-3 top-10 z-[2] h-9 w-9 -rotate-12"
        style={{ animationDelay: "0.5s" }}
      />
      <StarSticker
        className="album-float absolute right-12 top-[36%] z-[2] h-6 w-6"
        style={{
          color: dark ? "#ffb089" : "#f0c14b",
          animationDelay: "0.9s",
        }}
      />

      {/* Contenido */}
      <div className="relative z-[2] mt-auto flex flex-1 flex-col justify-end p-4 pb-5 xl:p-5 xl:pb-6">
        <div
          className={`relative rounded-[1.5rem] p-4 shadow-[0_12px_30px_rgba(20,40,80,0.18)] ${
            dark ? "bg-[#1a0a2e]/88 text-white" : "bg-white/93 text-[#1a2a44]"
          }`}
        >
          <span
            className="album-washi -top-2 left-5 w-14 -rotate-6"
            style={{ background: dark ? "#ff6b35cc" : "#7ec8e3cc" }}
          />
          <span
            className="album-washi -top-1.5 right-8 w-10 rotate-8"
            style={{ background: dark ? "#9b59b6cc" : "#f0c14bcc" }}
          />

          <div className="mb-2 flex items-center gap-2">
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md -rotate-6 ${
                dark ? "bg-[#ff6b35]" : ""
              }`}
              style={{ background: dark ? undefined : theme.badge }}
            >
              <ChapterGlyph kind={kind} className="h-5 w-5" />
            </span>
            <p
              className={`font-display text-xs font-bold uppercase tracking-wider ${
                dark ? "text-[#ffb089]" : "text-[#1a5fb4]"
              }`}
            >
              Capítulo
            </p>
          </div>

          <h2 className="font-display text-[1.85rem] xl:text-[2.15rem] font-bold leading-[1.05]">
            {title}
          </h2>
          <p
            className={`mt-1.5 text-sm leading-relaxed ${
              dark ? "text-white/70" : "text-[#1a2a44]/65"
            }`}
          >
            {subtitle}
          </p>
          <Link
            href={href}
            className={`album-cta mt-4 ${dark ? "album-cta-dark" : ""}`}
          >
            {cta} →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AlbumDayLeaf({
  day,
  dark,
}: Readonly<{ day: ItineraryDay; dark?: boolean }>) {
  const { visitor } = useVisitor();
  const image = day.image ?? dayImages[day.day];
  const description = day.description ?? dayDescriptions[day.day];
  const highlight = highlightForVisitor(day, visitor?.id);
  const earlyEntry = earlyEntryForDay(day);
  const activities = activitiesForVisitor(day, visitor?.id).slice(0, 4);
  const tiltAlt = day.day % 2 === 0;

  let detailHref: string | null = null;
  if (day.parkId) {
    if (day.theme === "halloween") detailHref = "/universal/halloween";
    else if (day.chapter === "disney") detailHref = `/disney/${day.parkId}`;
    else detailHref = `/universal/${day.parkId}`;
  }

  const dateLine = day.sharedPart
    ? `Parte ${day.sharedPart.index}/${day.sharedPart.total} · ${day.dateLabel}`
    : day.dateLabel;

  return (
    <div className="album-leaf overflow-visible">
      <span
        className="album-blob -right-8 -top-6 h-24 w-24"
        style={{ background: dark ? "#ff6b3533" : "#f0c14b33" }}
      />

      {image && (
        <div className="relative z-[1] mx-auto w-[92%] shrink-0 pt-4">
          <div
            className={`album-polaroid relative ${
              tiltAlt ? "album-polaroid-alt" : ""
            }`}
          >
            <span
              className={`album-washi -top-2 left-1/2 w-20 -translate-x-1/2 ${
                dark ? "bg-[#ff6b35]/75" : "bg-[#7ec8e3]/8"
              }`}
            />
            <div className="relative h-[118px] overflow-hidden rounded-md xl:h-[132px]">
              <Image
                src={image}
                alt={day.title}
                fill
                className="object-cover"
                sizes="260px"
              />
            </div>
            <p className="mt-1.5 text-center font-display text-xs font-bold text-[#1a2a44]/8">
              {dateLine}
            </p>
          </div>
          {/* Badge fuera del overflow de la polaroid */}
          <div className="absolute right-0 top-1 z-20 flex min-w-[3.4rem] items-center justify-center rounded-full bg-[#e31c23] px-2.5 py-1.5 font-display text-[0.7rem] font-bold leading-none text-white shadow-md rotate-12">
            DÍA {day.day}
          </div>
        </div>
      )}

      <div className="relative z-[1] mt-3 flex min-h-0 flex-1 flex-col">
        {!image && (
          <div className="mb-1 flex items-center gap-2">
            <span className="flex min-w-[3.4rem] items-center justify-center rounded-full bg-[#e31c23] px-2.5 py-1.5 font-display text-[0.7rem] font-bold text-white">
              DÍA {day.day}
            </span>
            <span
              className={`text-xs font-semibold ${
                dark ? "text-white/50" : "text-[#1a2a44]/45"
              }`}
            >
              {dateLine}
            </span>
          </div>
        )}

        <h3
          className={`font-display text-lg xl:text-xl font-bold leading-tight ${
            dark ? "text-white" : "text-[#1a2a44]"
          }`}
        >
          {day.title}
        </h3>
        <p
          className={`text-sm font-medium ${
            dark ? "text-white/70" : "text-[#1a2a44]/65"
          }`}
        >
          {day.subtitle}
        </p>

        {earlyEntry && (
          <span
            className={`mt-1.5 inline-flex self-start rounded-full px-2.5 py-1 text-[0.65rem] font-display font-bold ${
              dark
                ? "bg-[#ff6b35]/25 text-[#ffb089]"
                : "bg-[#fff1c9] text-[#8a6a10]"
            }`}
          >
            ⏰ {earlyEntry.short} {earlyEntry.approxTime}
          </span>
        )}

        {description && (
          <p
            className={`mt-1.5 line-clamp-2 text-xs leading-relaxed ${
              dark ? "text-white/50" : "text-[#1a2a44]/55"
            }`}
          >
            {description}
          </p>
        )}

        {highlight && (
          <div
            className={`mt-2 rounded-2xl px-3 py-2 text-xs font-semibold ${
              dark
                ? "bg-white/10 text-white"
                : "bg-[#ffe0e8] text-[#a01640]"
            }`}
          >
            ✨ {highlight}
          </div>
        )}

        <ul className="mt-2 flex-1 space-y-1">
          {activities.map((a) => (
            <li
              key={`${a.title}-${a.time ?? ""}`}
              className={`flex gap-2 text-xs ${
                dark ? "text-white/70" : "text-[#1a2a44]/75"
              }`}
            >
              {a.time && (
                <span
                  className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[0.65rem] ${
                    dark ? "bg-white/10" : "bg-white/90"
                  }`}
                >
                  {a.time}
                </span>
              )}
              <span className="line-clamp-1 font-medium">{a.title}</span>
            </li>
          ))}
        </ul>

        <DayLeafFooter day={day} dark={dark} detailHref={detailHref} />
      </div>
    </div>
  );
}

function DayLeafFooter({
  day,
  dark,
  detailHref,
}: Readonly<{
  day: ItineraryDay;
  dark?: boolean;
  detailHref: string | null;
}>) {
  if (day.theme === "halloween" && day.sharedPart?.index === 2) {
    return (
      <div className="mt-2 flex shrink-0 flex-col gap-1.5">
        <Link href="/universal/halloween#casas" className="album-cta album-cta-dark">
          Ver casas 🎃
        </Link>
        <Link
          href="/universal/halloween"
          className="font-display text-sm font-bold text-[#ffb089]"
        >
          Portal HHN →
        </Link>
      </div>
    );
  }

  if (day.day === 7 || (day.theme === "shopping" && day.day === 11)) {
    return (
      <Link href="/shopping#centros" className="album-cta mt-2 shrink-0">
        Shoppings →
      </Link>
    );
  }

  if (!detailHref) return null;

  return (
    <Link
      href={detailHref}
      className={`mt-2 shrink-0 font-display text-sm font-bold ${
        dark ? "text-[#ffb089]" : "text-[#1a5fb4]"
      }`}
    >
      Ver detalle →
    </Link>
  );
}

export function AlbumBlankLeaf({
  title,
  body,
  dark,
}: Readonly<{
  title: string;
  body: string;
  dark?: boolean;
}>) {
  return (
    <div className="album-leaf items-center justify-center px-4 text-center">
      <span
        className="album-blob left-1/2 top-10 h-28 w-28 -translate-x-1/2"
        style={{ background: dark ? "#ff6b3533" : "#7ec8e344" }}
      />
      <div className="relative z-[1]">
        <div
          className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full shadow-md ${
            dark ? "bg-white/10 text-[#ffb089]" : "bg-white text-[#f0c14b]"
          }`}
        >
          <StarSticker className="h-7 w-7" />
        </div>
        <h3
          className={`font-display text-2xl font-bold ${
            dark ? "text-white" : "text-[#1a2a44]"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-2 max-w-xs text-sm leading-relaxed ${
            dark ? "text-white/65" : "text-[#1a2a44]/6"
          }`}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

export function AlbumClosingLeft() {
  return (
    <div className="album-leaf items-center justify-center text-center">
      <span className="album-blob -left-6 top-8 h-24 w-24 bg-[#7ec8e3]/35" />
      <span className="album-blob -right-4 bottom-10 h-20 w-28 bg-[#f0c14b]/3" />
      <MickeySticker className="album-float absolute left-4 top-6 h-9 w-9" />
      <div className="relative z-[1]">
        <p className="text-4xl">🏠</p>
        <h2 className="font-display mt-2 text-[1.85rem] font-bold leading-tight text-[#1a2a44]">
          Sábado 17/10 · 11hs
        </h2>
        <p className="font-script mt-1 text-2xl text-[#1a5fb4]">
          Llegada a Ezeiza
        </p>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#1a2a44]/65">
          Fin del viaje… o el comienzo de las anécdotas.
        </p>
      </div>
    </div>
  );
}

export function AlbumClosingRight() {
  return (
    <div className="album-leaf items-center justify-center gap-4 text-center">
      <span className="album-blob right-0 top-6 h-24 w-24 bg-[#ff8fab]/3" />
      <StarSticker className="album-float absolute left-6 top-10 h-6 w-6 text-[#f0c14b]" />
      <div className="relative z-[1] flex w-full max-w-[210px] flex-col items-center gap-3">
        <p className="text-sm leading-relaxed text-[#1a2a44]/65">
          Coleccioná stickers y mirá el calendario completo.
        </p>
        <Link href="/calendario" className="album-cta w-full justify-center">
          Calendario
        </Link>
        <Link
          href="/album"
          className="album-cta album-cta-ghost w-full justify-center"
        >
          Stickers
        </Link>
      </div>
    </div>
  );
}

export function AlbumHhnPortalLeaf() {
  return (
    <div className="album-leaf items-center justify-center px-2 text-center">
      <span className="album-blob left-1/2 top-8 h-32 w-32 -translate-x-1/2 bg-[#ff6b3533]" />
      <div className="relative z-[1]">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-[1.6rem] bg-[#ff6b35] text-3xl shadow-lg -rotate-6">
          🎃
        </div>
        <h3 className="font-display text-2xl xl:text-3xl font-bold text-white">
          Portal HHN
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/65">
          Casas, scarezones y tips. Modo valiente o miedoso — vos elegís.
        </p>
        <Link
          href="/universal/halloween"
          className="album-cta album-cta-dark mt-5"
        >
          Entrar a HHN →
        </Link>
      </div>
    </div>
  );
}

type GlyphKind =
  | "plane"
  | "castle"
  | "ride"
  | "liberty"
  | "star"
  | "moon"
  | "mickey";

function glyphFromEmoji(emoji: string): GlyphKind {
  if (emoji.includes("✈")) return "plane";
  if (emoji.includes("🏰")) return "castle";
  if (emoji.includes("🎢")) return "ride";
  if (emoji.includes("🗽")) return "liberty";
  if (emoji.includes("🎃")) return "moon";
  return "mickey";
}

function ChapterGlyph({
  kind,
  className,
}: Readonly<{ kind: GlyphKind; className?: string }>) {
  if (kind === "plane") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
    );
  }
  if (kind === "castle") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M4 21V11l2-1V7l2 1.5L10 7v3l2-1 2 1V7l2 1.5L18 7v3l2 1v10H4zm6-3h4v-4h-4v4z" />
      </svg>
    );
  }
  if (kind === "ride") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M3 18c2-6 5-10 9-10s7 4 9 10H3zm4.5-3.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM7 7l2-4h6l2 4H7z" />
      </svg>
    );
  }
  if (kind === "liberty") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M11 2l1 3 3-1-1 3 3 1-3 1 1 3-3-1-1 3-1-3-3 1 1-3-3-1 3-1-1-3 3 1 1-3zm-1 10h4v10h-4V12zm-3 10h10v2H7v-2z" />
      </svg>
    );
  }
  if (kind === "moon") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2a9.9 9.9 0 0 0-7 2.7A10 10 0 1 0 19.3 19 10 10 0 0 1 12 2z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="7" cy="7" r="4" />
      <circle cx="17" cy="7" r="4" />
      <circle cx="12" cy="14" r="6" />
    </svg>
  );
}

function MickeySticker({
  className,
  style,
}: Readonly<{ className?: string; style?: CSSProperties }>) {
  return (
    <span className={`album-sticker p-1.5 ${className ?? ""}`} style={style}>
      <svg aria-hidden viewBox="0 0 48 48" className="h-full w-full text-[#1a1a2e]" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <circle cx="36" cy="12" r="10" />
        <circle cx="24" cy="28" r="15" />
      </svg>
    </span>
  );
}

function StarSticker({
  className,
  style,
}: Readonly<{ className?: string; style?: CSSProperties }>) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="currentColor"
    >
      <path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.8 5.7 20.8 8 13.6 2 9.2h7.6L12 2z" />
    </svg>
  );
}

function BalloonSticker({
  className,
  style,
}: Readonly<{ className?: string; style?: CSSProperties }>) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 48"
      className={className}
      style={style}
      fill="none"
    >
      <ellipse cx="16" cy="16" rx="12" ry="14" fill="#ff8fab" />
      <path d="M16 30c0 4 2 8 0 12" stroke="#1a2a44" strokeWidth="1.5" />
      <path d="M14 29h4l-2 3z" fill="#ff8fab" />
    </svg>
  );
}
