// In-game tutorial — modal-based rules explainer, reachable from a help button
// on both screens and auto-shown once on a player's very first visit.

const TUTORIAL_SEEN_KEY = 'rhcard_tutorial_seen';

let tutorialPageIndex = 0;

function domainChip(domain) {
  const color = DOMAIN_COLORS[domain] || '#666';
  const icon = DOMAIN_ICONS[domain] || '';
  return `<span class="tut-domain-chip" style="--dcolor:${color}">${icon} ${DOMAIN_LABELS[domain]}</span>`;
}

function tutorialPages() {
  return [
    {
      title: 'Bienvenue sur RH CARD',
      html: `
        <p>RH CARD est un jeu de cartes à collectionner où deux éditeurs SIRH s'affrontent sur le marché de la RH.</p>
        <p>Chaque joueur commence avec <b>30 PV</b>. Réduisez les PV du héros adverse à <b>0</b> pour gagner — en attaquant avec vos cartes déployées, directement sur son héros.</p>
        <p>Ce guide couvre le plateau, le combat, les synergies de domaines et la construction de deck. Vous pouvez le rouvrir à tout moment via le bouton <b>❓</b>.</p>`,
    },
    {
      title: 'Le plateau & le mana',
      html: `
        <p>À chaque tour, votre <b>mana</b> disponible augmente de 1 (jusqu'à 10) et se recharge entièrement — utilisez-le pour jouer des cartes de votre main.</p>
        <p>Une carte jouée sur le plateau devient une <b>créature</b> (ATK/DEF/PV) ; le plateau accueille au maximum <b>7 créatures</b> par joueur. Les <b>cartes Action</b> (⚡) sont à usage unique et n'occupent pas de place sur le plateau.</p>
        <p>Une créature qui vient d'être posée a le <i>mal d'invocation</i> : elle ne peut ni attaquer ni bloquer ce tour-ci.</p>
        <p>Si votre pioche est vide et que vous devez piocher, vous subissez des <b>dégâts de fatigue</b> croissants (1, puis 2, puis 3…) directement sur votre héros — gardez un œil sur la taille de votre deck en fin de partie.</p>`,
    },
    {
      title: 'Le combat',
      html: `
        <p>Chaque créature a une <b>ATK</b> (dégâts infligés), une <b>DEF</b> (réduit les dégâts reçus) et des <b>PV</b>. Une créature peut attaquer une créature adverse ou directement le héros adverse, une fois par tour.</p>
        <p>Les dégâts infligés = ATK de l'attaquant − DEF de la cible (minimum 1 dégât si l'ATK est positive).</p>
        <p><b>Provocation</b> 🛡 : si l'adversaire contrôle une créature avec Provocation, vous devez l'attaquer en priorité — les autres cibles sont protégées tant qu'elle est en vie.</p>
        <p><b>Point Faible</b> ⚠️ : certaines cartes ont une faiblesse spécifique face à <b>PeopleSpheres</b>, la carte légendaire transversale. Face à elle, une carte Point Faible perd 2 ATK, tandis que PeopleSpheres gagne 2 ATK dans cet affrontement.</p>`,
    },
    {
      title: 'Domaines & synergies',
      html: `
        <p>Chaque carte appartient à un <b>domaine</b> RH. Plus vous avez de créatures d'un même domaine sur le plateau, plus son bonus de synergie se renforce, par palier : <b>2, 4 puis 6 cartes</b> (les paliers sont cumulatifs).</p>
        <div class="tut-domain-list">
          <div>${domainChip(DOMAIN.PAIE_GA)}<span>Stabilité — soigne votre héros et réduit les dégâts subis.</span></div>
          <div>${domainChip(DOMAIN.GTA)}<span>Défense — bonus de DEF, puis octroie Provocation.</span></div>
          <div>${domainChip(DOMAIN.RECRUTEMENT)}<span>Tempo — réduit le coût de vos cartes, pioche supplémentaire.</span></div>
          <div>${domainChip(DOMAIN.FORMATION)}<span>Progression — vos créatures du domaine grandissent chaque tour.</span></div>
          <div>${domainChip(DOMAIN.TALENT_PERF)}<span>Puissance — bonus d'ATK croissant.</span></div>
          <div>${domainChip(DOMAIN.PILOTAGE_BI)}<span>Information — visibilité sur votre pioche, amélioration de tirage.</span></div>
        </div>
        <p><b>PeopleSpheres</b> est transversale : elle compte dans le décompte de <i>tous</i> les domaines à la fois.</p>
        <p>Le panneau latéral 📊 pendant la partie affiche vos paliers de synergie actifs en temps réel.</p>`,
    },
    {
      title: 'Construire son deck',
      html: `
        <p>Un deck contient entre <b>25 et 30 cartes</b>, choisies parmi les cartes que vous possédez. Une carte 1★/2★ peut être incluse en <b>2 exemplaires</b> maximum, une carte 3★ ou légendaire en <b>1 seul exemplaire</b>.</p>
        <p>Vous débutez avec une collection de base et des <b>boosters</b> 🎁 — ouvrez-les depuis l'écran de construction pour débloquer de nouvelles cartes aléatoires.</p>
        <p>Sauvegardez vos decks favoris (💾) pour les recharger (📂) plus tard, ou générez un deck aléatoire parmi vos cartes possédées en un clic.</p>
        <p>Astuce : viser 2-3 domaines dominants dans un même deck permet d'atteindre les paliers de synergie plus vite qu'en dispersant les cartes sur les 6 domaines.</p>`,
    },
    {
      title: 'En partie',
      html: `
        <p>En début de partie, chaque joueur peut faire un <b>mulligan</b> : renvoyer tout ou partie de sa main de départ pour la repiocher.</p>
        <p>Survolez une créature en position d'attaque pour prévisualiser les dégâts échangés avant de confirmer.</p>
        <p>Le menu ⚙️ Options permet de régler le son, la vitesse des animations et le thème clair/sombre (aussi accessible via le bouton 🌙/☀️ en un clic).</p>
        <p>Une partie en cours est sauvegardée automatiquement : vous pouvez fermer l'onglet et la reprendre plus tard depuis l'écran de construction de deck.</p>
        <p>Bonne chance, et que le meilleur SIRH gagne !</p>`,
    },
  ];
}

function showTutorialModal(opts) {
  const options = opts || {};
  SFX.play('click');
  tutorialPageIndex = 0;
  localStorage.setItem(TUTORIAL_SEEN_KEY, '1');
  renderTutorialModal(options);
}

function renderTutorialModal(options) {
  const pages = tutorialPages();
  const page = pages[tutorialPageIndex];
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-overlay" id="tutorial-overlay">
      <div class="modal-box tut-box">
        <h2>${page.title}</h2>
        <div class="tut-content">${page.html}</div>
        <div class="tut-dots">
          ${pages.map((_, i) => `<span class="tut-dot ${i === tutorialPageIndex ? 'active' : ''}"></span>`).join('')}
        </div>
        <div class="modal-actions">
          <button id="tut-prev" ${tutorialPageIndex === 0 ? 'disabled' : ''}>← Précédent</button>
          <div style="flex:1;"></div>
          <button id="tut-close">Fermer</button>
          ${tutorialPageIndex < pages.length - 1
            ? '<button id="tut-next" class="primary">Suivant →</button>'
            : '<button id="tut-done" class="primary">Terminé</button>'}
        </div>
      </div>
    </div>`;

  document.getElementById('tutorial-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'tutorial-overlay') root.innerHTML = '';
  });
  document.getElementById('tut-close').addEventListener('click', () => { root.innerHTML = ''; });
  const prevBtn = document.getElementById('tut-prev');
  if (prevBtn) prevBtn.addEventListener('click', () => { SFX.play('tabSwitch'); tutorialPageIndex--; renderTutorialModal(options); });
  const nextBtn = document.getElementById('tut-next');
  if (nextBtn) nextBtn.addEventListener('click', () => { SFX.play('tabSwitch'); tutorialPageIndex++; renderTutorialModal(options); });
  const doneBtn = document.getElementById('tut-done');
  if (doneBtn) doneBtn.addEventListener('click', () => { SFX.play('click'); root.innerHTML = ''; });
}

function offerTutorialIfFirstVisit() {
  if (localStorage.getItem(TUTORIAL_SEEN_KEY)) return;
  if (document.getElementById('modal-root').innerHTML.trim() !== '') return;
  showTutorialModal();
}
