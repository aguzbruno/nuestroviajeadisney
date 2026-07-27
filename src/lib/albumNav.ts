/** Query params para ir/volver al pliego exacto del álbum. */
export const ALBUM_FROM = "album";
export const ALBUM_FROM_PARAM = "from";
export const ALBUM_SPREAD_PARAM = "pliego";

type ParamSource = {
  get(name: string): string | null;
};

/** Agrega `from=album&pliego=N` a un href (conserva query y hash). */
export function withAlbumReturn(href: string, pliego: number): string {
  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;

  const qIndex = withoutHash.indexOf("?");
  const path = qIndex >= 0 ? withoutHash.slice(0, qIndex) : withoutHash;
  const existing = qIndex >= 0 ? withoutHash.slice(qIndex + 1) : "";

  const params = new URLSearchParams(existing);
  params.set(ALBUM_FROM_PARAM, ALBUM_FROM);
  params.set(ALBUM_SPREAD_PARAM, String(pliego));

  return `${path}?${params.toString()}${hash}`;
}

/** `/?pliego=N` si venís del álbum; si no, null. */
export function getAlbumReturnHref(searchParams: ParamSource): string | null {
  if (searchParams.get(ALBUM_FROM_PARAM) !== ALBUM_FROM) return null;
  const pliego = searchParams.get(ALBUM_SPREAD_PARAM);
  if (pliego != null && pliego !== "") {
    const n = Number.parseInt(pliego, 10);
    if (Number.isFinite(n) && n >= 0) {
      return `/?${ALBUM_SPREAD_PARAM}=${n}`;
    }
  }
  return "/";
}

export function parseAlbumSpreadParam(
  searchParams: ParamSource,
): number | null {
  const raw = searchParams.get(ALBUM_SPREAD_PARAM);
  if (raw == null || raw === "") return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}
