"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  PAGE_TURN_DURATION_S,
  playPageTurnSound,
} from "@/lib/pageTurnSound";
import { BirthdayModal } from "@/components/BirthdayModal";
import { AlbumSpreadProvider } from "@/components/AlbumSpreadContext";
import {
  ALBUM_SPREAD_PARAM,
  parseAlbumSpreadParam,
} from "@/lib/albumNav";

export type AlbumSpread = {
  id: string;
  label: string;
  left: ReactNode;
  right: ReactNode;
  /** Oscuro en ambas hojas (legacy). Preferí leftDark / rightDark. */
  dark?: boolean;
  leftDark?: boolean;
  rightDark?: boolean;
  /** Al aterrizar en este pliego, abrir modal de cumpleaños. */
  celebrateBirthday?: boolean;
};

type Props = Readonly<{
  cover: ReactNode;
  spreads: AlbumSpread[];
}>;

type FlipState = {
  from: number;
  to: number;
  dir: 1 | -1;
};

const FLIP_MS = Math.round(PAGE_TURN_DURATION_S * 1000);

function sideDark(
  spread: AlbumSpread,
  side: "left" | "right",
): boolean {
  if (side === "left") return spread.leftDark ?? spread.dark ?? false;
  return spread.rightDark ?? spread.dark ?? false;
}

export function AlbumStory({ cover, spreads }: Props) {
  const [opened, setOpened] = useState(false);
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState<FlipState | null>(null);
  const [birthdayOpen, setBirthdayOpen] = useState(false);
  const [restored, setRestored] = useState(false);
  const busy = useRef(false);
  const indexRef = useRef(index);
  const openedRef = useRef(opened);
  const spreadsRef = useRef(spreads);
  indexRef.current = index;
  openedRef.current = opened;
  spreadsRef.current = spreads;

  const maybeCelebrate = useCallback((spreadIndex: number) => {
    if (spreadsRef.current[spreadIndex]?.celebrateBirthday) {
      setBirthdayOpen(true);
    }
  }, []);

  // Restaurar pliego desde `?pliego=` (vuelta desde un CTA del álbum).
  useEffect(() => {
    if (restored) return;
    const params = new URLSearchParams(window.location.search);
    const target = parseAlbumSpreadParam(params);
    setRestored(true);
    if (target == null) return;
    const clamped = Math.min(target, Math.max(spreadsRef.current.length - 1, 0));
    setOpened(true);
    setIndex(clamped);
    busy.current = false;
    window.setTimeout(() => maybeCelebrate(clamped), 400);
  }, [restored, maybeCelebrate]);

  // Sync del pliego en la URL mientras el álbum está abierto.
  useEffect(() => {
    if (!restored) return;
    const url = new URL(window.location.href);
    if (!opened) {
      url.searchParams.delete(ALBUM_SPREAD_PARAM);
    } else {
      url.searchParams.set(ALBUM_SPREAD_PARAM, String(index));
    }
    const next = `${url.pathname}${url.search}${url.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next !== current) {
      window.history.replaceState(null, "", next);
    }
  }, [opened, index, restored]);

  const openBook = useCallback(() => {
    if (openedRef.current || busy.current) return;
    busy.current = true;
    playPageTurnSound();
    setOpened(true);
    window.setTimeout(() => {
      busy.current = false;
      maybeCelebrate(0);
    }, 900);
  }, [maybeCelebrate]);

  const closeBook = useCallback(() => {
    if (!openedRef.current || busy.current) return;
    busy.current = true;
    playPageTurnSound();
    setOpened(false);
    setIndex(0);
    setFlip(null);
    setBirthdayOpen(false);
    window.setTimeout(() => {
      busy.current = false;
    }, 900);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (busy.current) return;

      if (!openedRef.current) {
        if (dir === 1) openBook();
        return;
      }

      const from = indexRef.current;
      const to = from + dir;
      if (to < 0) {
        closeBook();
        return;
      }
      if (to >= spreads.length) return;

      busy.current = true;
      playPageTurnSound();
      setFlip({ from, to, dir });
      window.setTimeout(() => {
        setIndex(to);
        setFlip(null);
        busy.current = false;
        maybeCelebrate(to);
      }, FLIP_MS);
    },
    [closeBook, openBook, maybeCelebrate, spreads.length],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.albumMode = "true";
    return () => {
      document.body.style.overflow = prevOverflow;
      delete document.body.dataset.albumMode;
    };
  }, []);

  const canPrev = opened;
  const canNext = !opened || index < spreads.length - 1;
  const displayIndex = flip ? flip.from : index;

  const activePliego = flip ? flip.to : index;

  return (
    <AlbumSpreadProvider pliego={activePliego}>
      <div className="relative flex flex-col h-full overflow-hidden album-desk">
        <BirthdayModal
          open={birthdayOpen}
          onClose={() => setBirthdayOpen(false)}
        />
        <div className="flex-1 flex items-center justify-center gap-2 xl:gap-4 px-3 py-2 min-h-0">
          <NavArrow
            label="Anterior"
            disabled={!canPrev || !!flip}
            onClick={() => go(-1)}
            side="left"
          />

          <div
            className="relative w-full max-w-[1100px] h-full max-h-[min(720px,calc(100dvh-5.5rem))]"
            style={{ perspective: "2800px" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {!opened ? (
                <motion.div
                  key="cover"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ rotateY: -18, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{
                    rotateY: -105,
                    opacity: 0.55,
                    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                  }}
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <button
                    type="button"
                    onClick={openBook}
                    className="relative aspect-[3/4] h-full max-h-full w-auto max-w-[min(420px,46vw)] text-left group"
                    aria-label="Abrir el álbum"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 translate-x-2 translate-y-3 rounded-r-md rounded-l-sm bg-black/20 blur-md"
                    />
                    {/* Lomo colorido */}
                    <div className="absolute inset-y-0 -left-2.5 w-3.5 rounded-l-2xl overflow-hidden shadow-md">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#1a5fb4] via-[#e31c23] to-[#f0c14b]" />
                    </div>
                    <div
                      aria-hidden
                      className="absolute inset-y-3 -right-2 w-2 rounded-r-xl bg-gradient-to-b from-white via-[#fff4e8] to-[#ffe0e8] border border-[#ffd6e2]/60"
                    />
                    <div className="relative h-full overflow-hidden rounded-2xl border-2 border-white shadow-[0_25px_70px_rgba(26,60,120,0.28)] ring-1 ring-[#7ec8e3]/40">
                      {cover}
                    </div>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="open-book"
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-8 bottom-0 h-7 bg-black/20 blur-xl rounded-full"
                  />
                  <div className="relative h-full album-book-shell">
                    <div
                      aria-hidden
                      className="absolute -left-1 inset-y-2 w-3 rounded-l-md bg-gradient-to-r from-[#2a1a0c] to-[#6b4423]"
                    />
                    <FlipBook
                      spreads={spreads}
                      index={displayIndex}
                      flip={flip}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavArrow
            label="Siguiente"
            disabled={!canNext || !!flip}
            onClick={() => go(1)}
            side="right"
          />
        </div>
      </div>
    </AlbumSpreadProvider>
  );
}

function NavArrow({
  label,
  disabled,
  onClick,
  side,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  side: "left" | "right";
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="shrink-0 w-11 h-11 xl:w-14 xl:h-14 rounded-full bg-white/95 border-2 border-[#7ec8e3]/50 shadow-lg flex items-center justify-center text-[#1a5fb4] transition enabled:hover:scale-110 enabled:hover:bg-white disabled:opacity-20 disabled:cursor-not-allowed"
    >
      <Icon className="w-7 h-7" strokeWidth={2.25} />
    </button>
  );
}

function FlipBook({
  spreads,
  index,
  flip,
}: {
  spreads: AlbumSpread[];
  index: number;
  flip: FlipState | null;
}) {
  const current = spreads[index];
  const incoming = flip ? spreads[flip.to] : null;
  const outgoing = flip ? spreads[flip.from] : current;

  // Cada mitad conserva el tema de la hoja que muestra (evita página negra tapando texto).
  const baseLeft = flip
    ? flip.dir === 1
      ? outgoing.left
      : incoming!.left
    : current.left;
  const baseRight = flip
    ? flip.dir === 1
      ? incoming!.right
      : outgoing.right
    : current.right;
  const baseLeftDark = flip
    ? flip.dir === 1
      ? sideDark(outgoing, "left")
      : sideDark(incoming!, "left")
    : sideDark(current, "left");
  const baseRightDark = flip
    ? flip.dir === 1
      ? sideDark(incoming!, "right")
      : sideDark(outgoing, "right")
    : sideDark(current, "right");

  return (
    <div
      className="absolute inset-0 rounded-sm shadow-[0_20px_60px_rgba(26,60,120,0.3)] border border-[#c4b090]"
      style={{ transformStyle: "preserve-3d", overflow: "visible" }}
    >
      {/* Marco de hojas base (recorta el contenido plano) */}
      <div className="absolute inset-0 rounded-sm overflow-hidden">
        <PageHalf side="left" dark={baseLeftDark}>
          {baseLeft}
        </PageHalf>
        <PageHalf side="right" dark={baseRightDark} stackedEdge>
          {baseRight}
        </PageHalf>
      </div>

      <div
        aria-hidden
        className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 z-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.22), rgba(255,255,255,0.3), rgba(0,0,0,0.22))",
        }}
      />

      {flip && flip.dir === 1 && (
        <TurningLeaf
          dir={1}
          dark={sideDark(outgoing, "right")}
          front={outgoing.right}
          back={incoming!.left}
          backDark={sideDark(incoming!, "left")}
        />
      )}
      {flip && flip.dir === -1 && (
        <TurningLeaf
          dir={-1}
          dark={sideDark(outgoing, "left")}
          front={outgoing.left}
          back={incoming!.right}
          backDark={sideDark(incoming!, "right")}
        />
      )}
    </div>
  );
}

function PageHalf({
  side,
  dark,
  stackedEdge,
  children,
}: {
  side: "left" | "right";
  dark?: boolean;
  stackedEdge?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute top-0 bottom-0 w-1/2 overflow-hidden ${
        side === "left" ? "left-0 border-r border-[#c9b896]/80" : "right-0"
      } ${dark ? "album-page-dark" : "album-page-light"}`}
    >
      <div
        aria-hidden
        className={`absolute inset-y-0 w-10 pointer-events-none z-10 ${
          side === "left"
            ? `right-0 ${dark ? "bg-gradient-to-l from-black/35 to-transparent" : "bg-gradient-to-l from-[#b8956a]/40 to-transparent"}`
            : `left-0 ${dark ? "bg-gradient-to-r from-black/35 to-transparent" : "bg-gradient-to-r from-[#b8956a]/40 to-transparent"}`
        }`}
      />
      {stackedEdge && (
        <div
          aria-hidden
          className="absolute inset-y-3 -right-[6px] w-[6px] rounded-r-sm bg-gradient-to-b from-[#f5ecd8] via-[#e8dcc4] to-[#d9c9a8] border border-[#c9b896]/50"
        />
      )}
      <div className="h-full overflow-hidden px-5 pt-6 pb-5 xl:px-7 xl:pt-7 xl:pb-7 flex flex-col">
        {children}
      </div>
    </div>
  );
}

function TurningLeaf({
  dir,
  dark,
  front,
  back,
  backDark,
}: {
  dir: 1 | -1;
  dark?: boolean;
  front: ReactNode;
  back: ReactNode;
  backDark?: boolean;
}) {
  const isForward = dir === 1;

  return (
    <motion.div
      className={`absolute top-0 bottom-0 w-1/2 z-40 ${
        isForward ? "right-0" : "left-0"
      }`}
      style={{
        transformOrigin: isForward ? "left center" : "right center",
        transformStyle: "preserve-3d",
      }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isForward ? -180 : 180 }}
      transition={{
        duration: PAGE_TURN_DURATION_S,
        ease: [0.45, 0.05, 0.25, 1],
      }}
    >
      {/* Cara frontal */}
      <div
        className={`absolute inset-0 overflow-hidden ${
          dark ? "album-page-dark" : "album-page-light"
        }`}
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          boxShadow: isForward
            ? "-12px 0 28px rgba(0,0,0,0.28)"
            : "12px 0 28px rgba(0,0,0,0.28)",
        }}
      >
        <div
          aria-hidden
          className={`absolute inset-y-0 w-12 pointer-events-none z-10 ${
            isForward
              ? `left-0 ${dark ? "bg-gradient-to-r from-black/30 to-transparent" : "bg-gradient-to-r from-[#b8956a]/35 to-transparent"}`
              : `right-0 ${dark ? "bg-gradient-to-l from-black/30 to-transparent" : "bg-gradient-to-l from-[#b8956a]/35 to-transparent"}`
          }`}
        />
        {/* Brillo que cruza al girar */}
        <motion.div
          aria-hidden
          className="absolute inset-0 z-20 pointer-events-none"
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.1, 0.35, 0.05] }}
          transition={{ duration: PAGE_TURN_DURATION_S }}
          style={{
            background: isForward
              ? "linear-gradient(90deg, rgba(255,255,255,0.35), transparent 45%, rgba(0,0,0,0.12))"
              : "linear-gradient(270deg, rgba(255,255,255,0.35), transparent 45%, rgba(0,0,0,0.12))",
          }}
        />
        <div className="h-full overflow-hidden px-5 pt-6 pb-5 xl:px-7 xl:pt-7 xl:pb-7 flex flex-col">
          {front}
        </div>
      </div>

      {/* Cara trasera (contenido de la hoja que aterriza) */}
      <div
        className={`absolute inset-0 overflow-hidden ${
          backDark ? "album-page-dark" : "album-page-light"
        }`}
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          boxShadow: isForward
            ? "12px 0 28px rgba(0,0,0,0.25)"
            : "-12px 0 28px rgba(0,0,0,0.25)",
        }}
      >
        <div
          aria-hidden
          className={`absolute inset-y-0 w-12 pointer-events-none z-10 ${
            isForward
              ? `right-0 ${backDark ? "bg-gradient-to-l from-black/30 to-transparent" : "bg-gradient-to-l from-[#b8956a]/35 to-transparent"}`
              : `left-0 ${backDark ? "bg-gradient-to-r from-black/30 to-transparent" : "bg-gradient-to-r from-[#b8956a]/35 to-transparent"}`
          }`}
        />
        <div className="h-full overflow-hidden px-5 pt-6 pb-5 xl:px-7 xl:pt-7 xl:pb-7 flex flex-col">
          {back}
        </div>
      </div>
    </motion.div>
  );
}
