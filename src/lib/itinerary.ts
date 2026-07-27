import type { Activity, EarlyEntryInfo, ItineraryDay } from "@/types/trip";
import { getPark } from "@/data/parks";

export function isForTraveler(
  forTravelers: string[] | undefined,
  visitorId: string | null | undefined,
): boolean {
  if (!forTravelers || forTravelers.length === 0) return true;
  if (!visitorId) return false;
  return forTravelers.includes(visitorId);
}

export function activitiesForVisitor(
  day: ItineraryDay,
  visitorId: string | null | undefined,
): Activity[] {
  return day.activities.filter((a) => isForTraveler(a.forTravelers, visitorId));
}

export function highlightForVisitor(
  day: ItineraryDay,
  visitorId: string | null | undefined,
): string | undefined {
  if (!day.highlight) return undefined;
  if (!isForTraveler(day.highlightForTravelers, visitorId)) return undefined;
  return day.highlight;
}

/** Entrada temprana del parque del día (si el hotel lo incluye). */
export function earlyEntryForDay(
  day: ItineraryDay,
): EarlyEntryInfo | undefined {
  if (!day.parkId) return undefined;
  // La hoja nocturna de HHN no muestra entrada temprana
  if (day.theme === "halloween" && day.sharedPart?.index === 2) {
    return undefined;
  }
  return getPark(day.parkId)?.earlyEntry;
}
