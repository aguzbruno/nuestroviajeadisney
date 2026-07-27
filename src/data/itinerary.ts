import type { ItineraryDay } from "@/types/trip";
import { images } from "@/data/images";

export const itinerary: ItineraryDay[] = [
  {
    day: 1,
    date: "2026-09-29",
    dateLabel: "mar 29 sep",
    title: "Despegue a Miami",
    subtitle: "Estar EZE 19:20 · Sale 22:20 → MIA 06:35",
    theme: "travel",
    chapter: "travel",
    description:
      "AA 908 · ~9h 15m de vuelo nocturno. Check-in online el día antes. Pasaporte a mano. Miami es 1 hora menos que Buenos Aires.",
    highlight:
      "Ya estamos en Buenos Aires — falta poco para salir ✈️",
    highlightForTravelers: ["emma", "marcelo", "alejandra"],
    activities: [
      {
        title: "Mar del Plata → Buenos Aires",
        detail: "Llegar a BA con tiempo antes del aeropuerto",
        type: "transfer",
        forTravelers: ["emma", "marcelo", "alejandra"],
      },
      {
        time: "19:20",
        title: "Estar en Ezeiza (EZE)",
        detail: "3 hs antes · check-in + migraciones",
        type: "flight",
      },
      {
        time: "22:20",
        title: "Despegue AA 908",
        detail: "EZE → MIA · ~9h 15m",
        type: "flight",
      },
      {
        time: "06:35",
        title: "Aterrizaje Miami (MIA)",
        detail: "mié 30 sep · hora local",
        type: "flight",
      },
    ],
    pending: [
      "Check-in online American Airlines ~24 hs antes",
      "Salir a EZE con margen por el tráfico",
      "Documentos: pasaporte vigente a mano",
    ],
  },
  {
    day: 2,
    date: "2026-09-30",
    dateLabel: "mié 30 sep",
    title: "Van + Check-in + Walmart",
    subtitle: "Llegada ~12–13hs a All-Star Music",
    theme: "travel",
    chapter: "travel",
    description:
      "Aterrizamos en MIA, retiramos la van y manejamos a Orlando (~3.5–4.5 hs). Check-in en All-Star Music y Walmart para provisiones de Disney.",
    activities: [
      {
        time: "06:35",
        title: "Aterrizaje MIA",
        detail: "Migraciones + valijas",
        type: "flight",
      },
      {
        title: "Retirar van alquilada",
        detail: "En el aeropuerto · ~3.5–4.5 hs a Orlando",
        type: "transfer",
      },
      {
        time: "12:00–13:00",
        title: "Check-in All-Star Music",
        detail: "Dejar valijas y acomodarse",
        type: "hotel",
      },
      {
        time: "14:00–16:00",
        title: "Walmart",
        detail: "Provisiones para Disney · ~1–2 hs",
        type: "shopping",
      },
    ],
    pending: ["Confirmar empresa de la van y devolución"],
  },
  {
    day: 3,
    date: "2026-10-01",
    dateLabel: "jue 1 oct",
    title: "Magic Kingdom",
    subtitle: "Entrada temprana · Cierre ~23:00",
    theme: "disney",
    chapter: "disney",
    parkId: "magic-kingdom",
    description:
      "Primer parque. Entrada temprana Disney (~08:30) por All-Star. Prioridad: TRON, Seven Dwarfs y Space Mountain antes del mediodía.",
    activities: [
      {
        time: "06:30",
        title: "Levantarse",
        detail: "Desayuno rápido en el room",
        type: "event",
      },
      {
        time: "07:15",
        title: "Salir del hotel",
        detail: "Bus All-Star → Magic Kingdom",
        type: "transfer",
      },
      {
        time: "08:00",
        title: "Llegar al parque",
        detail: "Entrada temprana Disney · ~08:30",
        type: "park",
      },
      {
        title: "Prioridad mañana",
        detail: "TRON · Seven Dwarfs Mine Train · Space Mountain",
        type: "park",
      },
      {
        title: "Tarde clásicos",
        detail: "Pirates · Haunted Mansion · Tiana · Jungle Cruise",
        type: "park",
      },
      {
        time: "~22:00",
        title: "Fuegos / parade",
        detail: "Si hay cartelera esa noche",
        type: "event",
      },
    ],
  },
  {
    day: 4,
    date: "2026-10-02",
    dateLabel: "vie 2 oct",
    title: "EPCOT",
    subtitle: "Entrada temprana · Cierre ~21:00",
    theme: "disney",
    chapter: "disney",
    parkId: "epcot",
    description:
      "Entrada temprana Disney (~08:30). Mañana Guardians + Test Track; tarde World Showcase.",
    activities: [
      {
        time: "06:45",
        title: "Levantarse",
        detail: "Desayuno ligero",
        type: "event",
      },
      {
        time: "07:30",
        title: "Salir del hotel",
        detail: "Bus All-Star → EPCOT",
        type: "transfer",
      },
      {
        time: "08:15",
        title: "Llegar a EPCOT",
        detail: "Entrada temprana Disney · ~08:30",
        type: "park",
      },
      {
        title: "Prioridad mañana",
        detail: "Guardians Cosmic Rewind · Test Track · Soarin'",
        type: "park",
      },
      {
        title: "Tarde World Showcase",
        detail: "Frozen · Remy · snacks por pabellón",
        type: "park",
      },
      {
        time: "~20:00",
        title: "Cierre / show nocturno",
        detail: "Si hay Harmonious u otro",
        type: "event",
      },
    ],
  },
  {
    day: 5,
    date: "2026-10-03",
    dateLabel: "sáb 3 oct",
    title: "Hollywood Studios",
    subtitle: "Entrada temprana · Cierre ~21:00",
    theme: "disney",
    chapter: "disney",
    parkId: "hollywood-studios",
    description:
      "Entrada temprana Disney (~08:30). Star Wars y Toy Story primero — Rise y Slinky suelen tener las peores filas.",
    activities: [
      {
        time: "06:30",
        title: "Levantarse",
        detail: "Día intenso de filas",
        type: "event",
      },
      {
        time: "07:15",
        title: "Salir del hotel",
        detail: "Bus All-Star → Hollywood Studios",
        type: "transfer",
      },
      {
        time: "08:00",
        title: "Llegar al parque",
        detail: "Entrada temprana · directo a Galaxy's Edge",
        type: "park",
      },
      {
        title: "Prioridad mañana",
        detail: "Rise of the Resistance · Slinky Dog Dash",
        type: "park",
      },
      {
        title: "Resto del día",
        detail: "Tower of Terror · Rock 'n' Roller · Falcon · Runaway Railway",
        type: "park",
      },
    ],
  },
  {
    day: 6,
    date: "2026-10-04",
    dateLabel: "dom 4 oct",
    title: "Animal Kingdom + Cena 60",
    subtitle: "Entrada temprana · Cierre ~17:00 · Cumpleaños Alejandra",
    theme: "birthday",
    chapter: "disney",
    parkId: "animal-kingdom",
    highlight: "🎉 Cumpleaños Maria Alejandra Diaz — cena especial",
    description:
      "Entrada temprana Disney (~08:30). Avatar y Everest primero, safari de día, salir ~16:30 para la cena de los 60.",
    activities: [
      {
        time: "06:30",
        title: "Levantarse",
        detail: "Parque cierra temprano — aprovechar la mañana",
        type: "event",
      },
      {
        time: "07:15",
        title: "Salir del hotel",
        detail: "Bus All-Star → Animal Kingdom",
        type: "transfer",
      },
      {
        time: "08:00",
        title: "Llegar al parque",
        detail: "Entrada temprana Disney · Pandora",
        type: "park",
      },
      {
        title: "Must-dos",
        detail: "Flight of Passage · Everest · Kilimanjaro Safaris",
        type: "park",
      },
      {
        time: "~16:30",
        title: "Salir del parque",
        detail: "Volver al hotel a cambiarse",
        type: "transfer",
      },
      {
        time: "18:30–19:30",
        title: "Cena cumpleaños",
        detail: "Default: Capa (Four Seasons) — por confirmar",
        type: "meal",
      },
    ],
    pending: ["Confirmar restaurante (Capa / Morimoto / Boathouse / Jaleo)"],
  },
  {
    day: 7,
    date: "2026-10-05",
    dateLabel: "lun 5 oct",
    title: "Cambio de hotel + Shopping",
    subtitle: "Check-in Endless Summer",
    theme: "shopping",
    chapter: "disney",
    description:
      "Cierre del tramo Disney: check-out All-Star, check-in Endless Summer y 1–2 centros de shopping máx.",
    activities: [
      {
        time: "08:00",
        title: "Levantarse",
        detail: "Sin apuro de parque",
        type: "event",
      },
      {
        time: "10:00",
        title: "Check-out All-Star Music",
        detail: "Valijas en la van",
        type: "hotel",
      },
      {
        time: "11:00–12:00",
        title: "Check-in Endless Summer",
        detail: "Base Universal",
        type: "hotel",
      },
      {
        title: "Shopping Orlando",
        detail: "1–2 centros máx. (outlets / mall)",
        type: "shopping",
      },
      {
        time: "~19:00",
        title: "CityWalk / cena suave",
        detail: "Descansar antes de Epic",
        type: "meal",
      },
    ],
  },
  {
    day: 8,
    date: "2026-10-06",
    dateLabel: "mar 6 oct",
    title: "Epic Universe",
    subtitle: "Entrada temprana · martes más calmo",
    theme: "universal",
    chapter: "universal",
    parkId: "epic-universe",
    description:
      "Entrada temprana Universal (~08:00). Prioridad Mario, Harry Potter y How to Train Your Dragon.",
    activities: [
      {
        time: "06:30",
        title: "Levantarse",
        detail: "Desayuno + botellas de agua",
        type: "event",
      },
      {
        time: "07:30",
        title: "Salir del hotel",
        detail: "Shuttle / auto Endless Summer → Epic",
        type: "transfer",
      },
      {
        time: "08:00–08:15",
        title: "Llegar a Epic",
        detail: "Entrada temprana Universal · ~08:00",
        type: "park",
      },
      {
        title: "Prioridad mañana",
        detail: "Mario Kart / Nintendo · Ministry of Magic",
        type: "park",
      },
      {
        title: "Resto del día",
        detail: "How to Train Your Dragon · Dark Universe · Celestial Park",
        type: "park",
      },
    ],
  },
  {
    day: 9,
    date: "2026-10-07",
    dateLabel: "mié 7 oct",
    title: "Halloween Horror Nights",
    subtitle: "Entrada temprana · Islands + HHN",
    theme: "halloween",
    chapter: "halloween",
    parkId: "islands-of-adventure",
    highlight: "🎃 Halloween Horror Nights",
    description:
      "Entrada temprana Universal (~08:00) en Islands. Hagrid's + VelociCoaster, cena CityWalk y HHN de noche.",
    activities: [
      {
        time: "06:45",
        title: "Levantarse",
        detail: "Día largo — guardar energía para la noche",
        type: "event",
      },
      {
        time: "08:00",
        title: "Llegar a Islands",
        detail: "Entrada temprana · Hagrid's / VelociCoaster",
        type: "park",
      },
      {
        title: "Must-dos Islands",
        detail: "Hagrid's · VelociCoaster · Hulk · Forbidden Journey",
        type: "park",
      },
      {
        time: "17:00–18:00",
        title: "Cena ligera CityWalk",
        detail: "Después HHN directo",
        type: "meal",
      },
      {
        time: "18:00+",
        title: "HHN en Universal Studios",
        detail: "Casas + scarezones",
        type: "event",
      },
    ],
    pending: ["Confirmar tickets HHN / Express"],
  },
  {
    day: 10,
    date: "2026-10-08",
    dateLabel: "jue 8 oct",
    title: "Universal Studios",
    subtitle: "Entrada temprana · día completo",
    theme: "universal",
    chapter: "universal",
    parkId: "universal-studios",
    description:
      "Entrada temprana Universal (~08:00). Día más relajado post-HHN: Diagon Alley es el must.",
    activities: [
      {
        time: "07:30",
        title: "Levantarse",
        detail: "Después de HHN — un poco más tarde OK",
        type: "event",
      },
      {
        time: "08:00",
        title: "Llegar a Studios",
        detail: "Entrada temprana Universal · ~08:00",
        type: "park",
      },
      {
        title: "Prioridad",
        detail: "Diagon Alley / Harry Potter · Mummy · Transformers",
        type: "park",
      },
      {
        title: "Extras",
        detail: "Simpsons · Minion Mayhem · paseo por el parque",
        type: "park",
      },
    ],
  },
  {
    day: 11,
    date: "2026-10-09",
    dateLabel: "vie 9 oct",
    title: "Shopping (o Epic 2)",
    subtitle: "Default: otro día de outlets",
    theme: "shopping",
    chapter: "universal",
    description:
      "Día comodín: shopping si faltó algo, o segundo round en Epic Universe si quedó pendiente.",
    activities: [
      {
        time: "08:30",
        title: "Levantarse",
        detail: "Según plan del grupo",
        type: "event",
      },
      {
        time: "10:00",
        title: "Salida",
        detail: "Outlets / mall o vuelta a Epic",
        type: "event",
      },
      {
        title: "Shopping Orlando",
        detail: "Alternativa: repetir Epic Universe",
        type: "shopping",
      },
      {
        time: "~18:00",
        title: "Cena + empacar",
        detail: "Mañana vuelo a NYC",
        type: "meal",
      },
    ],
    pending: ["Confirmar: shopping vs 2º Epic"],
  },
  {
    day: 12,
    date: "2026-10-10",
    dateLabel: "sáb 10 oct",
    title: "Vuelo a NYC",
    subtitle: "MCO 11:03 → LGA 13:40 → 166A Chelsea",
    theme: "travel",
    chapter: "nyc",
    description:
      "Mañana temprana: check-out, MCO y vuelo corto a LaGuardia. Check-in en Chelsea desde las 15:00.",
    activities: [
      {
        time: "06:00",
        title: "Levantarse",
        detail: "Vuelo 11:03 — margen en aeropuerto",
        type: "event",
      },
      {
        time: "07:30",
        title: "Check-out Endless Summer",
        detail: "Salir hacia MCO",
        type: "hotel",
      },
      {
        time: "08:30",
        title: "Estar en MCO",
        detail: "~2.5 hs antes del vuelo",
        type: "flight",
      },
      {
        time: "11:03",
        title: "AA 1563 MCO → LGA",
        detail: "~2h 37m",
        type: "flight",
      },
      {
        time: "15:00+",
        title: "Check-in 166A Chelsea",
        detail: "UberXL desde LGA",
        type: "hotel",
      },
    ],
  },
  {
    day: 13,
    date: "2026-10-11",
    dateLabel: "dom 11 oct",
    title: "NYC — Día libre",
    subtitle: "Base Chelsea",
    theme: "nyc",
    chapter: "nyc",
    description:
      "Primera jornada completa en la ciudad. High Line y Chelsea Market a pasos del depto.",
    activities: [
      {
        time: "08:30",
        title: "Levantarse",
        detail: "Desayuno cerca / en el depto",
        type: "event",
      },
      {
        time: "10:00",
        title: "High Line + Chelsea Market",
        detail: "A pasos de 166A",
        type: "event",
      },
      {
        title: "Tarde libre",
        detail: "Manhattan según ganas del grupo",
        type: "event",
      },
    ],
    pending: ["Armar plan detallado NYC"],
  },
  {
    day: 14,
    date: "2026-10-12",
    dateLabel: "lun 12 oct",
    title: "NYC",
    subtitle: "Por definir",
    theme: "nyc",
    chapter: "nyc",
    activities: [
      {
        time: "09:00",
        title: "Levantarse",
        detail: "Día a armar con el grupo",
        type: "event",
      },
      { title: "Itinerario NYC — por completar", type: "event" },
    ],
    pending: ["Ideas / deseos del grupo"],
  },
  {
    day: 15,
    date: "2026-10-13",
    dateLabel: "mar 13 oct",
    title: "NYC",
    subtitle: "Por definir",
    theme: "nyc",
    chapter: "nyc",
    activities: [
      {
        time: "09:00",
        title: "Levantarse",
        detail: "Día a armar con el grupo",
        type: "event",
      },
      { title: "Itinerario NYC — por completar", type: "event" },
    ],
  },
  {
    day: 16,
    date: "2026-10-14",
    dateLabel: "mié 14 oct",
    title: "NYC",
    subtitle: "Por definir",
    theme: "nyc",
    chapter: "nyc",
    activities: [
      {
        time: "09:00",
        title: "Levantarse",
        detail: "Día a armar con el grupo",
        type: "event",
      },
      { title: "Itinerario NYC — por completar", type: "event" },
    ],
  },
  {
    day: 17,
    date: "2026-10-15",
    dateLabel: "jue 15 oct",
    title: "NYC",
    subtitle: "Por definir",
    theme: "nyc",
    chapter: "nyc",
    activities: [
      {
        time: "09:00",
        title: "Levantarse",
        detail: "Último día completo en NYC",
        type: "event",
      },
      { title: "Itinerario NYC — por completar", type: "event" },
    ],
  },
  {
    day: 18,
    date: "2026-10-16",
    dateLabel: "vie 16 oct",
    title: "NYC + vuelo de vuelta",
    subtitle: "JFK 23:20 → EZE 11:05 (sáb 17 oct)",
    theme: "travel",
    chapter: "nyc",
    highlight: "✈️ Llegada a Buenos Aires: sábado 17 oct · 11:05",
    description:
      "Día en la ciudad + traslado a JFK. Estar en terminal ~20:30–21:00 para el AA 953.",
    activities: [
      {
        time: "09:00",
        title: "Levantarse",
        detail: "Día en NYC + noche de vuelo",
        type: "event",
      },
      {
        title: "NYC de día",
        detail: "Guarda-equipaje / late checkout",
        type: "event",
      },
      {
        time: "19:45",
        title: "Salida a JFK",
        detail: "UberXL / van",
        type: "transfer",
      },
      {
        time: "20:30–21:00",
        title: "Estar en JFK",
        detail: "Internacional · ~3 hs antes",
        type: "flight",
      },
      {
        time: "23:20",
        title: "AA 953 JFK → EZE",
        detail: "~10h 45m",
        type: "flight",
      },
      {
        time: "11:05",
        title: "Llegada a Buenos Aires (EZE)",
        detail: "sáb 17 oct (+1 día)",
        type: "flight",
      },
    ],
  },
  {
    day: 19,
    date: "2026-10-17",
    dateLabel: "sáb 17 oct",
    title: "Llegada a Buenos Aires",
    subtitle: "EZE 11:05 · AA 953 desde JFK",
    theme: "travel",
    chapter: "travel",
    highlight: "🏠 Aterrizaje en Ezeiza · sábado 17 de octubre · 11:05",
    activities: [
      {
        time: "11:05",
        title: "Aterrizaje EZE",
        detail: "Buenos Aires · vuelo AA 953",
        type: "flight",
      },
    ],
  },
];

export function getDay(day: number) {
  return itinerary.find((d) => d.day === day);
}

export function getDaysByChapter(chapter: string) {
  return itinerary.filter((d) => d.chapter === chapter);
}

/** Día 2 partido en dos hojas del álbum / scroll: llegada+van y Walmart. */
export function getDay2ArrivalPage(day2: ItineraryDay = getDay(2)!): ItineraryDay {
  return {
    ...day2,
    title: "Llegada + Van",
    subtitle: "MIA → Orlando · Check-in All-Star Music",
    theme: "travel",
    image: images.roadTrip,
    description:
      "Aterrizaje en Miami, retirar la van y manejar a Orlando (~3.5–4.5 hs). Meta: check-in en All-Star Music ~12–13hs.",
    highlight: undefined,
    highlightForTravelers: undefined,
    sharedPart: { index: 1, total: 2 },
    activities: day2.activities.filter((a) => a.type !== "shopping"),
  };
}

export function getDay2WalmartPage(day2: ItineraryDay = getDay(2)!): ItineraryDay {
  return {
    ...day2,
    title: "Walmart · Provisiones",
    subtitle: "~14:00–16:00 · Stockearse para Disney",
    theme: "shopping",
    image: images.groceries,
    description:
      "Después del check-in: ~1–2 hs en Walmart. Provisiones para los parques — más barato y práctico que adentro.",
    highlight: "Lista corta — no llenar el carrito de más",
    highlightForTravelers: undefined,
    pending: undefined,
    sharedPart: { index: 2, total: 2 },
    activities: [
      {
        time: "14:00–16:00",
        title: "Walmart",
        detail: "Tras el check-in · aprox. 1–2 hs",
        type: "shopping",
      },
      {
        title: "Agua / Gatorade",
        detail: "Hidratación para los parques",
        type: "shopping",
      },
      {
        title: "Snacks",
        detail: "Barras, frutas, chips para hacer fila",
        type: "shopping",
      },
      {
        title: "Desayuno del resort",
        detail: "Cereal, leche, frutas, café",
        type: "shopping",
      },
      {
        title: "Básicos",
        detail: "Protector solar, toallitas, bolsas ziploc",
        type: "shopping",
      },
    ],
  };
}

/** Capítulos de salida en el álbum/móvil: día 1 + día 2 partido. */
export function getTravelStartPages(): ItineraryDay[] {
  const day1 = getDay(1)!;
  const day2 = getDay(2)!;
  return [day1, getDay2ArrivalPage(day2), getDay2WalmartPage(day2)];
}

/** Día 9 partido: Islands de día + HHN de noche (pliego doble Halloween). */
export function getDay9IslandsPage(day9: ItineraryDay = getDay(9)!): ItineraryDay {
  return {
    ...day9,
    title: "Islands of Adventure",
    subtitle: "Entrada temprana · Día antes de HHN",
    theme: "universal",
    chapter: "halloween",
    parkId: "islands-of-adventure",
    image: images.islands,
    description:
      "Mañana fuerte en Islands con entrada temprana. Guardar energía: de noche es Halloween Horror Nights.",
    highlight: undefined,
    highlightForTravelers: undefined,
    pending: undefined,
    sharedPart: { index: 1, total: 2 },
    activities: day9.activities.filter(
      (a) => a.type === "park" || a.title === "Levantarse" || a.title.startsWith("Llegar"),
    ),
  };
}

export function getDay9HhnPage(day9: ItineraryDay = getDay(9)!): ItineraryDay {
  return {
    ...day9,
    title: "Halloween Horror Nights",
    subtitle: "18:00+ · Universal Studios",
    theme: "halloween",
    chapter: "halloween",
    parkId: "islands-of-adventure",
    image: images.halloween,
    description:
      "Cena ligera en CityWalk y directo a HHN. Casas, scarezones y terror — sin volver al hotel.",
    highlight: "🎃 Portal HHN — casas y tips de supervivencia",
    highlightForTravelers: undefined,
    sharedPart: { index: 2, total: 2 },
    activities: day9.activities.filter(
      (a) =>
        a.type === "meal" ||
        (a.type === "event" && a.title.toLowerCase().includes("hhn")),
    ),
    pending: day9.pending,
  };
}

/** Días Universal en orden cronológico (Epic → HHN doble → Studios → shopping). */
export function getUniversalStoryPages(): ItineraryDay[] {
  const day8 = getDay(8)!;
  const day9 = getDay(9)!;
  const day10 = getDay(10)!;
  const day11 = getDay(11)!;
  return [
    day8,
    getDay9IslandsPage(day9),
    getDay9HhnPage(day9),
    day10,
    day11,
  ];
}
