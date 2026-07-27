/** Reproduce el SFX de pasar página, suavizado (volumen bajo + menos agudos). */

export const PAGE_TURN_DURATION_S = 1.15;

const SOUND_SRC = "/sounds/page-turn.mp3";

let sharedCtx: AudioContext | null = null;
let buffer: AudioBuffer | null = null;
let loading: Promise<AudioBuffer | null> | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!sharedCtx) sharedCtx = new AC();
  return sharedCtx;
}

async function loadBuffer(ctx: AudioContext) {
  if (buffer) return buffer;
  if (!loading) {
    loading = fetch(SOUND_SRC)
      .then((r) => r.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data.slice(0)))
      .then((decoded) => {
        buffer = decoded;
        return decoded;
      })
      .catch(() => null);
  }
  return loading;
}

export function playPageTurnSound() {
  const ctx = getCtx();
  if (!ctx) return;

  void ctx.resume();

  void loadBuffer(ctx).then((decoded) => {
    if (!decoded || !sharedCtx) return;

    const source = sharedCtx.createBufferSource();
    source.buffer = decoded;

    // Recorta agudos duros
    const lowpass = sharedCtx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 2200;
    lowpass.Q.value = 0.6;

    const highcut = sharedCtx.createBiquadFilter();
    highcut.type = "highshelf";
    highcut.frequency.value = 1800;
    highcut.gain.value = -8;

    const gain = sharedCtx.createGain();
    gain.gain.value = 0.32;

    source.connect(lowpass);
    lowpass.connect(highcut);
    highcut.connect(gain);
    gain.connect(sharedCtx.destination);
    source.start(0);
  });
}
