"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { travelers } from "@/data/travelers";
import { useVisitor } from "@/components/VisitorProvider";
import { Logo } from "@/components/Logo";
import {
  playCharacterFoundSound,
  playCharacterSearchSound,
} from "@/lib/characterRevealSound";

const INTRO_VIDEO_ID = "dqvF85T4vCg";
const INTRO_VOLUME = 50;
const WEB_FADE_MS = 1800;
const YT_HOST_ID = "adventure-intro-player";

type YtPlayer = {
  destroy: () => void;
  setVolume: (n: number) => void;
  unMute: () => void;
  playVideo: () => void;
  stopVideo: () => void;
};

type YtWindow = Window & {
  YT?: { Player: new (el: string, opts: object) => YtPlayer };
  onYouTubeIframeAPIReady?: () => void;
};

function getYtWindow(): YtWindow {
  return window as unknown as YtWindow;
}

function applyIntroVolume(player: YtPlayer) {
  player.unMute();
  player.setVolume(INTRO_VOLUME);
}

type GatePhase = "pick" | "spin" | "reveal" | "video" | "outro";

function loadYouTubeApi(): Promise<void> {
  return new Promise((resolve) => {
    const w = getYtWindow();

    if (w.YT?.Player) {
      resolve();
      return;
    }

    const previous = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };

    if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  });
}

export function WhoAreYouGate() {
  const { showGate, setVisitor, ready } = useVisitor();
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<GatePhase>("pick");
  const playerRef = useRef<YtPlayer | null>(null);
  const finishedRef = useRef(false);

  const traveler = travelers.find((t) => t.id === selected);

  function finishIntro() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      playerRef.current?.stopVideo();
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setPhase("outro");
  }

  useEffect(() => {
    if (phase !== "video") return;

    let cancelled = false;

    async function mountPlayer() {
      await loadYouTubeApi();
      if (cancelled || !document.getElementById(YT_HOST_ID)) return;

      const YT = getYtWindow().YT;
      if (!YT?.Player) return;

      playerRef.current = new YT.Player(YT_HOST_ID, {
        videoId: INTRO_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          iv_load_policy: 3,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: { target: YtPlayer }) => {
            applyIntroVolume(event.target);
            event.target.playVideo();
            window.setTimeout(() => applyIntroVolume(event.target), 200);
            window.setTimeout(() => applyIntroVolume(event.target), 800);
          },
          onStateChange: (event: { data: number; target: YtPlayer }) => {
            if (event.data === 1) applyIntroVolume(event.target);
            if (event.data === 0) finishIntro();
          },
          onError: () => finishIntro(),
        },
      });
    }

    void mountPlayer();

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase !== "outro" || !selected) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const timer = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      setVisitor(selected);
    }, WEB_FADE_MS);
    return () => window.clearTimeout(timer);
  }, [phase, selected, setVisitor]);

  if (!ready || !showGate) return null;

  function pick(id: string) {
    setSelected(id);
    setPhase("spin");
    playCharacterSearchSound();
    setTimeout(() => {
      playCharacterFoundSound();
      setPhase("reveal");
    }, 1400);
  }

  function confirm() {
    if (!selected) return;
    finishedRef.current = false;
    setPhase("video");
  }

  if (phase === "video" || phase === "outro") {
    return (
      <motion.div
        className="fixed inset-0 z-[100] bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "outro" ? 0 : 1 }}
        transition={{ duration: WEB_FADE_MS / 1000, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            id={YT_HOST_ID}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 [&_iframe]:h-full [&_iframe]:w-full"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

        <button
          type="button"
          onClick={finishIntro}
          className="absolute bottom-8 right-6 z-10 rounded-full bg-white/90 px-5 py-2.5 font-display text-sm font-bold text-[#1a5fb4] shadow-lg transition hover:scale-105"
        >
          Saltar intro
        </button>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-gradient-to-b from-[#fff9ef] via-[#fff4e8] to-[#ffeef5]">
      <span className="album-blob pointer-events-none fixed -left-16 -top-10 h-56 w-56 bg-[#7ec8e3]/4" />
      <span className="album-blob pointer-events-none fixed -right-12 top-24 h-44 w-44 bg-[#f0c14b]/35" />
      <span className="album-blob pointer-events-none fixed bottom-10 left-1/4 h-36 w-40 bg-[#ff8fab]/3" />

      <div className="relative mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center px-4 py-10">
        <div className="mb-7 text-center">
          <Logo size={68} className="mx-auto mb-4 rounded-2xl shadow-lg ring-2 ring-white" />

          {/* Badge estilo álbum (reemplaza la pill genérica) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, rotate: -2 }}
            className="relative mx-auto mb-5 inline-block"
          >
            <div className="relative rounded-2xl bg-white px-5 py-2.5 shadow-[0_10px_28px_rgba(26,60,120,0.12)]">
              <span className="album-washi -top-2 left-4 w-12 bg-[#f0c14b]/85 -rotate-6" />
              <span className="album-washi -top-1.5 right-5 w-10 bg-[#7ec8e3]/85 rotate-8" />
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a5fb4] text-sm shadow-sm">
                  🪄
                </span>
                <div className="text-left">
                  <p className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-[#1a5fb4]">
                    Álbum familiar
                  </p>
                  <p className="font-display text-sm font-bold leading-none text-[#1a2a44]">
                    Viaje mágico 2026
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl font-bold text-[#1a2a44] md:text-5xl">
              ¿Quién viaja hoy?
            </h1>
            <p className="mt-2 text-base text-[#1a2a44]/65 md:text-lg">
              Tocá tu nombre y descubrí tu personaje Disney
            </p>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {phase === "pick" && (
            <motion.div
              key="pick"
              exit={{ opacity: 0, scale: 0.96 }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {travelers.map((t, i) => (
                <motion.button
                  key={t.id}
                  type="button"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => pick(t.id)}
                  className={`album-sticker relative flex items-center gap-3 p-3.5 text-left ${
                    i % 2 === 0 ? "-rotate-1" : "rotate-1"
                  }`}
                >
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-display font-bold text-white shadow-md"
                    style={{ background: t.color }}
                  >
                    {t.shortName[0]}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-display text-lg font-bold text-[#1a2a44]">
                      {t.name}
                    </div>
                    <div className="text-sm font-semibold text-[#1a2a44]/75">
                      {t.age} años
                    </div>
                  </div>
                  <span className="ml-auto text-xl opacity-40">→</span>
                </motion.button>
              ))}
            </motion.div>
          )}

          {phase === "spin" && (
            <motion.div
              key="spin"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative mx-auto max-w-md rounded-[1.75rem] bg-white p-10 text-center shadow-[0_16px_40px_rgba(26,60,120,0.14)]"
            >
              <span className="album-washi -top-2 left-8 w-16 bg-[#ff8fab]/8 -rotate-4" />
              <span className="album-washi -top-1.5 right-10 w-12 bg-[#f0c14b]/85 rotate-6" />
              <motion.div
                animate={{ rotate: [0, -20, 20, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#1a5fb4] text-4xl shadow-lg"
              >
                🪄
              </motion.div>
              <p className="font-display text-2xl font-bold text-[#1a2a44]">
                Bibbidi bobbidi…
              </p>
              <p className="mt-1 font-display text-lg text-[#1a5fb4]">
                ¡Revelando tu personaje!
              </p>
            </motion.div>
          )}

          {phase === "reveal" && traveler && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.86, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="relative mx-auto max-w-md"
            >
              {traveler.birthdayMode && (
                <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[1.75rem]">
                  {[...Array(16)].map((_, i) => {
                    const left = `${(i * 37 + 11) % 92}%`;
                    const startY = -24 - (i % 4) * 18;
                    return (
                      <motion.span
                        key={i}
                        className="absolute text-xl"
                        style={{ left }}
                        initial={{ y: startY, opacity: 1, rotate: -12 + (i % 5) * 6 }}
                        animate={{ y: 420, opacity: 0, rotate: 12 + (i % 3) * 8 }}
                        transition={{
                          duration: 2 + (i % 5) * 0.3,
                          delay: (i % 8) * 0.18,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        {i % 3 === 0 ? "🎉" : i % 3 === 1 ? "✨" : "🎂"}
                      </motion.span>
                    );
                  })}
                </div>
              )}

              <div className="relative rounded-[1.75rem] bg-white p-7 text-center shadow-[0_16px_40px_rgba(26,60,120,0.14)]">
                <span className="album-washi -top-2 left-8 w-16 bg-[#7ec8e3]/85 -rotate-5" />
                <span className="album-washi -top-1.5 right-10 w-12 bg-[#f0c14b]/85 rotate-7" />

                <div
                  className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-[1.4rem] text-4xl shadow-md -rotate-3"
                  style={{ background: `${traveler.color}22`, border: `3px solid ${traveler.color}` }}
                >
                  {traveler.characterEmoji}
                </div>

                <p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#1a5fb4]">
                  Tu personaje es
                </p>
                <h2
                  className="font-display mt-1 text-3xl font-bold md:text-4xl"
                  style={{ color: traveler.color }}
                >
                  {traveler.character}
                </h2>
                <p className="mt-1 font-display text-lg font-bold text-[#1a2a44]">
                  {traveler.shortName}
                </p>
                <p className="mx-auto mt-3 max-w-sm text-[#1a2a44]/65">
                  {traveler.birthdayMessage ?? traveler.greeting}
                </p>

                {traveler.birthdayMode && (
                  <p className="mt-5 font-display text-base font-bold text-[#1a5fb4]">
                    Festejamos tus 60 el 04/10 ✨
                  </p>
                )}

                <button
                  type="button"
                  onClick={confirm}
                  className={`album-cta mx-auto ${traveler.birthdayMode ? "mt-3" : "mt-6"}`}
                >
                  ¡Empezar la aventura!
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
