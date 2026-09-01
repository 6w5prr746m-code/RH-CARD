// Screen router + app bootstrap.

let lastPlayerDeckList = null;
let lastLocalDecks = null; // [p1DeckList, p2DeckList], for local 2p rematch

let appMode = 'vsAI'; // 'vsAI' | 'local2p'
let localP1DeckList = null; // set once Player 1 confirms their deck in local2p flow

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
  document.getElementById('ai-difficulty-label').style.display = mode === 'vsAI' ? '' : 'none';
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
  } else if (localP1DeckList === null) {
    sub.textContent = 'Duel local — construisez le deck du Joueur 1.';
    startBtn.textContent = 'Deck Joueur 1 prêt →';
  } else {
    sub.textContent = 'Duel local — construisez le deck du Joueur 2.';
    startBtn.textContent = 'Lancer le duel';
  }
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

function startLocalGame(p1DeckList, p2DeckList) {
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

document.addEventListener('DOMContentLoaded', () => {
  initDeckBuilder();
  initBoardUI();
  showScreen('deckbuilder');

  document.getElementById('mode-vsai').addEventListener('click', () => { SFX.play('tabSwitch'); setAppMode('vsAI'); });
  document.getElementById('mode-local2p').addEventListener('click', () => { SFX.play('tabSwitch'); setAppMode('local2p'); });

  const muteLabel = SFX.isMuted() ? '🔇' : '🔊';
  document.querySelectorAll('#btn-mute-game, #btn-mute-builder').forEach(b => { b.textContent = muteLabel; });

  const savedDifficulty = localStorage.getItem('rhcard_ai_difficulty');
  if (savedDifficulty) document.getElementById('ai-difficulty-select').value = savedDifficulty;

  document.addEventListener('click', function unlockAudioOnce() {
    SFX.unlock();
    document.removeEventListener('click', unlockAudioOnce);
  }, { once: true });
});
