"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { playHappyBirthday } from "@/lib/happyBirthdaySound";
import { useVisitor } from "@/components/VisitorProvider";

const COLORS = [
  "#D4AF37",
  "#E31C23",
  "#1A5FB4",
  "#FF6B9D",
  "#7EC8E3",
  "#F0C14B",
  "#FFFFFF",
  "#9B59B6",
];

const CONFETTI_MS = 5200;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  color: string;
  life: number;
};

function burst(width: number, height: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const fromLeft = Math.random() < 0.5;
    particles.push({
      x: fromLeft ? width * 0.12 : width * 0.88,
      y: height * (0.4 + Math.random() * 0.15),
      vx: (fromLeft ? 1 : -1) * (5 + Math.random() * 11),
      vy: -(9 + Math.random() * 14),
      w: 6 + Math.random() * 9,
      h: 8 + Math.random() * 11,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      life: 1,
    });
  }
  return particles;
}

function runConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduceMotion) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);

  let particles = burst(window.innerWidth, window.innerHeight, 110);
  let frame = 0;
  let raf = 0;
  const started = performance.now();
  let stopped = false;

  const stop = () => {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };

  const tick = (t: number) => {
    if (t - started > CONFETTI_MS) {
      stop();
      return;
    }
    if (frame === 28) {
      particles = particles.concat(
        burst(window.innerWidth, window.innerHeight, 80),
      );
    }
    if (frame === 70) {
      particles = particles.concat(
        burst(window.innerWidth, window.innerHeight, 50),
      );
    }
    frame += 1;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles = particles.filter((p) => {
      p.vy += 0.28;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.99;
      p.rot += p.vr;
      p.life -= 0.004;
      if (p.life <= 0 || p.y > window.innerHeight + 40) return false;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      return true;
    });

    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
  return stop;
}

export function BirthdayModal({
  open,
  onClose,
}: Readonly<{
  open: boolean;
  onClose: () => void;
}>) {
  const { visitor } = useVisitor();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const celebratedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      celebratedRef.current = false;
      return;
    }

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      celebratedRef.current = false;
      return;
    }

    let stopConfetti: (() => void) | undefined;
    let cancelled = false;

    const start = () => {
      if (cancelled || celebratedRef.current) return;
      celebratedRef.current = true;
      playHappyBirthday();
      const canvas = canvasRef.current;
      if (canvas) stopConfetti = runConfetti(canvas);
    };

    // Esperar a que el portal / AnimatePresence monte el canvas
    const t = window.setTimeout(start, 80);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      stopConfetti?.();
    };
  }, [open]);

  if (typeof document === "undefined") return null;

  const name =
    visitor?.birthdayMode && visitor.shortName
      ? visitor.shortName
      : "Alejandra";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 bg-ink/60 backdrop-blur-[3px]"
            onClick={onClose}
          />

          <canvas
            ref={canvasRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="birthday-modal-title"
            initial={{ opacity: 0, scale: 0.88, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="relative z-[2] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-gold/40 bg-gradient-to-br from-[#fff8e7] via-white to-[#ffe8ec]"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-mickey via-gold to-mk-blue" />

            <div className="px-6 pt-10 pb-7 text-center">
              <motion.div
                className="text-5xl mb-3"
                animate={{ rotate: [0, -8, 8, -4, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                🎂
              </motion.div>

              <p className="text-xs uppercase tracking-[0.28em] text-gold font-semibold mb-2">
                Día 6 · 4 de octubre
              </p>

              <h2
                id="birthday-modal-title"
                className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight"
              >
                ¡Feliz cumpleaños
                <br />
                <span className="text-mickey">{name}</span>!
              </h2>

              <p className="mt-3 text-ink/65 text-sm leading-relaxed max-w-xs mx-auto">
                Hoy se festejan los 60 con magia: Animal Kingdom de día y cena
                especial a la noche.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-7 inline-flex items-center justify-center font-display font-semibold bg-mk-blue text-white rounded-full px-7 py-3 text-sm hover:bg-mk-deep transition-colors shadow-lg shadow-mk-blue/25"
              >
                Continuar el viaje ✨
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
