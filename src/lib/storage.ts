const VISITOR_KEY = "disney-trip-visitor";
const STICKERS_KEY = "disney-trip-stickers";
const WISHLIST_KEY = "disney-trip-wishlist";
const FEARLIST_KEY = "disney-trip-fearlist";
const PACKING_KEY = "disney-trip-packing";
const MICKEY_KEY = "disney-trip-mickeys";
const DAYS_KEY = "disney-trip-days";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getVisitorId(): string | null {
  if (!canUseStorage()) return null;
  return localStorage.getItem(VISITOR_KEY);
}

export function setVisitorId(id: string) {
  localStorage.setItem(VISITOR_KEY, id);
}

export function clearVisitorId() {
  localStorage.removeItem(VISITOR_KEY);
}

export function getUnlockedStickers(): string[] {
  if (!canUseStorage()) return [];
  try {
    return JSON.parse(localStorage.getItem(STICKERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function unlockSticker(id: string) {
  const current = getUnlockedStickers();
  if (!current.includes(id)) {
    localStorage.setItem(STICKERS_KEY, JSON.stringify([...current, id]));
  }
}

export function unlockStickerByKey(unlockKey: string, stickerId: string) {
  unlockSticker(stickerId);
  return unlockKey;
}

export function getWishlist(): string[] {
  if (!canUseStorage()) return [];
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleWishlist(attractionKey: string) {
  const current = getWishlist();
  const next = current.includes(attractionKey)
    ? current.filter((x) => x !== attractionKey)
    : [...current, attractionKey];
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
  // Exclusive with fearlist
  if (next.includes(attractionKey)) {
    const fears = getFearlist().filter((x) => x !== attractionKey);
    localStorage.setItem(FEARLIST_KEY, JSON.stringify(fears));
  }
  return next;
}

export function getFearlist(): string[] {
  if (!canUseStorage()) return [];
  try {
    return JSON.parse(localStorage.getItem(FEARLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleFearlist(attractionKey: string) {
  const current = getFearlist();
  const next = current.includes(attractionKey)
    ? current.filter((x) => x !== attractionKey)
    : [...current, attractionKey];
  localStorage.setItem(FEARLIST_KEY, JSON.stringify(next));
  // Exclusive with wishlist
  if (next.includes(attractionKey)) {
    const wishes = getWishlist().filter((x) => x !== attractionKey);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishes));
  }
  return next;
}

export function getPackingChecked(): string[] {
  if (!canUseStorage()) return [];
  try {
    return JSON.parse(localStorage.getItem(PACKING_KEY) || "[]");
  } catch {
    return [];
  }
}

export function togglePacking(id: string) {
  const current = getPackingChecked();
  const next = current.includes(id)
    ? current.filter((x) => x !== id)
    : [...current, id];
  localStorage.setItem(PACKING_KEY, JSON.stringify(next));
  return next;
}

export function getMickeyFinds(): string[] {
  if (!canUseStorage()) return [];
  try {
    return JSON.parse(localStorage.getItem(MICKEY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function findMickey(id: string) {
  const current = getMickeyFinds();
  if (!current.includes(id)) {
    const next = [...current, id];
    localStorage.setItem(MICKEY_KEY, JSON.stringify(next));
    if (next.length >= 3) unlockSticker("s10");
    return next;
  }
  return current;
}

export function getExploredDays(): number[] {
  if (!canUseStorage()) return [];
  try {
    return JSON.parse(localStorage.getItem(DAYS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function exploreDay(day: number) {
  const current = getExploredDays();
  if (!current.includes(day)) {
    localStorage.setItem(DAYS_KEY, JSON.stringify([...current, day]));
  }
}
