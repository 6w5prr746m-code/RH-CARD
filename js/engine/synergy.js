// Domain synergy resolution — GDD.md §2.
// Tiers are cumulative: reaching tier 4 keeps tier 2's effect active, etc.

const SYNERGY_DOMAINS = [
  DOMAIN.PAIE_GA, DOMAIN.GTA, DOMAIN.RECRUTEMENT,
  DOMAIN.FORMATION, DOMAIN.TALENT_PERF, DOMAIN.PILOTAGE_BI,
];

// PeopleSpheres is transversal: it counts toward every domain's synergy tally.
function getDomainCounts(board) {
  const counts = {};
  for (const d of SYNERGY_DOMAINS) counts[d] = 0;
  for (const card of board) {
    if (card.domain === DOMAIN.TRANSVERSAL) {
      for (const d of SYNERGY_DOMAINS) counts[d]++;
    } else if (counts[card.domain] !== undefined) {
      counts[card.domain]++;
    }
  }
  return counts;
}

function tierFor(count) {
  if (count >= 6) return 6;
  if (count >= 4) return 4;
  if (count >= 2) return 2;
  return 0;
}

function getSynergyTiers(board) {
  const counts = getDomainCounts(board);
  const tiers = {};
  for (const d of SYNERGY_DOMAINS) tiers[d] = tierFor(counts[d]);
  return tiers;
}

// ---- PAIE/GA — Stabilité ----
function paieGaHealAmount(tier) {
  if (tier >= 6) return 3;
  if (tier >= 2) return 1;
  return 0;
}
function paieGaDamageReduction(tier) {
  return tier >= 4 ? 1 : 0;
}

// ---- GTA — Défense ----
function gtaDefBonus(tier) {
  if (tier >= 6) return 3;
  if (tier >= 4) return 2;
  if (tier >= 2) return 1;
  return 0;
}
// Which GTA cards gain Provocation from the synergy itself (beyond their own base keyword).
function gtaProvocationGrantees(board, tier) {
  const gta = board.filter(c => c.domain === DOMAIN.GTA || c.domain === DOMAIN.TRANSVERSAL);
  if (tier >= 6) return new Set(gta.map(c => c.uid));
  if (tier >= 4) {
    let best = null;
    for (const c of gta) {
      if (!best || c.currentHp > best.currentHp) best = c;
    }
    return best ? new Set([best.uid]) : new Set();
  }
  return new Set();
}

// ---- RECRUTEMENT — Tempo ----
function recrutementExtraDraw(tier) {
  return tier >= 4 ? 1 : 0;
}
// Cost reduction for a RECRUTEMENT card: tier6 gives -1 to every one in hand;
// tier2 gives an *additional* -1 to the first one played each turn (flag-gated).
function recrutementCostReduction(tier, isFirstThisTurn) {
  let reduction = 0;
  if (tier >= 6) reduction += 1;
  if (tier >= 2 && isFirstThisTurn) reduction += 1;
  return reduction;
}

// ---- FORMATION — Progression ----
// Returns the permanent per-turn growth applied to every FORMATION card in play, or null.
function formationGrowth(tier) {
  if (tier < 2) return null;
  const base = tier >= 4 ? { atk: 1, def: 1, hp: 1 } : { atk: 1, hp: 1 };
  if (tier >= 6) {
    const doubled = {};
    for (const k in base) doubled[k] = base[k] * 2;
    return doubled;
  }
  return base;
}

// ---- TALENT/PERFORMANCE — Puissance ----
function talentAtkBonus(tier) {
  if (tier >= 6) return 6;
  if (tier >= 4) return 3;
  if (tier >= 2) return 1;
  return 0;
}

// ---- PILOTAGE/BI — Information ----
function pilotageFeatures(tier) {
  return {
    peekOwnTopEachTurn: tier >= 2,
    upgradeDrawOncePerTurn: tier >= 4,
    swapHandCardOncePerTurn: tier >= 6,
  };
}
