// Game board screen — rendering + interaction.

let gameState = null;
let selectedAttackerUid = null;
let inputLocked = false;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function findCardAnywhere(state, uid) {
  for (const pid of ['player', 'ai']) {
    const p = state.players[pid];
    for (const zone of [p.hand, p.board, p.deck, p.graveyard]) {
      const found = zone.find(c => c.uid === uid);
      if (found) return found;
    }
  }
  return null;
}

let lastSeenTiers = null;

function resetFxState() {
  lastSeenTiers = {};
  for (const d of SYNERGY_DOMAINS) lastSeenTiers[d] = 0;
}

function initBoardUI() {
  document.getElementById('player-hand').addEventListener('click', (e) => {
    const el = e.target.closest('.hand-card');
    if (el) onHandCardClick(el.dataset.uid);
  });
  document.getElementById('player-board').addEventListener('click', (e) => {
    const el = e.target.closest('.mini-card');
    if (el) onPlayerBoardCardClick(el.dataset.uid);
  });
  document.getElementById('ai-board').addEventListener('click', (e) => {
    const el = e.target.closest('.mini-card');
    if (el) onEnemyBoardCardClick(el.dataset.uid);
  });
  document.getElementById('ai-hero-target').addEventListener('click', onEnemyHeroClick);
  document.getElementById('end-turn-btn').addEventListener('click', () => { SFX.play('click'); handleEndTurn(); });
  document.getElementById('btn-back-to-builder').addEventListener('click', () => {
    if (gameState && !gameState.winner) {
      if (!confirm('Abandonner la partie en cours et retourner au deck builder ?')) return;
    }
    SFX.play('click');
    showScreen('deckbuilder');
  });
  document.getElementById('btn-mute-game').addEventListener('click', (e) => toggleMuteButton(e.currentTarget));
  attachHolographicTilt('#player-hand', '.hand-card');
}

function toggleMuteButton(btn) {
  const muted = SFX.toggleMute();
  const label = muted ? '🔇' : '🔊';
  document.querySelectorAll('#btn-mute-game, #btn-mute-builder').forEach(b => { b.textContent = label; });
  if (!muted) SFX.play('click');
  void btn;
}

// ---------------------------------------------------------------- fx: snapshot & diff

function captureSnapshot(state) {
  const snap = { heroHp: {}, cards: {} };
  for (const pid of ['player', 'ai']) {
    snap.heroHp[pid] = state.players[pid].heroHp;
    for (const c of state.players[pid].board) snap.cards[c.uid] = c.currentHp;
  }
  return snap;
}

function captureRects() {
  const rects = {};
  document.querySelectorAll('[data-uid]').forEach(el => { rects[el.dataset.uid] = el.getBoundingClientRect(); });
  return rects;
}

function heroRect(pid) {
  return document.getElementById(pid === 'player' ? 'player-hero-target' : 'ai-hero-target').getBoundingClientRect();
}

function animateDiff(before, after, beforeRects) {
  for (const pid of ['player', 'ai']) {
    const delta = after.heroHp[pid] - before.heroHp[pid];
    if (delta !== 0) {
      spawnFloatNumber(heroRect(pid), delta);
      if (delta < 0) { SFX.play('hit'); shakeScreen(4 + Math.min(10, Math.abs(delta))); }
      else SFX.play('heal');
    }
  }
  const beforeUids = Object.keys(before.cards);
  const afterUids = new Set(Object.keys(after.cards));
  for (const uid of beforeUids) {
    if (!afterUids.has(uid)) {
      spawnDeathBurst(beforeRects[uid]);
      SFX.play('death');
    } else {
      const delta = after.cards[uid] - before.cards[uid];
      if (delta !== 0) {
        const el = document.querySelector(`[data-uid="${uid}"]`);
        spawnFloatNumber(el ? el.getBoundingClientRect() : beforeRects[uid], delta);
      }
    }
  }
  for (const uid of Object.keys(after.cards)) {
    if (!(uid in before.cards)) {
      const el = document.querySelector(`[data-uid="${uid}"]`);
      if (el) { el.classList.add('card-enter'); setTimeout(() => el.classList.remove('card-enter'), 420); }
    }
  }
}

function checkSynergyToasts(board) {
  if (!lastSeenTiers) resetFxState();
  const tiers = getSynergyTiers(board);
  for (const d of SYNERGY_DOMAINS) {
    if (tiers[d] > lastSeenTiers[d]) {
      showSynergyToast(d, tiers[d]);
      SFX.play('synergy');
    }
    lastSeenTiers[d] = tiers[d];
  }
}

function flashError(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(flashError._t);
  flashError._t = setTimeout(() => toast.classList.add('hidden'), 2200);
}

// ---------------------------------------------------------------- interactions

function canPlayerAct() {
  return gameState && !gameState.winner && !inputLocked && gameState.activePlayer === 'player' && !gameState.pendingChoice;
}

function onHandCardClick(uid) {
  if (!canPlayerAct()) return;
  const card = gameState.players.player.hand.find(c => c.uid === uid);
  const isLegendary = card && card.cardId === 'peoplespheres';
  const before = captureSnapshot(gameState);
  const beforeRects = captureRects();
  const res = playCard(gameState, 'player', uid);
  selectedAttackerUid = null;
  if (!res.ok) {
    SFX.play('error');
    flashError(res.error);
    return;
  }
  SFX.play('cardPlay');
  renderGame();
  animateDiff(before, captureSnapshot(gameState), beforeRects);
  if (isLegendary) { showBanner('SYNCHRONISATION UNIVERSELLE', { epic: true }); SFX.play('legendary'); spawnConfetti(30); }
  if (gameState.winner) showGameOver();
}

function onPlayerBoardCardClick(uid) {
  if (!canPlayerAct()) return;
  const card = gameState.players.player.board.find(c => c.uid === uid);
  if (!card) return;
  if (selectedAttackerUid === uid) { selectedAttackerUid = null; renderGame(); return; }
  if (card.summoningSick || card.hasAttackedThisTurn) {
    SFX.play('error');
    flashError(card.summoningSick ? 'Cette carte vient d\'être jouée (pas encore prête).' : 'Cette carte a déjà attaqué ce tour-ci.');
    return;
  }
  SFX.play('click');
  selectedAttackerUid = uid;
  renderGame();
}

function performPlayerAttack(targetType, targetUid) {
  const attackerUid = selectedAttackerUid;
  const beforeRects = captureRects();
  const before = captureSnapshot(gameState);
  const res = attack(gameState, 'player', attackerUid, targetType, targetUid);
  selectedAttackerUid = null;
  if (!res.ok) {
    SFX.play('error');
    flashError(res.error);
    renderGame();
    return;
  }
  SFX.play('attack');
  const fromRect = beforeRects[attackerUid];
  const toRect = targetType === 'hero' ? heroRect('ai') : beforeRects[targetUid];
  spawnAttackProjectile(fromRect, toRect, () => {
    renderGame();
    animateDiff(before, captureSnapshot(gameState), beforeRects);
    if (gameState.winner) showGameOver();
  });
}

function onEnemyBoardCardClick(uid) {
  if (!canPlayerAct() || !selectedAttackerUid) return;
  performPlayerAttack('card', uid);
}

function onEnemyHeroClick() {
  if (!canPlayerAct() || !selectedAttackerUid) return;
  performPlayerAttack('hero', null);
}

async function handleEndTurn() {
  if (!canPlayerAct()) return;
  inputLocked = true;
  selectedAttackerUid = null;
  endTurn(gameState, 'player');
  renderGame();
  showBanner(gameState.activePlayer === 'ai' ? "TOUR DE L'IA" : 'VOTRE TOUR');
  SFX.play('turnStart');
  if (gameState.winner) { showGameOver(); inputLocked = false; return; }

  await sleep(500);
  await runAiTurnAnimated();
  if (gameState.winner) { inputLocked = false; return; }

  await sleep(300);
  endTurn(gameState, 'ai');
  inputLocked = false;
  renderGame();
  showBanner('VOTRE TOUR');
  SFX.play('turnStart');
  if (gameState.winner) showGameOver();
}

async function runAiTurnAnimated() {
  const iter = runAiTurnSteps(gameState);
  while (true) {
    const before = captureSnapshot(gameState);
    const beforeRects = captureRects();
    const { value: step, done } = iter.next();
    if (done) break;
    if (!step.result || !step.result.ok) continue;

    if (step.type === 'play') {
      SFX.play(step.card.cardId === 'peoplespheres' ? 'legendary' : 'cardPlay');
      renderGame();
      animateDiff(before, captureSnapshot(gameState), beforeRects);
      if (step.card.cardId === 'peoplespheres') { showBanner('SYNCHRONISATION UNIVERSELLE (IA)', { epic: true }); spawnConfetti(20); }
    } else if (step.type === 'attack') {
      SFX.play('attack');
      const fromRect = beforeRects[step.attacker.uid];
      const toRect = step.targetType === 'hero' ? heroRect('player') : beforeRects[step.target.uid];
      await new Promise((resolve) => {
        spawnAttackProjectile(fromRect, toRect, () => {
          renderGame();
          animateDiff(before, captureSnapshot(gameState), beforeRects);
          resolve();
        });
      });
    }
    await sleep(500);
    if (gameState.winner) { showGameOver(); return; }
  }
  renderGame();
}

function resolveChoiceFromUI(selection) {
  SFX.play('click');
  resolvePendingChoice(gameState, selection);
  renderGame();
  if (gameState.winner) showGameOver();
}

// ---------------------------------------------------------------- rendering

function renderGame() {
  if (!gameState) return;
  const player = gameState.players.player;
  const ai = gameState.players.ai;

  document.getElementById('turn-indicator').textContent =
    `Tour ${gameState.turnNumber} — ${gameState.activePlayer === 'player' ? 'votre tour' : "tour de l'IA"}`;

  const phHp = document.getElementById('player-hp');
  phHp.textContent = `${player.heroHp} / ${player.heroMaxHp} PV`;
  phHp.classList.toggle('low', player.heroHp <= 10);
  const aiHp = document.getElementById('ai-hp');
  aiHp.textContent = `${ai.heroHp} / ${ai.heroMaxHp} PV`;
  aiHp.classList.toggle('low', ai.heroHp <= 10);

  document.getElementById('player-mana').textContent = `${player.mana} / ${player.maxMana} mana`;
  document.getElementById('ai-mana').textContent = `${ai.mana} / ${ai.maxMana} mana`;
  document.getElementById('player-deck-count').textContent = player.deck.length;
  document.getElementById('ai-deck-count').textContent = ai.deck.length;
  document.getElementById('ai-hand-count').textContent = ai.hand.length;

  const provocateurs = selectedAttackerUid ? getProvocationCards(gameState, 'ai') : [];
  const canTargetHero = selectedAttackerUid && provocateurs.length === 0;
  const aiHeroTarget = document.getElementById('ai-hero-target');
  aiHeroTarget.classList.toggle('attackable', !!canTargetHero);

  document.getElementById('ai-board').innerHTML = ai.board.map(c => miniCardHtml(gameState, 'ai', c, {
    targetable: !!selectedAttackerUid && (provocateurs.length === 0 || provocateurs.some(p => p.uid === c.uid)),
  })).join('') || '<div style="color:var(--text-dim); font-size:12px;">Plateau vide</div>';

  document.getElementById('player-board').innerHTML = player.board.map(c => miniCardHtml(gameState, 'player', c, {
    selectable: !c.summoningSick && !c.hasAttackedThisTurn && gameState.activePlayer === 'player',
    selected: c.uid === selectedAttackerUid,
    sick: c.summoningSick,
  })).join('') || '<div style="color:var(--text-dim); font-size:12px;">Plateau vide</div>';

  document.getElementById('player-hand').innerHTML = player.hand.map(c => handCardHtml(gameState, c)).join('');

  document.getElementById('end-turn-btn').disabled = !canPlayerAct();
  document.getElementById('end-turn-btn').classList.toggle('your-turn', canPlayerAct());

  renderSynergyPanel(player.board);
  checkSynergyToasts(player.board);
  renderLog();
  renderModals();
}

function rarityClass(rarity) { return `rarity-${rarity === 'L' ? 'L' : rarity}`; }

function miniCardHtml(state, ownerId, card, opts) {
  opts = opts || {};
  const atk = getEffectiveAtk(state, ownerId, card);
  const def = getEffectiveDef(state, ownerId, card);
  const color = DOMAIN_COLORS[card.domain] || '#666';
  const kws = keywordsArray(card);
  const provocation = cardHasProvocation(state, ownerId, card);
  const kwLabel = [...kws.filter(k => k !== 'Provocation'), ...(provocation ? ['Provocation'] : [])].join(', ');
  const classes = ['mini-card', rarityClass(card.rarity)];
  if (opts.sick) classes.push('sick');
  if (opts.selectable) classes.push('selectable');
  if (opts.selected) classes.push('selected');
  if (opts.targetable) classes.push('targetable');
  return `
    <div class="${classes.join(' ')}" data-uid="${card.uid}" style="--dcolor:${color}" title="${escapeAttr(cardAbilityText(card))}">
      ${card.pointFaible ? '<div class="pf-flag">PF</div>' : ''}
      <div class="mc-name"><span class="domain-icon">${DOMAIN_ICONS[card.domain] || ''}</span>${card.name}</div>
      <div class="mc-kw">${kwLabel}</div>
      <div class="mc-stats">
        <span class="mc-atk">${atk}</span>
        <span class="mc-def">${def}</span>
        <span class="mc-hp">${card.currentHp}/${card.maxHp}</span>
      </div>
    </div>`;
}

function handCardHtml(state, card) {
  if (card.isToken) {
    return `
      <div class="hand-card" data-uid="${card.uid}" style="--dcolor:#4fd1c5">
        <div class="hc-cost">0</div>
        <div class="hc-name">⚡ ${card.name}</div>
        <div class="hc-ability">Jeton : gagnez 1 mana ce tour-ci.</div>
      </div>`;
  }
  const cost = computeCost(state, 'player', card, { consume: false });
  const isAction = card.cardType === 'ACTION';
  const affordable = cost <= state.players.player.mana && (isAction || state.players.player.board.length < MAX_BOARD);
  const color = DOMAIN_COLORS[card.domain] || '#666';
  return `
    <div class="hand-card ${rarityClass(card.rarity)} ${affordable ? '' : 'unaffordable'}" data-uid="${card.uid}" style="--dcolor:${color}" title="${escapeAttr(cardAbilityText(card))}">
      <div class="hc-cost">${cost}</div>
      <div class="hc-name"><span class="domain-icon">${DOMAIN_ICONS[card.domain] || ''}</span>${card.name}</div>
      <div class="hc-ability">${DOMAIN_LABELS[card.domain]} · ${rarityLabel(card.rarity)}${isAction ? ' · <span class="action-tag">⚡ Action</span>' : ''}${card.pointFaible ? ' · PF' : ''}</div>
      ${isAction ? '' : `
      <div class="hc-stats">
        <span class="mc-atk">${card.currentAtk}</span>
        <span class="mc-def">${card.currentDef}</span>
        <span class="mc-hp">${card.currentHp}</span>
      </div>`}
    </div>`;
}

const SYNERGY_SUMMARY = {
  [DOMAIN.PAIE_GA]: { 2: 'Soin héros +1/tour', 4: '+ Réduction dégâts -1', 6: '+ Soin porté à +3/tour' },
  [DOMAIN.GTA]: { 2: '+1 DEF (domaine)', 4: '+2 DEF + Provocation (1 carte)', 6: '+3 DEF + Provocation (toutes)' },
  [DOMAIN.RECRUTEMENT]: { 2: '1ère carte -1 mana', 4: '+ 1 carte piochée/tour', 6: '+ Toutes -1 mana en main' },
  [DOMAIN.FORMATION]: { 2: '+1 ATK/+1 HP par tour', 4: '+1 ATK/+1 DEF/+1 HP par tour', 6: 'Gain doublé (×2)' },
  [DOMAIN.TALENT_PERF]: { 2: '+1 ATK (domaine)', 4: '+3 ATK (domaine)', 6: '+6 ATK (domaine)' },
  [DOMAIN.PILOTAGE_BI]: { 2: 'Regard dessus pioche', 4: '+ Pioche améliorée 1x/tour', 6: '+ Échange main 1x/tour' },
};

function renderSynergyPanel(board) {
  const counts = getDomainCounts(board);
  const tiers = getSynergyTiers(board);
  const el = document.getElementById('synergy-list');
  el.innerHTML = SYNERGY_DOMAINS.map(d => {
    const tier = tiers[d];
    const count = counts[d];
    const summary = tier > 0 ? SYNERGY_SUMMARY[d][tier] : `${count}/2 pour palier 2`;
    return `
      <div class="synergy-badge" style="--dcolor:${DOMAIN_COLORS[d]}">
        <div>
          <div>${DOMAIN_LABELS[d]} (${count})</div>
          <div style="color:var(--text-dim); font-size:10.5px;">${summary}</div>
        </div>
        <div class="tier t${tier}">${tier > 0 ? `P${tier}` : '—'}</div>
      </div>`;
  }).join('');
}

function renderLog() {
  const el = document.getElementById('log-panel');
  el.innerHTML = gameState.log.slice(-40).map(l => `<div>${l}</div>`).join('');
  el.scrollTop = el.scrollHeight;
}

// ---------------------------------------------------------------- modals

function renderModals() {
  const root = document.getElementById('modal-root');
  if (gameState.pendingReveal) {
    root.innerHTML = revealModalHtml(gameState.pendingReveal);
    document.getElementById('modal-ok-btn').addEventListener('click', () => {
      gameState.pendingReveal = null;
      renderGame();
    });
    return;
  }
  if (gameState.pendingChoice) {
    root.innerHTML = choiceModalHtml(gameState.pendingChoice);
    wireChoiceModal(gameState.pendingChoice);
    return;
  }
  root.innerHTML = '';
}

function tinyCardHtml(card) {
  const color = DOMAIN_COLORS[card.domain] || '#666';
  const isAction = card.cardType === 'ACTION';
  return `<div class="mini-card ${rarityClass(card.rarity)}" data-choice-uid="${card.uid}" style="--dcolor:${color}" title="${escapeAttr(cardAbilityText(card))}">
    <div class="mc-name"><span class="domain-icon">${DOMAIN_ICONS[card.domain] || ''}</span>${card.name}</div>
    <div class="mc-kw">${DOMAIN_LABELS[card.domain] || ''}${isAction ? ' · ⚡' : ''}</div>
    ${isAction ? '' : `<div class="mc-stats"><span class="mc-atk">${card.baseAtk ?? card.atk}</span><span class="mc-def">${card.baseDef ?? card.def}</span><span class="mc-hp">${card.baseHp ?? card.hp}</span></div>`}
  </div>`;
}

function revealModalHtml(reveal) {
  return `
    <div class="modal-overlay">
      <div class="modal-box">
        <h2>${reveal.title}</h2>
        <div class="modal-cards">${reveal.cards.map(tinyCardHtml).join('') || '<em>Rien à révéler.</em>'}</div>
        <div class="modal-actions"><button id="modal-ok-btn" class="primary">OK</button></div>
      </div>
    </div>`;
}

function choiceModalHtml(choice) {
  if (choice.kind === 'selectBoardCard') {
    return `
      <div class="modal-overlay">
        <div class="modal-box">
          <h2>Choisissez une carte alliée à renforcer</h2>
          <div class="modal-cards" id="choice-cards">
            ${choice.options.map(uid => {
              const card = findCardAnywhere(gameState, uid);
              return card ? tinyCardHtml(card) : '';
            }).join('')}
          </div>
        </div>
      </div>`;
  }
  if (choice.kind === 'chooseFromReveal') {
    return `
      <div class="modal-overlay">
        <div class="modal-box">
          <h2>Piochez ${choice.options.length}, gardez ${choice.keep}</h2>
          <p style="color:var(--text-dim); font-size:12px;">Cliquez sur la carte que vous voulez garder en main.</p>
          <div class="modal-cards" id="choice-cards">
            ${choice.options.map(uid => {
              const card = findCardAnywhere(gameState, uid);
              return card ? tinyCardHtml(card) : '';
            }).join('')}
          </div>
        </div>
      </div>`;
  }
  if (choice.kind === 'keepOrDiscardTop') {
    const card = findCardAnywhere(gameState, choice.top);
    return `
      <div class="modal-overlay">
        <div class="modal-box">
          <h2>Dessus de votre pioche</h2>
          <div class="modal-cards">${card ? tinyCardHtml(card) : ''}</div>
          <div class="modal-actions">
            <button id="choice-keep">Garder au sommet</button>
            <button id="choice-discard" class="primary">Défausser et piocher la suivante</button>
          </div>
        </div>
      </div>`;
  }
  if (choice.kind === 'chooseTopOfN') {
    return `
      <div class="modal-overlay">
        <div class="modal-box">
          <h2>Choisissez la carte à piocher en premier</h2>
          <div class="modal-cards" id="choice-cards">
            ${choice.options.map(uid => {
              const card = findCardAnywhere(gameState, uid);
              return card ? tinyCardHtml(card) : '';
            }).join('')}
          </div>
        </div>
      </div>`;
  }
  return '<div class="modal-overlay"><div class="modal-box"><h2>...</h2></div></div>';
}

function wireChoiceModal(choice) {
  if (choice.kind === 'keepOrDiscardTop') {
    document.getElementById('choice-keep').addEventListener('click', () => resolveChoiceFromUI('keep'));
    document.getElementById('choice-discard').addEventListener('click', () => resolveChoiceFromUI('discard'));
    return;
  }
  const cardsEl = document.getElementById('choice-cards');
  if (cardsEl) {
    cardsEl.querySelectorAll('[data-choice-uid]').forEach(el => {
      el.classList.add('selectable');
      el.addEventListener('click', () => resolveChoiceFromUI(el.dataset.choiceUid));
    });
  }
}

// ---------------------------------------------------------------- mulligan

let mulliganSelected = new Set();

function aiAutoMulligan() {
  const ai = gameState.players.ai;
  const swapUids = ai.hand.filter(c => !c.isToken && c.baseCost >= 4).map(c => c.uid);
  if (swapUids.length) mulligan(gameState, 'ai', swapUids);
}

function startMulliganPhase() {
  aiAutoMulligan();
  showMulliganModal();
}

function showMulliganModal() {
  mulliganSelected = new Set();
  const root = document.getElementById('modal-root');
  const hand = gameState.players.player.hand;
  root.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-box" style="max-width:640px;">
        <h2>Mulligan — gardez ou changez votre main de départ</h2>
        <p style="color:var(--text-dim); font-size:12px;">Cliquez sur les cartes à remplacer (une seule fois, en tout début de partie).</p>
        <div class="modal-cards" id="mulligan-cards">${hand.map(tinyCardHtml).join('')}</div>
        <div class="modal-actions"><button id="mulligan-confirm" class="primary">Garder cette main</button></div>
      </div>
    </div>`;
  root.querySelectorAll('#mulligan-cards [data-choice-uid]').forEach(el => {
    el.classList.add('selectable');
    el.addEventListener('click', () => {
      const uid = el.dataset.choiceUid;
      SFX.play('click');
      if (mulliganSelected.has(uid)) { mulliganSelected.delete(uid); el.classList.remove('selected'); }
      else { mulliganSelected.add(uid); el.classList.add('selected'); }
    });
  });
  document.getElementById('mulligan-confirm').addEventListener('click', () => {
    if (mulliganSelected.size > 0) {
      mulligan(gameState, 'player', Array.from(mulliganSelected));
      SFX.play('draw');
    }
    document.getElementById('modal-root').innerHTML = '';
    renderGame();
    showBanner('VOTRE TOUR');
    SFX.play('turnStart');
  });
}

function statsSummaryHtml(playerId) {
  const s = gameState.stats[playerId];
  const mvpEntry = Object.entries(s.damageByCard).sort((a, b) => b[1] - a[1])[0];
  const mvpName = mvpEntry ? (CARDS_BY_ID[mvpEntry[0]] ? CARDS_BY_ID[mvpEntry[0]].name : mvpEntry[0]) : '—';
  const bestDomain = SYNERGY_DOMAINS.reduce((best, d) => (s.peakSynergyTier[d] || 0) > (s.peakSynergyTier[best] || 0) ? d : best, SYNERGY_DOMAINS[0]);
  const bestTier = s.peakSynergyTier[bestDomain] || 0;
  return `
    <div style="flex:1; text-align:left; background:var(--bg-panel-2); border-radius:8px; padding:10px 14px; font-size:12.5px; line-height:1.7;">
      <div style="font-weight:700; margin-bottom:4px;">${playerId === 'player' ? 'Vous' : "L'IA"}</div>
      <div>Dégâts infligés : <b>${s.damageDealt}</b></div>
      <div>Dégâts subis : <b>${s.damageTaken}</b></div>
      <div>Soins prodigués : <b>${s.healingDone}</b></div>
      <div>Cartes jouées : <b>${s.cardsPlayed}</b></div>
      <div>Meilleure synergie : <b>${bestTier > 0 ? `${DOMAIN_LABELS[bestDomain]} palier ${bestTier}` : '—'}</b></div>
      <div>Carte MVP : <b>${mvpName}</b>${mvpEntry ? ` (${mvpEntry[1]} dégâts)` : ''}</div>
    </div>`;
}

function showGameOver() {
  const root = document.getElementById('modal-root');
  const won = gameState.winner === 'player';
  const draw = gameState.winner === 'draw';
  SFX.play(won ? 'win' : draw ? 'turnStart' : 'lose');
  if (won) { spawnConfetti(90); addBoosters(1); }
  else if (!draw) shakeScreen(10, 400);
  root.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-box gameover-box" style="max-width:560px;">
        <h1 class="${draw ? '' : won ? 'win' : 'lose'}">${draw ? 'Égalité' : won ? 'Victoire !' : 'Défaite'}</h1>
        <p style="color:var(--text-dim);">${won ? 'PeopleSpheres a synchronisé tout le marché SIRH.' : draw ? 'Les deux héros tombent ensemble.' : "L'IA a pris le dessus cette fois."}</p>
        ${won ? '<p style="color:var(--accent-2); font-weight:700;">🎁 +1 booster gagné !</p>' : ''}
        <div style="display:flex; gap:10px; margin:14px 0;">
          ${statsSummaryHtml('player')}
          ${statsSummaryHtml('ai')}
        </div>
        <div class="modal-actions" style="justify-content:center;">
          <button id="gameover-rematch" class="primary">Nouvelle partie (même deck)</button>
          <button id="gameover-builder">Deck builder</button>
        </div>
      </div>
    </div>`;
  document.getElementById('gameover-rematch').addEventListener('click', () => {
    startNewGame(lastPlayerDeckList);
  });
  document.getElementById('gameover-builder').addEventListener('click', () => showScreen('deckbuilder'));
}
