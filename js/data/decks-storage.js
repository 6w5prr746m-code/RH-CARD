// Named deck slots, persisted to localStorage so a build doesn't have to be
// redone from scratch every session.

const SAVED_DECKS_KEY = 'rhcard_saved_decks';

function loadSavedDecks() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_DECKS_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function saveSavedDecks(decks) {
  try { localStorage.setItem(SAVED_DECKS_KEY, JSON.stringify(decks)); } catch (e) { /* storage unavailable */ }
}

function saveCurrentDeckAs(name, deckList) {
  const decks = loadSavedDecks();
  decks[name] = deckList.slice();
  saveSavedDecks(decks);
}

function loadDeckByName(name) {
  const decks = loadSavedDecks();
  return decks[name] || null;
}

function deleteSavedDeck(name) {
  const decks = loadSavedDecks();
  delete decks[name];
  saveSavedDecks(decks);
}
