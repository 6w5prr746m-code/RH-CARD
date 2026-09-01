// Synthesized sound engine (Web Audio API oscillators/noise) — no audio files,
// so the game stays "pure HTML/JS" with zero assets and works fully offline.

const SFX = (() => {
  let ctx = null;
  let muted = localStorage.getItem('rhcard_muted') === '1';

  function ensureCtx() {
    if (!ctx) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone({ freq = 440, duration = 0.15, type = 'sine', gain = 0.18, freqEnd = null, delay = 0 }) {
    if (muted) return;
    const c = ensureCtx();
    if (!c) return;
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (freqEnd) osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), t0 + duration);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(g).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.03);
  }

  function noise({ duration = 0.2, gain = 0.15, delay = 0 }) {
    if (muted) return;
    const c = ensureCtx();
    if (!c) return;
    const size = Math.max(1, Math.floor(c.sampleRate * duration));
    const buffer = c.createBuffer(1, size, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / size);
    const src = c.createBufferSource();
    src.buffer = buffer;
    const g = c.createGain();
    g.gain.setValueAtTime(gain, c.currentTime + delay);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + delay + duration);
    src.connect(g).connect(c.destination);
    src.start(c.currentTime + delay);
  }

  const cues = {
    click: () => tone({ freq: 620, duration: 0.05, type: 'square', gain: 0.06 }),
    tabSwitch: () => tone({ freq: 500, freqEnd: 640, duration: 0.07, type: 'triangle', gain: 0.08 }),
    cardAdd: () => tone({ freq: 420, freqEnd: 560, duration: 0.08, type: 'triangle', gain: 0.1 }),
    cardRemove: () => tone({ freq: 420, freqEnd: 300, duration: 0.08, type: 'triangle', gain: 0.08 }),
    cardPlay: () => { tone({ freq: 300, freqEnd: 520, duration: 0.16, type: 'triangle', gain: 0.16 }); noise({ duration: 0.1, gain: 0.05 }); },
    draw: () => tone({ freq: 700, freqEnd: 920, duration: 0.08, type: 'triangle', gain: 0.1 }),
    attack: () => tone({ freq: 180, freqEnd: 70, duration: 0.12, type: 'sawtooth', gain: 0.18 }),
    hit: () => { noise({ duration: 0.15, gain: 0.22 }); tone({ freq: 130, duration: 0.1, type: 'square', gain: 0.14 }); },
    heal: () => { tone({ freq: 520, duration: 0.12, type: 'sine', gain: 0.15 }); tone({ freq: 780, duration: 0.18, type: 'sine', gain: 0.12, delay: 0.08 }); },
    death: () => tone({ freq: 320, freqEnd: 40, duration: 0.4, type: 'sawtooth', gain: 0.16 }),
    turnStart: () => { tone({ freq: 440, duration: 0.12, type: 'sine', gain: 0.13 }); tone({ freq: 660, duration: 0.16, type: 'sine', gain: 0.11, delay: 0.1 }); },
    synergy: () => { [500, 750, 1000].forEach((f, i) => tone({ freq: f, duration: 0.14, type: 'sine', gain: 0.12, delay: i * 0.08 })); },
    legendary: () => { [220, 330, 440, 660, 880].forEach((f, i) => tone({ freq: f, duration: 0.35, type: 'sine', gain: 0.16, delay: i * 0.08 })); noise({ duration: 0.5, gain: 0.08 }); },
    win: () => [523, 659, 784, 1046].forEach((f, i) => tone({ freq: f, duration: 0.3, type: 'triangle', gain: 0.16, delay: i * 0.12 })),
    lose: () => [400, 350, 300, 220].forEach((f, i) => tone({ freq: f, duration: 0.35, type: 'sawtooth', gain: 0.14, delay: i * 0.15 })),
    error: () => tone({ freq: 180, duration: 0.15, type: 'square', gain: 0.14 }),
  };

  return {
    play(name) { const fn = cues[name]; if (fn) fn(); },
    unlock() { ensureCtx(); },
    isMuted() { return muted; },
    toggleMute() {
      muted = !muted;
      localStorage.setItem('rhcard_muted', muted ? '1' : '0');
      return muted;
    },
  };
})();
