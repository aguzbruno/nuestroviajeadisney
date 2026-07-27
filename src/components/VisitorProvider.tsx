"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getTraveler, travelers } from "@/data/travelers";
import type { Traveler } from "@/types/trip";
import {
  clearVisitorId,
  findMickey,
  getMickeyFinds,
  getUnlockedStickers,
  getVisitorId,
  setVisitorId,
  unlockSticker,
} from "@/lib/storage";

type VisitorContextValue = {
  visitor: Traveler | null;
  ready: boolean;
  showGate: boolean;
  setVisitor: (id: string) => void;
  changeVisitor: () => void;
  unlockedStickers: string[];
  unlock: (stickerId: string) => void;
  mickeyFinds: string[];
  addMickey: (id: string) => void;
};

const VisitorContext = createContext<VisitorContextValue | null>(null);

export function VisitorProvider({ children }: { children: ReactNode }) {
  const [visitorId, setId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [unlockedStickers, setStickers] = useState<string[]>([]);
  const [mickeyFinds, setMickeys] = useState<string[]>([]);

  useEffect(() => {
    const id = getVisitorId();
    setId(id);
    setShowGate(!id);
    setStickers(getUnlockedStickers());
    setMickeys(getMickeyFinds());
    setReady(true);
  }, []);

  const setVisitor = useCallback((id: string) => {
    setVisitorId(id);
    setId(id);
    setShowGate(false);
  }, []);

  const changeVisitor = useCallback(() => {
    clearVisitorId();
    setId(null);
    setShowGate(true);
  }, []);

  const unlock = useCallback((stickerId: string) => {
    unlockSticker(stickerId);
    setStickers(getUnlockedStickers());
  }, []);

  const addMickey = useCallback((id: string) => {
    const next = findMickey(id);
    setMickeys(next);
    setStickers(getUnlockedStickers());
  }, []);

  const visitor = useMemo(
    () => (visitorId ? getTraveler(visitorId) ?? null : null),
    [visitorId],
  );

  const value = useMemo(
    () => ({
      visitor,
      ready,
      showGate,
      setVisitor,
      changeVisitor,
      unlockedStickers,
      unlock,
      mickeyFinds,
      addMickey,
    }),
    [
      visitor,
      ready,
      showGate,
      setVisitor,
      changeVisitor,
      unlockedStickers,
      unlock,
      mickeyFinds,
      addMickey,
    ],
  );

  return (
    <VisitorContext.Provider value={value}>{children}</VisitorContext.Provider>
  );
}

export function useVisitor() {
  const ctx = useContext(VisitorContext);
  if (!ctx) throw new Error("useVisitor must be used within VisitorProvider");
  return ctx;
}

export { travelers };
