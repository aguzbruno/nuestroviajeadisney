export type DayTheme =
  | "travel"
  | "disney"
  | "universal"
  | "halloween"
  | "shopping"
  | "nyc"
  | "rest"
  | "birthday";

export type Chapter = "disney" | "universal" | "halloween" | "nyc" | "travel";

export interface Traveler {
  id: string;
  name: string;
  shortName: string;
  age: number;
  character: string;
  characterEmoji: string;
  color: string;
  greeting: string;
  birthdayMode?: boolean;
  birthdayMessage?: string;
}

export interface Flight {
  id: string;
  date: string;
  airline: string;
  flightNumber: string;
  from: { code: string; name: string; time: string };
  to: { code: string; name: string; time: string; nextDay?: boolean };
  duration: string;
  notes?: string;
  description?: string;
  image?: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  room: string;
  capacity?: string;
  notes: string[];
  url?: string;
  amenities: string[];
  image?: string;
  description?: string;
}

export interface Activity {
  time?: string;
  title: string;
  detail?: string;
  type?: "flight" | "park" | "meal" | "transfer" | "shopping" | "hotel" | "event";
  /** Si está definido, la actividad solo se muestra a estos viajeros. */
  forTravelers?: string[];
}

export interface ItineraryDay {
  day: number;
  date: string;
  dateLabel: string;
  title: string;
  subtitle: string;
  theme: DayTheme;
  chapter: Chapter;
  parkId?: string;
  activities: Activity[];
  pending?: string[];
  highlight?: string;
  /** Si está definido, el highlight solo se muestra a estos viajeros. */
  highlightForTravelers?: string[];
  image?: string;
  description?: string;
  /** Si el día se muestra partido en varias hojas (ej. Día 2: van + Walmart). */
  sharedPart?: {
    index: number;
    total: number;
  };
}

export type AttractionCategory =
  | "coaster"
  | "simulator"
  | "dark-ride"
  | "water"
  | "drop"
  | "boat"
  | "safari"
  | "immersive"
  | "world";

export interface ParkAttraction {
  name: string;
  tip?: string;
  mustDo?: boolean;
  category: AttractionCategory;
  description: string;
  image: string;
  url: string;
}

export interface Park {
  id: string;
  name: string;
  resort: "disney" | "universal";
  slug: string;
  closesApprox: string;
  date: string;
  dayNumber: number;
  color: string;
  emoji: string;
  description: string;
  attractions: ParkAttraction[];
  tips: string[];
  image?: string;
  /** Beneficio de hotel: entrada antes del horario oficial. */
  earlyEntry?: EarlyEntryInfo;
}

export interface EarlyEntryInfo {
  /** Etiqueta corta para chips: "Entrada temprana" */
  short: string;
  /** Detalle: hotel + margen aproximado */
  detail: string;
  /** Hora aproximada de ingreso, ej. "~08:30" */
  approxTime: string;
}

export interface Brand {
  id: string;
  name: string;
  /** Path local o URL remota del logo */
  logo?: string;
  /** Iniciales / monograma si no hay logo */
  monogram?: string;
}

export interface ShoppingCenter {
  id: string;
  name: string;
  type: string;
  address: string;
  description: string;
  brands: Brand[];
  tips: string[];
  distanceFromEndlessSummer: string;
  bestFor: string;
  image?: string;
  /** Centro confirmado del plan (a los que efectivamente vamos). */
  chosen?: boolean;
}

export interface RestaurantOption {
  id: string;
  name: string;
  location: string;
  vibe: string;
  why: string;
  tip: string;
  description: string;
  image: string;
  cuisine: string;
  priceRange: string;
  dressCode: string;
  hours: string;
  notes: string[];
  address?: string;
  phone?: string;
  isDefault?: boolean;
  url: string;
}

export interface TransferTip {
  id: string;
  when: string;
  from: string;
  to: string;
  recommended: string;
  alternative: string;
  notes: string[];
}

export interface PackingItem {
  id: string;
  label: string;
  category: string;
}

export interface Sticker {
  id: string;
  name: string;
  emoji: string;
  unlockHint: string;
  unlockKey: string;
}

export interface HhnHouse {
  id: string;
  name: string;
  tagline: string;
  intensity: "intensa" | "media" | "risa";
  type: "ip" | "original";
  location: string;
  description: string;
  tip: string;
  image: string;
  url: string;
}

export interface PendingItem {
  id: string;
  label: string;
  status: "pending" | "default";
  detail: string;
}
