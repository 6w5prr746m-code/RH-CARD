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
  document.getElementById('end-turn-btn').addEventListener('click', handleEndTurn);
  document.getElementById('btn-back-to-builder').addEventListener('click', () => {
    if (gameState && !gameState.winner) {
      if (!confirm('Abandonner la partie en cours et retourner au deck builder ?')) return;
    }
    showScreen('deckbuilder');
  });
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
  const res = playCard(gameState, 'player', uid);
  selectedAttackerUid = null;
  if (!res.ok) flashError(res.error);
  renderGame();
  if (gameState.winner) showGameOver();
}

function onPlayerBoardCardClick(uid) {
  if (!canPlayerAct()) return;
  const card = gameState.players.player.board.find(c => c.uid === uid);
  if (!card) return;
  if (selectedAttackerUid === uid) { selectedAttackerUid = null; renderGame(); return; }
  if (card.summoningSick || card.hasAttackedThisTurn) {
    flashError(card.summoningSick ? 'Cette carte vient d\'être jouée (pas encore prête).' : 'Cette carte a déjà attaqué ce tour-ci.');
    return;
  }
  selectedAttackerUid = uid;
  renderGame();
}

function onEnemyBoardCardClick(uid) {
  if (!canPlayerAct() || !selectedAttackerUid) return;
  const res = attack(gameState, 'player', selectedAttackerUid, 'card', uid);
  selectedAttackerUid = null;
  if (!res.ok) flashError(res.error);
  renderGame();
  if (gameState.winner) showGameOver();
}

function onEnemyHeroClick() {
  if (!canPlayerAct() || !selectedAttackerUid) return;
  const res = attack(gameState, 'player', selectedAttackerUid, 'hero');
  selectedAttackerUid = null;
  if (!res.ok) flashError(res.error);
  renderGame();
  if (gameState.winner) showGameOver();
}

async function handleEndTurn() {
  if (!canPlayerAct()) return;
  inputLocked = true;
  selectedAttackerUid = null;
  endTurn(gameState, 'player');
  renderGame();
  if (gameState.winner) { showGameOver(); inputLocked = false; return; }

  await sleep(450);
  runAiTurn(gameState);
  renderGame();
  if (gameState.winner) { showGameOver(); inputLocked = false; return; }

  await sleep(350);
  endTurn(gameState, 'ai');
  inputLocked = false;
  renderGame();
  if (gameState.winner) showGameOver();
}

function resolveChoiceFromUI(selection) {
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
  renderLog();
  renderModals();
}

function miniCardHtml(state, ownerId, card, opts) {
  opts = opts || {};
  const atk = getEffectiveAtk(state, ownerId, card);
  const def = getEffectiveDef(state, ownerId, card);
  const color = DOMAIN_COLORS[card.domain] || '#666';
  const kws = keywordsArray(card);
  const provocation = cardHasProvocation(state, ownerId, card);
  const kwLabel = [...kws.filter(k => k !== 'Provocation'), ...(provocation ? ['Provocation'] : [])].join(', ');
  const classes = ['mini-card'];
  if (opts.sick) classes.push('sick');
  if (opts.selectable) classes.push('selectable');
  if (opts.selected) classes.push('selected');
  if (opts.targetable) classes.push('targetable');
  return `
    <div class="${classes.join(' ')}" data-uid="${card.uid}" style="--dcolor:${color}" title="${escapeAttr(cardAbilityText(card))}">
      ${card.pointFaible ? '<div class="pf-flag">PF</div>' : ''}
      <div class="mc-name">${card.name}</div>
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
        <div class="hc-name">${card.name}</div>
        <div class="hc-ability">Jeton : gagnez 1 mana ce tour-ci.</div>
      </div>`;
  }
  const cost = computeCost(state, 'player', card, { consume: false });
  const affordable = cost <= state.players.player.mana && state.players.player.board.length < MAX_BOARD;
  const color = DOMAIN_COLORS[card.domain] || '#666';
  return `
    <div class="hand-card ${affordable ? '' : 'unaffordable'}" data-uid="${card.uid}" style="--dcolor:${color}" title="${escapeAttr(cardAbilityText(card))}">
      <div class="hc-cost">${cost}</div>
      <div class="hc-name">${card.name}</div>
      <div class="hc-ability">${DOMAIN_LABELS[card.domain]} · ${rarityLabel(card.rarity)}${card.pointFaible ? ' · PF' : ''}</div>
      <div class="hc-stats">
        <span class="mc-atk">${card.currentAtk}</span>
        <span class="mc-def">${card.currentDef}</span>
        <span class="mc-hp">${card.currentHp}</span>
      </div>
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
  return `<div class="mini-card" data-choice-uid="${card.uid}" style="--dcolor:${color}" title="${escapeAttr(cardAbilityText(card))}">
    <div class="mc-name">${card.name}</div>
    <div class="mc-kw">${DOMAIN_LABELS[card.domain] || ''}</div>
    <div class="mc-stats"><span class="mc-atk">${card.baseAtk ?? card.atk}</span><span class="mc-def">${card.baseDef ?? card.def}</span><span class="mc-hp">${card.baseHp ?? card.hp}</span></div>
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

function showGameOver() {
  const root = document.getElementById('modal-root');
  const won = gameState.winner === 'player';
  const draw = gameState.winner === 'draw';
  root.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-box gameover-box">
        <h1 class="${draw ? '' : won ? 'win' : 'lose'}">${draw ? 'Égalité' : won ? 'Victoire !' : 'Défaite'}</h1>
        <p style="color:var(--text-dim);">${won ? 'PeopleSpheres a synchronisé tout le marché SIRH.' : draw ? 'Les deux héros tombent ensemble.' : "L'IA a pris le dessus cette fois."}</p>
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
