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
  const moreRef = useRef<HTMLDivElement>(null);

  const moreIsActive = moreLinks.some((l) => linkActive(pathname, l.href));
  // En `/` ocultar hasta confirmar desbloqueo (primera visita inmersiva).
  const hideOnAlbum = pathname === "/" && albumNavUnlocked !== true;

  useEffect(() => {
    setAlbumNavUnlocked(isAlbumNavUnlocked());
    function onUnlock() {
      setAlbumNavUnlocked(true);
    }
    window.addEventListener(ALBUM_NAV_UNLOCKED_EVENT, onUnlock);
    return () => window.removeEventListener(ALBUM_NAV_UNLOCKED_EVENT, onUnlock);
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

  if (hideOnAlbum) return null;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-cream/80 border-b border-white/40">
      <div className="magic-band w-full" />
      {visitor?.birthdayMode && (
        <div className="bg-gold/90 text-ink text-center text-sm font-display font-semibold py-1.5 px-3">
          🎂 Festejamos los 60 de Alejandra · Cena especial 04/10
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo size={40} className="rounded-xl shadow-sm" />
          <div>
            <div className="font-display font-bold text-mk-blue leading-tight">
              Viaje Mágico
            </div>
            <div className="text-[10px] text-ink/50 uppercase tracking-wider">
              Disney · Universal · NYC
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {primaryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold transition ${
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
              className={`px-3 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-1 transition ${
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
                  className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-xl border border-ink/5 py-2 z-50"
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
              className="hidden sm:flex items-center gap-2 bg-white/70 rounded-full pl-1 pr-3 py-1 text-sm hover:bg-white"
              title="Cambiar viajero"
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
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
            className="md:hidden p-2 rounded-full bg-white/70"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-white/40 bg-cream/95"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {visitor && (
                <button
                  type="button"
                  onClick={() => {
                    changeVisitor();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 py-2 text-left font-display"
                >
                  <Sparkles size={16} /> {visitor.characterEmoji} {visitor.shortName} ·
                  cambiar
                </button>
              )}
              <p className="text-[10px] uppercase tracking-wider text-ink/40 font-bold px-3 pt-2">
                Principal
              </p>
              {primaryLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-xl font-semibold ${
                    linkActive(pathname, l.href)
                      ? "bg-mk-blue text-white"
                      : "hover:bg-white"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <p className="text-[10px] uppercase tracking-wider text-ink/40 font-bold px-3 pt-3">
                Más
              </p>
              {moreLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-xl font-semibold ${
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
