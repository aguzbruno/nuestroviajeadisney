import { Logo } from "@/components/Logo";

export function DesktopOnlyGate() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#fff9ef] via-[#fff4e8] to-[#ffeef5] px-6">
      <span className="album-blob pointer-events-none absolute -left-16 -top-10 h-56 w-56 bg-[#7ec8e3]/4" />
      <span className="album-blob pointer-events-none absolute -right-12 top-24 h-44 w-44 bg-[#f0c14b]/35" />
      <span className="album-blob pointer-events-none absolute bottom-10 left-1/4 h-36 w-40 bg-[#ff8fab]/3" />

      <div className="relative max-w-md text-center">
        <Logo
          size={72}
          className="mx-auto mb-6 rounded-2xl shadow-lg ring-2 ring-white"
        />
        <p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#1a5fb4]">
          Viaje mágico 2026
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-[#1a2a44]">
          Este sitio debe visitarse únicamente desde una computadora
        </h1>
        <p className="mt-4 text-base text-[#1a2a44]/65">
          Abrí la página desde una laptop o PC para continuar la aventura.
        </p>
      </div>
    </div>
  );
}
