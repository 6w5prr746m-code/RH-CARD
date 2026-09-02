// Campaign mode: a fixed sequence of themed AI opponents, unlocked one at a
// time by beating the previous stage. Each stage's deck is built from a
// fixed set of domains (instead of buildAiDeck's random pick) via
// buildCampaignDeck in ai.js, so the same stage always plays the same way.
// Progress lives in progression.js's campaign block (unlockedIndex + cleared
// ids) — first-clear of a stage grants its reward once; replays don't.

const CAMPAIGN_STAGES = [
  { id: 'cabinet-local', name: 'Cabinet RH Local', desc: 'Un petit cabinet de paie qui débute.',
    domains: [DOMAIN.PAIE_GA], difficulty: 'easy', reward: 1 },
  { id: 'agence-recrutement', name: "Agence de Recrutement", desc: 'Spécialistes du sourcing rapide.',
    domains: [DOMAIN.RECRUTEMENT], difficulty: 'easy', reward: 1 },
  { id: 'esn-terrain', name: 'ESN Terrain', desc: 'Planning et absences au cordeau.',
    domains: [DOMAIN.GTA, DOMAIN.PAIE_GA], difficulty: 'normal', reward: 1 },
  { id: 'organisme-formation', name: 'Organisme de Formation', desc: 'Une équipe qui monte en compétence à chaque tour.',
    domains: [DOMAIN.FORMATION], difficulty: 'normal', reward: 2 },
  { id: 'cabinet-talent', name: 'Cabinet Talent & Perf', desc: 'Primes de performance et effectifs choc.',
    domains: [DOMAIN.TALENT_PERF, DOMAIN.RECRUTEMENT], difficulty: 'normal', reward: 2 },
  { id: 'direction-pilotage', name: 'Direction Pilotage & BI', desc: 'Ils voient venir chacun de vos coups.',
    domains: [DOMAIN.PILOTAGE_BI, DOMAIN.GTA], difficulty: 'hard', reward: 2 },
  { id: 'groupe-multi-sirh', name: 'Groupe Multi-SIRH', desc: 'Trois domaines, aucune faiblesse.',
    domains: [DOMAIN.PAIE_GA, DOMAIN.FORMATION, DOMAIN.TALENT_PERF], difficulty: 'hard', reward: 3 },
  { id: 'consortium-mondial', name: 'Consortium Mondial SIRH', desc: 'Le rachat final. Tous les domaines, sans exception.',
    domains: [DOMAIN.PAIE_GA, DOMAIN.GTA, DOMAIN.RECRUTEMENT, DOMAIN.FORMATION, DOMAIN.TALENT_PERF, DOMAIN.PILOTAGE_BI],
    difficulty: 'hard', reward: 3, boss: true },
];
