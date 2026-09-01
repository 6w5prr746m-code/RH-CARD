// Heuristic AI opponent — greedy mana usage, favorable trades, lethal detection.

function buildAiDeck() {
  const domains = shuffle(SYNERGY_DOMAINS).slice(0, 3);
  const deckList = ['peoplespheres'];
  for (const d of domains) {
    const pool = CARD_POOL.filter(c => c.domain === d);
    const ones = shuffle(pool.filter(c => c.rarity === 1)).slice(0, 2);
    const twos = shuffle(pool.filter(c => c.rarity === 2)).slice(0, 2);
    const threes = shuffle(pool.filter(c => c.rarity === 3)).slice(0, 1);
    for (const c of ones) deckList.push(c.id, c.id);
    for (const c of twos) deckList.push(c.id, c.id);
    for (const c of threes) deckList.push(c.id);
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

function runAiTurn(state) {
  playAiCards(state);
  if (!state.winner) runAiAttacks(state);
}

function playAiCards(state) {
  const p = state.players.ai;
  let guard = 0;
  let playedSomething = true;
  while (playedSomething && !state.winner && guard < 20) {
    guard++;
    playedSomething = false;
    const affordable = c => c.isToken || computeCost(state, 'ai', c, { consume: false }) <= p.mana;
    const playable = p.hand.filter(affordable);
    if (playable.length === 0) break;

    const token = playable.find(c => c.isToken);
    if (token) {
      const afterMana = p.mana + 1;
      const unlocksMore = p.hand.some(c => !c.isToken &&
        computeCost(state, 'ai', c, { consume: false }) > p.mana &&
        computeCost(state, 'ai', c, { consume: false }) <= afterMana);
      if (unlocksMore) {
        playCard(state, 'ai', token.uid);
        playedSomething = true;
        continue;
      }
    }

    if (p.board.length >= MAX_BOARD) {
      if (token) { playCard(state, 'ai', token.uid); playedSomething = true; }
      break;
    }

    const nonToken = playable.filter(c => !c.isToken)
      .sort((a, b) => computeCost(state, 'ai', b, { consume: false }) - computeCost(state, 'ai', a, { consume: false }));
    if (nonToken.length > 0) {
      playCard(state, 'ai', nonToken[0].uid);
      playedSomething = true;
    } else if (token) {
      playCard(state, 'ai', token.uid);
      playedSomething = true;
    }
  }
}

function runAiAttacks(state) {
  const p = state.players.ai;
  const opp = state.players.player;

  const attackersNow = () => p.board.filter(c => !c.summoningSick && !c.hasAttackedThisTurn);

  const provocateursCheck = getProvocationCards(state, 'player');
  if (provocateursCheck.length === 0) {
    const totalAtk = attackersNow().reduce((s, c) => s + getEffectiveAtk(state, 'ai', c), 0);
    if (totalAtk >= opp.heroHp) {
      for (const a of attackersNow()) {
        if (state.winner) break;
        attack(state, 'ai', a.uid, 'hero');
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
      attack(state, 'ai', a.uid, 'card', target.uid);
      continue;
    }

    const best = aiBestTrade(state, a, opp.board);
    if (best && best.score >= 5) {
      attack(state, 'ai', a.uid, 'card', best.card.uid);
    } else {
      attack(state, 'ai', a.uid, 'hero');
    }
  }
}

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
