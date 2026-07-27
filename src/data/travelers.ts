import type { Traveler } from "@/types/trip";

export const travelers: Traveler[] = [
  {
    id: "alejandra",
    name: "Maria Alejandra Diaz",
    shortName: "Alejandra",
    age: 59,
    character: "Hada Madrina",
    characterEmoji: "🪄",
    color: "#D4AF37",
    greeting: "¡Bibbidi bobbidi… viaje!",
    birthdayMode: true,
    birthdayMessage:
      "¡Tus 60 se festejan con magia! El 04/10 hay cena especial para vos ✨",
  },
  {
    id: "gala",
    name: "Gala Arteaga",
    shortName: "Gala",
    age: 32,
    character: "Minnie Mouse",
    characterEmoji: "🎀",
    color: "#E31C23",
    greeting: "La estilista del viaje — ¡a brillar en cada parque!",
  },
  {
    id: "agustin",
    name: "Agustin Bruno",
    shortName: "Agustin",
    age: 29,
    character: "Mickey Mouse",
    characterEmoji: "🐭",
    color: "#1A5FB4",
    greeting: "El capitán del itinerario — ¡que empiece la aventura!",
  },
  {
    id: "emma",
    name: "Emma Aranguren",
    shortName: "Emma",
    age: 15,
    character: "Rapunzel",
    characterEmoji: "🌸",
    color: "#9B59B6",
    greeting: "15 años de aventura — ¡sacá mil fotos en cada reino!",
  },
  {
    id: "marcelo",
    name: "Marcelo Giuliani",
    shortName: "Marcelo",
    age: 62,
    character: "Genio",
    characterEmoji: "🧞",
    color: "#1ABC9C",
    greeting: "Tres deseos… o 18 días de magia. ¡Vos elegís!",
  },
];

export function getTraveler(id: string) {
  return travelers.find((t) => t.id === id);
}
