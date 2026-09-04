// Per-card evolution: every card the player owns accumulates its own XP
// across real games (see js/ui/board.js's showGameOver, the only place XP is
// granted) and climbs through 7 named levels. Stored separately from
// js/data/collection.js (which only tracks *ownership counts*) but follows
// the exact same lazy-singleton + localStorage pattern.

const CARD_LEVELS_KEY = 'rhcard_card_levels';

const LEVEL_NAMES = ['New', 'Junior', 'Expert', 'Senior', 'Sage', 'Légende', 'Immortel'];
const LEVEL_ABBR = ['', 'Jr', 'Ex', 'Sr', 'Sg', 'Lg', 'Im'];

// Cumulative XP required to REACH each level (index = level 0-6). A card
// played in a won game earns ~9 XP, ~4 on a loss (see xpGainForResult in
// board.js) — this curve is a first pass, easy to retune as one array.
const LEVEL_XP_THRESHOLDS = [0, 20, 60, 140, 280, 520, 900];

// Small, deliberately modest permanent stat bonuses per level — applied only
// to MINION cards (ACTION cards have no atk/def/hp to buff).
const LEVEL_STAT_BONUS = [
  { atk: 0, def: 0, hp: 0 },
  { atk: 0, def: 0, hp: 1 },
  { atk: 1, def: 0, hp: 1 },
  { atk: 1, def: 1, hp: 1 },
  { atk: 1, def: 1, hp: 2 },
  { atk: 2, def: 1, hp: 2 },
  { atk: 2, def: 2, hp: 3 },
];

// From this level on (Sage+), a card gains one passive ability drawn from
// its domain's LEVEL_ABILITIES pool (js/data/level-abilities.js).
const LEVEL_ABILITY_UNLOCK = 4;

let cardLevelState = null;

function loadCardLevels() {
  if (cardLevelState) return cardLevelState;
  try {
    const raw = localStorage.getItem(CARD_LEVELS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.xp) { cardLevelState = { xp: parsed.xp }; return cardLevelState; }
    }
  } catch (e) { /* corrupted storage — fall through to a fresh state */ }
  cardLevelState = { xp: {} };
  return cardLevelState;
}

function saveCardLevels() {
  if (!cardLevelState) return;
  try { localStorage.setItem(CARD_LEVELS_KEY, JSON.stringify(cardLevelState)); } catch (e) { /* storage unavailable */ }
}

function getCardXp(cardId) {
  return loadCardLevels().xp[cardId] || 0;
}

function levelForXp(xp) {
  let level = 0;
  for (let i = LEVEL_XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_XP_THRESHOLDS[i]) { level = i; break; }
  }
  return level;
}

function getCardLevel(cardId) {
  return levelForXp(getCardXp(cardId));
}

// Returns { oldLevel, newLevel, xp } so callers can detect and announce a level-up.
function addCardXp(cardId, amount) {
  if (!amount) return { oldLevel: getCardLevel(cardId), newLevel: getCardLevel(cardId), xp: getCardXp(cardId) };
  const state = loadCardLevels();
  const oldXp = state.xp[cardId] || 0;
  const oldLevel = levelForXp(oldXp);
  const newXp = oldXp + amount;
  state.xp[cardId] = newXp;
  saveCardLevels();
  return { oldLevel, newLevel: levelForXp(newXp), xp: newXp };
}

function levelLabel(level) { return LEVEL_NAMES[level] || LEVEL_NAMES[0]; }
function levelAbbr(level) { return LEVEL_ABBR[level] || ''; }
function levelClass(level) { return `level-${level}`; }

// "128/280 XP" progress toward the next level, or "XP max" once Immortel.
function levelProgressText(cardId) {
  const xp = getCardXp(cardId);
  const level = levelForXp(xp);
  if (level >= LEVEL_XP_THRESHOLDS.length - 1) return `${xp} XP (max)`;
  return `${xp}/${LEVEL_XP_THRESHOLDS[level + 1]} XP`;
}

function hashCardId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

// Deterministic pick within the card's domain pool — same card always gets
// the same ability, but different cards in one domain naturally diverge.
function getLevelAbilityFor(cardId, domain) {
  const pool = typeof LEVEL_ABILITIES !== 'undefined' ? LEVEL_ABILITIES[domain] : null;
  if (!pool || pool.length === 0) return null;
  return pool[hashCardId(cardId) % pool.length];
}

// The ability a card currently has unlocked (or null if below the threshold
// / its domain has no pool, e.g. the TRANSVERSAL legendary).
function cardLevelAbility(cardId, domain) {
  if (getCardLevel(cardId) < LEVEL_ABILITY_UNLOCK) return null;
  return getLevelAbilityFor(cardId, domain);
}
