// Core game engine — GDD.md §1, §3-§6. Plain global, no modules, no build step.

const HERO_MAX_HP = 30;
const MAX_MANA = 10;
const MAX_BOARD = 7;
const MAX_HAND = 10;
const DECK_MIN = 25;
const DECK_MAX = 30;

let __uidCounter = 1;
function nextUid(prefix) { return `${prefix}-${__uidCounter++}`; }

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeCardInstance(cardId) {
  const tpl = CARDS_BY_ID[cardId];
  if (!tpl) throw new Error(`Unknown card id: ${cardId}`);
  return {
    uid: nextUid('c'),
    cardId,
    cardType: tpl.cardType || 'MINION',
    name: tpl.name,
    domain: tpl.domain,
    rarity: tpl.rarity,
    baseCost: tpl.cost,
    baseAtk: tpl.atk || 0,
    baseDef: tpl.def || 0,
    baseHp: tpl.hp || 0,
    currentAtk: tpl.atk || 0,
    currentDef: tpl.def || 0,
    currentHp: tpl.hp || 0,
    maxHp: tpl.hp || 0,
    keywords: new Set(tpl.keywords || []),
    pointFaible: !!tpl.pointFaible,
    onPlay: tpl.onPlay || [],
    onDeath: tpl.onDeath || [],
    aura: tpl.aura || null,
    summoningSick: true,
    hasAttackedThisTurn: false,
    tempBuffs: [],
    silenced: false,
  };
}

function makeAuditFlashToken() {
  return {
    uid: nextUid('tok'),
    cardId: '__audit_flash__',
    name: 'Audit Flash',
    domain: null,
    rarity: 'token',
    baseCost: 0,
    isToken: true,
    keywords: new Set(),
  };
}

// deckList: array of cardId strings, one entry per copy (length 25-30).
function buildDeckInstances(deckList) {
  return deckList.map(makeCardInstance);
}

function validateDeck(deckList) {
  const errors = [];
  if (deckList.length < DECK_MIN || deckList.length > DECK_MAX) {
    errors.push(`Le deck doit contenir entre ${DECK_MIN} et ${DECK_MAX} cartes (actuellement ${deckList.length}).`);
  }
  const counts = {};
  for (const id of deckList) counts[id] = (counts[id] || 0) + 1;
  for (const [id, n] of Object.entries(counts)) {
    const tpl = CARDS_BY_ID[id];
    if (!tpl) { errors.push(`Carte inconnue: ${id}`); continue; }
    const max = tpl.rarity === 3 || tpl.rarity === 'L' ? 1 : 2;
    if (n > max) errors.push(`${tpl.name}: ${n} exemplaires (max ${max}).`);
  }
  return errors;
}

function createPlayerState(id, deckList) {
  return {
    id,
    heroHp: HERO_MAX_HP,
    heroMaxHp: HERO_MAX_HP,
    mana: 0,
    maxMana: 0,
    deck: shuffle(buildDeckInstances(deckList)),
    hand: [],
    board: [],
    graveyard: [],
    fatigueCounter: 0,
    activeDiscounts: [], // {amount, remaining, domain}
    recruitmentFirstDiscountUsed: false,
    pilotageDrawUpgradeUsed: false,
    pilotageSwapUsed: false,
  };
}

function createGameState(playerDeckList, aiDeckList) {
  const state = {
    turnNumber: 1,
    activePlayer: 'player',
    firstPlayer: 'player',
    players: {
      player: createPlayerState('player', playerDeckList),
      ai: createPlayerState('ai', aiDeckList),
    },
    log: [],
    winner: null,
    pendingJob: null,
    pendingChoice: null,
    pendingReveal: null,
  };

  state.players.player.hand = state.players.player.deck.splice(0, 3);
  const aiHand = state.players.ai.deck.splice(0, 4);
  aiHand.push(makeAuditFlashToken());
  state.players.ai.hand = aiHand;

  log(state, 'La partie commence. Vous jouez en premier.');
  startTurn(state, 'player', true);
  return state;
}

function log(state, msg) {
  state.log.push(msg);
  if (state.log.length > 300) state.log.shift();
}

function opponentOf(playerId) { return playerId === 'player' ? 'ai' : 'player'; }

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// ---------------------------------------------------------------- turn flow

function startTurn(state, playerId, isVeryFirstTurn) {
  const p = state.players[playerId];
  p.maxMana = clamp(p.maxMana + 1, 0, MAX_MANA);
  p.mana = p.maxMana;
  p.activeDiscounts = [];
  p.recruitmentFirstDiscountUsed = false;
  p.pilotageDrawUpgradeUsed = false;
  p.pilotageSwapUsed = false;

  for (const c of p.board) {
    c.summoningSick = false;
    c.hasAttackedThisTurn = false;
  }

  if (!isVeryFirstTurn) {
    drawCards(state, playerId, 1);
  }

  applyTurnStartSynergy(state, playerId);
  applyTurnStartCardAuras(state, playerId);
  checkWinCondition(state);
  log(state, `--- Tour ${state.turnNumber} : ${playerId === 'player' ? 'vous' : "l'IA"} ---`);
}

function endTurn(state, playerId) {
  if (state.winner) return;
  const p = state.players[playerId];
  for (const c of p.board) {
    if (c.tempBuffs.length) {
      for (const b of c.tempBuffs) {
        c.currentAtk -= b.atk || 0;
        c.currentDef -= b.def || 0;
        c.currentHp -= b.hp || 0;
        c.maxHp -= b.hp || 0;
      }
      c.tempBuffs = [];
    }
  }
  const next = opponentOf(playerId);
  state.activePlayer = next;
  if (next === state.firstPlayer) state.turnNumber++;
  startTurn(state, next, false);
}

function applyTurnStartSynergy(state, playerId) {
  const p = state.players[playerId];
  const tiers = getSynergyTiers(p.board);

  const heal = paieGaHealAmount(tiers[DOMAIN.PAIE_GA]);
  if (heal > 0) healHero(state, playerId, heal);

  const growth = formationGrowth(tiers[DOMAIN.FORMATION]);
  if (growth) {
    for (const c of p.board) {
      if (c.domain === DOMAIN.FORMATION) {
        c.currentAtk += growth.atk || 0;
        c.currentDef += growth.def || 0;
        c.currentHp += growth.hp || 0;
        c.maxHp += growth.hp || 0;
      }
    }
  }

  const extraDraw = recrutementExtraDraw(tiers[DOMAIN.RECRUTEMENT]);
  if (extraDraw > 0) drawCards(state, playerId, extraDraw);

  if (pilotageFeatures(tiers[DOMAIN.PILOTAGE_BI]).peekOwnTopEachTurn && p.deck.length > 0) {
    if (playerId === 'player') {
      state.pendingReveal = { title: 'Pilotage/BI — dessus de votre pioche', cards: [p.deck[0]] };
    }
  }
}

function applyTurnStartCardAuras(state, playerId) {
  const p = state.players[playerId];
  for (const c of p.board) {
    if (c.silenced || !c.aura) continue;
    if (c.aura.type === 'turnStartGrowth') {
      c.currentAtk += c.aura.atk || 0;
      c.currentDef += c.aura.def || 0;
      c.currentHp += c.aura.hp || 0;
      c.maxHp += c.aura.hp || 0;
      const cond = c.aura.conditionalBonus;
      if (cond) {
        const tiers = getSynergyTiers(p.board);
        const counts = getDomainCounts(p.board);
        if (counts[cond.domain] >= cond.minDomainCount) {
          c.currentAtk += cond.atk || 0;
          c.currentDef += cond.def || 0;
          c.currentHp += cond.hp || 0;
          c.maxHp += cond.hp || 0;
        }
        void tiers;
      }
    } else if (c.aura.type === 'turnStartHeroHeal') {
      healHero(state, playerId, c.aura.amount);
    }
  }
}

// ---------------------------------------------------------------- mulligan

// Swaps the given hand cards back into the deck (at a random position, as if
// reshuffled) and draws the same number of replacements. Intended for the
// one-time opening-hand mulligan only; the board is still empty at that
// point so it has no other gameplay side effects.
function mulligan(state, playerId, uids) {
  const p = state.players[playerId];
  for (const uid of uids) {
    const idx = p.hand.findIndex(c => c.uid === uid);
    if (idx === -1) continue;
    const [card] = p.hand.splice(idx, 1);
    const insertAt = Math.floor(Math.random() * (p.deck.length + 1));
    p.deck.splice(insertAt, 0, card);
  }
  if (uids.length > 0) drawCards(state, playerId, uids.length);
}

// ---------------------------------------------------------------- drawing

function drawCards(state, playerId, n) {
  const p = state.players[playerId];
  for (let i = 0; i < n; i++) {
    if (p.deck.length === 0) {
      p.fatigueCounter++;
      damageHero(state, playerId, p.fatigueCounter, true);
      continue;
    }
    const card = p.deck.shift();
    if (p.hand.length >= MAX_HAND) {
      p.graveyard.push(card);
      log(state, `${playerId === 'player' ? 'Vous brûlez' : "L'IA brûle"} ${card.name} (main pleine).`);
    } else {
      p.hand.push(card);
    }
  }
  checkWinCondition(state);
}

// ---------------------------------------------------------------- damage / heal

function healHero(state, playerId, amount) {
  if (amount <= 0) return;
  const p = state.players[playerId];
  p.heroHp = clamp(p.heroHp + amount, 0, p.heroMaxHp);
}

function heroDamageReduction(state, playerId) {
  const p = state.players[playerId];
  const tiers = getSynergyTiers(p.board);
  let reduction = paieGaDamageReduction(tiers[DOMAIN.PAIE_GA]);
  for (const c of p.board) {
    if (!c.silenced && c.aura && c.aura.type === 'heroDamageReduction') reduction += c.aura.amount;
  }
  return reduction;
}

function damageHero(state, playerId, amount, isFatigue) {
  if (amount <= 0) return;
  const p = state.players[playerId];
  let dmg = amount;
  if (!isFatigue) {
    const reduction = heroDamageReduction(state, playerId);
    dmg = dmg <= 0 ? 0 : Math.max(1, dmg - reduction);
  }
  p.heroHp = clamp(p.heroHp - dmg, 0, p.heroMaxHp);
  checkWinCondition(state);
}

function checkWinCondition(state) {
  if (state.winner) return;
  const p1dead = state.players.player.heroHp <= 0;
  const p2dead = state.players.ai.heroHp <= 0;
  if (p1dead && p2dead) state.winner = 'draw';
  else if (p2dead) state.winner = 'player';
  else if (p1dead) state.winner = 'ai';
  if (state.winner) log(state, state.winner === 'draw' ? 'Égalité !' : `${state.winner === 'player' ? 'Vous' : "L'IA"} remporte la partie !`);
}

// ---------------------------------------------------------------- stats overlay

function getEffectiveAtk(state, playerId, card) {
  const p = state.players[playerId];
  let atk = card.currentAtk;
  if (!card.silenced && card.domain === DOMAIN.TALENT_PERF) {
    const tiers = getSynergyTiers(p.board);
    atk += talentAtkBonus(tiers[DOMAIN.TALENT_PERF]);
  }
  return Math.max(0, atk);
}

function getEffectiveDef(state, playerId, card) {
  const p = state.players[playerId];
  let def = card.currentDef;
  if (!card.silenced) {
    if (card.domain === DOMAIN.GTA) {
      const tiers = getSynergyTiers(p.board);
      def += gtaDefBonus(tiers[DOMAIN.GTA]);
    }
    if (card.aura && card.aura.type === 'selfCombatDamageReduction') def += card.aura.amount;
  }
  return Math.max(0, def);
}

function cardHasProvocation(state, playerId, card) {
  if (!card.silenced && card.keywords.has('Provocation')) return true;
  const p = state.players[playerId];
  const tiers = getSynergyTiers(p.board);
  const grantees = gtaProvocationGrantees(p.board, tiers[DOMAIN.GTA]);
  return !card.silenced && grantees.has(card.uid);
}

function getProvocationCards(state, playerId) {
  return state.players[playerId].board.filter(c => cardHasProvocation(state, playerId, c));
}

// ---------------------------------------------------------------- mana cost

function computeCost(state, playerId, card, opts) {
  opts = opts || {};
  const p = state.players[playerId];
  let cost = card.baseCost;

  if (card.domain) {
    const tiers = getSynergyTiers(p.board);
    const isFirst = !p.recruitmentFirstDiscountUsed;
    if (card.domain === DOMAIN.RECRUTEMENT) {
      const reduction = recrutementCostReduction(tiers[DOMAIN.RECRUTEMENT], isFirst);
      cost -= reduction;
      if (opts.consume && reduction > (recrutementCostReduction(tiers[DOMAIN.RECRUTEMENT], false))) {
        p.recruitmentFirstDiscountUsed = true;
      }
    }
  }

  for (const d of p.activeDiscounts) {
    if (d.remaining <= 0) continue;
    if (d.domain === 'any' || d.domain === card.domain) {
      cost -= d.amount;
      if (opts.consume) d.remaining -= 1;
    }
  }

  return Math.max(0, cost);
}

// ---------------------------------------------------------------- playing cards

function playCard(state, playerId, handUid) {
  if (state.winner || state.pendingChoice) return { ok: false, error: 'Action indisponible.' };
  const p = state.players[playerId];
  const idx = p.hand.findIndex(c => c.uid === handUid);
  if (idx === -1) return { ok: false, error: 'Carte introuvable en main.' };
  const card = p.hand[idx];

  if (card.isToken) {
    p.hand.splice(idx, 1);
    p.mana = clamp(p.mana + 1, 0, p.maxMana + 1);
    p.graveyard.push(card);
    log(state, `${playerId === 'player' ? 'Vous' : "L'IA"} activez Audit Flash (+1 mana ce tour).`);
    return { ok: true };
  }

  const cost = computeCost(state, playerId, card, { consume: false });
  if (cost > p.mana) return { ok: false, error: 'Mana insuffisant.' };
  const isAction = card.cardType === 'ACTION';
  if (!isAction && p.board.length >= MAX_BOARD) return { ok: false, error: 'Plateau plein (7 cartes max).' };

  computeCost(state, playerId, card, { consume: true });
  p.mana -= cost;
  p.hand.splice(idx, 1);
  if (isAction) {
    p.graveyard.push(card);
  } else {
    card.summoningSick = !card.keywords.has('Charge');
    card.hasAttackedThisTurn = false;
    p.board.push(card);
  }
  log(state, `${playerId === 'player' ? 'Vous jouez' : "L'IA joue"} ${card.name}.`);

  const job = { type: 'onPlay', effects: (card.onPlay || []).slice(), stepIndex: 0, playerId, sourceCard: card };
  state.pendingJob = job;
  const result = advanceJob(state);
  checkStateBasedActions(state);
  checkWinCondition(state);
  return { ok: true, jobResult: result };
}

// ---------------------------------------------------------------- effect job engine

function advanceJob(state) {
  const job = state.pendingJob;
  if (!job) return { status: 'idle' };
  while (job.stepIndex < job.effects.length) {
    const effect = job.effects[job.stepIndex];
    const result = tryApplyEffect(state, job, effect);
    if (result && result.status === 'needsChoice') {
      state.pendingChoice = result.choice;
      return { status: 'awaiting-choice', choice: result.choice };
    }
    job.stepIndex++;
  }
  state.pendingJob = null;
  return { status: 'done' };
}

function resolvePendingChoice(state, selection) {
  const choice = state.pendingChoice;
  if (!choice) return { status: 'idle' };
  state.pendingChoice = null;
  applyChoiceSelection(state, choice, selection);
  const job = choice.jobRef;
  if (job) {
    job.stepIndex++;
    const result = advanceJob(state);
    checkStateBasedActions(state);
    checkWinCondition(state);
    return result;
  }
  return { status: 'done' };
}

function findSourceCard(state, job) {
  void state;
  return job.sourceCard || null;
}

function tryApplyEffect(state, job, effect) {
  const playerId = job.playerId;
  const p = state.players[playerId];
  const opponentId = opponentOf(playerId);
  const source = findSourceCard(state, job);
  const isAi = playerId === 'ai';

  switch (effect.type) {
    case 'heroHeal': {
      const target = effect.target === 'enemy' ? opponentId : playerId;
      healHero(state, target, effect.amount);
      return { status: 'applied' };
    }
    case 'draw': {
      resolveDraw(state, playerId, effect.amount, isAi);
      return { status: 'applied' };
    }
    case 'tutorDomain': {
      const domain = effect.domain === 'self' && source ? source.domain : effect.domain;
      const matches = p.deck.filter(c => c.domain === domain);
      if (matches.length > 0 && p.hand.length < MAX_HAND) {
        const pick = matches[Math.floor(Math.random() * matches.length)];
        p.deck.splice(p.deck.indexOf(pick), 1);
        p.hand.push(pick);
        log(state, `${playerId === 'player' ? 'Vous' : "L'IA"} récupère ${pick.name} du deck.`);
      }
      return { status: 'applied' };
    }
    case 'buffTarget': {
      const targets = resolveBuffTargets(p.board, effect.target, source);
      if (targets.length === 0) return { status: 'applied' };
      if (targets.length === 1 || isAi) {
        const chosen = isAi ? aiPickBuffTarget(targets) : targets[0];
        applyPermanentBuff(chosen, effect);
        return { status: 'applied' };
      }
      return {
        status: 'needsChoice',
        choice: { kind: 'selectBoardCard', playerId, options: targets.map(t => t.uid), effect, jobRef: job },
      };
    }
    case 'buffAllDomain': {
      const domain = effect.domain === 'self' && source ? source.domain : effect.domain;
      for (const c of p.board) {
        if (c.domain === domain) {
          if (effect.duration === 'turn') {
            const buff = { atk: effect.atk || 0, def: effect.def || 0, hp: effect.hp || 0 };
            c.tempBuffs.push(buff);
            c.currentAtk += buff.atk; c.currentDef += buff.def; c.currentHp += buff.hp; c.maxHp += buff.hp;
          } else {
            applyPermanentBuff(c, effect);
          }
        }
      }
      return { status: 'applied' };
    }
    case 'costReduction': {
      const domain = effect.domain === 'self' && source ? source.domain : effect.domain;
      p.activeDiscounts.push({ amount: effect.amount, remaining: effect.count, domain });
      return { status: 'applied' };
    }
    case 'condDrawIfDomainCount': {
      const counts = getDomainCounts(p.board);
      if (counts[effect.domain] >= effect.min) resolveDraw(state, playerId, effect.amount, isAi);
      return { status: 'applied' };
    }
    case 'condDrawIfHandSize': {
      if (p.hand.length <= effect.maxHandSize) resolveDraw(state, playerId, effect.amount, isAi);
      return { status: 'applied' };
    }
    case 'discard': {
      for (let i = 0; i < effect.amount; i++) {
        if (p.hand.length === 0) break;
        const idx = Math.floor(Math.random() * p.hand.length);
        const [card] = p.hand.splice(idx, 1);
        p.graveyard.push(card);
        log(state, `${playerId === 'player' ? 'Vous défaussez' : "L'IA défausse"} ${card.name}.`);
      }
      return { status: 'applied' };
    }
    case 'peekTopDeck': {
      if (playerId === 'player' && p.deck.length > 0) {
        state.pendingReveal = { title: `Dessus de votre pioche (${effect.amount})`, cards: p.deck.slice(0, effect.amount) };
      }
      return { status: 'applied' };
    }
    case 'peekOpponentHand': {
      if (playerId === 'player') {
        state.pendingReveal = { title: "Main de l'adversaire", cards: state.players[opponentId].hand };
      }
      return { status: 'applied' };
    }
    case 'peekOpponentDeckTop': {
      const opp = state.players[opponentId];
      if (playerId === 'player' && opp.deck.length > 0) {
        state.pendingReveal = { title: 'Dessus de la pioche adverse', cards: opp.deck.slice(0, effect.amount) };
      }
      return { status: 'applied' };
    }
    case 'drawKeepBest': {
      const available = Math.min(effect.amount, p.deck.length);
      if (available === 0) return { status: 'applied' };
      const revealed = p.deck.slice(0, available);
      if (isAi) {
        const pick = aiPickFromReveal(revealed);
        resolveDrawKeepBest(state, playerId, revealed, pick);
        return { status: 'applied' };
      }
      return {
        status: 'needsChoice',
        choice: { kind: 'chooseFromReveal', playerId, options: revealed.map(c => c.uid), keep: effect.keep, jobRef: job },
      };
    }
    case 'filterTopDeck': {
      if (p.deck.length === 0) return { status: 'applied' };
      if (isAi) return { status: 'applied' }; // AI always keeps the top card as-is
      return {
        status: 'needsChoice',
        choice: { kind: 'keepOrDiscardTop', playerId, top: p.deck[0].uid, jobRef: job },
      };
    }
    case 'reorderTopN': {
      const available = Math.min(effect.amount, p.deck.length);
      if (available <= 1) return { status: 'applied' };
      if (isAi) return { status: 'applied' }; // AI leaves deck order unchanged
      return {
        status: 'needsChoice',
        choice: { kind: 'chooseTopOfN', playerId, options: p.deck.slice(0, available).map(c => c.uid), jobRef: job },
      };
    }
    case 'condSelfBuffIfDomainCount': {
      if (!source) return { status: 'applied' };
      const counts = getDomainCounts(p.board);
      if (counts[effect.domain] >= effect.min) applyPermanentBuff(source, effect);
      return { status: 'applied' };
    }
    case 'peekTopBuffIfDomain': {
      if (!source || p.deck.length === 0) return { status: 'applied' };
      if (playerId === 'player') {
        state.pendingReveal = { title: 'Dessus de votre pioche', cards: [p.deck[0]] };
      }
      if (p.deck[0].domain === effect.domain) applyPermanentBuff(source, { atk: effect.atk || 0 });
      return { status: 'applied' };
    }
    case 'synchronizationUniversal': {
      if (!source) return { status: 'applied' };
      const otherDomains = new Set(p.board.filter(c => c.uid !== source.uid).map(c => c.domain));
      const n = Math.min(6, otherDomains.size);
      applyPermanentBuff(source, { atk: n, def: n, hp: n });
      resolveDraw(state, playerId, n, isAi);
      healHero(state, playerId, n);
      log(state, `Synchronisation Universelle : ${n} domaine(s) détecté(s).`);
      return { status: 'applied' };
    }
    default:
      return { status: 'applied' };
  }
}

function resolveDraw(state, playerId, amount, isAi) {
  const p = state.players[playerId];
  const tiers = getSynergyTiers(p.board);
  const upgrade = pilotageFeatures(tiers[DOMAIN.PILOTAGE_BI]).upgradeDrawOncePerTurn && !p.pilotageDrawUpgradeUsed;
  if (upgrade && amount > 0 && p.deck.length >= 2) {
    p.pilotageDrawUpgradeUsed = true;
    const revealed = p.deck.slice(0, 2);
    if (isAi) {
      const pick = aiPickFromReveal(revealed);
      resolveDrawKeepBest(state, playerId, revealed, pick);
      if (amount > 1) drawCards(state, playerId, amount - 1);
    } else {
      // Human upgraded draw resolves through the normal reveal-and-keep flow inline
      // (rare enough in practice — draw effects are usually the last step of a card).
      const pick = revealed[0];
      resolveDrawKeepBest(state, playerId, revealed, pick);
      if (amount > 1) drawCards(state, playerId, amount - 1);
    }
    return;
  }
  drawCards(state, playerId, amount);
}

function resolveDrawKeepBest(state, playerId, revealed, keepCard) {
  const p = state.players[playerId];
  for (const c of revealed) {
    const idx = p.deck.indexOf(c);
    if (idx !== -1) p.deck.splice(idx, 1);
  }
  for (const c of revealed) {
    if (c === keepCard) {
      if (p.hand.length < MAX_HAND) p.hand.push(c); else p.graveyard.push(c);
    } else {
      p.graveyard.push(c);
    }
  }
  log(state, `${playerId === 'player' ? 'Vous gardez' : "L'IA garde"} ${keepCard.name}.`);
}

function resolveBuffTargets(board, targetKind, source) {
  if (targetKind === 'chosenAlly') return board.slice();
  if (targetKind === 'chosenAllyDomain') return source ? board.filter(c => c.domain === source.domain) : [];
  if (targetKind === 'lowestDefAllyDomain') {
    const pool = source ? board.filter(c => c.domain === source.domain) : [];
    if (pool.length === 0) return [];
    let best = pool[0];
    for (const c of pool) if (c.currentDef < best.currentDef) best = c;
    return [best];
  }
  return [];
}

function applyPermanentBuff(card, effect) {
  card.currentAtk += effect.atk || 0;
  card.currentDef += effect.def || 0;
  card.currentHp += effect.hp || 0;
  card.maxHp += effect.hp || 0;
}

function applyChoiceSelection(state, choice, selection) {
  const p = state.players[choice.playerId];
  switch (choice.kind) {
    case 'selectBoardCard': {
      const target = p.board.find(c => c.uid === selection);
      if (target) applyPermanentBuff(target, choice.effect);
      return;
    }
    case 'chooseFromReveal': {
      const revealed = choice.options.map(uid => p.deck.find(c => c.uid === uid)).filter(Boolean);
      const keep = revealed.find(c => c.uid === selection) || revealed[0];
      resolveDrawKeepBest(state, choice.playerId, revealed, keep);
      return;
    }
    case 'keepOrDiscardTop': {
      if (selection === 'discard') {
        const [top] = p.deck.splice(0, 1);
        if (top) p.graveyard.push(top);
        drawCards(state, choice.playerId, 1);
      }
      return;
    }
    case 'chooseTopOfN': {
      const idx = p.deck.findIndex(c => c.uid === selection);
      if (idx > 0) {
        const [card] = p.deck.splice(idx, 1);
        p.deck.unshift(card);
      }
      return;
    }
  }
}

// ---------------------------------------------------------------- combat

function attack(state, playerId, attackerUid, targetType, targetUid) {
  if (state.winner || state.pendingChoice) return { ok: false, error: 'Action indisponible.' };
  const p = state.players[playerId];
  const opponentId = opponentOf(playerId);
  const opp = state.players[opponentId];

  const attacker = p.board.find(c => c.uid === attackerUid);
  if (!attacker) return { ok: false, error: 'Attaquant introuvable.' };
  if (attacker.summoningSick) return { ok: false, error: 'Cette carte ne peut pas attaquer ce tour-ci.' };
  if (attacker.hasAttackedThisTurn) return { ok: false, error: 'Cette carte a déjà attaqué.' };

  const provocateurs = getProvocationCards(state, opponentId);
  if (provocateurs.length > 0) {
    if (targetType !== 'card' || !provocateurs.some(c => c.uid === targetUid)) {
      return { ok: false, error: 'Une carte adverse a Provocation : vous devez l\'attaquer en priorité.' };
    }
  }

  let attackerAtk = getEffectiveAtk(state, playerId, attacker);

  if (targetType === 'hero') {
    damageHero(state, opponentId, attackerAtk, false);
    attacker.hasAttackedThisTurn = true;
    log(state, `${cardLabel(playerId)} ${attacker.name} attaque le héros adverse (${attackerAtk} dégâts).`);
    checkWinCondition(state);
    return { ok: true };
  }

  const defender = opp.board.find(c => c.uid === targetUid);
  if (!defender) return { ok: false, error: 'Cible introuvable.' };

  let defenderAtk = getEffectiveAtk(state, opponentId, defender);
  const attackerDef = getEffectiveDef(state, opponentId, defender);
  const defenderDef = getEffectiveDef(state, playerId, attacker);

  const pfPair = pointFaiblePair(attacker, defender);
  if (pfPair) {
    if (pfPair.pf === attacker) attackerAtk = Math.max(0, attackerAtk - 2);
    else attackerAtk += 2;
    if (pfPair.pf === defender) defenderAtk = Math.max(0, defenderAtk - 2);
    else defenderAtk += 2;
  }

  const dmgToDefender = attackerAtk <= 0 ? 0 : Math.max(1, attackerAtk - attackerDef);
  const dmgToAttacker = defenderAtk <= 0 ? 0 : Math.max(1, defenderAtk - defenderDef);

  defender.currentHp -= dmgToDefender;
  attacker.currentHp -= dmgToAttacker;
  attacker.hasAttackedThisTurn = true;

  log(state, `${cardLabel(playerId)} ${attacker.name} (${attackerAtk} ATK) affronte ${defender.name} : ${dmgToDefender} dégâts infligés, ${dmgToAttacker} dégâts reçus.`);

  checkStateBasedActions(state);
  checkWinCondition(state);
  return { ok: true };
}

function cardLabel(playerId) { return playerId === 'player' ? 'Vous —' : "L'IA —"; }

function pointFaiblePair(a, b) {
  const aIsPS = a.cardId === 'peoplespheres';
  const bIsPS = b.cardId === 'peoplespheres';
  if (aIsPS && b.pointFaible) return { ps: a, pf: b };
  if (bIsPS && a.pointFaible) return { ps: b, pf: a };
  return null;
}

// ---------------------------------------------------------------- state-based actions

function checkStateBasedActions(state) {
  for (const playerId of ['player', 'ai']) {
    const p = state.players[playerId];
    const dead = p.board.filter(c => c.currentHp <= 0);
    if (dead.length === 0) continue;
    p.board = p.board.filter(c => c.currentHp > 0);
    for (const c of dead) {
      p.graveyard.push(c);
      log(state, `${c.name} est détruite.`);
      for (const eff of c.onDeath || []) {
        if (eff.type === 'heroHeal') healHero(state, playerId, eff.amount);
      }
      for (const ally of p.board) {
        if (!ally.silenced && ally.aura && ally.aura.type === 'onDomainAllyDeath') {
          const domain = ally.aura.domain === 'self' ? ally.domain : ally.aura.domain;
          if (c.domain === domain) healHero(state, playerId, ally.aura.heal);
        }
      }
    }
  }
}

// ---------------------------------------------------------------- misc actions

function silenceCard(card) {
  card.silenced = true;
  card.keywords = new Set();
  card.pointFaible = false;
}

function pilotageSwap(state, playerId, handUid) {
  const p = state.players[playerId];
  const tiers = getSynergyTiers(p.board);
  if (!pilotageFeatures(tiers[DOMAIN.PILOTAGE_BI]).swapHandCardOncePerTurn) return { ok: false, error: 'Synergie Pilotage/BI palier 6 non active.' };
  if (p.pilotageSwapUsed) return { ok: false, error: 'Déjà utilisé ce tour-ci.' };
  const idx = p.hand.findIndex(c => c.uid === handUid);
  if (idx === -1) return { ok: false, error: 'Carte introuvable.' };
  const [card] = p.hand.splice(idx, 1);
  p.graveyard.push(card);
  p.pilotageSwapUsed = true;
  drawCards(state, playerId, 1);
  log(state, `${playerId === 'player' ? 'Vous échangez' : "L'IA échange"} ${card.name}.`);
  return { ok: true };
}
