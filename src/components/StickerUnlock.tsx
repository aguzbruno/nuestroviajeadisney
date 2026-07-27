"use client";

import { useEffect } from "react";
import { useVisitor } from "@/components/VisitorProvider";
import { stickers } from "@/data/tips";

/** Unlock a sticker when a page mounts */
export function StickerUnlock({ unlockKey }: { unlockKey: string }) {
  const { unlock } = useVisitor();

  useEffect(() => {
    const sticker = stickers.find((s) => s.unlockKey === unlockKey);
    if (sticker) unlock(sticker.id);
  }, [unlockKey, unlock]);

  return null;
}
