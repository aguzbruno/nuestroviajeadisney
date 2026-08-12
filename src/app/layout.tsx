import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Fredoka,
  Great_Vibes,
  Nunito,
  Oswald,
} from "next/font/google";
import { DesktopOnlyGate } from "@/components/DesktopOnlyGate";
import { RegisterSW } from "@/components/RegisterSW";
import { VisitorProvider } from "@/components/VisitorProvider";
import { WhoAreYouGate } from "@/components/WhoAreYouGate";
import { TripHeader } from "@/components/TripHeader";
import { BackToAlbum } from "@/components/BackToAlbum";
import { isMobileBlocked } from "@/lib/isMobileRequest";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Viaje Mágico · Disney · Universal · NYC",
    template: "%s · Viaje Mágico",
  },
  description:
    "Itinerario familiar interactivo: Orlando (Disney + Universal + HHN) y Nueva York 2026",
  applicationName: "Viaje Mágico",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Viaje Mágico",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a5fb4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d3a7a" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mobileBlocked = await isMobileBlocked();

  return (
    <html
      lang="es"
      className={`${fredoka.variable} ${nunito.variable} ${cormorant.variable} ${greatVibes.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        {mobileBlocked ? (
          <DesktopOnlyGate />
        ) : (
          <VisitorProvider>
            <RegisterSW />
            <WhoAreYouGate />
            <TripHeader />
            <main className="flex-1">
              <BackToAlbum />
              {children}
            </main>
            <footer className="px-4 pb-[max(2rem,var(--safe-bottom))] pt-8 text-center text-sm text-ink/50">
              Hecho con magia para Gala, Agustin, Alejandra, Emma y Marcelo · 2026
            </footer>
          </VisitorProvider>
        )}
      </body>
    </html>
  );
}
