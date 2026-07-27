import type { Flight, TransferTip } from "@/types/trip";
import { images } from "@/data/images";

export const flights: Flight[] = [
  {
    id: "aa908",
    date: "2026-09-29",
    airline: "American Airlines",
    flightNumber: "AA 908",
    from: {
      code: "EZE",
      name: "Ministro Pistarini, Buenos Aires",
      time: "22:20",
    },
    to: {
      code: "MIA",
      name: "Miami International",
      time: "06:35",
      nextDay: true,
    },
    duration: "9h 15m",
    image: images.plane,
    description:
      "El gran despegue. Salimos de Ezeiza de noche y cruzamos el continente hasta Miami. Vuelo directo de ~9h 15m — ideal para dormir y llegar listos para la van.",
    notes:
      "Estar en EZE ~19:20 (3 hs antes). Check-in online ~24 hs antes. Aterrizaje MIA 06:35 (mié 30). Miami: 1h menos que BA.",
  },
  {
    id: "aa1563",
    date: "2026-10-10",
    airline: "American Airlines",
    flightNumber: "AA 1563",
    from: {
      code: "MCO",
      name: "Orlando International",
      time: "11:03",
    },
    to: {
      code: "LGA",
      name: "LaGuardia, Nueva York",
      time: "13:40",
    },
    duration: "2h 37m",
    image: images.orlando,
    description:
      "Cierre del tramo Orlando. Vuelo corto MCO → LaGuardia. Check-out temprano en Endless Summer: el avión sale a las 11:03.",
    notes: "Llegada a tiempo para check-in 15:00 en Chelsea (166A).",
  },
  {
    id: "aa953",
    date: "2026-10-16",
    airline: "American Airlines",
    flightNumber: "AA 953",
    from: {
      code: "JFK",
      name: "John F. Kennedy, Nueva York",
      time: "23:20",
    },
    to: {
      code: "EZE",
      name: "Ministro Pistarini, Buenos Aires",
      time: "11:05",
      nextDay: true,
    },
    duration: "10h 45m",
    image: images.nyc,
    description:
      "Vuelta a casa desde JFK. Vuelo nocturno internacional (~10h 45m). Llegada a Buenos Aires el sábado 17 de octubre a las 11:05.",
    notes: "Salir del depto ~19:45–20:15. Estar en terminal ~20:30–21:00. Aterrizaje EZE: sáb 17/10 · 11:05.",
  },
];

export const transfers: TransferTip[] = [
  {
    id: "mia-orlando",
    when: "30/09 mañana",
    from: "Miami (MIA)",
    to: "All-Star Music / Orlando",
    recommended: "Van alquilada + manejo (~3.5–4.5 hs)",
    alternative: "Pendiente: empresa y punto de devolución",
    notes: [
      "Llegada MIA 06:35 → meta check-in hotel ~12–13hs",
      "Peajes Florida (SunPass / Toll by Plate)",
      "Walmart el mismo día para compras de viaje",
    ],
  },
  {
    id: "lga-chelsea",
    when: "10/10 tarde",
    from: "LaGuardia (LGA)",
    to: "166A Chelsea",
    recommended: "UberXL / Lyft XL o taxi (~40–70 min, USD 50–90)",
    alternative: "Q70 + subway A/C/E — malo con 5 valijas",
    notes: [
      "Check-in apto desde 15:00 — timing OK con llegada 13:40",
      "Avisar al host por WhatsApp al aterrizar",
      "El depto es 1 piso por escalera (sin ascensor)",
    ],
  },
  {
    id: "chelsea-jfk",
    when: "16/10 noche",
    from: "166A Chelsea",
    to: "JFK",
    recommended: "UberXL / van / taxi saliendo ~19:45–20:15",
    alternative: "E o A a Jamaica + AirTrain JFK",
    notes: [
      "Vuelo internacional 23:20 → estar en terminal ~20:30–21:00",
      "Check-out oficial 12:00: pedir late checkout o guarda-equipaje",
    ],
  },
];
