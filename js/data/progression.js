// Retention loops: daily login streak + achievements. Both are pure
// localStorage bookkeeping layered on top of collection.js (boosters are the
// shared reward currency) — no server, no accounts.

const PROGRESSION_KEY = 'rhcard_progression';

function defaultProgression() {
  return {
    stats: { gamesPlayed: 0, gamesWon: 0, gamesLost: 0, draws: 0, localGames: 0, boostersOpened: 0, currentWinStreak: 0, bestWinStreak: 0 },
    streak: { count: 0, lastClaimDate: null },
    unlocked: [], // achievement ids
  };
}

let progressionState = null;

function loadProgression() {
  if (progressionState) return progressionState;
  try {
    const raw = localStorage.getItem(PROGRESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      progressionState = Object.assign(defaultProgression(), parsed, {
        stats: Object.assign(defaultProgression().stats, parsed.stats),
        streak: Object.assign(defaultProgression().streak, parsed.streak),
      });
      return progressionState;
    }
  } catch (e) { /* corrupted storage — fall through to defaults */ }
  progressionState = defaultProgression();
  return progressionState;
}

function saveProgression() {
  if (!progressionState) return;
  try { localStorage.setItem(PROGRESSION_KEY, JSON.stringify(progressionState)); } catch (e) { /* storage unavailable */ }
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

// Call once per app load. Returns a result object describing what was
// granted if today's bonus wasn't claimed yet, or null if already claimed.
function claimDailyBonusIfDue() {
  const p = loadProgression();
  const today = todayKey();
  if (p.streak.lastClaimDate === today) return null;

  const gap = p.streak.lastClaimDate ? daysBetween(p.streak.lastClaimDate, today) : null;
  p.streak.count = (gap === 1) ? p.streak.count + 1 : 1; // consecutive day vs reset
  p.streak.lastClaimDate = today;

  const milestone = p.streak.count % 5 === 0;
  const boosters = milestone ? 2 : 1;
  addBoosters(boosters);
  saveProgression();
  return { streak: p.streak.count, boosters, milestone };
}

// ---------------------------------------------------------------- achievements

const ACHIEVEMENTS = [
  { id: 'first_win', label: 'Première victoire', desc: 'Remportez votre première partie.', boosters: 1, check: s => s.gamesWon >= 1 },
  { id: 'five_wins', label: 'Vétéran du marché', desc: 'Remportez 5 parties.', boosters: 1, check: s => s.gamesWon >= 5 },
  { id: 'twenty_wins', label: 'Légende du SIRH', desc: 'Remportez 20 parties.', boosters: 2, check: s => s.gamesWon >= 20 },
  { id: 'win_streak_3', label: 'Sur une lancée', desc: 'Enchaînez 3 victoires d\'affilée.', boosters: 1, check: s => s.bestWinStreak >= 3 },
  { id: 'local_duel', label: 'Duel entre amis', desc: 'Terminez une partie en duel local.', boosters: 1, check: s => s.localGames >= 1 },
  { id: 'ten_boosters', label: 'Collectionneur', desc: 'Ouvrez 10 boosters.', boosters: 1, check: s => s.boostersOpened >= 10 },
  { id: 'half_collection', label: 'Mi-collection', desc: 'Débloquez la moitié des cartes.', boosters: 2, check: () => ownedUniqueCardCount() >= Math.ceil(ALL_CARDS.length / 2) },
  { id: 'full_collection', label: 'Collection complète', desc: 'Débloquez les 97 cartes.', boosters: 3, check: () => ownedUniqueCardCount() >= ALL_CARDS.length },
  { id: 'week_streak', label: 'Habitué·e', desc: 'Connectez-vous 7 jours d\'affilée.', boosters: 2, check: (s, p) => p.streak.count >= 7 },
];

function ownedUniqueCardCount() {
  const state = loadCollection();
  return Object.values(state.owned).filter(n => n > 0).length;
}

// Re-checks every achievement against current stats/collection; unlocks and
// grants any newly-met ones. Returns the list of newly-unlocked entries.
function checkAchievements() {
  const p = loadProgression();
  const justUnlocked = [];
  for (const a of ACHIEVEMENTS) {
    if (p.unlocked.includes(a.id)) continue;
    if (a.check(p.stats, p)) {
      p.unlocked.push(a.id);
      addBoosters(a.boosters);
      justUnlocked.push(a);
    }
  }
  if (justUnlocked.length) saveProgression();
  return justUnlocked;
}

// Called once per finished game (see showGameOver) to update the counters
// every achievement above reads from.
function recordGameResult({ mode, result }) {
  const p = loadProgression();
  p.stats.gamesPlayed++;
  if (mode === 'local2p') {
    // Two humans share this device in local2p — there's no single "player"
    // to attribute a win/loss/streak to, so only the participation counters
    // move; win-streak tracking stays scoped to solo-vs-AI games.
    p.stats.localGames++;
    saveProgression();
    return checkAchievements();
  }
  if (result === 'win') {
    p.stats.gamesWon++;
    p.stats.currentWinStreak++;
    p.stats.bestWinStreak = Math.max(p.stats.bestWinStreak, p.stats.currentWinStreak);
  } else if (result === 'loss') {
    p.stats.gamesLost++;
    p.stats.currentWinStreak = 0;
  } else {
    p.stats.draws++;
    p.stats.currentWinStreak = 0;
  }
  saveProgression();
  return checkAchievements();
}

function recordBoosterOpened() {
  const p = loadProgression();
  p.stats.boostersOpened++;
  saveProgression();
  return checkAchievements();
}
