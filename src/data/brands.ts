import type { Brand } from "@/types/trip";

/** Logo vía Google Favicon API (128px). */
function logoFromDomain(domain: string): string {
  return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`;
}

function b(
  id: string,
  name: string,
  domain: string | null,
  monogram: string,
): Brand {
  return {
    id,
    name,
    monogram,
    ...(domain ? { logo: logoFromDomain(domain) } : {}),
  };
}

/** Catálogo de marcas con logo por dominio (+ monograma de respaldo). */
export const brandsCatalog: Record<string, Brand> = {
  nike: b("nike", "Nike", "nike.com", "NK"),
  adidas: b("adidas", "Adidas", "adidas.com", "AD"),
  coach: b("coach", "Coach", "coach.com", "CO"),
  levis: b("levis", "Levi's", "levi.com", "LV"),
  tommy: b("tommy", "Tommy Hilfiger", "tommy.com", "TH"),
  gap: b("gap", "Gap", "gap.com", "GP"),
  underarmour: b("underarmour", "Under Armour", "underarmour.com", "UA"),
  "michael-kors": b("michael-kors", "Michael Kors", "michaelkors.com", "MK"),
  "kate-spade": b("kate-spade", "Kate Spade", "katespade.com", "KS"),
  polo: b("polo", "Polo Ralph Lauren", "ralphlauren.com", "RL"),
  "banana-republic": b(
    "banana-republic",
    "Banana Republic",
    "bananarepublic.com",
    "BR",
  ),
  apple: b("apple", "Apple", "apple.com", "AP"),
  macys: b("macys", "Macy's", "macys.com", "MY"),
  zara: b("zara", "Zara", "zara.com", "ZA"),
  hm: b("hm", "H&M", "hm.com", "HM"),
  sephora: b("sephora", "Sephora", "sephora.com", "SP"),
  "world-of-disney": b(
    "world-of-disney",
    "World of Disney",
    "disneysprings.com",
    "WD",
  ),
  lego: b("lego", "LEGO", "lego.com", "LG"),
  "universal-store": b(
    "universal-store",
    "Universal Store",
    "universalorlando.com",
    "UN",
  ),
  puma: b("puma", "Puma", "puma.com", "PM"),
  vans: b("vans", "Vans", "vans.com", "VN"),
  converse: b("converse", "Converse", "converse.com", "CV"),
  "calvin-klein": b("calvin-klein", "Calvin Klein", "calvinklein.us", "CK"),
  guess: b("guess", "Guess", "guess.com", "GU"),
  skechers: b("skechers", "Skechers", "skechers.com", "SK"),
  columbia: b("columbia", "Columbia", "columbia.com", "CL"),
  "north-face": b("north-face", "The North Face", "thenorthface.com", "NF"),
  "tory-burch": b("tory-burch", "Tory Burch", "toryburch.com", "TB"),
  fossil: b("fossil", "Fossil", "fossil.com", "FO"),
  express: b("express", "Express", "express.com", "EX"),
  "victoria-secret": b(
    "victoria-secret",
    "Victoria's Secret",
    "victoriassecret.com",
    "VS",
  ),
  "bath-body": b(
    "bath-body",
    "Bath & Body Works",
    "bathandbodyworks.com",
    "BB",
  ),
  "forever-21": b("forever-21", "Forever 21", "forever21.com", "F21"),
  pandora: b("pandora", "Pandora", "pandora.net", "PD"),
  uniqlo: b("uniqlo", "Uniqlo", "uniqlo.com", "UQ"),
  "disney-store": b("disney-store", "Disney Store", "shopdisney.com", "DS"),
  "famous-footwear": b(
    "famous-footwear",
    "Famous Footwear",
    "famousfootwear.com",
    "FF",
  ),
  "old-navy": b("old-navy", "Old Navy", "oldnavy.gap.com", "ON"),
  carter: b("carter", "Carter's", "carters.com", "CA"),
  "souvenirs-idrive": b("souvenirs-idrive", "Souvenirs I-Drive", null, "SI"),
  "the-wheel": b("the-wheel", "The Wheel Gift Shop", "iconparkorlando.com", "TW"),
  "hard-rock": b("hard-rock", "Hard Rock Cafe Store", "hardrock.com", "HR"),
  voodoo: b("voodoo", "Voodoo Doughnut", "voodoodoughnut.com", "VD"),
  superstore: b(
    "superstore",
    "Universal Studios Store",
    "universalorlando.com",
    "US",
  ),
};

export function brand(id: string): Brand {
  const found = brandsCatalog[id];
  if (!found) {
    return { id, name: id, monogram: id.slice(0, 2).toUpperCase() };
  }
  return found;
}

export function brands(...ids: string[]): Brand[] {
  return ids.map(brand);
}
