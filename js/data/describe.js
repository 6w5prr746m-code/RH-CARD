// Generates human-readable French ability text directly from a card's structured
// effects, so the UI and the engine never fall out of sync with each other.

function keywordsArray(card) {
  if (!card.keywords) return [];
  return card.keywords instanceof Set ? Array.from(card.keywords) : card.keywords;
}

function buffStatsText(effect) {
  const parts = [];
  if (effect.atk) parts.push(`+${effect.atk} ATK`);
  if (effect.def) parts.push(`+${effect.def} DEF`);
  if (effect.hp) parts.push(`+${effect.hp} HP`);
  return parts.join(' / ') || 'Buff';
}

function describeEffect(effect, domainSelf) {
  switch (effect.type) {
    case 'heroHeal':
      return `Héros récupère ${effect.amount} PV${effect.target === 'enemy' ? ' (héros adverse)' : ''}.`;
    case 'draw':
      return `Piochez ${effect.amount} carte${effect.amount > 1 ? 's' : ''}.`;
    case 'tutorDomain':
      return `Récupère une carte ${DOMAIN_LABELS[effect.domain === 'self' ? domainSelf : effect.domain]} du deck.`;
    case 'buffTarget': {
      const stats = buffStatsText(effect);
      const targetText = effect.target === 'chosenAlly' ? 'une carte alliée ciblée'
        : effect.target === 'chosenAllyDomain' ? 'une carte alliée du même domaine'
        : 'la carte alliée du domaine avec le plus faible DEF';
      return `${stats} à ${targetText}.`;
    }
    case 'buffAllDomain': {
      const stats = buffStatsText(effect);
      const domain = DOMAIN_LABELS[effect.domain === 'self' ? domainSelf : effect.domain];
      return `${stats} à toutes vos cartes ${domain} en jeu${effect.duration === 'turn' ? ' (ce tour-ci)' : ' (permanent)'}.`;
    }
    case 'costReduction':
      return `Réduit de ${effect.amount} le coût de ${effect.count} carte(s) ${effect.domain === 'any' ? '' : DOMAIN_LABELS[effect.domain === 'self' ? domainSelf : effect.domain] + ' '}suivante(s) ce tour.`;
    case 'condDrawIfDomainCount':
      return `Piochez ${effect.amount} si vous contrôlez ${effect.min}+ cartes ${DOMAIN_LABELS[effect.domain === 'self' ? domainSelf : effect.domain]}.`;
    case 'condDrawIfHandSize':
      return `Piochez ${effect.amount} si votre main a ${effect.maxHandSize} cartes ou moins.`;
    case 'discard':
      return `Défaussez ${effect.amount} carte(s) au hasard.`;
    case 'peekTopDeck':
      return `Regardez ${effect.amount > 1 ? `les ${effect.amount} cartes du dessus` : 'la carte du dessus'} de votre pioche.`;
    case 'peekOpponentHand':
      return 'Regardez la main adverse.';
    case 'peekOpponentDeckTop':
      return 'Regardez le dessus de la pioche adverse.';
    case 'drawKeepBest':
      return `Piochez ${effect.amount}, gardez ${effect.keep} (le reste part au cimetière).`;
    case 'filterTopDeck':
      return 'Regardez le dessus de la pioche ; vous pouvez la défausser pour piocher la suivante.';
    case 'reorderTopN':
      return `Regardez les ${effect.amount} cartes du dessus, choisissez celle que vous piocherez en premier.`;
    case 'condSelfBuffIfDomainCount':
      return `${buffStatsText(effect)} à elle-même si vous contrôlez ${effect.min}+ cartes ${DOMAIN_LABELS[effect.domain]}.`;
    case 'peekTopBuffIfDomain':
      return `Regardez le dessus de la pioche ; +${effect.atk} ATK si c'est une carte ${DOMAIN_LABELS[effect.domain]}.`;
    case 'synchronizationUniversal':
      return 'Synchronisation Universelle : pour chaque domaine différent en jeu (max 6), +1/+1/+1, piochez 1 carte et soignez 1 PV.';
    default:
      return '';
  }
}

function cardAbilityText(card) {
  const parts = [];
  const kws = keywordsArray(card);
  if (kws.length) parts.push(kws.join(', ') + '.');
  if (card.aura) {
    const a = card.aura;
    if (a.type === 'heroDamageReduction') parts.push(`Aura : dégâts subis par votre héros réduits de ${a.amount}.`);
    else if (a.type === 'selfCombatDamageReduction') parts.push(`Aura : dégâts reçus par cette carte au combat réduits de ${a.amount}.`);
    else if (a.type === 'turnStartGrowth') {
      parts.push(`Aura : ${buffStatsText(a)} au début de votre tour.`);
      if (a.conditionalBonus) {
        parts.push(`(+${buffStatsText(a.conditionalBonus)} si ${a.conditionalBonus.minDomainCount}+ cartes ${DOMAIN_LABELS[a.conditionalBonus.domain]})`);
      }
    } else if (a.type === 'turnStartHeroHeal') parts.push(`Aura : héros récupère ${a.amount} PV au début de votre tour.`);
    else if (a.type === 'onDomainAllyDeath') {
      const domain = DOMAIN_LABELS[a.domain === 'self' ? card.domain : a.domain];
      parts.push(`Aura : héros récupère ${a.heal} PV à chaque mort d'une carte ${domain}.`);
    }
  }
  // Always described from the static template's own onPlay/onDeath — a live
  // game instance's onPlay may have a level ability merged in (see
  // makeCardInstance in engine.js) for execution purposes, but that's
  // described separately below so it reads as its own distinct line rather
  // than an unlabeled extra "Effet d'Entrée".
  const cardId = card.cardId || card.id;
  const tpl = CARDS_BY_ID[cardId] || card;
  for (const e of tpl.onPlay || []) parts.push(`Effet d'Entrée : ${describeEffect(e, card.domain)}`);
  for (const e of tpl.onDeath || []) parts.push(`Effet Final : ${describeEffect(e, card.domain)}`);
  if (cardId === 'peoplespheres') {
    parts.push(`Compte comme membre des ${SYNERGY_DOMAINS.length} domaines pour les synergies.`);
  }
  const levelAbility = cardLevelAbility(cardId, card.domain);
  if (levelAbility) {
    parts.push(`Capacité de Niveau (${levelLabel(LEVEL_ABILITY_UNLOCK)}+) : ${levelAbility.label} — ${levelAbility.desc}`);
  }
  if (parts.length === 0) return 'Carte vanille (aucune capacité spéciale).';
  return parts.join(' ');
}

function cardLevelText(card) {
  const cardId = card.cardId || card.id;
  const level = getCardLevel(cardId);
  return `Niveau ${level} — ${levelLabel(level)} (${levelProgressText(cardId)})`;
}

function rarityLabel(rarity) {
  if (rarity === 'L') return '∞';
  return '★'.repeat(rarity);
}

function cardFlavorText(card) {
  return CARD_FLAVOR[card.cardId || card.id] || '';
}
