"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { itinerary, getTravelStartPages, getUniversalStoryPages } from "@/data/itinerary";
import { DayCard } from "@/components/DayCard";
import { Countdown } from "@/components/Countdown";
import { useVisitor } from "@/components/VisitorProvider";
import { HiddenMickey } from "@/components/HiddenMickey";
import { tips } from "@/data/tips";
import { Sparkles } from "lucide-react";
import { AlbumStory, type AlbumSpread } from "@/components/AlbumStory";
import {
  AlbumBlankLeaf,
  AlbumChapterLeaf,
  AlbumClosingLeft,
  AlbumClosingRight,
  AlbumDayLeaf,
  AlbumIntroRightLeaf,
  AlbumWelcomeLeaf,
} from "@/components/AlbumLeaves";
import { AlbumCoverArt } from "@/components/AlbumCoverArt";
import type { ItineraryDay } from "@/types/trip";
import {
  ALBUM_NAV_UNLOCKED_EVENT,
  isAlbumNavUnlocked,
} from "@/lib/storage";

function Chapter({
  id,
  title,
  subtitle,
  cta,
  href,
  children,
  dark,
}: {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section id={id} className={`relative ${dark ? "hhn-bg text-white" : ""}`}>
      <div
        className={`border-b ${
          dark
            ? "bg-[#1a0a2e]/95 border-white/10 text-white"
            : "bg-cream/95 border-ink/5 text-ink"
        } backdrop-blur-md`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-5">
          <p
            className={`text-sm uppercase tracking-[0.2em] font-semibold ${
              dark ? "text-hhn-orange" : "text-mk-blue"
            }`}
          >
            Capítulo
          </p>
          <div className="flex flex-wrap items-end justify-between gap-3 mt-1">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                {title}
              </h2>
              <p
                className={`mt-1 max-w-xl text-sm md:text-base ${
                  dark ? "text-white/70" : "text-ink/70"
                }`}
              >
                {subtitle}
              </p>
            </div>
            <Link
              href={href}
              className={`inline-flex shrink-0 font-display font-semibold rounded-full px-5 py-2 text-sm md:text-base ${
                dark ? "bg-hhn-orange text-white" : "bg-mk-blue text-white"
              }`}
            >
              {cta}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-5 md:grid-cols-2">{children}</div>
      </div>
    </section>
  );
}

function HeroBlock() {
  const { visitor } = useVisitor();

  return (
    <section className="relative min-h-[85vh] flex items-center castle-bg text-white overflow-hidden">
      <HiddenMickey id="m1" className="top-24 right-8" />
      <div className="absolute inset-0 opacity-30">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{ left: `${10 + i * 11}%`, top: `${20 + (i % 4) * 15}%` }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity }}
          >
            ✨
          </motion.div>
        ))}
      </div>
      <div className="relative max-w-6xl mx-auto px-4 py-20 w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm mb-6"
        >
          <Sparkles className="w-4 h-4 text-gold" /> 29 sep – 17 oct 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-3xl"
        >
          {visitor
            ? `¡Hola ${visitor.characterEmoji} ${visitor.shortName}!`
            : "Disney · Universal · NYC"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-xl text-sky max-w-xl"
        >
          {visitor?.birthdayMode
            ? visitor.birthdayMessage
            : visitor
              ? visitor.greeting
              : "18 días de magia familiar. Scrolleá para vivir el cronograma."}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-white/70"
        >
          ↓ Bajá para ver el viaje día a día
        </motion.p>
      </div>
    </section>
  );
}

function IntroExtras({
  surprise,
  onShuffle,
}: {
  surprise: string;
  onShuffle: () => void;
}) {
  return (
    <div className="space-y-5">
      <Countdown />
      <div className="card-magic rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/80">
          <strong>Sorpresa del día:</strong> {surprise}
        </p>
        <button
          type="button"
          onClick={onShuffle}
          className="text-sm font-display font-semibold text-mickey"
        >
          Otra sorpresa ✨
        </button>
      </div>
    </div>
  );
}

function ClosingBlock() {
  return (
    <div className="text-center py-8">
      <div className="text-5xl mb-4">🏠✨</div>
      <h2 className="font-display text-4xl font-bold">
        Sábado 17/10 11hs — Llegada a Ezeiza
      </h2>
      <p className="text-ink/70 mt-3 max-w-md mx-auto">
        Fin del viaje… o el comienzo de las anécdotas. Coleccioná stickers en el
        álbum.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <Link
          href="/calendario"
          className="bg-mk-blue text-white font-display font-semibold px-6 py-3 rounded-full"
        >
          Calendario completo
        </Link>
        <Link
          href="/album"
          className="bg-white border border-mk-blue/20 font-display font-semibold px-6 py-3 rounded-full"
        >
          Ver álbum
        </Link>
      </div>
    </div>
  );
}

/** Capítulo: título | día1, luego pares de días. */
function isBirthdayDay(day?: ItineraryDay) {
  return day?.theme === "birthday" || day?.day === 6;
}

function chapterSpreads(
  days: ItineraryDay[],
  meta: {
    id: string;
    label: string;
    title: string;
    subtitle: string;
    cta: string;
    href: string;
    emoji: string;
    dark?: boolean;
  },
  oddExtra?: ReactNode,
): AlbumSpread[] {
  if (days.length === 0) return [];

  const out: AlbumSpread[] = [
    {
      id: `${meta.id}-open`,
      label: meta.label,
      dark: meta.dark,
      celebrateBirthday: isBirthdayDay(days[0]),
      left: (
        <AlbumChapterLeaf
          title={meta.title}
          subtitle={meta.subtitle}
          cta={meta.cta}
          href={meta.href}
          emoji={meta.emoji}
          dark={meta.dark}
        />
      ),
      right: <AlbumDayLeaf day={days[0]} dark={meta.dark} />,
    },
  ];

  const rest = days.slice(1);
  let usedExtra = false;

  for (let i = 0; i < rest.length; i += 2) {
    const a = rest[i];
    const b = rest[i + 1];
    let rightNode: ReactNode;
    if (b) {
      rightNode = <AlbumDayLeaf day={b} dark={meta.dark} />;
    } else if (oddExtra) {
      usedExtra = true;
      rightNode = oddExtra;
    } else {
      rightNode = (
        <AlbumBlankLeaf
          title="Página en blanco"
          body="La próxima hoja continúa la aventura."
          dark={meta.dark}
        />
      );
    }

    out.push({
      id: `${meta.id}-${a.day}`,
      label: b ? `${a.day}–${b.day}` : `${meta.label} ${a.day}`,
      dark: meta.dark,
      celebrateBirthday: isBirthdayDay(a) || isBirthdayDay(b),
      left: <AlbumDayLeaf day={a} dark={meta.dark} />,
      right: rightNode,
    });
  }

  if (oddExtra && !usedExtra) {
    out.push({
      id: `${meta.id}-extra`,
      label: meta.label,
      dark: meta.dark,
      left: oddExtra,
      right: (
        <AlbumBlankLeaf
          title="Fin de capítulo"
          body="Pasá la hoja para el siguiente destino."
          dark={meta.dark}
        />
      ),
    });
  }

  return out;
}

function useIsDesktopAlbum() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function MobileScrollStory({
  surprise,
  onShuffle,
}: {
  surprise: string;
  onShuffle: () => void;
}) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const disney = itinerary.filter((d) => d.chapter === "disney");
  const universalPages = getUniversalStoryPages();
  const nyc = itinerary.filter((d) => d.chapter === "nyc");
  const travelStart = getTravelStartPages();

  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 origin-left z-[60] bg-gradient-to-r from-mk-blue via-mickey to-gold"
        style={{ scaleX: progress }}
      />

      <HeroBlock />

      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        <IntroExtras surprise={surprise} onShuffle={onShuffle} />
      </section>

      <Chapter
        id="salida"
        title="La salida"
        subtitle="Vuelo a Miami, van a Orlando y Walmart."
        cta="Ver vuelos"
        href="/vuelos"
      >
        {travelStart.map((d, i) => (
          <DayCard key={`${d.day}-${d.title}`} day={d} index={i} />
        ))}
      </Chapter>

      <Chapter
        id="disney"
        title="Reino Disney"
        subtitle="Entrada temprana · MK → EPCOT → HS → AK + cena 60 · cambio a Endless Summer."
        cta="Explorar parques Disney"
        href="/disney"
      >
        <HiddenMickey id="m2" className="top-4 left-4" />
        {disney.map((d, i) => (
          <DayCard key={`${d.day}-${d.title}`} day={d} index={i} />
        ))}
      </Chapter>

      <Chapter
        id="universal"
        title="Universal Orlando"
        subtitle="Entrada temprana · Epic → Islands + HHN → Studios · shopping."
        cta="Ver parques Universal"
        href="/universal"
      >
        {universalPages.map((d, i) => (
          <DayCard key={`${d.day}-${d.title}`} day={d} index={i} />
        ))}
      </Chapter>

      <Chapter
        id="nyc"
        title="Nueva York"
        subtitle="Base en 166A Chelsea · High Line · skyline · vuelo de vuelta."
        cta="Ver NYC"
        href="/nueva-york"
      >
        <HiddenMickey id="m3" className="-top-2 right-8" />
        {nyc.map((d, i) => (
          <DayCard key={d.day} day={d} index={i} />
        ))}
      </Chapter>

      <section className="py-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <ClosingBlock />
        </motion.div>
      </section>
    </div>
  );
}

function DesktopAlbum({
  surprise,
  onShuffle,
}: {
  surprise: string;
  onShuffle: () => void;
}) {
  const { visitor } = useVisitor();
  const [navUnlocked, setNavUnlocked] = useState(false);

  useEffect(() => {
    setNavUnlocked(isAlbumNavUnlocked());
    function onUnlock() {
      setNavUnlocked(true);
    }
    window.addEventListener(ALBUM_NAV_UNLOCKED_EVENT, onUnlock);
    return () => window.removeEventListener(ALBUM_NAV_UNLOCKED_EVENT, onUnlock);
  }, []);

  const spreads: AlbumSpread[] = useMemo(() => {
    const disney = itinerary.filter((d) => d.chapter === "disney");
    const nyc = itinerary.filter((d) => d.chapter === "nyc");
    const travelStart = getTravelStartPages();
    const universalPages = getUniversalStoryPages();
    const [epic, islandsDay, hhnNight, studios, shopping] = universalPages;

    return [
      {
        id: "intro",
        label: "Inicio",
        left: <AlbumWelcomeLeaf />,
        right: (
          <AlbumIntroRightLeaf surprise={surprise} onShuffle={onShuffle} />
        ),
      },
      ...chapterSpreads(travelStart, {
        id: "salida",
        label: "Salida",
        title: "La salida",
        subtitle: "Vuelo a Miami, van a Orlando y Walmart.",
        cta: "Ver vuelos",
        href: "/vuelos",
        emoji: "✈️",
      }),
      ...chapterSpreads(disney, {
        id: "disney",
        label: "Disney",
        title: "Reino Disney",
        subtitle:
          "Entrada temprana · MK → EPCOT → HS → AK + cena 60 · cambio de hotel.",
        cta: "Explorar parques",
        href: "/disney",
        emoji: "🏰",
      }),
      {
        id: "universal-open",
        label: "Universal",
        left: (
          <AlbumChapterLeaf
            title="Universal Orlando"
            subtitle="Entrada temprana · Epic → Islands + HHN → Studios · shopping."
            cta="Ver parques"
            href="/universal"
            emoji="🎢"
          />
        ),
        right: <AlbumDayLeaf day={epic} />,
      },
      {
        id: "halloween-9",
        label: "HHN",
        leftDark: false,
        rightDark: true,
        left: <AlbumDayLeaf day={islandsDay} />,
        right: <AlbumDayLeaf day={hhnNight} dark />,
      },
      {
        id: "universal-10",
        label: "10–11",
        left: <AlbumDayLeaf day={studios} />,
        right: <AlbumDayLeaf day={shopping} />,
      },
      ...chapterSpreads(nyc, {
        id: "nyc",
        label: "NYC",
        title: "Nueva York",
        subtitle: "Base en 166A Chelsea · High Line · skyline · vuelta.",
        cta: "Ver NYC",
        href: "/nueva-york",
        emoji: "🗽",
      }),
      {
        id: "cierre",
        label: "Cierre",
        left: <AlbumClosingLeft />,
        right: <AlbumClosingRight />,
      },
    ];
  }, [surprise, onShuffle]);

  const albumHeightClass = !navUnlocked
    ? "h-dvh"
    : visitor?.birthdayMode
      ? "h-[calc(100dvh-7.25rem)]"
      : "h-[calc(100dvh-4.75rem)]";

  return (
    <div className={albumHeightClass}>
      <AlbumStory cover={<AlbumCoverArt />} spreads={spreads} />
    </div>
  );
}

export function ScrollStory() {
  const isDesktop = useIsDesktopAlbum();
  const [surprise, setSurprise] = useState(tips[0]);

  useEffect(() => {
    setSurprise(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  const shuffle = () =>
    setSurprise(tips[Math.floor(Math.random() * tips.length)]);

  if (isDesktop === null) {
    return <div className="min-h-[60vh]" aria-hidden />;
  }

  if (isDesktop) {
    return <DesktopAlbum surprise={surprise} onShuffle={shuffle} />;
  }

  return <MobileScrollStory surprise={surprise} onShuffle={shuffle} />;
}
