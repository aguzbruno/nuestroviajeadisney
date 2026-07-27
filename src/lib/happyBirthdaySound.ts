/** Melodía procedural de Feliz Cumpleaños (~5 s). */
let sharedCtx: AudioContext | null = null;

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

const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const F4 = 349.23;
const G4 = 392.0;
const A4 = 440.0;
const Bb4 = 466.16;
const C5 = 523.25;

/** Notas [freq, duración en segundos] — ~5 s en total. */
const MELODY: ReadonlyArray<readonly [number, number]> = [
  [C4, 0.11],
  [C4, 0.11],
  [D4, 0.22],
  [C4, 0.22],
  [F4, 0.22],
  [E4, 0.38],
  [C4, 0.11],
  [C4, 0.11],
  [D4, 0.22],
  [C4, 0.22],
  [G4, 0.22],
  [F4, 0.38],
  [C4, 0.11],
  [C4, 0.11],
  [C5, 0.22],
  [A4, 0.22],
  [F4, 0.22],
  [E4, 0.22],
  [D4, 0.3],
  [Bb4, 0.11],
  [Bb4, 0.11],
  [A4, 0.22],
  [F4, 0.22],
  [G4, 0.22],
  [F4, 0.4],
];

export function playHappyBirthday() {
  const ctx = getCtx();
  if (!ctx) return;

  void ctx.resume();
  let t = ctx.currentTime + 0.04;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.22, t);
  master.connect(ctx.destination);

  for (const [freq, dur] of MELODY) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, t);

    const attack = 0.02;
    const release = Math.min(0.12, dur * 0.35);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.85, t + attack);
    gain.gain.setValueAtTime(0.7, t + dur - release);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(gain);
    gain.connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.02);

    t += dur;
  }
}

/** Desbloquea AudioContext en un gesto del usuario (p. ej. pasar hoja). */
export function unlockAudio() {
  const ctx = getCtx();
  if (!ctx) return;
  void ctx.resume();
}
