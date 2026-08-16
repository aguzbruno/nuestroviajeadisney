export const trip = {
  title: "Disney · Universal · Nueva York",
  subtitle: "La aventura familiar 2026",
  year: 2026,
  startDate: "2026-09-29",
  endDate: "2026-10-17",
  departureLocal: "2026-09-29T22:20:00-03:00",
  birthdayDate: "2026-10-04",
  birthdayPersonId: "alejandra",
  groupSize: 5,
  tags: ["Orlando", "Disney", "Universal", "NYC", "HHN"],
};

export const pendingItems = [
  {
    id: "day09",
    label: "09/10: shopping vs 2º Epic",
    status: "default" as const,
    detail: "Default del plan: shopping (outlets / otro centro).",
  },
  {
    id: "cena",
    label: "Cena cumpleaños 04/10",
    status: "default" as const,
    detail: "El propuesto: Capa (Four Seasons). Alternativas en /disney/animal-kingdom.",
  },
  {
    id: "hhn-tickets",
    label: "Tickets HHN / Express",
    status: "pending" as const,
    detail: "Confirmar compra de Halloween Horror Nights y si llevan Express.",
  },
  {
    id: "nyc-rangers",
    label: "Entradas Rangers (11/10, MSG)",
    status: "pending" as const,
    detail:
      "Rangers vs Vancouver Canucks, 18:00. Desde ~US$132 p/p (~US$660–700 el grupo). Preventa 17/08 10:00am EDT en Ticketmaster.",
  },
  {
    id: "van",
    label: "Van MIA → Orlando",
    status: "pending" as const,
    detail: "Empresa de alquiler, retiro en MIA y dónde se devuelve (¿MCO el 10/10?).",
  },
];
