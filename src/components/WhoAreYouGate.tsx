"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { travelers } from "@/data/travelers";
import { useVisitor } from "@/components/VisitorProvider";
import { Logo } from "@/components/Logo";
import { Sparkles } from "lucide-react";

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
            // Reaplicar por si YouTube resetea el volumen al iniciar
            window.setTimeout(() => applyIntroVolume(event.target), 200);
            window.setTimeout(() => applyIntroVolume(event.target), 800);
          },
          onStateChange: (event: { data: number; target: YtPlayer }) => {
            // 1 = playing
            if (event.data === 1) applyIntroVolume(event.target);
            // 0 = ended
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
    // finishIntro uses refs; only remount when entering video phase
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
    setTimeout(() => setPhase("reveal"), 1400);
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
          className="absolute bottom-8 right-6 z-10 rounded-full bg-white/15 px-5 py-2.5 font-display text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
        >
          Saltar intro
        </button>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] castle-bg flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl opacity-40"
            style={{ left: `${(i * 8) % 100}%`, top: `${(i * 13) % 80}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3 + i * 0.2, repeat: Infinity }}
          >
            {i % 2 === 0 ? "✨" : "⭐"}
          </motion.span>
        ))}
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="text-center text-white mb-8">
          <Logo size={72} className="mx-auto mb-5 rounded-2xl shadow-lg" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full text-sm mb-4">
              <Sparkles className="w-4 h-4 text-gold" />
              Viaje mágico 2026
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold drop-shadow-lg">
              ¿Quién viaja hoy?
            </h1>
            <p className="mt-3 text-sky/90 text-lg">
              Tocá tu nombre y descubrí tu personaje Disney
            </p>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {phase === "pick" && (
            <motion.div
              key="pick"
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {travelers.map((t, i) => (
                <motion.button
                  key={t.id}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => pick(t.id)}
                  className="card-magic rounded-2xl p-4 text-left flex items-center gap-4 cursor-pointer"
                >
                  <span
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${t.color}22`, border: `2px solid ${t.color}` }}
                  >
                    {t.shortName[0]}
                  </span>
                  <div>
                    <div className="font-display font-semibold text-lg text-ink">
                      {t.name}
                    </div>
                    <div className="text-sm text-ink/60">{t.age} años</div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {phase === "spin" && (
            <motion.div
              key="spin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card-magic rounded-3xl p-12 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="text-6xl mx-auto mb-4"
              >
                🪄
              </motion.div>
              <p className="font-display text-2xl text-ink">
                Bibbidi bobbidi… ¡revelando!
              </p>
            </motion.div>
          )}

          {phase === "reveal" && traveler && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-magic rounded-3xl p-8 text-center relative overflow-hidden"
            >
              {traveler.birthdayMode && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-xl"
                      initial={{ y: -20, x: `${(i * 5) % 100}%`, opacity: 1 }}
                      animate={{ y: 400, opacity: 0 }}
                      transition={{ duration: 2 + (i % 5) * 0.3, repeat: Infinity }}
                    >
                      {i % 3 === 0 ? "🎉" : i % 3 === 1 ? "✨" : "🎂"}
                    </motion.span>
                  ))}
                </div>
              )}
              <div className="text-6xl mb-3">{traveler.characterEmoji}</div>
              <p className="text-sm uppercase tracking-widest text-ink/50 mb-1">
                Tu personaje es
              </p>
              <h2
                className="font-display text-3xl md:text-4xl font-bold mb-2"
                style={{ color: traveler.color }}
              >
                {traveler.character}
              </h2>
              <p className="text-ink/80 text-lg mb-2">{traveler.shortName}</p>
              <p className="text-ink/70 max-w-md mx-auto mb-6">
                {traveler.birthdayMessage ?? traveler.greeting}
              </p>
              {traveler.birthdayMode && (
                <div className="mb-6 inline-block bg-gold/30 border border-gold rounded-full px-4 py-2 font-display font-semibold text-ink">
                  Festejamos tus 60 el 04/10 ✨
                </div>
              )}
              <button
                type="button"
                onClick={confirm}
                className="bg-mickey text-white font-display font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
              >
                ¡Empezar la aventura!
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
