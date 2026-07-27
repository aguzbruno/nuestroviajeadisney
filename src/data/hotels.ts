import type { Hotel } from "@/types/trip";
import { images } from "@/data/images";

export const hotels: Hotel[] = [
  {
    id: "all-star-music",
    name: "Disney's All-Star Music Resort",
    location: "Walt Disney World, Orlando",
    checkIn: "2026-09-30",
    checkOut: "2026-10-05",
    room: "Standard",
    image: images.resort,
    description:
      "Hotel Value de Disney con tema musical. Ideal como base: buses gratis a los parques, entrada temprana (Early Theme Park Entry) y vibra 100% Disney World.",
    notes: [
      "Traslados gratis a parques Disney y Disney Springs",
      "Parking gratis en hotel y parques Disney",
      "Entrada temprana Disney (~30 min antes · ~08:30)",
      "Memory Maker de regalo (vía agencia)",
    ],
    amenities: [
      "Transporte Disney",
      "Entrada temprana",
      "Piletas temáticas",
      "Food court",
    ],
  },
  {
    id: "endless-summer",
    name: "Universal's Endless Summer Resort",
    location: "Universal Orlando",
    checkIn: "2026-10-05",
    checkOut: "2026-10-10",
    room: "Standard",
    image: images.orlando,
    description:
      "Hotel Universal con shuttle a los parques (incluye Epic Universe) y Early Park Admission (entrada temprana). Base perfecta para HHN y CityWalk.",
    notes: [
      "Traslados gratis a parques Universal (incl. Epic Universe)",
      "Entrada temprana Universal (~1 h antes · ~08:00)",
      "Parking hotel NO incluido (~$26 + tax/noche)",
    ],
    amenities: ["Shuttle a parques", "Entrada temprana", "Pileta", "Cerca de CityWalk"],
  },
  {
    id: "166a-chelsea",
    name: "166A · Chelsea",
    location: "Chelsea, Manhattan — High Line / Chelsea Market",
    checkIn: "2026-10-10",
    checkOut: "2026-10-16",
    room: "2 dormitorios · 1 baño",
    capacity: "Hasta 6 huéspedes (entran los 5)",
    url: "https://509nyc.com/apartments/166a-chelsea",
    image: images.apartment,
    description:
      "Depto en Chelsea vía 509.NYC: 2 dormitorios, cocina completa, a pasos del High Line y Chelsea Market. Sin ascensor (1 piso).",
    notes: [
      "Plataforma 509.NYC / NYC Retreats",
      "1 piso por escalera — SIN ascensor",
      "Check-in desde 15:00 · Check-out hasta 12:00",
      "Dorm 1: 2 camas matrimoniales · Dorm 2: Queen",
      "Dirección exacta al confirmar reserva",
      "WhatsApp +54 223 668 2953 · nycretreats@gmail.com",
    ],
    amenities: [
      "Wi-Fi",
      "Cocina completa",
      "Aire / calefacción",
      "Smart TV",
      "Check-in 24/7",
    ],
  },
];
