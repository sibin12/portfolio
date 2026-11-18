/**
 * Tiny synthesized sound effects, no audio files.
 * Sound is opt-in: browsers block audio until the visitor interacts, so it stays off
 * until they press the speaker button, and the choice is remembered per browser.
 */

const KEY = 'sibin.sound';
let ctx: AudioContext | null = null;
let master: GainNode | null = null;

const read = () => {
  try {
    return localStorage.getItem(KEY) === 'on';
  } catch {
    return false;
  }
};

let enabled = read();

function context() {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

export const sound = {
  get enabled() {
    return enabled;
  },

  setEnabled(on: boolean) {
    enabled = on;
    try {
      localStorage.setItem(KEY, on ? 'on' : 'off');
    } catch {
      /* private mode: keep it for this visit only */
    }
    if (on) context();
  },

  /** A blade whoosh followed by a short metallic ring. */
  slice() {
    if (!enabled) return;
    const ac = context();
    if (!ac || !master) return;
    const t = ac.currentTime;

    const length = 0.34;
    const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * length), ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
    const noise = ac.createBufferSource();
    noise.buffer = buffer;
    const band = ac.createBiquadFilter();
    band.type = 'bandpass';
    band.Q.value = 0.9;
    band.frequency.setValueAtTime(800, t);
    band.frequency.exponentialRampToValueAtTime(7500, t + 0.22);
    const whoosh = ac.createGain();
    whoosh.gain.setValueAtTime(0.0001, t);
    whoosh.gain.exponentialRampToValueAtTime(0.32, t + 0.06);
    whoosh.gain.exponentialRampToValueAtTime(0.0001, t + length);
    noise.connect(band).connect(whoosh).connect(master);
    noise.start(t);

    // Inharmonic partials read as metal rather than a musical note.
    [2637, 3951, 6021].forEach((frequency, index) => {
      const start = t + 0.13;
      const osc = ac.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, start);
      const ring = ac.createGain();
      ring.gain.setValueAtTime(0.0001, start);
      ring.gain.exponentialRampToValueAtTime(0.11 / (index + 1), start + 0.01);
      ring.gain.exponentialRampToValueAtTime(0.0001, start + 0.7 - index * 0.15);
      osc.connect(ring).connect(master!);
      osc.start(start);
      osc.stop(start + 0.75);
    });
  },

  /** A soft low tap for when the two halves of the cut snap back together. */
  snap() {
    if (!enabled) return;
    const ac = context();
    if (!ac || !master) return;
    const t = ac.currentTime;
    const osc = ac.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.12);
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.35, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    osc.connect(gain).connect(master);
    osc.start(t);
    osc.stop(t + 0.2);
  },
};
