import type { AttractionCategory, ParkAttraction } from "@/types/trip";

export const attractionCategoryMeta: Record<
  AttractionCategory,
  { label: string; labelSingular: string; emoji: string }
> = {
  coaster: {
    label: "Montañas rusas",
    labelSingular: "Montaña rusa",
    emoji: "🎢",
  },
  simulator: {
    label: "Simuladores",
    labelSingular: "Simulador",
    emoji: "🎮",
  },
  "dark-ride": {
    label: "Dark rides",
    labelSingular: "Dark ride",
    emoji: "🌑",
  },
  water: {
    label: "Acuáticas",
    labelSingular: "Acuática",
    emoji: "💧",
  },
  drop: {
    label: "Torres",
    labelSingular: "Torre",
    emoji: "🗼",
  },
  boat: {
    label: "Paseos en bote",
    labelSingular: "Paseo en bote",
    emoji: "🛶",
  },
  safari: {
    label: "Safaris",
    labelSingular: "Safari",
    emoji: "🦁",
  },
  immersive: {
    label: "Inmersivas",
    labelSingular: "Inmersiva",
    emoji: "✨",
  },
  world: {
    label: "Mundos",
    labelSingular: "Mundo",
    emoji: "🌍",
  },
};

const categoryOrder: AttractionCategory[] = [
  "coaster",
  "simulator",
  "dark-ride",
  "water",
  "drop",
  "boat",
  "safari",
  "immersive",
  "world",
];

export type AttractionCategoryCount = {
  category: AttractionCategory;
  count: number;
  label: string;
  emoji: string;
};

export function countAttractionCategories(
  attractions: ParkAttraction[],
): AttractionCategoryCount[] {
  const counts = new Map<AttractionCategory, number>();
  for (const attraction of attractions) {
    counts.set(
      attraction.category,
      (counts.get(attraction.category) ?? 0) + 1,
    );
  }

  return categoryOrder
    .filter((category) => (counts.get(category) ?? 0) > 0)
    .map((category) => {
      const count = counts.get(category) ?? 0;
      const meta = attractionCategoryMeta[category];
      return {
        category,
        count,
        emoji: meta.emoji,
        label: count === 1 ? meta.labelSingular : meta.label,
      };
    });
}
