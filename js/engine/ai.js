// Heuristic AI opponent — greedy mana usage, favorable trades, lethal detection.
// Behavior is tuned by AI_DIFFICULTY (see setAiDifficulty), which is read by the
// deck builder and the play/attack step generators below.

const AI_DIFFICULTY_SETTINGS = {
  easy: { domainsCount: 2, includeRarity3: false, includeLegendary: false, skipPlayChance: 0.3, faceOverTradeChance: 0.45, tradeThreshold: 5 },
  normal: { domainsCount: 3, includeRarity3: true, includeLegendary: true, skipPlayChance: 0, faceOverTradeChance: 0, tradeThreshold: 5 },
  hard: { domainsCount: 3, includeRarity3: true, includeLegendary: true, skipPlayChance: 0, faceOverTradeChance: 0, tradeThreshold: 2 },
};

let AI_DIFFICULTY = 'normal';
function setAiDifficulty(level) {
  AI_DIFFICULTY = AI_DIFFICULTY_SETTINGS[level] ? level : 'normal';
}
function getAiDifficultySettings() {
  return AI_DIFFICULTY_SETTINGS[AI_DIFFICULTY] || AI_DIFFICULTY_SETTINGS.normal;
}

function buildAiDeck(difficulty) {
  const settings = AI_DIFFICULTY_SETTINGS[difficulty] || getAiDifficultySettings();
  const domains = shuffle(SYNERGY_DOMAINS).slice(0, settings.domainsCount);
  const deckList = settings.includeLegendary ? ['peoplespheres'] : [];
  for (const d of domains) {
    const pool = CARD_POOL.filter(c => c.domain === d);
    const ones = shuffle(pool.filter(c => c.rarity === 1)).slice(0, 2);
    const twos = shuffle(pool.filter(c => c.rarity === 2)).slice(0, 2);
    for (const c of ones) deckList.push(c.id, c.id);
    for (const c of twos) deckList.push(c.id, c.id);
    if (settings.includeRarity3) {
      const threes = shuffle(pool.filter(c => c.rarity === 3)).slice(0, 1);
      for (const c of threes) deckList.push(c.id);
    }
  }
  let guard = 0;
  while (deckList.length < 30 && guard < 500) {
    guard++;
    const d = domains[Math.floor(Math.random() * domains.length)];
    const pool = CARD_POOL.filter(c => c.domain === d && c.rarity !== 3);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    const countInDeck = deckList.filter(id => id === pick.id).length;
    const max = pick.rarity === 3 ? 1 : 2;
    if (countInDeck < max) deckList.push(pick.id);
  }
  return deckList;
}

function aiPickBuffTarget(targets) {
  return targets.reduce((best, c) => (c.currentHp > best.currentHp ? c : best), targets[0]);
}

function aiPickFromReveal(revealed) {
  const score = c => c.baseCost - (c.rarity === 3 ? 2 : c.rarity === 2 ? 1 : 0);
  return revealed.reduce((best, c) => (score(c) < score(best) ? c : best), revealed[0]);
}

// Generator versions yield a small descriptor right after each individual engine
// mutation (one card played, one attack resolved) so the UI can pause between
// steps and animate them one at a time instead of resolving the whole AI turn
// in a single instant, silent jump.

function* runAiTurnSteps(state) {
  yield* playAiCardsSteps(state);
  if (!state.winner) yield* runAiAttacksSteps(state);
}

function* playAiCardsSteps(state) {
  const p = state.players.ai;
  const settings = getAiDifficultySettings();
  let guard = 0;
  let playedSomething = true;
  while (playedSomething && !state.winner && guard < 20) {
    guard++;
    playedSomething = false;
    const affordable = c => c.isToken || computeCost(state, 'ai', c, { consume: false }) <= p.mana;
    const playable = p.hand.filter(affordable);
    if (playable.length === 0) break;
    if (settings.skipPlayChance > 0 && Math.random() < settings.skipPlayChance) break;

    const token = playable.find(c => c.isToken);
    if (token) {
      const afterMana = p.mana + 1;
      const unlocksMore = p.hand.some(c => !c.isToken &&
        computeCost(state, 'ai', c, { consume: false }) > p.mana &&
        computeCost(state, 'ai', c, { consume: false }) <= afterMana);
      if (unlocksMore) {
        const result = playCard(state, 'ai', token.uid);
        playedSomething = true;
        yield { type: 'play', card: token, result };
        continue;
      }
    }

    if (p.board.length >= MAX_BOARD) {
      // No creature slot left, but Action cards don't need one.
      const action = playable.find(c => !c.isToken && c.cardType === 'ACTION');
      if (action) {
        const result = playCard(state, 'ai', action.uid);
        playedSomething = true;
        yield { type: 'play', card: action, result };
        continue;
      }
      if (token) {
        const result = playCard(state, 'ai', token.uid);
        playedSomething = true;
        yield { type: 'play', card: token, result };
      }
      break;
    }

    const nonToken = playable.filter(c => !c.isToken)
      .sort((a, b) => computeCost(state, 'ai', b, { consume: false }) - computeCost(state, 'ai', a, { consume: false }));
    if (nonToken.length > 0) {
      const card = nonToken[0];
      const result = playCard(state, 'ai', card.uid);
      playedSomething = true;
      yield { type: 'play', card, result };
    } else if (token) {
      const result = playCard(state, 'ai', token.uid);
      playedSomething = true;
      yield { type: 'play', card: token, result };
    }
  }
}

function* runAiAttacksSteps(state) {
  const p = state.players.ai;
  const opp = state.players.player;
  const settings = getAiDifficultySettings();

  const attackersNow = () => p.board.filter(c => !c.summoningSick && !c.hasAttackedThisTurn);

  const provocateursCheck = getProvocationCards(state, 'player');
  if (provocateursCheck.length === 0) {
    const totalAtk = attackersNow().reduce((s, c) => s + getEffectiveAtk(state, 'ai', c), 0);
    if (totalAtk >= opp.heroHp) {
      for (const a of attackersNow()) {
        if (state.winner) break;
        const result = attack(state, 'ai', a.uid, 'hero');
        yield { type: 'attack', attacker: a, targetType: 'hero', result };
      }
      return;
    }
  }

  for (const a of attackersNow().slice()) {
    if (state.winner) break;
    if (a.summoningSick || a.hasAttackedThisTurn) continue;

    const provs = getProvocationCards(state, 'player');
    if (provs.length > 0) {
      const target = aiPickAttackTarget(state, a, provs);
      if (isPointlessSuicide(state, 'ai', a, 'player', target)) continue; // hold back rather than feed an unbreakable wall
      const result = attack(state, 'ai', a.uid, 'card', target.uid);
      yield { type: 'attack', attacker: a, targetType: 'card', target, result };
      continue;
    }

    const best = aiBestTrade(state, a, opp.board);
    const faceScore = closingFaceScore(opp.heroHp);
    const takesTrade = best && best.score >= settings.tradeThreshold && best.score >= faceScore &&
      !(settings.faceOverTradeChance > 0 && Math.random() < settings.faceOverTradeChance);
    if (takesTrade) {
      const result = attack(state, 'ai', a.uid, 'card', best.card.uid);
      yield { type: 'attack', attacker: a, targetType: 'card', target: best.card, result };
    } else {
      const result = attack(state, 'ai', a.uid, 'hero');
      yield { type: 'attack', attacker: a, targetType: 'hero', result };
    }
  }
}

// Synchronous wrappers — used by the headless simulation and anywhere the
// whole AI turn should just resolve instantly with no step-by-step pacing.
function runAiTurn(state) { for (const _ of runAiTurnSteps(state)) { void _; } }
function playAiCards(state) { for (const _ of playAiCardsSteps(state)) { void _; } }
function runAiAttacks(state) { for (const _ of runAiAttacksSteps(state)) { void _; } }

function aiPickAttackTarget(state, attacker, provocateurs) {
  let best = provocateurs[0];
  let bestScore = -Infinity;
  for (const d of provocateurs) {
    const aAtk = getEffectiveAtk(state, 'ai', attacker);
    const dDef = getEffectiveDef(state, 'player', d);
    const dmg = aAtk <= 0 ? 0 : Math.max(1, aAtk - dDef);
    const score = dmg - d.currentHp;
    if (score > bestScore) { bestScore = score; best = d; }
  }
  return best;
}

// A mandatory Provocation target doesn't have to be attacked — attacking is
// always optional, Provocation only restricts *who* you may hit if you do.
// Without this check the AI threw every eligible creature at a taunt every
// single turn even when it could neither kill it nor survive the swing,
// which just fed a defensive wall for free instead of holding board presence.
function isPointlessSuicide(state, attackerSeat, attacker, defenderSeat, defender) {
  const aAtk = getEffectiveAtk(state, attackerSeat, attacker);
  const aDef = getEffectiveDef(state, attackerSeat, attacker);
  const dAtk = getEffectiveAtk(state, defenderSeat, defender);
  const dDef = getEffectiveDef(state, defenderSeat, defender);
  const dmgToDefender = aAtk <= 0 ? 0 : Math.max(1, aAtk - dDef);
  const dmgToAttacker = dAtk <= 0 ? 0 : Math.max(1, dAtk - aDef);
  const kills = dmgToDefender >= defender.currentHp;
  const dies = dmgToAttacker >= attacker.currentHp;
  return dies && !kills;
}

// Grows as the target hero's HP drops, so the AI increasingly prefers closing
// the game out over marginal board trades instead of endlessly out-trading
// into fatigue (games were stalling ~30+ turns before this existed — see
// balance pass notes). At full HP this is 0 and never overrides a good trade.
function closingFaceScore(oppHeroHp) {
  return Math.max(0, (HERO_MAX_HP - oppHeroHp) / 3);
}

function aiBestTrade(state, attacker, enemyBoard) {
  let best = null;
  for (const d of enemyBoard) {
    const aAtk = getEffectiveAtk(state, 'ai', attacker);
    const aDef = getEffectiveDef(state, 'ai', attacker);
    const dAtk = getEffectiveAtk(state, 'player', d);
    const dDef = getEffectiveDef(state, 'player', d);
    const dmgToD = aAtk <= 0 ? 0 : Math.max(1, aAtk - dDef);
    const dmgToA = dAtk <= 0 ? 0 : Math.max(1, dAtk - aDef);
    const kills = dmgToD >= d.currentHp;
    const dies = dmgToA >= attacker.currentHp;
    let score = 0;
    if (kills) score += 10;
    if (!dies) score += 5;
    if (dies && !kills) score -= 8;
    if (kills && dies) score += (d.rarity === 3 ? 2 : 0);
    if (!best || score > best.score) best = { card: d, score };
  }
  return best;
}
