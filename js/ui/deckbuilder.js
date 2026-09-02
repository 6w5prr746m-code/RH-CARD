// Deck builder screen — GDD.md §5.

const builderState = {
  counts: {}, // cardId -> number of copies selected
  filter: 'ALL',
};

const DOMAIN_TAB_ORDER = [
  ['ALL', 'Toutes'],
  [DOMAIN.PAIE_GA, DOMAIN_LABELS[DOMAIN.PAIE_GA]],
  [DOMAIN.GTA, DOMAIN_LABELS[DOMAIN.GTA]],
  [DOMAIN.RECRUTEMENT, DOMAIN_LABELS[DOMAIN.RECRUTEMENT]],
  [DOMAIN.FORMATION, DOMAIN_LABELS[DOMAIN.FORMATION]],
  [DOMAIN.TALENT_PERF, DOMAIN_LABELS[DOMAIN.TALENT_PERF]],
  [DOMAIN.PILOTAGE_BI, DOMAIN_LABELS[DOMAIN.PILOTAGE_BI]],
  ['LEGEND', 'Légendaire'],
];

function maxCopiesFor(card) {
  return (card.rarity === 3 || card.rarity === 'L') ? 1 : 2;
}

function availableCopiesFor(card) {
  return Math.min(maxCopiesFor(card), ownedCount(card.id));
}

function totalDeckSize() {
  return Object.values(builderState.counts).reduce((a, b) => a + b, 0);
}

function deckListFromCounts() {
  const list = [];
  for (const [id, n] of Object.entries(builderState.counts)) {
    for (let i = 0; i < n; i++) list.push(id);
  }
  return list;
}

function initDeckBuilder() {
  renderDomainTabs();
  renderPool();
  renderDeckPanel();

  document.getElementById('pool-grid').addEventListener('click', (e) => {
    const tile = e.target.closest('.card-tile');
    if (!tile) return;
    addCardToDeck(tile.dataset.id);
  });
  document.getElementById('pool-grid').addEventListener('mouseover', (e) => {
    const tile = e.target.closest('.card-tile');
    if (!tile) return;
    const card = CARDS_BY_ID[tile.dataset.id];
    if (card) showHoverPreview(card, tile);
  });
  document.getElementById('pool-grid').addEventListener('mouseout', (e) => {
    if (e.target.closest('.card-tile')) hideHoverPreview();
  });
  document.getElementById('deck-list').addEventListener('click', (e) => {
    const row = e.target.closest('.deck-row');
    if (!row) return;
    removeCardFromDeck(row.dataset.id);
  });
  document.getElementById('btn-clear-deck').addEventListener('click', () => {
    SFX.play('click');
    builderState.counts = {};
    renderPool();
    renderDeckPanel();
  });
  document.getElementById('btn-random-deck').addEventListener('click', () => {
    SFX.play('click');
    builderState.counts = {};
    for (const id of buildRandomOwnedDeckList()) {
      builderState.counts[id] = (builderState.counts[id] || 0) + 1;
    }
    renderPool();
    renderDeckPanel();
  });
  document.getElementById('btn-start-game').addEventListener('click', handleStartGameClick);
  document.getElementById('btn-options-builder').addEventListener('click', showOptionsModal);
  document.getElementById('btn-theme-toggle-builder').addEventListener('click', toggleThemeQuick);
  document.getElementById('btn-open-booster').addEventListener('click', handleOpenBooster);

  document.getElementById('btn-save-deck').addEventListener('click', () => {
    const list = deckListFromCounts();
    if (list.length === 0) { SFX.play('error'); flashError('Le deck est vide.'); return; }
    const name = (prompt('Nom du deck à sauvegarder :', '') || '').trim();
    if (!name) return;
    saveCurrentDeckAs(name, list);
    SFX.play('cardAdd');
    renderSavedDecksSelect();
    document.getElementById('saved-decks-select').value = name;
  });
  document.getElementById('btn-load-deck').addEventListener('click', () => {
    const name = document.getElementById('saved-decks-select').value;
    if (!name) return;
    const list = loadDeckByName(name);
    if (!list) return;
    builderState.counts = {};
    for (const id of list) {
      if (!CARDS_BY_ID[id]) continue;
      builderState.counts[id] = (builderState.counts[id] || 0) + 1;
    }
    SFX.play('cardPlay');
    renderPool();
    renderDeckPanel();
  });
  document.getElementById('btn-delete-deck').addEventListener('click', () => {
    const name = document.getElementById('saved-decks-select').value;
    if (!name) return;
    if (!confirm(`Supprimer le deck « ${name} » ?`)) return;
    deleteSavedDeck(name);
    SFX.play('cardRemove');
    renderSavedDecksSelect();
  });

  attachHolographicTilt('#pool-grid', '.card-tile');
  renderBoosterCount();
  renderSavedDecksSelect();
}

function renderSavedDecksSelect() {
  const decks = loadSavedDecks();
  const sel = document.getElementById('saved-decks-select');
  const current = sel.value;
  sel.innerHTML = '<option value="">— Mes decks —</option>' +
    Object.entries(decks).map(([name, list]) => `<option value="${escapeAttr(name)}">${escapeAttr(name)} (${list.length})</option>`).join('');
  if (decks[current]) sel.value = current;
}

function renderBoosterCount() {
  loadCollection();
  const btn = document.getElementById('btn-open-booster');
  btn.textContent = `🎁 Ouvrir un booster (${collectionState.boosters})`;
  btn.disabled = collectionState.boosters <= 0;
}

function renderDomainTabs() {
  const el = document.getElementById('domain-tabs');
  el.innerHTML = DOMAIN_TAB_ORDER.map(([key, label]) =>
    `<button data-filter="${key}" class="${builderState.filter === key ? 'active' : ''}">${label}</button>`
  ).join('');
  el.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      SFX.play('tabSwitch');
      builderState.filter = btn.dataset.filter;
      renderDomainTabs();
      renderPool();
    });
  });
}

function poolForFilter() {
  if (builderState.filter === 'ALL') return CARD_POOL;
  if (builderState.filter === 'LEGEND') return [LEGENDARY_CARD];
  return CARD_POOL.filter(c => c.domain === builderState.filter);
}

function renderPool() {
  hideHoverPreview();
  const grid = document.getElementById('pool-grid');
  const cards = poolForFilter();
  grid.innerHTML = cards.map(cardTileHtml).join('');
}

function cardTileHtml(card) {
  const owned = ownedCount(card.id);
  if (owned === 0) {
    return `
      <div class="card-tile locked" data-id="${card.id}" style="--dcolor:#444">
        <div class="lock-icon">🔒</div>
        <div class="name">${card.name}</div>
        <div class="stars">${rarityLabel(card.rarity)} · ${DOMAIN_LABELS[card.domain]}</div>
        <div class="ability">Non débloquée — ouvrez un booster pour la découvrir.</div>
      </div>`;
  }
  const count = builderState.counts[card.id] || 0;
  const max = availableCopiesFor(card);
  const maxed = count >= max || totalDeckSize() >= DECK_MAX;
  const color = DOMAIN_COLORS[card.domain] || '#666';
  const isAction = card.cardType === 'ACTION';
  return `
    <div class="card-tile ${rarityClass(card.rarity)} ${maxed ? 'maxed' : ''}" data-id="${card.id}" style="--dcolor:${color}">
      <div class="card-art">${cardArtMarkup(card)}</div>
      <div class="cost-badge">${card.cost}</div>
      ${count > 0 ? `<div class="count-badge">×${count}</div>` : ''}
      <div class="name"><span class="domain-icon">${DOMAIN_ICONS[card.domain] || ''}</span>${card.name}</div>
      <div class="stars">${rarityLabel(card.rarity)} · ${DOMAIN_LABELS[card.domain]}${isAction ? ' · <span class="action-tag">⚡ Action</span>' : ''} · <span class="owned-tag">possédé ${owned}</span></div>
      ${isAction ? '' : `<div class="statline"><span>${card.atk} ATK</span><span>${card.def} DEF</span><span>${card.hp} HP</span></div>`}
      <div class="ability">${cardAbilityText(card)}</div>
      ${card.pointFaible ? '<div class="pf-tag">Point Faible</div>' : ''}
    </div>`;
}

function renderDeckPanel() {
  const total = totalDeckSize();
  const countEl = document.getElementById('deck-count');
  const valid = total >= DECK_MIN && total <= DECK_MAX;
  countEl.textContent = `${total} / ${DECK_MAX}`;
  countEl.className = 'deck-count ' + (total === 0 ? '' : valid ? 'valid' : 'invalid');

  const curve = {};
  for (const [id, n] of Object.entries(builderState.counts)) {
    const c = CARDS_BY_ID[id];
    curve[c.cost] = (curve[c.cost] || 0) + n;
  }
  const maxBar = Math.max(1, ...Object.values(curve));
  const curveEl = document.getElementById('deck-curve');
  curveEl.innerHTML = Array.from({ length: 11 }, (_, cost) => {
    const n = curve[cost] || 0;
    const h = Math.round((n / maxBar) * 100);
    return `<div class="bar" style="height:${h}%" title="${cost} mana : ${n}"></div>`;
  }).join('');

  const listEl = document.getElementById('deck-list');
  const entries = Object.entries(builderState.counts)
    .map(([id, n]) => ({ card: CARDS_BY_ID[id], n }))
    .sort((a, b) => a.card.cost - b.card.cost || a.card.name.localeCompare(b.card.name));
  listEl.innerHTML = entries.map(({ card, n }) => `
    <div class="deck-row" data-id="${card.id}" style="--dcolor:${DOMAIN_COLORS[card.domain] || '#666'}">
      <span class="dr-cost">${card.cost}</span>
      <span class="dr-name">${card.name}</span>
      <span>×${n}</span>
    </div>`).join('');

  document.getElementById('btn-start-game').disabled = !valid;
}

function addCardToDeck(cardId) {
  const card = CARDS_BY_ID[cardId];
  if (!card) return;
  if (ownedCount(cardId) === 0) { SFX.play('error'); flashError('Carte non débloquée — ouvrez un booster.'); return; }
  const count = builderState.counts[cardId] || 0;
  if (count >= availableCopiesFor(card) || totalDeckSize() >= DECK_MAX) { SFX.play('error'); return; }
  SFX.play('cardAdd');
  builderState.counts[cardId] = count + 1;
  renderPool();
  renderDeckPanel();
}

function handleOpenBooster() {
  const picks = openBooster();
  if (!picks) return;
  SFX.play('cardPlay');
  showBoosterModal(picks);
}

function showBoosterModal(cards) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-box" style="max-width:700px; text-align:center;">
        <h2>Nouveau booster !</h2>
        <div class="modal-cards" id="booster-cards"></div>
        <div class="modal-actions" style="justify-content:center;">
          <button id="booster-continue" class="primary">Continuer</button>
        </div>
      </div>
    </div>`;
  const cardsEl = document.getElementById('booster-cards');
  cards.forEach((card, i) => {
    setTimeout(() => {
      const wrap = document.createElement('div');
      wrap.innerHTML = tinyCardHtml(card);
      const node = wrap.firstElementChild;
      node.classList.add('card-enter');
      cardsEl.appendChild(node);
      SFX.play(card.rarity === 3 ? 'legendary' : card.rarity === 2 ? 'synergy' : 'draw');
      if (card.rarity === 3) spawnConfetti(25);
    }, i * 350);
  });
  document.getElementById('booster-continue').addEventListener('click', () => {
    SFX.play('click');
    document.getElementById('modal-root').innerHTML = '';
    renderBoosterCount();
    renderPool();
    renderDeckPanel();
  });
}

function removeCardFromDeck(cardId) {
  const count = builderState.counts[cardId] || 0;
  SFX.play('cardRemove');
  if (count <= 1) delete builderState.counts[cardId];
  else builderState.counts[cardId] = count - 1;
  renderPool();
  renderDeckPanel();
}
