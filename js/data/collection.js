// Persistent card collection + booster progression (G5). Stored in
// localStorage so it survives across sessions on this device.

const COLLECTION_KEY = 'rhcard_collection';
const STARTER_BOOSTERS = 3;
const BOOSTER_SIZE = 5;

let collectionState = null;

function maxOwnedFor(card) {
  return (card.rarity === 3 || card.rarity === 'L') ? 1 : 2;
}

function buildStarterCollection() {
  const owned = {};
  for (const c of CARD_POOL) {
    if (c.rarity === 1) owned[c.id] = 1;
  }
  owned[LEGENDARY_CARD.id] = 1;
  return { owned, boosters: STARTER_BOOSTERS };
}

function loadCollection() {
  if (collectionState) return collectionState;
  try {
    const raw = localStorage.getItem(COLLECTION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.owned) {
        collectionState = { owned: parsed.owned, boosters: parsed.boosters || 0 };
        return collectionState;
      }
    }
  } catch (e) { /* corrupted storage — fall through to a fresh starter set */ }
  collectionState = buildStarterCollection();
  saveCollection();
  return collectionState;
}

function saveCollection() {
  if (!collectionState) return;
  try { localStorage.setItem(COLLECTION_KEY, JSON.stringify(collectionState)); } catch (e) { /* storage unavailable */ }
}

function ownedCount(cardId) {
  const state = loadCollection();
  return state.owned[cardId] || 0;
}

function addOwnedCard(cardId) {
  const state = loadCollection();
  const card = CARDS_BY_ID[cardId];
  const cap = card ? maxOwnedFor(card) : 2;
  state.owned[cardId] = Math.min(cap, (state.owned[cardId] || 0) + 1);
}

function addBoosters(n) {
  const state = loadCollection();
  state.boosters += n;
  saveCollection();
}

function pickCardForRarity(rarity, owned) {
  const pool = CARD_POOL.filter(c => c.rarity === rarity);
  const underCap = pool.filter(c => (owned[c.id] || 0) < maxOwnedFor(c));
  const source = underCap.length > 0 ? underCap : pool;
  return source[Math.floor(Math.random() * source.length)];
}

// Opens one booster (consumes it) and returns the 5 cards pulled, in reveal order.
function openBooster() {
  const state = loadCollection();
  if (state.boosters <= 0) return null;
  state.boosters -= 1;
  const raritySlots = [1, 1, 1, 2, Math.random() < 0.15 ? 3 : 2];
  const picks = raritySlots.map(r => pickCardForRarity(r, state.owned));
  for (const c of picks) addOwnedCard(c.id);
  saveCollection();
  return picks;
}

function ownedDeckIsBuildable(minSize) {
  const state = loadCollection();
  const total = Object.values(state.owned).reduce((a, b) => a + b, 0);
  return total >= minSize;
}

// Random deck drawn only from cards the human player actually owns — used by
// the deck builder's "Deck aléatoire" shortcut (distinct from buildAiDeck(),
// which builds the AI's opponent deck from the full pool with no ownership
// constraint).
function buildRandomOwnedDeckList() {
  const state = loadCollection();
  const candidates = [];
  for (const [id, count] of Object.entries(state.owned)) {
    const card = CARDS_BY_ID[id];
    if (!card) continue;
    const avail = Math.min(count, maxOwnedFor(card));
    for (let i = 0; i < avail; i++) candidates.push(id);
  }
  return shuffle(candidates).slice(0, DECK_MAX);
}
