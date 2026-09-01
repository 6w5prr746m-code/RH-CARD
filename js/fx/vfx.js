// Visual effects: screen shake, floating numbers, attack projectiles, death
// bursts, confetti, banners, and the holographic hand-card tilt.
// Pure DOM + CSS keyframes — no canvas, no external assets.

let fxRoot = null;
function getFxRoot() {
  if (!fxRoot) fxRoot = document.getElementById('fx-root');
  return fxRoot;
}

function shakeScreen(magnitude = 6, duration = 300) {
  const el = document.getElementById('screen-game');
  if (!el) return;
  el.style.setProperty('--shake-mag', String(Math.min(3, magnitude / 5)));
  el.style.setProperty('--shake-dur', `${duration}ms`);
  el.classList.remove('screen-shake');
  // Force reflow so the animation restarts even if still running.
  void el.offsetWidth;
  el.classList.add('screen-shake');
  clearTimeout(shakeScreen._t);
  shakeScreen._t = setTimeout(() => el.classList.remove('screen-shake'), duration + 30);
}

function spawnFloatNumber(rect, delta) {
  if (!rect || delta === 0) return;
  const root = getFxRoot();
  if (!root) return;
  const el = document.createElement('div');
  const positive = delta > 0;
  el.className = `fx-floatnum ${positive ? 'fx-heal' : 'fx-dmg'}`;
  el.textContent = positive ? `+${delta}` : `${delta}`;
  el.style.left = `${rect.left + rect.width / 2}px`;
  el.style.top = `${rect.top + rect.height * 0.25}px`;
  root.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

function spawnImpactFlash(rect) {
  const root = getFxRoot();
  if (!root || !rect) return;
  const el = document.createElement('div');
  el.className = 'fx-impact';
  el.style.left = `${rect.left + rect.width / 2}px`;
  el.style.top = `${rect.top + rect.height / 2}px`;
  root.appendChild(el);
  setTimeout(() => el.remove(), 400);
}

function spawnDeathBurst(rect) {
  const root = getFxRoot();
  if (!root || !rect) return;
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const wrap = document.createElement('div');
  wrap.className = 'fx-deathburst';
  wrap.style.left = `${cx}px`;
  wrap.style.top = `${cy}px`;
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.className = 'fx-shard';
    const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 40 + Math.random() * 30;
    p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    p.style.animationDelay = `${Math.random() * 0.05}s`;
    wrap.appendChild(p);
  }
  root.appendChild(wrap);
  setTimeout(() => wrap.remove(), 650);
}

function spawnAttackProjectile(fromRect, toRect, onImpact) {
  const root = getFxRoot();
  if (!root || !fromRect || !toRect) { if (onImpact) onImpact(); return; }
  const fromX = fromRect.left + fromRect.width / 2;
  const fromY = fromRect.top + fromRect.height / 2;
  const toX = toRect.left + toRect.width / 2;
  const toY = toRect.top + toRect.height / 2;
  const el = document.createElement('div');
  el.className = 'fx-projectile';
  el.style.left = `${fromX}px`;
  el.style.top = `${fromY}px`;
  el.style.setProperty('--dx', `${toX - fromX}px`);
  el.style.setProperty('--dy', `${toY - fromY}px`);
  root.appendChild(el);
  setTimeout(() => {
    el.remove();
    spawnImpactFlash(toRect);
    if (onImpact) onImpact();
  }, 220);
}

function spawnConfetti(count = 70) {
  const root = getFxRoot();
  if (!root) return;
  const colors = ['#4fd1c5', '#ffb454', '#e0556f', '#5fbf6f', '#7d3bd1', '#3b6fd1'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'fx-confetti';
    el.style.left = `${Math.random() * 100}vw`;
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDuration = `${1.6 + Math.random() * 1.4}s`;
    el.style.animationDelay = `${Math.random() * 0.5}s`;
    el.style.setProperty('--rot', `${(Math.random() * 720 - 360).toFixed(0)}deg`);
    root.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
}

function showBanner(text, opts) {
  opts = opts || {};
  const root = getFxRoot();
  if (!root) return;
  const el = document.createElement('div');
  el.className = `fx-banner ${opts.epic ? 'fx-banner-epic' : ''}`;
  el.textContent = text;
  root.appendChild(el);
  setTimeout(() => el.remove(), opts.duration || 1400);
}

function showSynergyToast(domain, tier) {
  const root = getFxRoot();
  if (!root) return;
  const stackIndex = root.querySelectorAll('.fx-toast').length;
  const el = document.createElement('div');
  el.className = 'fx-toast';
  el.style.top = `${76 + stackIndex * 56}px`;
  el.style.setProperty('--dcolor', DOMAIN_COLORS[domain] || '#4fd1c5');
  el.innerHTML = `<span class="fx-toast-icon">${DOMAIN_ICONS[domain] || ''}</span> Synergie <b>${DOMAIN_LABELS[domain]}</b> — palier ${tier} activé`;
  root.appendChild(el);
  setTimeout(() => el.classList.add('fx-toast-out'), 2200);
  setTimeout(() => el.remove(), 2700);
}

// ---------------------------------------------------------------- holo tilt

function attachHolographicTilt(containerSelector, cardSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.addEventListener('mousemove', (e) => {
    const card = e.target.closest(cardSelector);
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 16;
    const ry = (px - 0.5) * 16;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-12px) scale(1.06)`;
    card.style.setProperty('--mx', `${px * 100}%`);
    card.style.setProperty('--my', `${py * 100}%`);
  });
  container.addEventListener('mouseleave', () => {
    container.querySelectorAll(cardSelector).forEach(c => { c.style.transform = ''; });
  }, true);
}
