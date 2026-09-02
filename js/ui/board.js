// Game board screen — rendering + interaction.

let gameState = null;
let selectedAttackerUid = null;
let inputLocked = false;

const ANIM_SPEED_FACTORS = { instant: 0, normal: 1, cinematic: 1.6 };
let animSpeed = localStorage.getItem('rhcard_anim_speed') || 'normal';
if (!(animSpeed in ANIM_SPEED_FACTORS)) animSpeed = 'normal';

function setAnimSpeed(speed) {
  if (!(speed in ANIM_SPEED_FACTORS)) return;
  animSpeed = speed;
  localStorage.setItem('rhcard_anim_speed', speed);
}

let skipRequested = false;

function sleep(ms) {
  const factor = skipRequested ? 0 : ANIM_SPEED_FACTORS[animSpeed];
  return new Promise(r => setTimeout(r, ms * factor));
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

// In solo mode the human always sits in the 'player' seat. In local 2-player
// pass-and-play, whichever seat's turn it is IS the human currently allowed
// to act — the board perspective (bottom = "you", top = opponent) follows it.
function humanSeat() {
  return (gameState && gameState.mode === 'local2p') ? gameState.activePlayer : 'player';
}
function otherSeat() { return opponentOf(humanSeat()); }
function domPrefixFor(seatId) { return seatId === humanSeat() ? 'player' : 'ai'; }

// ---------------------------------------------------------------- card zoom

function resolveCardFromElement(el) {
  if (el.dataset.uid) return (gameState && findCardAnywhere(gameState, el.dataset.uid)) || null;
  if (el.dataset.choiceUid) return (gameState && findCardAnywhere(gameState, el.dataset.choiceUid)) || null;
  if (el.dataset.id) return CARDS_BY_ID[el.dataset.id] || null;
  return null;
}

function initCardZoom() {
  document.addEventListener('contextmenu', (e) => {
    const el = e.target.closest('[data-uid], [data-choice-uid], [data-id]');
    if (!el) return;
    e.preventDefault();
    const card = resolveCardFromElement(el);
    if (card) showCardZoom(card);
  });

  let pressTimer = null;
  document.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') return;
    const el = e.target.closest('[data-uid], [data-choice-uid], [data-id]');
    if (!el) return;
    pressTimer = setTimeout(() => {
      pressTimer = null;
      const card = resolveCardFromElement(el);
      if (card) { SFX.play('click'); showCardZoom(card); }
    }, 550);
  });
  const cancelPress = () => { if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; } };
  document.addEventListener('pointerup', cancelPress);
  document.addEventListener('pointermove', cancelPress);
  document.addEventListener('pointercancel', cancelPress);
}

function cardZoomHtml(card, { closable } = {}) {
  const color = DOMAIN_COLORS[card.domain] || '#666';
  const isAction = card.cardType === 'ACTION';
  const atk = card.currentAtk ?? card.atk;
  const def = card.currentDef ?? card.def;
  const hp = card.currentHp ?? card.hp;
  const maxHp = card.maxHp ?? card.hp;
  const cost = card.baseCost ?? card.cost;
  return `
    <div class="card-zoom card-face ${rarityClass(card.rarity)}" style="--dcolor:${color}">
      ${closable ? '<button class="card-zoom-close" aria-label="Fermer">✕</button>' : ''}
      <div class="card-art">${cardArtMarkup(card)}</div>
      <div class="card-art-scrim"></div>
      <div class="cf-top">
        <span class="cf-name"><span class="domain-icon">${DOMAIN_ICONS[card.domain] || ''}</span>${card.name}</span>
        <span class="cf-cost">${cost}</span>
      </div>
      <div class="cf-bottom">
        <div class="cz-sub">${rarityLabel(card.rarity)} · ${DOMAIN_LABELS[card.domain] || ''}${isAction ? ' · <span class="action-tag">⚡ Action</span>' : ''}</div>
        ${isAction ? '' : `
        <div class="cz-stats">
          <div><span class="mc-atk">${atk}</span>ATK</div>
          <div><span class="mc-def">${def}</span>DEF</div>
          <div><span class="mc-hp">${hp}${hp !== maxHp ? `/${maxHp}` : ''}</span>HP</div>
        </div>`}
        ${card.pointFaible ? '<div class="cz-pf">⚠ Point Faible vs PeopleSpheres</div>' : ''}
        <div class="cz-ability">${cardAbilityText(card)}</div>
      </div>
    </div>`;
}

function showCardZoom(card) {
  const root = document.getElementById('zoom-root');
  root.innerHTML = `<div class="modal-overlay" id="zoom-overlay">${cardZoomHtml(card, { closable: true })}</div>`;
  document.getElementById('zoom-overlay').addEventListener('click', hideCardZoom);
  root.querySelector('.card-zoom').addEventListener('click', (e) => e.stopPropagation());
  root.querySelector('.card-zoom-close').addEventListener('click', hideCardZoom);
}

function hideCardZoom() {
  document.getElementById('zoom-root').innerHTML = '';
}

// ---------------------------------------------------------------- hover preview

// Lightweight, non-modal card peek: shown next to the hovered card (deck
// builder pool, hand) so its full illustration/text is readable without a
// click — distinct from showCardZoom (click/long-press, needs dismissing).
function showHoverPreview(card, anchorEl) {
  const el = document.getElementById('hover-preview');
  el.innerHTML = cardZoomHtml(card, { closable: false });
  el.classList.remove('hidden');

  const rect = anchorEl.getBoundingClientRect();
  const panelWidth = el.offsetWidth || 320;
  const panelHeight = el.offsetHeight || 420;
  const margin = 14;

  let left = rect.right + margin;
  if (left + panelWidth > window.innerWidth - margin) left = rect.left - margin - panelWidth;
  if (left < margin) left = Math.min(Math.max(rect.left, margin), window.innerWidth - panelWidth - margin);

  let top = rect.top;
  if (top + panelHeight > window.innerHeight - margin) top = window.innerHeight - panelHeight - margin;
  if (top < margin) top = margin;

  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
}

function hideHoverPreview() {
  document.getElementById('hover-preview').classList.add('hidden');
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

// ---------------------------------------------------------------- autosave

const SAVED_GAME_KEY = 'rhcard_active_game';

function setReplacer(key, value) { return value instanceof Set ? { __set: Array.from(value) } : value; }
function setReviver(key, value) { return (value && typeof value === 'object' && Array.isArray(value.__set)) ? new Set(value.__set) : value; }

function saveGameState() {
  // Skip mid-effect-resolution states: pendingJob/pendingChoice can share the
  // same object by reference, which JSON round-tripping would silently split
  // into two independent copies and desync on reload.
  if (!gameState || gameState.pendingJob || gameState.pendingChoice) return;
  try { localStorage.setItem(SAVED_GAME_KEY, JSON.stringify(gameState, setReplacer)); } catch (e) { /* storage unavailable */ }
}

function loadSavedGameState() {
  try {
    const raw = localStorage.getItem(SAVED_GAME_KEY);
    return raw ? JSON.parse(raw, setReviver) : null;
  } catch (e) {
    return null;
  }
}

function clearSavedGameState() {
  try { localStorage.removeItem(SAVED_GAME_KEY); } catch (e) { /* storage unavailable */ }
}

let lastSeenTiers = null; // per-seat: { player: {domain: tier}, ai: {domain: tier} }

function resetFxState() {
  lastSeenTiers = { player: {}, ai: {} };
  for (const d of SYNERGY_DOMAINS) { lastSeenTiers.player[d] = 0; lastSeenTiers.ai[d] = 0; }
}

function initBoardUI() {
  document.getElementById('player-hand').addEventListener('click', (e) => {
    const el = e.target.closest('.hand-card');
    if (el) onHandCardClick(el.dataset.uid);
  });
  document.getElementById('player-hand').addEventListener('mouseover', (e) => {
    const el = e.target.closest('.hand-card');
    if (!el) return;
    const card = resolveCardFromElement(el);
    if (card) showHoverPreview(card, el);
  });
  document.getElementById('player-hand').addEventListener('mouseout', (e) => {
    if (e.target.closest('.hand-card')) hideHoverPreview();
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
  document.getElementById('hero-power-btn').addEventListener('click', onHeroPowerClick);
  document.getElementById('btn-back-to-builder').addEventListener('click', () => {
    if (gameState && !gameState.winner) {
      if (!confirm('Abandonner la partie en cours et retourner au deck builder ?')) return;
      clearSavedGameState();
    }
    SFX.play('click');
    showScreen('deckbuilder');
  });
  document.getElementById('btn-options-game').addEventListener('click', showOptionsModal);
  document.getElementById('btn-theme-toggle-game').addEventListener('click', toggleThemeQuick);
  document.getElementById('btn-toggle-side-panel').addEventListener('click', () => {
    SFX.play('click');
    document.querySelector('.side-panel').classList.toggle('open');
  });
  document.getElementById('btn-skip-ai').addEventListener('click', handleSkipAiTurn);
  attachHolographicTilt('#player-hand', '.hand-card');
  initAttackPreview();
}

// ---------------------------------------------------------------- attack preview

function initAttackPreview() {
  const aiBoard = document.getElementById('ai-board');
  const aiHero = document.getElementById('ai-hero-target');
  aiBoard.addEventListener('mouseover', (e) => {
    const el = e.target.closest('.mini-card.targetable');
    if (el) showAttackPreview('card', el.dataset.uid, el);
  });
  aiBoard.addEventListener('mouseout', (e) => {
    if (e.target.closest('.mini-card.targetable')) hideAttackPreview();
  });
  aiHero.addEventListener('mouseover', () => {
    if (aiHero.classList.contains('attackable')) showAttackPreview('hero', null, aiHero);
  });
  aiHero.addEventListener('mouseout', hideAttackPreview);
}

function showAttackPreview(targetType, targetUid, anchorEl) {
  if (!selectedAttackerUid || !gameState) return;
  const preview = computeAttackPreview(gameState, humanSeat(), selectedAttackerUid, targetType, targetUid);
  if (!preview) return;
  const el = document.getElementById('atk-preview');
  const rect = anchorEl.getBoundingClientRect();
  el.style.left = `${rect.left + rect.width / 2}px`;
  el.style.top = `${rect.top - 8}px`;
  let html = `<div class="atk-preview-row atk-preview-dmg">⚔ ${preview.dmgToDefender} dégâts${preview.lethalDefender ? ' — LÉTAL' : ''}</div>`;
  if (preview.targetType === 'card') {
    html += `<div class="atk-preview-row atk-preview-return">↩ ${preview.dmgToAttacker} reçus${preview.lethalAttacker ? ' — votre carte meurt' : ''}</div>`;
  }
  el.innerHTML = html;
  el.classList.remove('hidden');
}

function hideAttackPreview() {
  document.getElementById('atk-preview').classList.add('hidden');
}

// ---------------------------------------------------------------- theme

const THEME_KEY = 'rhcard_theme';
let currentTheme = localStorage.getItem(THEME_KEY) || 'system';

function applyTheme(theme) {
  currentTheme = theme;
  if (theme === 'system') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeToggleIcons();
}

function effectiveThemeIsLight() {
  if (currentTheme === 'light') return true;
  if (currentTheme === 'dark') return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
}

function updateThemeToggleIcons() {
  const icon = effectiveThemeIsLight() ? '☀️' : '🌙';
  document.querySelectorAll('.theme-toggle-btn').forEach(b => { b.textContent = icon; });
}

function toggleThemeQuick() {
  SFX.play('click');
  applyTheme(effectiveThemeIsLight() ? 'dark' : 'light');
}

// ---------------------------------------------------------------- arena backdrop

const ARENA_KEY = 'rhcard_arena';
const ARENAS = [
  ['aurora', 'Aurore (teal)'],
  ['storm', 'Orage (violet)'],
  ['ember', 'Forge (ambre)'],
  ['grove', 'Bosquet (vert)'],
];
let currentArena = localStorage.getItem(ARENA_KEY) || 'aurora';
if (!ARENAS.some(([key]) => key === currentArena)) currentArena = 'aurora';

function applyArena(arena) {
  currentArena = ARENAS.some(([key]) => key === arena) ? arena : 'aurora';
  document.body.setAttribute('data-arena', currentArena);
  localStorage.setItem(ARENA_KEY, currentArena);
}

// Injects a fixed set of drifting glow motes once — pure CSS animation from
// then on (see @keyframes moteFloat), so this never re-runs per render.
function initArenaMotes() {
  const root = document.getElementById('arena-motes');
  if (!root) return;
  const COUNT = 20;
  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'mote';
    const size = 3 + Math.random() * 7;
    const duration = 16 + Math.random() * 18;
    el.style.left = `${Math.random() * 100}%`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.setProperty('--mote-o', (0.25 + Math.random() * 0.35).toFixed(2));
    el.style.setProperty('--drift', `${(Math.random() * 80 - 40).toFixed(0)}px`);
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `-${(Math.random() * duration).toFixed(1)}s`;
    root.appendChild(el);
  }
}

// ---------------------------------------------------------------- options modal

function showOptionsModal() {
  SFX.play('click');
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-overlay" id="options-overlay">
      <div class="modal-box" style="max-width:380px;">
        <h2>Options</h2>
        <div class="options-row">
          <span>Son</span>
          <button id="opt-mute-toggle" class="icon-btn">${SFX.isMuted() ? '🔇 Coupé' : '🔊 Activé'}</button>
        </div>
        <div class="options-row">
          <span>Vitesse des animations</span>
          <select id="opt-anim-speed">
            <option value="instant">Instantané</option>
            <option value="normal">Normal</option>
            <option value="cinematic">Cinématique</option>
          </select>
        </div>
        <div class="options-row">
          <span>Thème</span>
          <select id="opt-theme">
            <option value="system">Système</option>
            <option value="dark">Sombre</option>
            <option value="light">Clair</option>
          </select>
        </div>
        <div class="options-row">
          <span>Arène de jeu</span>
          <select id="opt-arena">
            ${ARENAS.map(([key, label]) => `<option value="${key}">${label}</option>`).join('')}
          </select>
        </div>
        <div class="modal-actions"><button id="opt-close" class="primary">Fermer</button></div>
      </div>
    </div>`;
  document.getElementById('opt-anim-speed').value = animSpeed;
  document.getElementById('opt-theme').value = currentTheme;
  document.getElementById('opt-arena').value = currentArena;

  document.getElementById('opt-mute-toggle').addEventListener('click', (e) => {
    const muted = SFX.toggleMute();
    e.currentTarget.textContent = muted ? '🔇 Coupé' : '🔊 Activé';
    if (!muted) SFX.play('click');
  });
  document.getElementById('opt-anim-speed').addEventListener('change', (e) => setAnimSpeed(e.target.value));
  document.getElementById('opt-theme').addEventListener('change', (e) => applyTheme(e.target.value));
  document.getElementById('opt-arena').addEventListener('change', (e) => applyArena(e.target.value));
  document.getElementById('options-overlay').addEventListener('click', (e) => { if (e.target.id === 'options-overlay') root.innerHTML = ''; });
  document.getElementById('opt-close').addEventListener('click', () => { root.innerHTML = ''; });
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

function heroRect(seatId) {
  return document.getElementById(`${domPrefixFor(seatId)}-hero-target`).getBoundingClientRect();
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

function checkSynergyToasts(seatId, board) {
  if (!lastSeenTiers) resetFxState();
  const tiers = getSynergyTiers(board);
  const seen = lastSeenTiers[seatId];
  for (const d of SYNERGY_DOMAINS) {
    if (tiers[d] > seen[d]) {
      showSynergyToast(d, tiers[d]);
      SFX.play('synergy');
    }
    seen[d] = tiers[d];
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
  return gameState && !gameState.winner && !inputLocked && !gameState.pendingChoice &&
    gameState.activePlayer === humanSeat();
}

function onHandCardClick(uid) {
  if (!canPlayerAct()) return;
  const seat = humanSeat();
  const card = gameState.players[seat].hand.find(c => c.uid === uid);
  const isLegendary = card && card.cardId === 'peoplespheres';
  const before = captureSnapshot(gameState);
  const beforeRects = captureRects();
  const res = playCard(gameState, seat, uid);
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

function onHeroPowerClick() {
  if (!canPlayerAct()) return;
  const seat = humanSeat();
  const before = captureSnapshot(gameState);
  const beforeRects = captureRects();
  const res = useHeroPower(gameState, seat);
  selectedAttackerUid = null;
  if (!res.ok) {
    SFX.play('error');
    flashError(res.error);
    return;
  }
  SFX.play('synergy');
  renderGame();
  animateDiff(before, captureSnapshot(gameState), beforeRects);
  if (gameState.winner) showGameOver();
}

function onPlayerBoardCardClick(uid) {
  if (!canPlayerAct()) return;
  const seat = humanSeat();
  const card = gameState.players[seat].board.find(c => c.uid === uid);
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
  const seat = humanSeat();
  const oppSeat = otherSeat();
  const attackerUid = selectedAttackerUid;
  const beforeRects = captureRects();
  const before = captureSnapshot(gameState);
  const res = attack(gameState, seat, attackerUid, targetType, targetUid);
  selectedAttackerUid = null;
  if (!res.ok) {
    SFX.play('error');
    flashError(res.error);
    renderGame();
    return;
  }
  SFX.play('attack');
  const fromRect = beforeRects[attackerUid];
  const toRect = targetType === 'hero' ? heroRect(oppSeat) : beforeRects[targetUid];
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

function showPassDevice(label, onContinue) {
  document.getElementById('pass-device-text').textContent = `Passez l'appareil à ${label}`;
  document.getElementById('pass-device-overlay').classList.remove('hidden');
  const btn = document.getElementById('pass-device-btn');
  const handler = () => {
    SFX.play('click');
    document.getElementById('pass-device-overlay').classList.add('hidden');
    btn.removeEventListener('click', handler);
    onContinue();
  };
  btn.addEventListener('click', handler);
}

function seatLabel(seatId) {
  if (gameState.mode === 'local2p') return seatId === 'player' ? 'Joueur 1' : 'Joueur 2';
  if (seatId === 'ai' && gameState.campaignStageIndex != null) return CAMPAIGN_STAGES[gameState.campaignStageIndex].name;
  return seatId === 'player' ? 'Vous' : "L'IA";
}

async function handleEndTurn() {
  if (!canPlayerAct()) return;
  inputLocked = true;
  selectedAttackerUid = null;
  const finishedSeat = humanSeat();
  endTurn(gameState, finishedSeat);

  if (gameState.mode === 'local2p') {
    if (gameState.winner) { renderGame(); showGameOver(); inputLocked = false; return; }
    const nextLabel = seatLabel(gameState.activePlayer);
    showPassDevice(nextLabel, () => {
      inputLocked = false;
      renderGame();
      showBanner(`TOUR DE ${nextLabel.toUpperCase()}`);
      SFX.play('turnStart');
    });
    return;
  }

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

function handleSkipAiTurn() {
  skipRequested = true;
  SFX.play('click');
}

async function runAiTurnAnimated() {
  skipRequested = false;
  const skipBtn = document.getElementById('btn-skip-ai');
  skipBtn.classList.remove('hidden');
  try {
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
      } else if (step.type === 'power') {
        SFX.play('synergy');
        renderGame();
        animateDiff(before, captureSnapshot(gameState), beforeRects);
      } else if (step.type === 'attack') {
        SFX.play('attack');
        if (skipRequested) {
          renderGame();
          animateDiff(before, captureSnapshot(gameState), beforeRects);
        } else {
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
      }
      await sleep(500);
      if (gameState.winner) { showGameOver(); return; }
    }
    renderGame();
  } finally {
    skipBtn.classList.add('hidden');
  }
}

function resolveChoiceFromUI(selection) {
  SFX.play('click');
  resolvePendingChoice(gameState, selection);
  renderGame();
  if (gameState.winner) showGameOver();
}

// ---------------------------------------------------------------- rendering

function renderGame() {
  hideHoverPreview();
  if (!gameState) return;
  hideAttackPreview();
  const bottomSeat = humanSeat();
  const topSeat = otherSeat();
  const bottom = gameState.players[bottomSeat];
  const top = gameState.players[topSeat];

  const turnText = gameState.mode === 'local2p'
    ? `tour de ${seatLabel(gameState.activePlayer)}`
    : (gameState.activePlayer === 'player' ? 'votre tour' : "tour de l'IA");
  document.getElementById('turn-indicator').textContent = `Tour ${gameState.turnNumber} — ${turnText}`;

  const phHp = document.getElementById('player-hp');
  phHp.textContent = `${bottom.heroHp} / ${bottom.heroMaxHp} PV${bottom.catchUpActive ? ' 🆘' : ''}`;
  phHp.classList.toggle('low', bottom.heroHp <= 10);
  phHp.title = bottom.catchUpActive ? 'Soutien de crise actif : +1 mana ce tour (HP critique).' : '';
  const aiHp = document.getElementById('ai-hp');
  aiHp.textContent = `${top.heroHp} / ${top.heroMaxHp} PV${top.catchUpActive ? ' 🆘' : ''}`;
  aiHp.classList.toggle('low', top.heroHp <= 10);
  aiHp.title = top.catchUpActive ? 'Soutien de crise actif : +1 mana ce tour (HP critique).' : '';

  document.getElementById('player-mana').textContent = `${bottom.mana} / ${bottom.maxMana} mana`;
  document.getElementById('ai-mana').textContent = `${top.mana} / ${top.maxMana} mana`;
  document.getElementById('player-deck-count').textContent = bottom.deck.length;
  document.getElementById('ai-deck-count').textContent = top.deck.length;
  document.getElementById('ai-hand-count').textContent = top.hand.length;
  document.getElementById('ai-hero-name').textContent = seatLabel(topSeat);
  document.getElementById('player-hero-name').textContent = gameState.mode === 'local2p' ? seatLabel(bottomSeat) : 'Vous (PeopleSpheres)';

  const provocateurs = selectedAttackerUid ? getProvocationCards(gameState, topSeat) : [];
  const canTargetHero = selectedAttackerUid && provocateurs.length === 0;
  const aiHeroTarget = document.getElementById('ai-hero-target');
  aiHeroTarget.classList.toggle('attackable', !!canTargetHero);

  document.getElementById('ai-board').innerHTML = top.board.map(c => miniCardHtml(gameState, topSeat, c, {
    targetable: !!selectedAttackerUid && (provocateurs.length === 0 || provocateurs.some(p => p.uid === c.uid)),
  })).join('') || '<div style="color:var(--text-dim); font-size:12px;">Plateau vide</div>';

  document.getElementById('player-board').innerHTML = bottom.board.map(c => miniCardHtml(gameState, bottomSeat, c, {
    selectable: !c.summoningSick && !c.hasAttackedThisTurn && gameState.activePlayer === bottomSeat,
    selected: c.uid === selectedAttackerUid,
    sick: c.summoningSick,
  })).join('') || '<div style="color:var(--text-dim); font-size:12px;">Plateau vide</div>';

  document.getElementById('player-hand').innerHTML = bottom.hand.map(c => handCardHtml(gameState, c, bottomSeat)).join('');

  document.getElementById('end-turn-btn').disabled = !canPlayerAct();
  document.getElementById('end-turn-btn').classList.toggle('your-turn', canPlayerAct());

  const power = HERO_POWERS[bottom.heroPowerDomain];
  const powerBtn = document.getElementById('hero-power-btn');
  if (power) {
    const usable = canPlayerAct() && !bottom.heroPowerUsedThisTurn && power.cost <= bottom.mana;
    powerBtn.classList.remove('hidden');
    powerBtn.disabled = !usable;
    powerBtn.classList.toggle('used', bottom.heroPowerUsedThisTurn);
    powerBtn.innerHTML = `⚡<span class="hp-cost">${power.cost}</span>`;
    powerBtn.title = `${power.label} (${power.cost} mana)\n${power.desc}`;
  } else {
    powerBtn.classList.add('hidden');
  }

  renderSynergyPanel(bottom.board);
  checkSynergyToasts(bottomSeat, bottom.board);
  renderLog();
  renderModals();
  saveGameState();
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
      <div class="card-art">${cardArtMarkup(card)}</div>
      <div class="card-art-scrim"></div>
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

function handCardHtml(state, card, seatId) {
  const owner = state.players[seatId];
  const cost = computeCost(state, seatId, card, { consume: false });
  const isAction = card.cardType === 'ACTION';
  const affordable = cost <= owner.mana && (isAction || owner.board.length < MAX_BOARD);
  const color = DOMAIN_COLORS[card.domain] || '#666';
  return `
    <div class="hand-card card-face ${rarityClass(card.rarity)} ${affordable ? '' : 'unaffordable'}" data-uid="${card.uid}" style="--dcolor:${color}" title="${escapeAttr(cardAbilityText(card))}">
      <div class="card-art">${cardArtMarkup(card)}</div>
      <div class="card-art-scrim"></div>
      <div class="cf-top">
        <span class="cf-name"><span class="domain-icon">${DOMAIN_ICONS[card.domain] || ''}</span>${card.name}</span>
        <span class="cf-cost">${cost}</span>
      </div>
      <div class="cf-bottom">
        <div class="cf-meta">${DOMAIN_LABELS[card.domain]} · ${rarityLabel(card.rarity)}${isAction ? ' · ⚡' : ''}${card.pointFaible ? ' · <span class="cf-pf">PF</span>' : ''}</div>
        ${isAction ? '' : `
        <div class="cf-stats">
          <span class="mc-atk">${card.currentAtk}</span>
          <span class="mc-def">${card.currentDef}</span>
          <span class="mc-hp">${card.currentHp}</span>
        </div>`}
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
  const isAction = card.cardType === 'ACTION';
  return `<div class="mini-card ${rarityClass(card.rarity)}" data-choice-uid="${card.uid}" style="--dcolor:${color}" title="${escapeAttr(cardAbilityText(card))}">
    <div class="card-art">${cardArtMarkup(card)}</div>
    <div class="card-art-scrim"></div>
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
  const swapUids = ai.hand.filter(c => c.baseCost >= 4).map(c => c.uid);
  if (swapUids.length) mulligan(gameState, 'ai', swapUids);
}

function startMulliganPhase() {
  if (gameState.mode === 'local2p') {
    showMulliganModalForSeat('player', 'Joueur 1', () => {
      showPassDevice('Joueur 2', () => {
        showMulliganModalForSeat('ai', 'Joueur 2', () => {
          const firstLabel = seatLabel(gameState.activePlayer);
          showPassDevice(firstLabel, () => {
            renderGame();
            showBanner(`TOUR DE ${firstLabel.toUpperCase()}`);
            SFX.play('turnStart');
          });
        });
      });
    });
  } else {
    aiAutoMulligan();
    showMulliganModalForSeat('player', null, () => {
      renderGame();
      showBanner('VOTRE TOUR');
      SFX.play('turnStart');
    });
  }
}

function showMulliganModalForSeat(seatId, label, onDone) {
  mulliganSelected = new Set();
  const root = document.getElementById('modal-root');
  const hand = gameState.players[seatId].hand;
  const title = label ? `Mulligan — ${label}` : 'Mulligan — gardez ou changez votre main de départ';
  root.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-box" style="max-width:640px;">
        <h2>${title}</h2>
        ${label ? `<p style="color:var(--danger); font-size:12px; font-weight:700;">Seul·e ${label} doit regarder l'écran maintenant.</p>` : ''}
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
      mulligan(gameState, seatId, Array.from(mulliganSelected));
      SFX.play('draw');
    }
    document.getElementById('modal-root').innerHTML = '';
    onDone();
  });
}

function computeMvp(playerId) {
  const s = gameState.stats[playerId];
  const mvpEntry = Object.entries(s.damageByCard).sort((a, b) => b[1] - a[1])[0];
  if (!mvpEntry) return null;
  const card = CARDS_BY_ID[mvpEntry[0]];
  return { id: mvpEntry[0], name: card ? card.name : mvpEntry[0], damage: mvpEntry[1] };
}

function computeBestDomain(playerId) {
  const s = gameState.stats[playerId];
  const domain = SYNERGY_DOMAINS.reduce((best, d) => (s.peakSynergyTier[d] || 0) > (s.peakSynergyTier[best] || 0) ? d : best, SYNERGY_DOMAINS[0]);
  return { domain, tier: s.peakSynergyTier[domain] || 0 };
}

function statsSummaryHtml(playerId) {
  const s = gameState.stats[playerId];
  const mvp = computeMvp(playerId);
  const best = computeBestDomain(playerId);
  return `
    <div style="flex:1; text-align:left; background:var(--bg-panel-2); border-radius:8px; padding:10px 14px; font-size:12.5px; line-height:1.7;">
      <div style="font-weight:700; margin-bottom:4px;">${seatLabel(playerId)}</div>
      <div>Dégâts infligés : <b>${s.damageDealt}</b></div>
      <div>Dégâts subis : <b>${s.damageTaken}</b></div>
      <div>Soins prodigués : <b>${s.healingDone}</b></div>
      <div>Cartes jouées : <b>${s.cardsPlayed}</b></div>
      <div>Meilleure synergie : <b>${best.tier > 0 ? `${DOMAIN_LABELS[best.domain]} palier ${best.tier}` : '—'}</b></div>
      <div>Carte MVP : <b>${mvp ? mvp.name : '—'}</b>${mvp ? ` (${mvp.damage} dégâts)` : ''}</div>
    </div>`;
}

function campaignResultHtml(result) {
  if (!result) return '';
  if (result.campaignComplete) {
    return '<p style="color:var(--accent-2); font-weight:700;">🏆 Campagne terminée ! Vous avez repris tout le marché SIRH.</p>';
  }
  if (result.rewardBoosters > 0) {
    const unlockNote = result.newlyUnlocked ? ' Étape suivante débloquée !' : '';
    return `<p style="color:var(--accent-2); font-weight:700;">🎖 Étape remportée — +${result.rewardBoosters} booster${result.rewardBoosters > 1 ? 's' : ''} de campagne.${unlockNote}</p>`;
  }
  return '';
}

function showGameOver() {
  clearSavedGameState();
  const root = document.getElementById('modal-root');
  const local = gameState.mode === 'local2p';
  const draw = gameState.winner === 'draw';
  const playerWonVsAi = !local && gameState.winner === 'player';
  const winnerName = draw ? null : seatLabel(gameState.winner);

  SFX.play(draw ? 'turnStart' : (local || playerWonVsAi) ? 'win' : 'lose');
  if (!draw) { spawnConfetti(90); addBoosters(1); }
  else if (!local) shakeScreen(10, 400);

  const resultKey = draw ? 'draw' : (playerWonVsAi ? 'win' : 'loss');
  const newAchievements = recordGameResult({ mode: gameState.mode, result: resultKey });

  const isCampaign = gameState.campaignStageIndex != null;
  const campaignResult = isCampaign ? recordCampaignResult(gameState.campaignStageIndex, playerWonVsAi) : null;

  const title = draw ? 'Égalité' : local ? `${winnerName} remporte le duel !` : (playerWonVsAi ? 'Victoire !' : 'Défaite');
  const subtitle = draw ? 'Les deux héros tombent ensemble.'
    : local ? 'Belle partie !'
    : (playerWonVsAi ? 'PeopleSpheres a synchronisé tout le marché SIRH.' : "L'IA a pris le dessus cette fois.");
  const titleClass = draw ? 'draw' : (local || playerWonVsAi) ? 'win' : 'lose';
  const cardResult = titleClass === 'lose' ? 'loss' : titleClass;

  // Headline whichever seat actually won (for local2p) — 'player' otherwise.
  const heroSeat = (!draw && local) ? gameState.winner : 'player';
  const mvp = computeMvp(heroSeat);
  const mvpCard = mvp ? CARDS_BY_ID[mvp.id] : null;
  const heroStats = gameState.stats[heroSeat];
  const shareChips = [
    { label: 'DÉGÂTS INFLIGÉS', value: String(heroStats.damageDealt) },
    { label: 'CARTES JOUÉES', value: String(heroStats.cardsPlayed) },
    { label: 'TOUR FINAL', value: String(gameState.turnNumber) },
  ];

  root.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-box gameover-box" data-result="${cardResult}" style="max-width:560px;">
        <h1 class="${titleClass}">${title}</h1>
        <p style="color:var(--text-dim);">${subtitle}</p>
        ${!draw ? '<p style="color:var(--accent-2); font-weight:700;">🎁 +1 booster gagné !</p>' : ''}
        ${campaignResultHtml(campaignResult)}
        ${mvpCard ? `
        <div class="go-mvp" style="--dcolor:${DOMAIN_COLORS[mvpCard.domain] || '#666'}">
          <div class="go-mvp-art">${cardArtMarkup(mvpCard)}</div>
          <div class="go-mvp-label">Carte MVP</div>
          <div class="go-mvp-name">${mvpCard.name} <span style="color:var(--text-dim); font-weight:600; font-size:13px;">(${mvp.damage} dégâts)</span></div>
        </div>` : ''}
        <div class="go-chips">
          ${shareChips.map(c => `<div class="go-chip"><div class="go-chip-value">${c.value}</div><div class="go-chip-label">${c.label}</div></div>`).join('')}
        </div>
        ${newAchievements.length ? `<div class="go-achievement">🏆 ${newAchievements[0].label}${newAchievements.length > 1 ? ` (+${newAchievements.length - 1} autre${newAchievements.length > 2 ? 's' : ''})` : ''}</div>` : ''}
        <div style="display:flex; gap:10px; margin:14px 0;">
          ${statsSummaryHtml('player')}
          ${statsSummaryHtml('ai')}
        </div>
        <div class="modal-actions" style="justify-content:center; flex-wrap:wrap;">
          <button id="gameover-share">📸 Télécharger l'image</button>
          ${isCampaign && campaignResult.newlyUnlocked ? '<button id="gameover-next-stage" class="primary">Étape suivante →</button>' : ''}
          <button id="gameover-rematch" ${isCampaign && campaignResult.newlyUnlocked ? '' : 'class="primary"'}>${isCampaign ? 'Rejouer cette étape' : 'Nouvelle partie (mêmes decks)'}</button>
          <button id="gameover-builder">Deck builder</button>
        </div>
      </div>
    </div>`;
  document.getElementById('gameover-rematch').addEventListener('click', () => {
    if (isCampaign && lastPlayerDeckList) startCampaignGame(lastPlayerDeckList, gameState.campaignStageIndex);
    else if (local && lastLocalDecks) startLocalGame(lastLocalDecks[0], lastLocalDecks[1]);
    else if (lastPlayerDeckList) startNewGame(lastPlayerDeckList);
  });
  const nextStageBtn = document.getElementById('gameover-next-stage');
  if (nextStageBtn) {
    nextStageBtn.addEventListener('click', () => {
      if (lastPlayerDeckList) startCampaignGame(lastPlayerDeckList, gameState.campaignStageIndex + 1);
    });
  }
  document.getElementById('gameover-builder').addEventListener('click', () => showScreen('deckbuilder'));
  document.getElementById('gameover-share').addEventListener('click', (e) => {
    SFX.play('click');
    downloadShareCard({
      result: cardResult,
      title,
      subtitle,
      mvpCardId: mvp ? mvp.id : null,
      chips: shareChips,
      achievementLabel: newAchievements.length ? newAchievements[0].label : null,
    }, e.currentTarget);
  });
}
