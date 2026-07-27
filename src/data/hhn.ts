import type { HhnHouse, RestaurantOption } from "@/types/trip";
import { images } from "@/data/images";

export const hhn = {
  date: "2026-10-07",
  name: "Halloween Horror Nights",
  park: "Universal Studios Florida",
  dayPark: "Islands of Adventure",
  startApprox: "18:00–19:00",
  ticketNote:
    "Ticket HHN aparte del park ticket. Confirmar compra y Express Pass.",
  flow: [
    { time: "Apertura–17:00", title: "Islands of Adventure", detail: "Must-dos sin quemarse" },
    { time: "17:00–18:00", title: "Cena ligera en CityWalk", detail: "Directo desde IoA — sin volver al hotel" },
    { time: "18:00+", title: "Ingreso HHN", detail: "Universal Studios — casas y scarezones" },
    { time: "Noche", title: "Casas + zonas", detail: "Priorizar 3–5 casas con Express si hay" },
    { time: "Cierre", title: "Punto de encuentro", detail: "CityWalk / hotel" },
  ],
  tips: [
    "Zapatillas cómodas — se camina muchísimo",
    "Power bank cargado",
    "Ir en grupo; acordar punto de encuentro",
    "Express Pass ayuda mucho en casas populares",
    "No llevar cosas que estorben en casas oscuras",
  ],
  braveCopy: {
    title: "Modo valiente 🎃",
    body: "Casas intensas, scarezones y gritos. ¡A sobrevivir la noche!",
  },
  scaredCopy: {
    title: "Modo miedoso 👻",
    body: "Podés hacer 1–2 casas suaves o quedarte en CityWalk chill mientras los otros gritan.",
  },
};

const HHN_HOUSES_URL =
  "https://www.universalorlando.com/hhn/en/us/haunted-houses";

/** HHN 35 — 9 casas anunciadas. Key art oficial Universal Parks media. */
export const hhnHouses: HhnHouse[] = [
  {
    id: "jack-oddfellow",
    name: "Jack & Oddfellow: Chaos & Control",
    tagline: "The Forces of Horror Collide",
    intensity: "intensa",
    type: "original",
    location: "Soundstage 22",
    description:
      "Descubrí los orígenes de Jack the Clown y entrá al Oddverse de Dr. Oddfellow: caos vs control en un duelo de décadas entre los dos íconos del evento.",
    tip: "Casa ancla del 35º aniversario — prioridad alta si hay Express.",
    image:
      "https://media.universalparksusa.com/wp-content/uploads/2026/03/05_Jack-Oddfellow_-Chaos-Control.jpg",
    url: HHN_HOUSES_URL,
  },
  {
    id: "sinners",
    name: "Sinners",
    tagline: "You’re in for One Bluesy Bloodbath",
    intensity: "intensa",
    type: "ip",
    location: "Sprung Tent 3",
    description:
      "Opening night en el juke joint de los Smokestack Twins (Mississippi, 1930s). Los blues se ponen rojos cuando una horda de vampiros irrumpe — basado en la película Oscar-winning.",
    tip: "Muy pedida por fans de la peli — ir temprano o con Express.",
    image:
      "https://media.universalparksusa.com/wp-content/uploads/2026/05/Sinners-key-art-at-HHN-2026.jpg",
    url: `${HHN_HOUSES_URL}/sinners`,
  },
  {
    id: "stranger-things-5",
    name: "Stranger Things 5",
    tagline: "The Final Chapter",
    intensity: "intensa",
    type: "ip",
    location: "Soundstage 23B",
    description:
      "El Upside Down invade Hawkins. Sobreviví Demogorgons, enfrentá al Mind Flayer y derrotá a Vecna en la casa basada en la temporada final de Stranger Things.",
    tip: "Must-do del grupo — cola larga casi seguro.",
    image:
      "https://media.universalparksusa.com/wp-content/uploads/2026/06/Stranger-Things-at-Halloween-Horror-Nights-2026.jpeg",
    url: `${HHN_HOUSES_URL}/stranger-things-5`,
  },
  {
    id: "hellraiser",
    name: "Hellraiser",
    tagline: "Raise Some Hell",
    intensity: "intensa",
    type: "ip",
    location: "Sprung Tent 4",
    description:
      "Entrá a un reino de dolor puro: Pinhead y los Cenobites y sus rituales infernales, basado en la trilogía original de Hellraiser.",
    tip: "Terror clásico y gore — no apta para modo miedoso.",
    image:
      "https://media.universalparksusa.com/wp-content/uploads/2026/06/HHN26-UNA-Hellraiser-1920x1080-1-e1782841176149.jpg",
    url: `${HHN_HOUSES_URL}/hellraiser`,
  },
  {
    id: "evil-dead-burn",
    name: "Evil Dead Burn",
    tagline: "Fan the Flames of Evil",
    intensity: "intensa",
    type: "ip",
    location: "Soundstage 23A",
    description:
      "El Book of the Dead se reabrió y una fuerza infernal consume una casa familiar. Esquivá Deadites poseídos en la casa basada en la nueva película Evil Dead Burn.",
    tip: "Intensa y física — zapatillas y manos libres.",
    image:
      "https://media.universalparksusa.com/wp-content/uploads/2026/07/Evil-Dead-Burn-at-Halloween-Horror-Nights-1.jpg",
    url: `${HHN_HOUSES_URL}/evil-dead-burn`,
  },
  {
    id: "bloodengutz",
    name: "H.R. Bloodengutz Presents: A Halloween Fright-Tacular!",
    tagline: "Big Screams on the Small Screen",
    intensity: "media",
    type: "original",
    location: "Sprung Tent 2",
    description:
      "El maître d’macabre vuelve a WKNB con un scare-athon de Halloween: ghouls, gore y los frights favoritos de H.R. Bloodengutz en formato broadcast maldito.",
    tip: "Nostalgia HHN — buena opción “media” entre casas IP.",
    image:
      "https://media.universalparksusa.com/wp-content/uploads/2026/06/HR-Bloodengutz_1920x1080.jpg",
    url: HHN_HOUSES_URL,
  },
  {
    id: "madlands",
    name: "MADLANDS: Caged Cannibals",
    tagline: "You’re at the Bottom of the Food Chain",
    intensity: "intensa",
    type: "original",
    location: "Soundstage 24B",
    description:
      "Zoo abandonado en un yermo post-apocalíptico: las facciones caníbales reemplazaron a los animales. Territorial, hambrientas… y vos sos el almuerzo.",
    tip: "De las más sangrientas del lineup — skip si estás en modo miedoso.",
    image:
      "https://media.universalparksusa.com/wp-content/uploads/2026/06/Madlands-Caged-Animals_1920x1080.jpg",
    url: HHN_HOUSES_URL,
  },
  {
    id: "cybergoria",
    name: "Cybergoria",
    tagline: "Immortality Comes at a Cost",
    intensity: "media",
    type: "original",
    location: "Fast & Furious",
    description:
      "Despertás miles de años en el futuro: las máquinas que prometían inmortalidad cosecharon carne humana. Mundo frío, synth y un objetivo — vivir para siempre, aunque te mate.",
    tip: "Vibra sci-fi / body horror — distinta al resto del lineup.",
    image:
      "https://media.universalparksusa.com/wp-content/uploads/2026/06/Cybergoria_1920x1080-1.jpg",
    url: HHN_HOUSES_URL,
  },
  {
    id: "invasion",
    name: "INVASION: Alien Abduction",
    tagline: "Extraterrestrial. And Extra Terrifying.",
    intensity: "media",
    type: "original",
    location: "Sprung Tent 1",
    description:
      "Los Grays no vinieron en paz. Abducción alienígena en un homestead del Southwest: tentáculos, wreckage y subjects frescos para experimentar.",
    tip: "Buena casa “media” con sustos de criatura — menos gore que MADLANDS.",
    image:
      "https://media.universalparksusa.com/wp-content/uploads/2026/06/Invasion-Alien-Abduction_1920x1080.jpg",
    url: HHN_HOUSES_URL,
  },
];

export const birthdayRestaurants: RestaurantOption[] = [
  {
    id: "capa",
    name: "Capa",
    location: "Four Seasons Orlando",
    vibe: "Elegante / distinto",
    why: "Más “60 años especial”: rooftop, steaks españoles, vista.",
    tip: "Uber ~15–20 min desde AK · dressy casual",
    isDefault: true,
    description:
      "Steakhouse en la terraza del piso 17 del Four Seasons: cocina con influencia española, parrilla a leña, seafood de Florida y vistas a los fuegos artificiales de Disney. Michelin-recommended — el plan más “noche de 60”.",
    image: images.capa,
    cuisine: "Steakhouse · española",
    priceRange: "$$$$",
    dressCode: "Resort casual (dressy casual)",
    hours: "Cena diaria 17:00–22:00 · lounge hasta 23:00",
    address: "10100 Dream Tree Blvd, Lake Buena Vista, FL 32836",
    phone: "+1 (407) 313-6161",
    notes: [
      "Reservar con anticipación (OpenTable / teléfono)",
      "Terraza exterior: vistas a fuegos de Disney (sujeto a clima y calendario)",
      "Parking gratis si cenás en Capa",
      "Uber ~15–20 min desde Animal Kingdom",
      "Ideal mesa para 5 · pedir nota de cumpleaños al reservar",
    ],
    url: "https://www.fourseasons.com/orlando/dining/restaurants/capa/",
  },
  {
    id: "morimoto",
    name: "Morimoto Asia",
    location: "Disney Springs",
    vibe: "Moderno / celebración",
    why: "Asiático upscale, fotogénico, ideal grupo de 5.",
    tip: "Reserva · transporte a Springs post-AK",
    description:
      "Flagship pan-asiático del chef Masaharu Morimoto en The Landing: dos pisos, cocina a la vista, sushi bar, Peking duck y dim sum. Ambiente moderno y muy fotogénico para celebrar.",
    image: images.morimoto,
    cuisine: "Pan-asiática · sushi · seafood",
    priceRange: "$$$–$$$$",
    dressCode: "Smart casual",
    hours: "Almuerzo y cena (confirmar día en Disney Dining)",
    address: "The Landing, Disney Springs · Lake Buena Vista, FL",
    phone: "+1 (407) 939-3463",
    notes: [
      "Reservas muy recomendadas (Disney Dining / OpenTable)",
      "Política de cancelación / no-show con cargo por persona",
      "Traslado post-AK a Disney Springs (Uber o bus del hotel)",
      "Buena opción si el grupo prefiere asiático a steakhouse",
    ],
    url: "https://disneyworld.disney.go.com/dining/disney-springs/morimoto-asia/",
  },
  {
    id: "boathouse",
    name: "The Boathouse",
    location: "Disney Springs",
    vibe: "Clásico / alegre",
    why: "Frente al agua, steaks/seafood, clima festivo.",
    tip: "Más informal que Capa · fácil para 5",
    description:
      "Restaurante frente al agua en The Landing: steaks, seafood y vibra clásica americana. Más informal que Capa, fácil para un grupo de 5 y con clima festivo de cumpleaños.",
    image: images.boathouse,
    cuisine: "Steakhouse · seafood · americana",
    priceRange: "$$$",
    dressCode: "Casual",
    hours: "Almuerzo ~11:00–15:55 · cena ~16:00–23:00",
    address: "The Landing, Disney Springs · Lake Buena Vista, FL",
    phone: "+1 (407) 939-2628",
    notes: [
      "Reservas muy recomendadas (Disney Dining)",
      "Mesas con vista al agua — pedir al reservar si importa",
      "Amphicars y barcos vintage afuera (foto de grupo)",
      "Más relajado y alegre que un steakhouse formal",
    ],
    url: "https://disneyworld.disney.go.com/dining/disney-springs/boathouse-restaurant/",
  },
  {
    id: "jaleo",
    name: "Jaleo by José Andrés",
    location: "Disney Springs",
    vibe: "Social / español",
    why: "Tapas para compartir, divertido y distinto.",
    tip: "Ideal si no quieren steakhouse formal",
    description:
      "El Jaleo más grande de José Andrés: tapas regionales españolas y paellas a leña en un espacio de varios niveles. Perfecto para compartir — social, divertido y distinto a un steakhouse.",
    image: images.jaleo,
    cuisine: "Española · tapas · paella",
    priceRange: "$$$",
    dressCode: "Smart casual",
    hours: "Lun–Vie 11:30–22:00 · Sáb–Dom 10:00–22:00",
    address: "1482 E Buena Vista Dr, Orlando, FL 32836",
    phone: "+1 (321) 348-3211",
    notes: [
      "Reservar lunch o dinner (web Jaleo / OpenTable)",
      "Ideal para pedir varias tapas y compartir en mesa de 5",
      "Parking gratis · Orange Garage (West Side) a ~3 min a pie",
      "Al lado: Pepe by José Andrés (bocatas / rápido)",
    ],
    url: "https://www.jaleo.com/location/jaleo-disney-springs/",
  },
];
