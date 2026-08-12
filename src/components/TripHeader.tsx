"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useVisitor } from "@/components/VisitorProvider";
import { Logo } from "@/components/Logo";
import { ChevronDown, Menu, X, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ALBUM_NAV_UNLOCKED_EVENT,
  isAlbumNavUnlocked,
} from "@/lib/storage";

const primaryLinks = [
  { href: "/", label: "Álbum" },
  { href: "/calendario", label: "Calendario" },
  { href: "/disney", label: "Disney" },
  { href: "/universal", label: "Universal" },
  { href: "/universal/halloween", label: "Halloween" },
  { href: "/nueva-york", label: "NYC" },
];

const moreLinks = [
  { href: "/vuelos", label: "Vuelos" },
  { href: "/hoteles", label: "Hoteles" },
  { href: "/shopping", label: "Shopping" },
  { href: "/album", label: "Stickers" },
  { href: "/ideas", label: "Ideas & packing" },
];

function linkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (pathname === href) return true;
  // Evitar que /universal marque activo /universal/halloween
  if (href === "/universal" && pathname.startsWith("/universal/halloween")) {
    return false;
  }
  return pathname.startsWith(`${href}/`);
}

export function TripHeader() {
  const { visitor, changeVisitor, ready } = useVisitor();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [albumNavUnlocked, setAlbumNavUnlocked] = useState<boolean | null>(
    null,
  );
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const moreIsActive = moreLinks.some((l) => linkActive(pathname, l.href));
  // En `/` desktop: ocultar hasta desbloqueo (álbum inmersivo). En mobile siempre visible.
  const hideOnAlbum =
    pathname === "/" && albumNavUnlocked !== true && !isMobileViewport;

  useEffect(() => {
    setAlbumNavUnlocked(isAlbumNavUnlocked());
    function onUnlock() {
      setAlbumNavUnlocked(true);
    }
    window.addEventListener(ALBUM_NAV_UNLOCKED_EVENT, onUnlock);
    return () => window.removeEventListener(ALBUM_NAV_UNLOCKED_EVENT, onUnlock);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobileViewport(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Cerrar menú al navegar (PWA / mobile).
  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Evitar scroll del body con el menú abierto (PWA).
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (hideOnAlbum) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-cream/80 backdrop-blur-md pt-[var(--safe-top)]">
      <div className="magic-band w-full" />
      {visitor?.birthdayMode && (
        <div className="bg-gold/90 px-3 py-1.5 text-center font-display text-sm font-semibold text-ink">
          🎂 Festejamos los 60 de Alejandra · Cena especial 04/10
        </div>
      )}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 py-3 pl-[max(1rem,var(--safe-left))] pr-[max(1rem,var(--safe-right))]">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Logo size={40} className="rounded-xl shadow-sm" />
          <div>
            <div className="font-display font-bold leading-tight text-mk-blue">
              Viaje Mágico
            </div>
            <div className="text-[10px] uppercase tracking-wider text-ink/50">
              Disney · Universal · NYC
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {primaryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                linkActive(pathname, l.href)
                  ? "bg-mk-blue text-white"
                  : "text-ink/70 hover:bg-white/70"
              }`}
            >
              {l.label}
            </Link>
          ))}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                moreIsActive || moreOpen
                  ? "bg-mk-blue text-white"
                  : "text-ink/70 hover:bg-white/70"
              }`}
            >
              Más
              <ChevronDown
                size={14}
                className={`transition ${moreOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 z-50 mt-2 w-48 rounded-2xl border border-ink/5 bg-white py-2 shadow-xl"
                >
                  {moreLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMoreOpen(false)}
                      className={`block px-4 py-2 text-sm font-semibold ${
                        linkActive(pathname, l.href)
                          ? "bg-mk-blue/10 text-mk-blue"
                          : "text-ink/70 hover:bg-cream"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          {ready && visitor && (
            <button
              type="button"
              onClick={changeVisitor}
              className="hidden items-center gap-2 rounded-full bg-white/70 py-1 pl-1 pr-3 text-sm hover:bg-white sm:flex"
              title="Cambiar viajero"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
                style={{ background: `${visitor.color}33` }}
              >
                {visitor.characterEmoji}
              </span>
              <span className="font-display font-semibold">
                Hola, {visitor.shortName}
              </span>
            </button>
          )}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="max-h-[min(70dvh,calc(100dvh-var(--safe-top)-5.5rem))] overflow-y-auto overscroll-contain border-t border-white/40 bg-cream/95 md:hidden"
          >
            <div className="flex flex-col gap-1 py-3 pl-[max(1rem,var(--safe-left))] pr-[max(1rem,var(--safe-right))] pb-[max(0.75rem,var(--safe-bottom))]">
              {visitor && (
                <button
                  type="button"
                  onClick={() => {
                    changeVisitor();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 py-2.5 text-left font-display"
                >
                  <Sparkles size={16} /> {visitor.characterEmoji}{" "}
                  {visitor.shortName} · cambiar
                </button>
              )}
              <p className="px-3 pt-2 text-[10px] font-bold uppercase tracking-wider text-ink/40">
                Principal
              </p>
              {primaryLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2.5 font-semibold ${
                    linkActive(pathname, l.href)
                      ? "bg-mk-blue text-white"
                      : "hover:bg-white"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <p className="px-3 pt-3 text-[10px] font-bold uppercase tracking-wider text-ink/40">
                Más
              </p>
              {moreLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2.5 font-semibold ${
                    linkActive(pathname, l.href)
                      ? "bg-mk-blue text-white"
                      : "hover:bg-white"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
