import type { PackingItem, Sticker } from "@/types/trip";

export const packingItems: PackingItem[] = [
  { id: "p1", label: "Pasaportes + copias", category: "Documentos" },
  { id: "p2", label: "Tarjetas / USD / efectivo peajes", category: "Documentos" },
  { id: "p3", label: "Cargadores + power bank", category: "Tech" },
  { id: "p4", label: "Adaptador USA", category: "Tech" },
  { id: "p5", label: "Zapatillas cómodas (x2)", category: "Ropa" },
  { id: "p6", label: "Remeras livianas", category: "Ropa" },
  { id: "p7", label: "Campera liviana / lluvia", category: "Ropa" },
  { id: "p8", label: "Outfit cena cumpleaños", category: "Ropa" },
  { id: "p9", label: "Outfit HHN (oscuro, cómodo)", category: "Ropa" },
  { id: "p10", label: "Protector solar", category: "Salud" },
  { id: "p11", label: "Remedios / botiquín", category: "Salud" },
  { id: "p12", label: "Gorras / lentes de sol", category: "Extras" },
  { id: "p13", label: "Botella de agua reutilizable", category: "Extras" },
  { id: "p14", label: "Lista Walmart (snacks, agua, etc.)", category: "Extras" },
];

export const stickers: Sticker[] = [
  { id: "s1", name: "Despegue", emoji: "✈️", unlockHint: "Visitá Vuelos", unlockKey: "vuelos" },
  { id: "s2", name: "Magic Kingdom", emoji: "🏰", unlockHint: "Visitá Magic Kingdom", unlockKey: "magic-kingdom" },
  { id: "s3", name: "EPCOT", emoji: "🌐", unlockHint: "Visitá EPCOT", unlockKey: "epcot" },
  { id: "s4", name: "Hollywood", emoji: "🎬", unlockHint: "Visitá Hollywood Studios", unlockKey: "hollywood-studios" },
  { id: "s5", name: "Cumpleaños 60", emoji: "🎂", unlockHint: "Visitá Animal Kingdom", unlockKey: "animal-kingdom" },
  { id: "s6", name: "Shopper", emoji: "🛍️", unlockHint: "Visitá Shopping", unlockKey: "shopping" },
  { id: "s7", name: "Epic", emoji: "⚡", unlockHint: "Visitá Epic Universe", unlockKey: "epic-universe" },
  { id: "s8", name: "Sobreviví HHN", emoji: "🎃", unlockHint: "Visitá Halloween HHN", unlockKey: "halloween" },
  { id: "s9", name: "Chelsea", emoji: "🗽", unlockHint: "Visitá Nueva York", unlockKey: "nyc" },
  { id: "s10", name: "Mickey Hunter", emoji: "🐭", unlockHint: "Encontrá 3 Mickeys escondidos", unlockKey: "mickey-hunter" },
];

export const tips = [
  "Usar entrada temprana Disney (~08:30) y Universal (~08:00).",
  "El 04/10 Animal Kingdom cierra temprano: priorizar atracciones y después cena.",
  "HHN: zapatillas + punto de encuentro + Express si pueden.",
  "166A Chelsea: 1 piso sin ascensor — packing inteligente.",
  "Día 10/10: vuelo 11:03 — salir muy temprano del hotel Universal.",
];
