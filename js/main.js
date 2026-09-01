// Screen router + app bootstrap.

let lastPlayerDeckList = null;

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(`screen-${name}`).classList.add('active');
}

function startNewGame(playerDeckList) {
  lastPlayerDeckList = playerDeckList.slice();
  const aiDeckList = buildAiDeck();
  gameState = createGameState(playerDeckList, aiDeckList);
  selectedAttackerUid = null;
  inputLocked = false;
  resetFxState();
  showScreen('game');
  renderGame();
  showBanner('VOTRE TOUR');
  SFX.play('turnStart');
}

document.addEventListener('DOMContentLoaded', () => {
  initDeckBuilder();
  initBoardUI();
  showScreen('deckbuilder');

  const muteLabel = SFX.isMuted() ? '🔇' : '🔊';
  document.querySelectorAll('#btn-mute-game, #btn-mute-builder').forEach(b => { b.textContent = muteLabel; });

  document.addEventListener('click', function unlockAudioOnce() {
    SFX.unlock();
    document.removeEventListener('click', unlockAudioOnce);
  }, { once: true });
});
