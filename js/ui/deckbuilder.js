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
    for (const id of buildAiDeck()) {
      builderState.counts[id] = (builderState.counts[id] || 0) + 1;
    }
    renderPool();
    renderDeckPanel();
  });
  document.getElementById('btn-start-game').addEventListener('click', () => {
    const list = deckListFromCounts();
    const errors = validateDeck(list);
    if (errors.length) { SFX.play('error'); alert(errors.join('\n')); return; }
    SFX.play('cardPlay');
    startNewGame(list);
  });
  document.getElementById('btn-mute-builder').addEventListener('click', (e) => toggleMuteButton(e.currentTarget));
  attachHolographicTilt('#pool-grid', '.card-tile');
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
  const grid = document.getElementById('pool-grid');
  const cards = poolForFilter();
  grid.innerHTML = cards.map(cardTileHtml).join('');
}

function cardTileHtml(card) {
  const count = builderState.counts[card.id] || 0;
  const max = maxCopiesFor(card);
  const maxed = count >= max || totalDeckSize() >= DECK_MAX;
  const color = DOMAIN_COLORS[card.domain] || '#666';
  return `
    <div class="card-tile ${rarityClass(card.rarity)} ${maxed ? 'maxed' : ''}" data-id="${card.id}" style="--dcolor:${color}">
      <div class="cost-badge">${card.cost}</div>
      ${count > 0 ? `<div class="count-badge">×${count}</div>` : ''}
      <div class="name"><span class="domain-icon">${DOMAIN_ICONS[card.domain] || ''}</span>${card.name}</div>
      <div class="stars">${rarityLabel(card.rarity)} · ${DOMAIN_LABELS[card.domain]}</div>
      <div class="statline"><span>${card.atk} ATK</span><span>${card.def} DEF</span><span>${card.hp} HP</span></div>
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
  const count = builderState.counts[cardId] || 0;
  if (count >= maxCopiesFor(card) || totalDeckSize() >= DECK_MAX) { SFX.play('error'); return; }
  SFX.play('cardAdd');
  builderState.counts[cardId] = count + 1;
  renderPool();
  renderDeckPanel();
}

function removeCardFromDeck(cardId) {
  const count = builderState.counts[cardId] || 0;
  SFX.play('cardRemove');
  if (count <= 1) delete builderState.counts[cardId];
  else builderState.counts[cardId] = count - 1;
  renderPool();
  renderDeckPanel();
}
