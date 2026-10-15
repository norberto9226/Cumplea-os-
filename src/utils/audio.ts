/**
 * Audio synthesis helper using Web Audio API.
 * Provides zero-external-dependency celebratory audio:
 * - Happy Birthday melody (music box / warm synth)
 * - Candle blow sound (filtered noise)
 * - Celebration fanfare / chime
 * - Party popper / confetti pop
 * - Letter unfolding sound
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// "Cumpleaños Feliz" Notes and frequencies (Key of C)
// C4, C4, D4, C4, F4, E4
// C4, C4, D4, C4, G4, F4
// C4, C4, C5, A4, F4, E4, D4
// Bb4, Bb4, A4, F4, G4, F4
interface Note {
  pitch: number;
  duration: number; // in beats (1 beat = ~450ms)
}

const NOTE_FREQS: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
};

const BIRTHDAY_MELODY: Note[] = [
  // Cum-ple-a-ños fe-liz
  { pitch: NOTE_FREQS.C4, duration: 0.75 },
  { pitch: NOTE_FREQS.C4, duration: 0.25 },
  { pitch: NOTE_FREQS.D4, duration: 1.0 },
  { pitch: NOTE_FREQS.C4, duration: 1.0 },
  { pitch: NOTE_FREQS.F4, duration: 1.0 },
  { pitch: NOTE_FREQS.E4, duration: 2.0 },

  // Te de-se-a-mos to-dos
  { pitch: NOTE_FREQS.C4, duration: 0.75 },
  { pitch: NOTE_FREQS.C4, duration: 0.25 },
  { pitch: NOTE_FREQS.D4, duration: 1.0 },
  { pitch: NOTE_FREQS.C4, duration: 1.0 },
  { pitch: NOTE_FREQS.G4, duration: 1.0 },
  { pitch: NOTE_FREQS.F4, duration: 2.0 },

  // Cum-ple-a-ños [nom-bre]
  { pitch: NOTE_FREQS.C4, duration: 0.75 },
  { pitch: NOTE_FREQS.C4, duration: 0.25 },
  { pitch: NOTE_FREQS.C5, duration: 1.0 },
  { pitch: NOTE_FREQS.A4, duration: 1.0 },
  { pitch: NOTE_FREQS.F4, duration: 1.0 },
  { pitch: NOTE_FREQS.E4, duration: 1.0 },
  { pitch: NOTE_FREQS.D4, duration: 2.0 },

  // Cum-ple-a-ños fe-liz
  { pitch: NOTE_FREQS.Bb4, duration: 0.75 },
  { pitch: NOTE_FREQS.Bb4, duration: 0.25 },
  { pitch: NOTE_FREQS.A4, duration: 1.0 },
  { pitch: NOTE_FREQS.F4, duration: 1.0 },
  { pitch: NOTE_FREQS.G4, duration: 1.0 },
  { pitch: NOTE_FREQS.F4, duration: 2.5 },
];

let melodyTimeoutIds: number[] = [];
let isMelodyPlaying = false;

export function playNote(freq: number, startTime: number, duration: number, ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // Music box / warm marimba/piano timbre
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);

  // Subtle overtone for sparkle
  const osc2 = ctx.createOscillator();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2, startTime);
  const gain2 = ctx.createGain();
  gain2.gain.setValueAtTime(0.18, startTime);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2400, startTime);

  // ADSR
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.28, startTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  osc2.connect(gain2);
  gain2.connect(gain);
  gain.connect(filter);
  filter.connect(ctx.destination);

  osc.start(startTime);
  osc2.start(startTime);
  osc.stop(startTime + duration);
  osc2.stop(startTime + duration);
}

export function playBirthdaySong(onEnd?: () => void): () => void {
  stopBirthdaySong();
  const ctx = getAudioContext();
  isMelodyPlaying = true;

  const beatSec = 0.44; // ~136 BPM
  let currentTime = ctx.currentTime + 0.1;

  BIRTHDAY_MELODY.forEach((note, index) => {
    const noteDuration = note.duration * beatSec;
    playNote(note.pitch, currentTime, noteDuration * 0.92, ctx);

    // Track timeout for finish event
    if (index === BIRTHDAY_MELODY.length - 1) {
      const finishDelay = (currentTime + noteDuration - ctx.currentTime) * 1000;
      const tId = window.setTimeout(() => {
        isMelodyPlaying = false;
        onEnd?.();
      }, finishDelay);
      melodyTimeoutIds.push(tId);
    }

    currentTime += noteDuration;
  });

  return stopBirthdaySong;
}

export function stopBirthdaySong() {
  melodyTimeoutIds.forEach((id) => clearTimeout(id));
  melodyTimeoutIds = [];
  isMelodyPlaying = false;
}

export function isSongPlaying() {
  return isMelodyPlaying;
}

/**
 * Blow sound effect (whoosh / breath of air)
 */
export function playBlowSound() {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.35);
    filter.Q.value = 3.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (e) {
    console.error('Audio blow sound failed', e);
  }
}

/**
 * Confetti pop / party popper sound
 */
export function playPopSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    console.error('Pop sound failed', e);
  }
}

/**
 * Letter open swoosh & crisp sound
 */
export function playPaperSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, ctx.currentTime);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(filter);
    filter.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch (e) {
    console.error('Paper sound failed', e);
  }
}

/**
 * Victory fanfare / magic chime when blowing out all candles
 */
export function playCelebrationFanfare() {
  try {
    const ctx = getAudioContext();
    const notes = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.50, d: 0.5 }, // C6
    ];

    let t = ctx.currentTime + 0.05;
    notes.forEach((n) => {
      playNote(n.f, t, n.d * 1.5, ctx);
      t += n.d;
    });
  } catch (e) {
    console.error('Fanfare failed', e);
  }
}
