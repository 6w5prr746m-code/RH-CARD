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
  showScreen('game');
  renderGame();
}

document.addEventListener('DOMContentLoaded', () => {
  initDeckBuilder();
  initBoardUI();
  showScreen('deckbuilder');
});
