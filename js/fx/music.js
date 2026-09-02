// Procedural ambient background music (Web Audio API oscillators only — no
// audio files, keeping the game a pure, offline-capable HTML/JS bundle).
// A slow, looping chord progression well under the SFX volume, meant to sit
// quietly behind gameplay rather than draw attention.

const MUSIC = (() => {
  let ctx = null;
  let masterGain = null;
  let muted = localStorage.getItem('rhcard_music_muted') === '1';
  let running = false;
  let nextChordTime = 0;
  let chordIndex = 0;
  let schedulerId = null;

  const TARGET_GAIN = 0.06;
  const CHORD_DURATION = 6; // seconds each chord holds, long soft fades in/out
  const LOOKAHEAD = CHORD_DURATION * 2; // keep this many seconds scheduled ahead

  // A calm, slightly melancholy loop (i minor add9 - VI - i - v) — corporate
  // lo-fi rather than fanfare, so it can loop for a whole match unnoticed.
  const CHORDS = [
    [110.00, 130.81, 164.81, 220.00], // A2 C3 E3 A3
    [87.31, 130.81, 174.61, 220.00],  // F2 C3 F3 A3
    [110.00, 130.81, 164.81, 196.00], // A2 C3 E3 G3
    [98.00, 146.83, 174.61, 220.00],  // G2 D3 F3 A3
  ];

  function ensureCtx() {
    if (!ctx) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
      masterGain = ctx.createGain();
      masterGain.gain.value = muted ? 0.0001 : TARGET_GAIN;
      masterGain.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function playChord(chord, t0, duration) {
    for (const freq of chord) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(1, t0 + duration * 0.35);
      g.gain.linearRampToValueAtTime(0.0001, t0 + duration);
      osc.connect(g).connect(masterGain);
      osc.start(t0);
      osc.stop(t0 + duration + 0.1);
    }
  }

  function scheduleLoop() {
    if (!running) return;
    const c = ensureCtx();
    if (!c) return;
    while (nextChordTime < c.currentTime + LOOKAHEAD) {
      playChord(CHORDS[chordIndex % CHORDS.length], nextChordTime, CHORD_DURATION);
      chordIndex++;
      nextChordTime += CHORD_DURATION;
    }
    schedulerId = setTimeout(scheduleLoop, 2000);
  }

  function start() {
    if (running || muted) return;
    const c = ensureCtx();
    if (!c) return;
    running = true;
    nextChordTime = c.currentTime + 0.1;
    scheduleLoop();
  }

  function stop() {
    running = false;
    if (schedulerId) { clearTimeout(schedulerId); schedulerId = null; }
  }

  // Pause scheduling while the tab is hidden — no audible difference (Web
  // Audio's own timing keeps playing regardless), just avoids piling up
  // scheduler work in a background tab.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (!muted) start();
  });

  return {
    start,
    stop,
    isMuted() { return muted; },
    toggleMute() {
      muted = !muted;
      localStorage.setItem('rhcard_music_muted', muted ? '1' : '0');
      const c = ensureCtx();
      if (c) {
        if (muted) masterGain.gain.linearRampToValueAtTime(0.0001, c.currentTime + 0.4);
        else masterGain.gain.linearRampToValueAtTime(TARGET_GAIN, c.currentTime + 0.4);
      }
      if (muted) stop(); else start();
      return muted;
    },
  };
})();
