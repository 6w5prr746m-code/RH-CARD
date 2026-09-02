// Screen router + app bootstrap.

let lastPlayerDeckList = null;
let lastLocalDecks = null; // [p1DeckList, p2DeckList], for local 2p rematch

let appMode = 'vsAI'; // 'vsAI' | 'local2p' | 'campaign'
let localP1DeckList = null; // set once Player 1 confirms their deck in local2p flow
let selectedCampaignStageIndex = 0;

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(`screen-${name}`).classList.add('active');
  if (name === 'deckbuilder') {
    renderBoosterCount();
    renderPool();
    renderDeckPanel();
  }
}

function setAppMode(mode) {
  appMode = mode;
  localP1DeckList = null;
  builderState.counts = {};
  document.getElementById('mode-vsai').classList.toggle('active', mode === 'vsAI');
  document.getElementById('mode-local2p').classList.toggle('active', mode === 'local2p');
  document.getElementById('mode-campaign').classList.toggle('active', mode === 'campaign');
  document.getElementById('ai-difficulty-label').style.display = mode === 'vsAI' ? '' : 'none';
  document.getElementById('campaign-panel').classList.toggle('hidden', mode !== 'campaign');
  if (mode === 'campaign') {
    selectedCampaignStageIndex = getCampaignProgress().unlockedIndex;
    renderCampaignPanel();
  }
  renderPool();
  renderDeckPanel();
  updateDeckBuilderHeaderForMode();
}

function updateDeckBuilderHeaderForMode() {
  const sub = document.getElementById('deckbuilder-subtitle');
  const startBtn = document.getElementById('btn-start-game');
  if (appMode === 'vsAI') {
    sub.textContent = 'Sélectionnez 25 à 30 cartes parmi les 91 éditeurs du marché SIRH.';
    startBtn.textContent = 'Lancer la partie';
  } else if (appMode === 'campaign') {
    const stage = CAMPAIGN_STAGES[selectedCampaignStageIndex];
    sub.textContent = `Campagne — Étape ${selectedCampaignStageIndex + 1}/${CAMPAIGN_STAGES.length} : ${stage.name}. Construisez votre deck puis défiez-les.`;
    startBtn.textContent = `Défier ${stage.name}`;
  } else if (localP1DeckList === null) {
    sub.textContent = 'Duel local — construisez le deck du Joueur 1.';
    startBtn.textContent = 'Deck Joueur 1 prêt →';
  } else {
    sub.textContent = 'Duel local — construisez le deck du Joueur 2.';
    startBtn.textContent = 'Lancer le duel';
  }
}

function renderCampaignPanel() {
  const progress = getCampaignProgress();
  const panel = document.getElementById('campaign-panel');
  panel.innerHTML = CAMPAIGN_STAGES.map((stage, i) => {
    const locked = i > progress.unlockedIndex;
    const cleared = progress.cleared.includes(stage.id);
    const classes = ['campaign-stage'];
    if (stage.boss) classes.push('boss');
    if (locked) classes.push('locked');
    if (cleared) classes.push('cleared');
    if (i === selectedCampaignStageIndex) classes.push('selected');
    return `
      <button class="${classes.join(' ')}" data-stage-index="${i}" ${locked ? 'disabled' : ''}>
        <div class="cs-num">Étape ${i + 1}</div>
        <div class="cs-name">${locked ? '🔒 ???' : stage.name}</div>
        <div class="cs-desc">${locked ? 'Terminez l\'étape précédente pour débloquer.' : stage.desc}</div>
        ${locked ? '' : `<div class="cs-reward">🎁 +${stage.reward} booster${stage.reward > 1 ? 's' : ''}</div>`}
      </button>`;
  }).join('');
  panel.querySelectorAll('.campaign-stage:not(.locked)').forEach(el => {
    el.addEventListener('click', () => {
      SFX.play('tabSwitch');
      selectedCampaignStageIndex = parseInt(el.dataset.stageIndex, 10);
      renderCampaignPanel();
      updateDeckBuilderHeaderForMode();
    });
  });
}

function handleStartGameClick() {
  const list = deckListFromCounts();
  const errors = validateDeck(list);
  if (errors.length) { SFX.play('error'); alert(errors.join('\n')); return; }
  SFX.play('cardPlay');

  if (appMode === 'vsAI') {
    startNewGame(list);
    return;
  }

  if (appMode === 'campaign') {
    startCampaignGame(list, selectedCampaignStageIndex);
    return;
  }

  if (localP1DeckList === null) {
    localP1DeckList = list;
    builderState.counts = {};
    renderPool();
    renderDeckPanel();
    updateDeckBuilderHeaderForMode();
  } else {
    const p1 = localP1DeckList;
    localP1DeckList = null;
    startLocalGame(p1, list);
  }
}

function startNewGame(playerDeckList) {
  clearSavedGameState();
  lastPlayerDeckList = playerDeckList.slice();
  lastLocalDecks = null;
  setAiDifficulty(document.getElementById('ai-difficulty-select').value);
  localStorage.setItem('rhcard_ai_difficulty', AI_DIFFICULTY);
  const aiDeckList = buildAiDeck();
  gameState = createGameState(playerDeckList, aiDeckList);
  gameState.mode = 'vsAI';
  selectedAttackerUid = null;
  inputLocked = false;
  resetFxState();
  showScreen('game');
  renderGame();
  startMulliganPhase();
}

function startCampaignGame(playerDeckList, stageIndex) {
  clearSavedGameState();
  const stage = CAMPAIGN_STAGES[stageIndex];
  lastPlayerDeckList = playerDeckList.slice();
  lastLocalDecks = null;
  setAiDifficulty(stage.difficulty);
  const aiDeckList = buildCampaignDeck(stage);
  gameState = createGameState(playerDeckList, aiDeckList);
  gameState.mode = 'vsAI';
  gameState.campaignStageIndex = stageIndex;
  selectedAttackerUid = null;
  inputLocked = false;
  resetFxState();
  showScreen('game');
  renderGame();
  startMulliganPhase();
}

function startLocalGame(p1DeckList, p2DeckList) {
  clearSavedGameState();
  lastLocalDecks = [p1DeckList.slice(), p2DeckList.slice()];
  lastPlayerDeckList = null;
  gameState = createGameState(p1DeckList, p2DeckList);
  gameState.mode = 'local2p';
  selectedAttackerUid = null;
  inputLocked = false;
  resetFxState();
  showScreen('game');
  renderGame();
  startMulliganPhase();
}

function offerResumeIfAny() {
  const saved = loadSavedGameState();
  if (!saved || saved.winner) { if (saved && saved.winner) clearSavedGameState(); return; }
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-box" style="text-align:center;">
        <h2>Partie en cours détectée</h2>
        <p style="color:var(--text-dim);">Tour ${saved.turnNumber}${saved.mode === 'local2p' ? ' — Duel local' : ' — vs IA'}. Voulez-vous reprendre où vous en étiez ?</p>
        <div class="modal-actions" style="justify-content:center;">
          <button id="resume-game" class="primary">Reprendre la partie</button>
          <button id="discard-saved-game">Nouvelle partie</button>
        </div>
      </div>
    </div>`;
  document.getElementById('resume-game').addEventListener('click', () => {
    gameState = saved;
    selectedAttackerUid = null;
    inputLocked = false;
    resetFxState();
    document.getElementById('modal-root').innerHTML = '';
    showScreen('game');
    renderGame();
  });
  document.getElementById('discard-saved-game').addEventListener('click', () => {
    clearSavedGameState();
    document.getElementById('modal-root').innerHTML = '';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDeckBuilder();
  initBoardUI();
  initCardZoom();
  showScreen('deckbuilder');
  offerResumeIfAny();

  document.getElementById('mode-vsai').addEventListener('click', () => { SFX.play('tabSwitch'); setAppMode('vsAI'); });
  document.getElementById('mode-local2p').addEventListener('click', () => { SFX.play('tabSwitch'); setAppMode('local2p'); });
  document.getElementById('mode-campaign').addEventListener('click', () => { SFX.play('tabSwitch'); setAppMode('campaign'); });

  document.getElementById('btn-help-builder').addEventListener('click', () => showTutorialModal());
  document.getElementById('btn-help-game').addEventListener('click', () => showTutorialModal());

  applyTheme(currentTheme);
  applyArena(currentArena);
  initArenaMotes();
  offerTutorialIfFirstVisit();
  offerDailyBonusIfAny();

  const savedDifficulty = localStorage.getItem('rhcard_ai_difficulty');
  if (savedDifficulty) document.getElementById('ai-difficulty-select').value = savedDifficulty;

  document.addEventListener('click', function unlockAudioOnce() {
    SFX.unlock();
    MUSIC.start();
    document.removeEventListener('click', unlockAudioOnce);
  }, { once: true });
});
