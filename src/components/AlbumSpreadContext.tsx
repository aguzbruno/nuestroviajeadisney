"use client";

import { createContext, useContext } from "react";

const AlbumSpreadContext = createContext(0);

export function AlbumSpreadProvider({
  pliego,
  children,
}: Readonly<{
  pliego: number;
  children: React.ReactNode;
}>) {
  return (
    <AlbumSpreadContext.Provider value={pliego}>
      {children}
    </AlbumSpreadContext.Provider>
  );
}

/** Índice del pliego actual (0-based). Fuera del álbum = 0. */
export function useAlbumSpread(): number {
  return useContext(AlbumSpreadContext);
}
