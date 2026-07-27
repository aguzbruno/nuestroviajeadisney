import type { Park } from "@/types/trip";
import { images } from "@/data/images";

/** Early Theme Park Entry — huéspedes hotel Disney (~30 min antes). */
export const disneyEarlyEntry = {
  short: "Entrada temprana",
  detail: "Hotel Disney (All-Star) · ~30 min antes (~08:30)",
  approxTime: "~08:30",
} as const;

/** Early Park Admission — huéspedes hotel Universal (~1 h antes). */
export const universalEarlyEntry = {
  short: "Entrada temprana",
  detail: "Hotel Universal (Endless Summer) · ~1 h antes (~08:00)",
  approxTime: "~08:00",
} as const;

/** Fotos reales de atracciones (Wikimedia Commons, uso libre) */
const img = {
  mineTrain:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Seven_Dwarfs_Mine_Train_(24570996701).jpg/1280px-Seven_Dwarfs_Mine_Train_(24570996701).jpg",
  space:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Magic_Kingdom_Space_Mountain.jpg/960px-Magic_Kingdom_Space_Mountain.jpg",
  bayou:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Tiana%27s_Bayou_Adventure_at_Disneyland.jpg/960px-Tiana%27s_Bayou_Adventure_at_Disneyland.jpg",
  haunted:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Haunted_Mansion_%28Magic_Kingdom%29_1.jpg/960px-Haunted_Mansion_%28Magic_Kingdom%29_1.jpg",
  pirates:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Embarquement_dans_Pirates_of_the_Caribbean_at_Magic_Kingdom.jpg/960px-Embarquement_dans_Pirates_of_the_Caribbean_at_Magic_Kingdom.jpg",
  jungle:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Jungle_Cruise_-_panoramio.jpg/960px-Jungle_Cruise_-_panoramio.jpg",
  tron:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tron_Lightcycle_Power_Run_%28Magic_Kingdom%29_2.jpg/960px-Tron_Lightcycle_Power_Run_%28Magic_Kingdom%29_2.jpg",
  guardians:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Guardians_of_the_Galaxy_Cosmic_Rewind_at_EPCOT.jpg/960px-Guardians_of_the_Galaxy_Cosmic_Rewind_at_EPCOT.jpg",
  testTrack:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Test_Track%2C_EPCOT_%282024%29.jpg/960px-Test_Track%2C_EPCOT_%282024%29.jpg",
  frozen:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Frozen_Ever_After_Epcot_01.jpg/960px-Frozen_Ever_After_Epcot_01.jpg",
  remy:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Remy%27s_Ratatouille_Adventure_1.jpg/960px-Remy%27s_Ratatouille_Adventure_1.jpg",
  soarin:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Soarin_-_EPCOT.jpg/960px-Soarin_-_EPCOT.jpg",
  spaceship:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Spaceship_Earth_2.jpg/960px-Spaceship_Earth_2.jpg",
  starWars:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Star_Wars-_Rise_of_the_Resistance_at_Disney%27s_Hollywood_Studios_May_2023.jpg/960px-Star_Wars-_Rise_of_the_Resistance_at_Disney%27s_Hollywood_Studios_May_2023.jpg",
  toyStory:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Slinky_Dog_Dash_%2829262611338%29_%28cropped%29.jpg/960px-Slinky_Dog_Dash_%2829262611338%29_%28cropped%29.jpg",
  tower:
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/Tower_of_Terror_Hollywood_Studios.jpg",
  falcon:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Millennium_Falcon_Star_Wars_Galaxy%27s_Edge_Disneyland_Resort_in_Anaheim%2C_California_%2848537418942%29.jpg/960px-Millennium_Falcon_Star_Wars_Galaxy%27s_Edge_Disneyland_Resort_in_Anaheim%2C_California_%2848537418942%29.jpg",
  runaway:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mickey_%26_Minnie%27s_Runaway_Railway_%28Disneyland%29_1.jpg/960px-Mickey_%26_Minnie%27s_Runaway_Railway_%28Disneyland%29_1.jpg",
  rocknroll:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Rock_%27n%27_Roller_Coaster_%2829380299068%29.jpg/960px-Rock_%27n%27_Roller_Coaster_%2829380299068%29.jpg",
  avatar:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Avatar_Flight_of_Passage_%2833825577724%29.jpg/960px-Avatar_Flight_of_Passage_%2833825577724%29.jpg",
  everest:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Expedition_Everest.jpg/960px-Expedition_Everest.jpg",
  navi:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Avatar_Land_Boat_Ride_-_Na%27vi_River_Journey_-_Pandora_-_Animal_Kingdom.jpg/960px-Avatar_Land_Boat_Ride_-_Na%27vi_River_Journey_-_Pandora_-_Animal_Kingdom.jpg",
  safari:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/AK_Safari.JPG/960px-AK_Safari.JPG",
  dinosaur:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Dinosaur_%28Disney%27s_Animal_Kingdom%29_1.jpg/960px-Dinosaur_%28Disney%27s_Animal_Kingdom%29_1.jpg",
  ministry:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ministry_of_Magic_Universal_Epic_Universe.jpg/960px-Ministry_of_Magic_Universal_Epic_Universe.jpg",
  harryPotter:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Universal-Islands-of-Adventure-Harry-Potter-Castle-8892i.jpg/960px-Universal-Islands-of-Adventure-Harry-Potter-Castle-8892i.jpg",
  mario:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Kinopio%27s_cafe_exterior_at_Super_Nintendo_World_%28Universal_Studios_Japan%29.png/960px-Kinopio%27s_cafe_exterior_at_Super_Nintendo_World_%28Universal_Studios_Japan%29.png",
  dragon:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/How_to_Train_Your_Dragon_-_Isle_of_Berk_-_54563945175.jpg/960px-How_to_Train_Your_Dragon_-_Isle_of_Berk_-_54563945175.jpg",
  monsters:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Frankenstein_Manor_Night_Epic_Universe.jpg/960px-Frankenstein_Manor_Night_Epic_Universe.jpg",
  celestial:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Chronos_Tower_Front_Epic_Universe.jpg/960px-Chronos_Tower_Front_Epic_Universe.jpg",
  hagrid:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Hagrid%27s_Magical_Creatures_Motorbike_Adventure_1.jpg/960px-Hagrid%27s_Magical_Creatures_Motorbike_Adventure_1.jpg",
  veloci:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/VelociCoaster_2.jpg/960px-VelociCoaster_2.jpg",
  hulk:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Incredible_Hulk_Coaster.jpg/960px-Incredible_Hulk_Coaster.jpg",
  spiderman:
    "https://upload.wikimedia.org/wikipedia/commons/3/3d/The_Amazing_Adventures_of_Spider-Man_at_Universal_Islands_of_Adventure.jpg",
  mummy:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Revenge_of_the_Mummy_%28Universal_Studios_Florida%29_entrance.jpg/960px-Revenge_of_the_Mummy_%28Universal_Studios_Florida%29_entrance.jpg",
  transformers:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Transformers-_The_Ride_at_Universal_Studios_Florida-May_2023.jpg/960px-Transformers-_The_Ride_at_Universal_Studios_Florida-May_2023.jpg",
  simpsons:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/The_Simpsons_Ride.jpg/960px-The_Simpsons_Ride.jpg",
  diagon:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Diagon_Alley.jpg/960px-Diagon_Alley.jpg",
  minions:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Despicable_Me_-_Minion_Mayhem%2C_Universal_Studios_Hollywood.jpg/960px-Despicable_Me_-_Minion_Mayhem%2C_Universal_Studios_Hollywood.jpg",
};

export const parks: Park[] = [
  {
    id: "magic-kingdom",
    name: "Magic Kingdom",
    resort: "disney",
    slug: "magic-kingdom",
    closesApprox: "~23:00",
    date: "2026-10-01",
    dayNumber: 3,
    color: "#1A5FB4",
    emoji: "🏰",
    image: images.magicKingdom,
    description:
      "El corazón de Disney World: castillo, Main Street y fuegos. Ideal para empezar el tramo Disney con magia total.",
    earlyEntry: disneyEarlyEntry,
    attractions: [
      {
        name: "Seven Dwarfs Mine Train",
        mustDo: true,
        tip: "Rope drop o Lightning Lane",
        category: "coaster",
        description:
          "Montaña rusa familiar por la mina de los siete enanitos: curvas suaves, vagonetas que basculan y un final con diamantes brillando.",
        image: img.mineTrain,
        url: "https://disneyworld.disney.go.com/attractions/magic-kingdom/seven-dwarfs-mine-train/",
      },
      {
        name: "Space Mountain",
        mustDo: true,
        category: "coaster",
        description:
          "Clásico coaster a oscuras en Tomorrowland: velocidad, giros y la sensación de volar entre estrellas.",
        image: img.space,
        url: "https://disneyworld.disney.go.com/attractions/magic-kingdom/space-mountain/",
      },
      {
        name: "Tiana's Bayou Adventure",
        mustDo: true,
        category: "water",
        description:
          "Aventura acuática por el bayou de Nueva Orleans con la princesa Tiana, música y efectos sorpresa al final.",
        image: img.bayou,
        url: "https://disneyworld.disney.go.com/attractions/magic-kingdom/tianas-bayou-adventure/",
      },
      {
        name: "Haunted Mansion",
        category: "dark-ride",
        description:
          "Mansión encantada con 999 fantasmas felices: dark ride clásico, humor gótico y stretch room legendario.",
        image: img.haunted,
        url: "https://disneyworld.disney.go.com/attractions/magic-kingdom/haunted-mansion/",
      },
      {
        name: "Pirates of the Caribbean",
        category: "dark-ride",
        description:
          "Barco a través de bahías piratas: cañones, botín y el espíritu de Jack Sparrow en un dark ride icónico.",
        image: img.pirates,
        url: "https://disneyworld.disney.go.com/attractions/magic-kingdom/pirates-of-the-caribbean/",
      },
      {
        name: "Jungle Cruise",
        tip: "Clásico con humor",
        category: "boat",
        description:
          "Crucero por ríos 'exóticos' con skippers que cuentan chistes malos a propósito. Clásico de Adventureland.",
        image: img.jungle,
        url: "https://disneyworld.disney.go.com/attractions/magic-kingdom/jungle-cruise/",
      },
      {
        name: "TRON Lightcycle / Run",
        mustDo: true,
        tip: "Si está operativo — cola larga",
        category: "coaster",
        description:
          "Coaster de alta velocidad en lightcycles estilo TRON: inclinados hacia adelante, luces neón y launch potente.",
        image: img.tron,
        url: "https://disneyworld.disney.go.com/attractions/magic-kingdom/tron-lightcycle-run/",
      },
    ],
    tips: [
      "Entrada temprana Disney (~08:30) — All-Star Music",
      "Llegar listos para rope drop / primeras filas",
      "Ver fireworks desde Main Street o puente del castillo",
    ],
  },
  {
    id: "epcot",
    name: "EPCOT",
    resort: "disney",
    slug: "epcot",
    closesApprox: "~21:00",
    date: "2026-10-02",
    dayNumber: 4,
    color: "#5B8DEF",
    emoji: "🌐",
    image: images.epcot,
    description:
      "Futuro + World Showcase: atracciones big-ticket de día y paseo gastronómico de tarde.",
    earlyEntry: disneyEarlyEntry,
    attractions: [
      {
        name: "Guardians of the Galaxy: Cosmic Rewind",
        mustDo: true,
        category: "coaster",
        description:
          "Coaster indoor con vehículos que giran, soundtrack de Guardians y storyline espacial en el pabellón de Wonders of Xandar.",
        image: img.guardians,
        url: "https://disneyworld.disney.go.com/attractions/epcot/guardians-of-the-galaxy-cosmic-rewind/",
      },
      {
        name: "Test Track",
        mustDo: true,
        category: "coaster",
        description:
          "Diseñás tu vehículo y lo 'testeás' a alta velocidad en un circuito outdoor: aceleración, curvas y score final.",
        image: img.testTrack,
        url: "https://disneyworld.disney.go.com/attractions/epcot/test-track/",
      },
      {
        name: "Frozen Ever After",
        mustDo: true,
        category: "boat",
        description:
          "Barco por Arendelle con Anna, Elsa y Olaf: canciones de Frozen y el final con Let It Go.",
        image: img.frozen,
        url: "https://disneyworld.disney.go.com/attractions/epcot/frozen-ever-after/",
      },
      {
        name: "Remy's Ratatouille Adventure",
        category: "dark-ride",
        description:
          "Trackless ride en el pabellón de Francia: sos un ratón en la cocina de Gusteau, con 3D y olores.",
        image: img.remy,
        url: "https://disneyworld.disney.go.com/attractions/epcot/remys-ratatouille-adventure/",
      },
      {
        name: "Soarin'",
        category: "simulator",
        description:
          "Simulador de vuelo sobre paisajes del mundo (y a veces California): pies colgando y brisa en la cara.",
        image: img.soarin,
        url: "https://disneyworld.disney.go.com/attractions/epcot/soarin/",
      },
      {
        name: "Spaceship Earth",
        category: "dark-ride",
        description:
          "El ícono de EPCOT: dark ride por la historia de la comunicación dentro de la esfera geodésica.",
        image: img.spaceship,
        url: "https://disneyworld.disney.go.com/attractions/epcot/spaceship-earth/",
      },
    ],
    tips: [
      "Entrada temprana Disney (~08:30) — All-Star Music",
      "World Showcase de tarde/noche",
      "Guardians suele necesitar LL o Virtual Queue",
    ],
  },
  {
    id: "hollywoodwood-studios",
    name: "Hollywood Studios",
    resort: "disney",
    slug: "hollywoodwood-studios",
    closesApprox: "~21:00",
    date: "2026-10-03",
    dayNumber: 5,
    color: "#C0392B",
    emoji: "🎬",
    image: images.hollywood,
    description:
      "Star Wars, Toy Story y thrills. El día más 'cine' del itinerario Disney.",
    earlyEntry: disneyEarlyEntry,
    attractions: [
      {
        name: "Rise of the Resistance",
        mustDo: true,
        tip: "Prioridad #1",
        category: "immersive",
        description:
          "Experiencia inmersiva Star Wars: transportes, trackless ride, walk-through y confrontación con la First Order.",
        image: img.starWars,
        url: "https://disneyworld.disney.go.com/attractions/hollywood-studios/star-wars-rise-of-the-resistance/",
      },
      {
        name: "Slinky Dog Dash",
        mustDo: true,
        category: "coaster",
        description:
          "Coaster familiar en Toy Story Land: el perro-resorte de Andy te lleva por curvas coloridas y launches.",
        image: img.toyStory,
        url: "https://disneyworld.disney.go.com/attractions/hollywood-studios/slinky-dog-dash/",
      },
      {
        name: "Tower of Terror",
        mustDo: true,
        tip: "Emma tip 👀",
        category: "drop",
        description:
          "Ascensor embrujado del Hollywood Tower Hotel: caídas aleatorias, The Twilight Zone y vibra art déco.",
        image: img.tower,
        url: "https://disneyworld.disney.go.com/attractions/hollywood-studios/twilight-zone-tower-of-terror/",
      },
      {
        name: "Millennium Falcon: Smugglers Run",
        category: "simulator",
        description:
          "Piloteás (o disparás) el Halcón Milenario en una misión de contrabando interactiva en Galaxy's Edge.",
        image: img.falcon,
        url: "https://disneyworld.disney.go.com/attractions/hollywood-studios/millennium-falcon-smugglers-run/",
      },
      {
        name: "Mickey & Minnie's Runaway Railway",
        category: "dark-ride",
        description:
          "Primera atracción de Mickey en un parque Disney: cartoon 2D que cobra vida, trackless y humor clásico.",
        image: img.runaway,
        url: "https://disneyworld.disney.go.com/attractions/hollywood-studios/mickey-minnies-runaway-railway/",
      },
      {
        name: "Rock 'n' Roller Coaster",
        category: "coaster",
        description:
          "Coaster indoor a toda velocidad con soundtrack de Aerosmith: launch 0–100 y loops en la oscuridad.",
        image: img.rocknroll,
        url: "https://disneyworld.disney.go.com/attractions/hollywood-studios/rock-n-roller-coaster-starring-aerosmith/",
      },
    ],
    tips: [
      "Entrada temprana Disney (~08:30) — All-Star Music",
      "Rope drop a Rise o Slinky",
      "Galaxy's Edge para fotos",
    ],
  },
  {
    id: "animal-kingdom",
    name: "Animal Kingdom",
    resort: "disney",
    slug: "animal-kingdom",
    closesApprox: "~17:00",
    date: "2026-10-04",
    dayNumber: 6,
    color: "#27AE60",
    emoji: "🌳",
    image: images.animalKingdom,
    description:
      "Cierra temprano — maximizar atracciones de día y salir a la cena de cumpleaños de Alejandra.",
    earlyEntry: disneyEarlyEntry,
    attractions: [
      {
        name: "Avatar Flight of Passage",
        mustDo: true,
        category: "simulator",
        description:
          "Simulador de vuelo en banshee sobre Pandora: 3D, movimiento y una de las colas más pedidas del resort.",
        image: img.avatar,
        url: "https://disneyworld.disney.go.com/attractions/animal-kingdom/avatar-flight-of-passage/",
      },
      {
        name: "Expedition Everest",
        mustDo: true,
        category: "coaster",
        description:
          "Coaster en el Himalaya con el Yeti: subidas, marcha atrás en la oscuridad y vistas del Animal Kingdom.",
        image: img.everest,
        url: "https://disneyworld.disney.go.com/attractions/animal-kingdom/expedition-everest/",
      },
      {
        name: "Na'vi River Journey",
        category: "boat",
        description:
          "Bote suave por el bosque bioluminiscente de Pandora: atmósfera, audio-animatronics y vibra chill.",
        image: img.navi,
        url: "https://disneyworld.disney.go.com/attractions/animal-kingdom/navi-river-journey/",
      },
      {
        name: "Kilimanjaro Safaris",
        mustDo: true,
        tip: "Mejor de mañana",
        category: "safari",
        description:
          "Safari real por la sabana africana del parque: jirafas, cebras, leones y más — mejor temprano con animales activos.",
        image: img.safari,
        url: "https://disneyworld.disney.go.com/attractions/animal-kingdom/kilimanjaro-safaris/",
      },
      {
        name: "DINOSAUR",
        category: "dark-ride",
        description:
          "Dark ride time-travel a la era de los dinosaurios: bumpy, oscuro y con un T. rex que no te deja indiferente.",
        image: img.dinosaur,
        url: "https://disneyworld.disney.go.com/attractions/animal-kingdom/dinosaur/",
      },
    ],
    tips: [
      "Entrada temprana Disney (~08:30) — All-Star Music",
      "Salir del parque ~16:30",
      "Cena 60: Capa / Morimoto / Boathouse / Jaleo",
    ],
  },
  {
    id: "epic-universe",
    name: "Epic Universe",
    resort: "universal",
    slug: "epic-universe",
    closesApprox: "Según cartelera",
    date: "2026-10-06",
    dayNumber: 8,
    color: "#8E44AD",
    emoji: "⚡",
    image: images.epicUniverse,
    description:
      "El parque nuevo. Martes 06/10 elegido para mejor chance de menos gente (noche sin HHN típica).",
    earlyEntry: universalEarlyEntry,
    attractions: [
      {
        name: "Ministry of Magic / Harry Potter zone",
        mustDo: true,
        category: "world",
        description:
          "The Wizarding World — Ministry of Magic: París mágico de los años 20, Battle at the Ministry y el mundo de los magos expandido.",
        image: img.ministry,
        url: "https://www.universalorlando.com/web/en/us/epic-universe/worlds/the-wizarding-world-of-harry-potter-ministry-of-magic",
      },
      {
        name: "Mario / Nintendo world",
        mustDo: true,
        category: "world",
        description:
          "SUPER NINTENDO WORLD: Mario Kart, Donkey Kong Country y un mundo interactivo con Power-Up Bands.",
        image: img.mario,
        url: "https://www.universalorlando.com/web/en/us/epic-universe/worlds/super-nintendo-world",
      },
      {
        name: "How to Train Your Dragon land",
        mustDo: true,
        category: "world",
        description:
          "Isle of Berk: aldea vikinga, dragones, Hiccup y atracciones familiares en el mundo de Cómo entrenar a tu dragón.",
        image: img.dragon,
        url: "https://www.universalorlando.com/web/en/us/epic-universe/worlds/how-to-train-your-dragon-isle-of-berk",
      },
      {
        name: "Dark Universe / Monsters",
        mustDo: true,
        category: "world",
        description:
          "Dark Universe: monstruos clásicos de Universal, el señorío de Darkmoor y thrills con vibra horror cinematográfico.",
        image: img.monsters,
        url: "https://www.universalorlando.com/web/en/us/epic-universe/worlds/dark-universe",
      },
      {
        name: "Celestial Park hub",
        mustDo: true,
        category: "world",
        description:
          "El corazón cósmico del parque: Stardust Racers, fuentes, dining y el portal hacia los otros mundos.",
        image: img.celestial,
        url: "https://www.universalorlando.com/web/en/us/epic-universe/worlds/celestial-park",
      },
    ],
    tips: [
      "Entrada temprana Universal (~08:00) — Endless Summer",
      "Rope drop obligatorio · priorizar 2–3 lands",
      "Express si el día se pone pesado",
    ],
  },
  {
    id: "islands-of-adventure",
    name: "Islands of Adventure",
    resort: "universal",
    slug: "islands-of-adventure",
    closesApprox: "Tarde (luego HHN)",
    date: "2026-10-07",
    dayNumber: 9,
    color: "#16A085",
    emoji: "🦖",
    image: images.islands,
    description:
      "Día de IoA y noche de Halloween Horror Nights en Universal Studios. No agotar energía.",
    earlyEntry: universalEarlyEntry,
    attractions: [
      {
        name: "Hagrid's Magical Creatures Motorbike Adventure",
        mustDo: true,
        category: "coaster",
        description:
          "Coaster de Hagrid por el Forbidden Forest: launches, criaturas mágicas y uno de los must-do más fuertes de Universal.",
        image: img.hagrid,
        url: "https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/hagrids-magical-creatures-motorbike-adventure",
      },
      {
        name: "VelociCoaster",
        mustDo: true,
        category: "coaster",
        description:
          "Hyper-coaster de Jurassic World: launches, inversions y el iconic top-hat sobre la laguna. Intensidad máxima.",
        image: img.veloci,
        url: "https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/jurassic-world-velocicoaster",
      },
      {
        name: "The Incredible Hulk Coaster",
        category: "coaster",
        description:
          "Launch coaster verde: loop de salida, inversions y la furia de Hulk a toda velocidad en Marvel Super Hero Island.",
        image: img.hulk,
        url: "https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/the-incredible-hulk-coaster",
      },
      {
        name: "Spider-Man",
        category: "simulator",
        description:
          "The Amazing Adventures of Spider-Man: dark ride 3D con motion bases — todavía un referente de immersive rides.",
        image: img.spiderman,
        url: "https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/the-amazing-adventures-of-spider-man",
      },
      {
        name: "Harry Potter and the Forbidden Journey",
        category: "simulator",
        description:
          "Vuelo mágico por Hogwarts: Quidditch, dementors y el castillo completo. Clásico del Wizarding World.",
        image: img.harryPotter,
        url: "https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/harry-potter-and-the-forbidden-journey",
      },
    ],
    tips: [
      "Entrada temprana Universal (~08:00) — Endless Summer",
      "Cena ligera en CityWalk y pasar directo a HHN",
      "Ver /universal/halloween",
    ],
  },
  {
    id: "universal-studios",
    name: "Universal Studios Florida",
    resort: "universal",
    slug: "universal-studios",
    closesApprox: "Según cartelera",
    date: "2026-10-08",
    dayNumber: 10,
    color: "#2980B9",
    emoji: "🎥",
    image: images.universalStudios,
    description:
      "Día completo en Studios (sin presión de HHN). De día suele estar más calmo en temporada Halloween.",
    earlyEntry: universalEarlyEntry,
    attractions: [
      {
        name: "Revenge of the Mummy",
        category: "coaster",
        description:
          "Coaster indoor en la oscuridad con fuego, momias y vibra Indiana Jones meets Universal monsters.",
        image: img.mummy,
        url: "https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/revenge-of-the-mummy",
      },
      {
        name: "Transformers",
        category: "simulator",
        description:
          "Transformers: The Ride-3D — batalla entre Autobots y Decepticons con pantallas gigantes y motion.",
        image: img.transformers,
        url: "https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/transformers-the-ride-3d",
      },
      {
        name: "The Simpsons Ride",
        category: "simulator",
        description:
          "Simulador en Springfield: Krusty, Homero y un roller coaster virtual con humor Simpsons total.",
        image: img.simpsons,
        url: "https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/the-simpsons-ride",
      },
      {
        name: "Diagon Alley / Harry Potter",
        mustDo: true,
        category: "world",
        description:
          "Diagon Alley completo: Gringotts, Ollivanders, butterbeer y el Hogwarts Express hacia Hogsmeade.",
        image: img.diagon,
        url: "https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/harry-potter-and-the-escape-from-gringotts",
      },
      {
        name: "Minion Mayhem",
        category: "simulator",
        description:
          "Despicable Me Minion Mayhem: simulador 3D donde te convertís en Minion — ideal para el grupo completo.",
        image: img.minions,
        url: "https://www.universalorlando.com/web/en/us/things-to-do/rides-attractions/despicable-me-minion-mayhem",
      },
    ],
    tips: [
      "Entrada temprana Universal (~08:00) — Endless Summer",
      "Diagon Alley con calma",
      "Comparar con lo visto en HHN la noche anterior",
    ],
  },
];

export function getPark(slug: string) {
  return parks.find((p) => p.slug === slug);
}

export function getDisneyParks() {
  return parks.filter((p) => p.resort === "disney");
}

export function getUniversalParks() {
  return parks.filter((p) => p.resort === "universal");
}
