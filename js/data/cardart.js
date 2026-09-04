// Card illustrations. Two sources, one entry point:
//
// 1. Generative fallback (default): a deterministic (seeded by card id)
//    abstract "corporate tech" panel — domain-colored gradient + procedural
//    motif + the domain icon. Same id always renders the same art, so it's
//    stable across re-renders/sessions, and it needs no external assets.
// 2. Real illustration: an image dropped at art/<card-id>.<ext>. To switch a
//    card over, add its id -> extension to REAL_ART_IDS below — nothing else
//    needs touching. If the file is missing or fails to load, the <img>
//    automatically falls back to the generative art via onerror, so a bad/
//    missing drop never breaks the layout.
//
// cardArtMarkup(card) is the only entry point used by every template
// (card-tile, hand-card, mini-card, card-zoom).

// Card id -> file extension for cards with a real illustration at
// art/<id>.<ext> (jpg preferred — much lighter than png for painterly art;
// png/webp also supported). Empty until artwork is generated and dropped in
// — see docs/card-art-prompts.md for the per-card prompts used to generate
// them externally.
const REAL_ART_IDS = new Map([]);

function hashStringToSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToHsl(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;
  if (max === min) { h = s = 0; } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  let r, g, b;
  if (s === 0) { r = g = b = l; } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }

// ---- motif generators — each returns an SVG fragment string, viewBox 0 0 240 140

function motifOrbits(rng, accent) {
  let out = '';
  const cx = 120 + (rng() - 0.5) * 50, cy = 68 + (rng() - 0.5) * 30;
  for (let i = 0; i < 4; i++) {
    const r = 14 + i * 17 + rng() * 6;
    out += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="${accent}" stroke-width="1.1" opacity="${(0.5 - i * 0.09).toFixed(2)}"/>`;
  }
  for (let i = 0; i < 7; i++) {
    const a = rng() * Math.PI * 2, r = 18 + rng() * 58;
    out += `<circle cx="${(cx + Math.cos(a) * r).toFixed(1)}" cy="${(cy + Math.sin(a) * r).toFixed(1)}" r="${(1.3 + rng() * 2).toFixed(1)}" fill="${accent}" opacity="${(0.35 + rng() * 0.4).toFixed(2)}"/>`;
  }
  return out;
}

function motifHexgrid(rng, accent) {
  let out = '';
  const size = 15;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 10; col++) {
      if (rng() > 0.5) continue;
      const x = col * size * 1.5 - 10 + (row % 2 ? size * 0.75 : 0);
      const y = row * size * 1.25 - 10;
      const r = size * 0.52;
      const pts = [];
      for (let i = 0; i < 6; i++) { const a = Math.PI / 3 * i; pts.push(`${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`); }
      out += `<polygon points="${pts.join(' ')}" fill="${accent}" opacity="${(0.1 + rng() * 0.22).toFixed(2)}"/>`;
    }
  }
  return out;
}

function motifBars(rng, accent) {
  let out = '';
  const n = 8;
  for (let i = 0; i < n; i++) {
    const h = 16 + rng() * 78;
    const x = 6 + i * 29;
    out += `<rect x="${x}" y="${(132 - h).toFixed(1)}" width="20" height="${h.toFixed(1)}" fill="${accent}" opacity="${(0.18 + i * 0.06).toFixed(2)}" rx="1.5"/>`;
  }
  return out;
}

function motifNodes(rng, accent) {
  const pts = [];
  for (let i = 0; i < 8; i++) pts.push([16 + rng() * 210, 12 + rng() * 116]);
  let out = '';
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      if (rng() > 0.3) continue;
      out += `<line x1="${pts[i][0].toFixed(1)}" y1="${pts[i][1].toFixed(1)}" x2="${pts[j][0].toFixed(1)}" y2="${pts[j][1].toFixed(1)}" stroke="${accent}" stroke-width="1" opacity="0.22"/>`;
    }
  }
  for (const [x, y] of pts) out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.8" fill="${accent}" opacity="0.7"/>`;
  return out;
}

function motifWaves(rng, accent) {
  let out = '';
  for (let i = 0; i < 4; i++) {
    const yBase = 34 + i * 24 + rng() * 8;
    const amp = 8 + rng() * 12;
    out += `<path d="M -10 ${yBase.toFixed(1)} Q 60 ${(yBase - amp).toFixed(1)} 120 ${yBase.toFixed(1)} T 250 ${yBase.toFixed(1)}" fill="none" stroke="${accent}" stroke-width="1.4" opacity="${(0.5 - i * 0.09).toFixed(2)}"/>`;
  }
  return out;
}

function motifGrid(rng, accent) {
  let out = '';
  for (let x = 0; x <= 240; x += 20) out += `<line x1="${x}" y1="0" x2="${x}" y2="140" stroke="${accent}" stroke-width="0.6" opacity="0.1"/>`;
  for (let y = 0; y <= 140; y += 20) out += `<line x1="0" y1="${y}" x2="240" y2="${y}" stroke="${accent}" stroke-width="0.6" opacity="0.1"/>`;
  out += `<rect x="-30" y="${(60 + rng() * 20).toFixed(1)}" width="320" height="10" fill="${accent}" opacity="0.16" transform="rotate(-8 120 70)"/>`;
  return out;
}

const ART_MOTIFS = [motifOrbits, motifHexgrid, motifBars, motifNodes, motifWaves, motifGrid];

function legendaryMotif(rng) {
  const colors = ['#ff5f6d', '#ffc371', '#4fd1c5', '#7d3bd1', '#3b6fd1', '#5fbf6f'];
  let out = '';
  for (let i = 0; i < colors.length; i++) {
    const a = (i / colors.length) * Math.PI * 2;
    out += `<line x1="120" y1="68" x2="${(120 + Math.cos(a) * 115).toFixed(1)}" y2="${(68 + Math.sin(a) * 115).toFixed(1)}" stroke="${colors[i]}" stroke-width="3" opacity="0.5"/>`;
  }
  for (let i = 0; i < 44; i++) {
    const a = rng() * Math.PI * 2, r = 8 + rng() * 95;
    out += `<circle cx="${(120 + Math.cos(a) * r).toFixed(1)}" cy="${(68 + Math.sin(a) * r).toFixed(1)}" r="${(1 + rng() * 2.2).toFixed(1)}" fill="${colors[i % colors.length]}" opacity="${(0.4 + rng() * 0.5).toFixed(2)}"/>`;
  }
  return out;
}

// Cached by card id — the SVG never changes for a given card, so build once.
const _artCache = {};

function cardArtMarkup(card) {
  const id = card.id || card.cardId || card.name;
  if (_artCache[id]) return _artCache[id];

  const markup = REAL_ART_IDS.has(id)
    ? `<img class="card-art-img" src="art/${id}.${REAL_ART_IDS.get(id)}" alt="" loading="lazy" onerror="this.outerHTML=cardArtFallbackSvg('${id}');">`
    : generativeCardArtSvg(card);

  _artCache[id] = markup;
  return markup;
}

// Used both as the default art and as the onerror fallback for a missing/broken
// real illustration (see cardArtMarkup) — always builds the procedural SVG,
// ignoring REAL_ART_IDS.
function cardArtFallbackSvg(id) {
  return generativeCardArtSvg(CARDS_BY_ID[id] || ALL_CARDS.find(c => c.id === id));
}

function generativeCardArtSvg(card) {
  const id = card.id || card.cardId || card.name;
  const isLegendary = id === 'peoplespheres';
  const domain = card.domain || DOMAIN.TRANSVERSAL;
  const baseColor = isLegendary ? '#7d3bd1' : (DOMAIN_COLORS[domain] || '#4fd1c5');
  const seed = hashStringToSeed(id);
  const rng = mulberry32(seed);
  const [h, s, l] = hexToHsl(baseColor);
  const topColor = hslToHex(h, Math.min(90, s + 8), Math.max(20, Math.min(48, l - 6)));
  const bottomColor = hslToHex(h, Math.min(95, s + 14), Math.max(5, l - 40));
  const accent = hslToHex(h, Math.min(100, s + 18), Math.min(78, l + 24));

  const motifSvg = isLegendary ? legendaryMotif(rng) : pick(rng, ART_MOTIFS)(rng, accent);
  const icon = isLegendary ? '🌐' : (DOMAIN_ICONS[domain] || '⬡');
  const gradId = `cardart-g${seed}`;

  const svg = `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
    <defs>
      <radialGradient id="${gradId}" cx="50%" cy="32%" r="80%">
        <stop offset="0%" stop-color="${topColor}"/>
        <stop offset="100%" stop-color="${bottomColor}"/>
      </radialGradient>
    </defs>
    <rect width="240" height="140" fill="url(#${gradId})"/>
    <g>${motifSvg}</g>
    <circle cx="120" cy="66" r="29" fill="#000" opacity="0.24"/>
    <text x="120" y="79" font-size="38" text-anchor="middle" dominant-baseline="middle">${icon}</text>
  </svg>`;

  _artCache[id] = svg;
  return svg;
}
