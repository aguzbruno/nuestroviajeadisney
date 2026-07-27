/** SFX procedurales: buscando personaje + revelación mágica. */

let sharedCtx: AudioContext | null = null;
let searchStop: (() => void) | null = null;

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

function tone(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType = "sine",
  peak = 0.5,
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);

  const attack = Math.min(0.025, dur * 0.2);
  const release = Math.min(0.1, dur * 0.4);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + attack);
  gain.gain.setValueAtTime(peak * 0.75, start + dur - release);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

  osc.connect(gain);
  gain.connect(dest);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

/** Twinkles / “bibbidi bobbidi” mientras busca el personaje (~1.4 s). */
export function playCharacterSearchSound() {
  stopCharacterSearchSound();

  const ctx = getCtx();
  if (!ctx) return;

  void ctx.resume();
  const t0 = ctx.currentTime + 0.02;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.2, t0);
  master.connect(ctx.destination);

  // Brillos cortos ascendentes + un “poof” suave
  const sparkles: ReadonlyArray<readonly [number, number, number]> = [
    [523.25, 0, 0.12],
    [659.25, 0.14, 0.1],
    [783.99, 0.28, 0.1],
    [987.77, 0.42, 0.11],
    [880.0, 0.58, 0.1],
    [1046.5, 0.72, 0.12],
    [1174.66, 0.9, 0.1],
    [1318.51, 1.05, 0.14],
    [1567.98, 1.2, 0.16],
  ];

  for (const [freq, offset, dur] of sparkles) {
    tone(ctx, master, freq, t0 + offset, dur, "sine", 0.55);
    tone(ctx, master, freq * 2, t0 + offset, dur * 0.7, "triangle", 0.18);
  }

  // Whisper mágico de fondo (oscilación suave)
  const hum = ctx.createOscillator();
  const humGain = ctx.createGain();
  hum.type = "triangle";
  hum.frequency.setValueAtTime(220, t0);
  hum.frequency.exponentialRampToValueAtTime(330, t0 + 1.3);
  humGain.gain.setValueAtTime(0.0001, t0);
  humGain.gain.exponentialRampToValueAtTime(0.12, t0 + 0.15);
  humGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.35);
  hum.connect(humGain);
  humGain.connect(master);
  hum.start(t0);
  hum.stop(t0 + 1.4);

  searchStop = () => {
    try {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(0.0001, ctx.currentTime);
    } catch {
      /* ignore */
    }
    searchStop = null;
  };

  window.setTimeout(() => {
    searchStop = null;
  }, 1500);
}

export function stopCharacterSearchSound() {
  searchStop?.();
  searchStop = null;
}

/** Fanfarria corta al revelar el personaje. */
export function playCharacterFoundSound() {
  stopCharacterSearchSound();

  const ctx = getCtx();
  if (!ctx) return;

  void ctx.resume();
  const t0 = ctx.currentTime + 0.02;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.28, t0);
  master.connect(ctx.destination);

  // Acorde mágico: C major + sparkle
  const chord: ReadonlyArray<number> = [523.25, 659.25, 783.99, 1046.5];
  for (const freq of chord) {
    tone(ctx, master, freq, t0, 0.55, "triangle", 0.55);
    tone(ctx, master, freq * 2, t0 + 0.02, 0.35, "sine", 0.2);
  }

  // Cascada de brillos
  const cascade: ReadonlyArray<readonly [number, number]> = [
    [1318.51, 0.18],
    [1567.98, 0.3],
    [2093.0, 0.42],
    [2637.02, 0.55],
  ];
  for (const [freq, offset] of cascade) {
    tone(ctx, master, freq, t0 + offset, 0.22, "sine", 0.4);
  }

  // Toque final “ding”
  tone(ctx, master, 1760, t0 + 0.72, 0.45, "sine", 0.5);
  tone(ctx, master, 2349.32, t0 + 0.75, 0.35, "triangle", 0.22);
}
