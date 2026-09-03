# RH CARD — Game Design Document (GDD)

**Working title :** RH CARD
**Genre :** TCG tour par tour (style Hearthstone), solo vs IA
**Techno cible :** HTML/JS pur
**Thème :** le marché SIRH (Système d'Information Ressources Humaines) — PeopleSpheres contre les éditeurs concurrents

**Statut :** document de conception à valider avant implémentation. Aucun code dans ce livrable.

---

## Sommaire

1. [Modèle de carte](#1-modèle-de-carte)
2. [Les 12 domaines et leur synergie](#2-les-12-domaines-et-leur-synergie)
3. [Coût en mana](#3-coût-en-mana)
4. [Mécanique "Point Faible"](#4-mécanique-point-faible)
5. [Deck-building](#5-deck-building)
6. [Règles générales](#6-règles-générales)
7. [Pool de cartes (204 + PeopleSpheres)](#7-pool-de-cartes-204--peoplespheres)
8. [Tableau récapitulatif complet](#8-tableau-récapitulatif-complet)

---

## 1. Modèle de carte

Chaque carte possède les attributs suivants :

| Attribut | Description |
|---|---|
| **Nom** | Nom de l'éditeur SIRH représenté |
| **Domaine** | 1 des 12 domaines (ou *Transversal* pour PeopleSpheres) |
| **Niveau / Rareté** | ★ (Commune), ★★ (Rare), ★★★ (Épique), ∞ (Légendaire — PeopleSpheres uniquement) |
| **Coût en mana** | Coût pour jouer la carte (voir §3) |
| **ATK** | Dégâts infligés lors d'une attaque |
| **DEF** | Réduction de dégâts (voir formule ci-dessous) |
| **HP** | Points de vie de la carte ; à 0, la carte meurt |
| **Capacité(s) spéciale(s)** | Effet chiffré, décrit en langage naturel court |
| **Point Faible** | Tag optionnel : la carte est vulnérable face à PeopleSpheres (voir §4) |

### Formule de dégâts

```
Dégâts subis = max(1, Dégâts entrants − DEF de la cible)
```

Le DEF ne peut jamais ramener les dégâts en dessous de 1 (pas d'immunité totale). Le DEF est un attribut **statique de la carte** (contrairement au HP qui diminue) : il représente une réduction permanente, modifiable uniquement par des auras/effets qui l'augmentent explicitement.

### Glossaire des mots-clés

| Mot-clé | Effet |
|---|---|
| **Provocation** | L'adversaire doit obligatoirement attaquer une carte avec Provocation en priorité, tant qu'au moins une est en jeu. |
| **Charge** | La carte peut attaquer dès le tour où elle est jouée (pas de "mal de sommeil"). |
| **Effet d'Entrée** | Se déclenche immédiatement quand la carte est jouée depuis la main. |
| **Effet Final** | Se déclenche quand la carte meurt (au combat ou par un effet). |
| **Aura** | Effet passif permanent tant que la carte reste en jeu. |
| **Silence** | Retire toutes les capacités, auras et tags (dont Point Faible) d'une carte ciblée, sans toucher à ses ATK/DEF/HP de base. |
| **Gel** | La carte ciblée ne peut pas attaquer lors de son prochain tour. |

Chaque carte n'attaque qu'une fois par tour, sauf effet contraire, et souffre du "mal de sommeil" le tour où elle est posée (ne peut ni attaquer ni utiliser de capacité d'attaque active), sauf si elle a Charge.

---

## 2. Les 12 domaines et leur synergie

Les bonus de synergie s'activent en fonction du nombre de cartes **du même domaine simultanément en jeu** (sur le plateau, pas en main ni dans le deck). Les paliers sont **cumulables** : atteindre le palier 4 signifie que les effets des paliers 2 ET 4 s'appliquent en même temps. Les seuils sont réévalués en continu (dès qu'une carte du domaine entre ou sort du jeu).

PeopleSpheres est *Transversale* : elle compte pour **chacun** des 12 domaines pour le calcul des paliers de synergie (elle est comptée simultanément dans toutes les synergies actives).

Les 6 premiers domaines ci-dessous forment le cœur historique du jeu (le "SIRH classique"). Les 6 domaines suivants — la **Guilde des Éditeurs Spécialisés** — regroupent les solutions périphériques de l'écosystème RH (sécurité, conformité, notes de frais, dématérialisation, mobilité internationale et digital workplace), chacune associée à une famille de créatures fantastiques distincte.

### 🟦 PAIE / GA — Stabilité *(soin, réduction de dégâts subis)*

| Palier | Effet (cumulable avec les paliers inférieurs) |
|---|---|
| 2 cartes | Au début de votre tour, votre héros récupère **1 PV**. |
| 4 cartes | + Les dégâts subis par votre héros sont réduits de **1** (minimum 1 dégât appliqué). |
| 6 cartes | + Le soin du palier 2 passe de 1 à **3 PV**/tour. |

### 🟩 GTA — Défense *(Provocation, buff DEF)*

| Palier | Effet |
|---|---|
| 2 cartes | Toutes vos cartes GTA en jeu gagnent **+1 DEF**. |
| 4 cartes | + **+1 DEF** supplémentaire (total +2) et la carte GTA avec le plus de HP en jeu gagne **Provocation**. |
| 6 cartes | + **+1 DEF** supplémentaire (total +3) et **toutes** vos cartes GTA en jeu gagnent **Provocation**. |

### 🟨 RECRUTEMENT — Tempo *(pioche, réduction de coût)*

| Palier | Effet |
|---|---|
| 2 cartes | La première carte RECRUTEMENT jouée chaque tour coûte **1 mana de moins** (minimum 1). |
| 4 cartes | + Au début de votre tour, piochez **1 carte supplémentaire**. |
| 6 cartes | + Toutes les cartes RECRUTEMENT en main coûtent **1 mana de moins** (cumulable avec la réduction du palier 2 sur la première jouée, plafond -2 sur une même carte). |

### 🟧 FORMATION — Progression *(buff qui augmente à chaque tour)*

| Palier | Effet |
|---|---|
| 2 cartes | Chaque carte FORMATION en jeu gagne **+1 ATK / +1 HP** de façon permanente au début de votre tour (l'effet s'accumule tour après tour). |
| 4 cartes | + Le gain passe à **+1 ATK / +1 DEF / +1 HP** par tour. |
| 6 cartes | + Le gain de progression est **doublé (×2)** tant que le seuil de 6 reste actif. |

### 🟥 TALENT / PERFORMANCE — Puissance *(buff ATK direct)*

| Palier | Effet |
|---|---|
| 2 cartes | Toutes vos cartes TALENT/PERFORMANCE en jeu gagnent **+1 ATK**. |
| 4 cartes | + **+2 ATK** supplémentaires (total +3). |
| 6 cartes | + **+3 ATK** supplémentaires (total +6). |

### 🟪 PILOTAGE / BI — Information *(regarder la pioche, choisir parmi 2)*

| Palier | Effet |
|---|---|
| 2 cartes | Au début de votre tour, regardez la carte du dessus de votre pioche (information uniquement, pas de défausse). |
| 4 cartes | + Une fois par tour, quand un effet vous fait piocher une carte, piochez-en 2 et gardez celle de votre choix (l'autre est défaussée). |
| 6 cartes | + Une fois par tour, vous pouvez échanger 1 carte de votre main contre une nouvelle carte piochée. |

### 🗿 PRÉVENTION & SÉCURITÉ — Rempart *(réduction de dégâts, créatures : Golems de garde)*

| Palier | Effet |
|---|---|
| 2 cartes | Les dégâts subis par votre héros sont réduits de **1** (minimum 1 dégât appliqué). |
| 4 cartes | La réduction passe à **2**. |
| 6 cartes | La réduction passe à **3**. |

*Cumulable avec la réduction de PAIE/GA (palier 4) si les deux synergies sont actives simultanément.*

### 🧞 CONFORMITÉ & RÉMUNÉRATION — Contrôle *(affaiblit l'ATK adverse, créatures : Djinns du droit)*

| Palier | Effet |
|---|---|
| 2 cartes | Toutes les cartes adverses en jeu subissent **-1 ATK** (minimum 0). |
| 4 cartes | Le malus passe à **-2 ATK**. |
| 6 cartes | Le malus passe à **-3 ATK**. |

### 👺 NOTES DE FRAIS & TRÉSORERIE — Liquidités *(mana bonus, créatures : Gobelins comptables)*

| Palier | Effet |
|---|---|
| 2 cartes | Au début de votre tour, gagnez **+1 mana** temporaire (non cumulé au mana max). |
| 4 cartes | Le bonus passe à **+2 mana**. |
| 6 cartes | Le bonus passe à **+3 mana**. |

### 👻 DÉMATÉRIALISATION & ARCHIVES — Mémoire *(regarder la pioche, récupérer la défausse, créatures : Spectres archivistes)*

| Palier | Effet |
|---|---|
| 2 cartes | Au début de votre tour, regardez la carte du dessus de votre pioche (information uniquement). |
| 4 cartes | (inchangé — le palier 2 reste actif) |
| 6 cartes | + Une fois par tour, récupérez la dernière carte de votre défausse dans votre main. |

### 🧚 MOBILITÉ & INTÉGRATION — Élan *(bonus à la pose, Charge, créatures : Fées voyageuses)*

| Palier | Effet |
|---|---|
| 2 cartes | Chaque carte MOBILITÉ que vous jouez gagne immédiatement **+1 ATK / +1 HP**. |
| 4 cartes | + La carte MOBILITÉ avec le plus de HP en jeu au moment où vous en jouez une nouvelle lui donne **Charge** dès sa mise en jeu. |
| 6 cartes | + **Toutes** vos cartes MOBILITÉ gagnent **Charge** dès leur mise en jeu. |

### 🕷️ DIGITAL WORKPLACE & IA — Réseau *(buff ATK selon la diversité de domaines, créatures : Araignées du réseau)*

| Palier | Effet |
|---|---|
| 2 cartes | Vos cartes DIGITAL WORKPLACE & IA gagnent **+1 ATK** par domaine différent représenté sur votre plateau (plafond **2**). |
| 4 cartes | Le plafond passe à **4**. |
| 6 cartes | Le plafond passe à **6**. |

*Ce domaine est le seul dont la puissance dépend de la diversité du reste du plateau plutôt que du nombre de ses propres cartes : un deck multi-domaines le renforce directement.*

---

## 3. Coût en mana

| Rareté | Coût en mana | Budget de points ATK+DEF+HP |
|---|---|---|
| ★ Commune | 1–2 | 6–8 pts |
| ★★ Rare | 3–5 | 10–12 pts |
| ★★★ Épique | 6–8 | 14–16 pts |
| ∞ Légendaire (PeopleSpheres) | 9–10 | hors barème (carte unique) |

Le joueur commence à **1 mana**, gagne **+1 mana** par tour, jusqu'à un plafond de **10 mana**. Chaque tour, les cristaux de mana sont intégralement rechargés.

Répartition des stats (ATK/DEF/HP) au sein du budget de points : chaque domaine applique un ratio thématique (ex. GTA privilégie le DEF, TALENT/PERFORMANCE privilégie l'ATK, PILOTAGE/BI privilégie le HP) — voir le détail par domaine en §7.

---

## 4. Mécanique "Point Faible"

Certaines cartes concurrentes (technologie vieillissante, positionnement niche, couverture géographique limitée) portent le tag **Point Faible vs PeopleSpheres**. 12 cartes du pool actuel portent ce tag (2 par domaine), listées en §7 et marquées "PF" dans le tableau récapitulatif.

**Règle de combat :** lorsqu'une carte marquée Point Faible et la carte PeopleSpheres s'affrontent directement (l'une attaque l'autre, en tant qu'attaquant ou défenseur), avant calcul du DEF :

- La carte **Point Faible** voit son ATK réduit de **−2** (minimum 0) pour cet échange.
- La carte **PeopleSpheres** voit son ATK augmenté de **+2** pour ce même échange.

Cette règle ne s'applique **qu'à l'affrontement direct** entre les deux cartes concernées : elle ne modifie ni les dégâts infligés au héros, ni les effets de capacités à distance, ni les combats n'impliquant pas PeopleSpheres. Le Silence retire le tag Point Faible d'une carte (elle combat alors normalement).

---

## 5. Deck-building

- **Taille du deck :** 25 à 30 cartes (30 recommandé).
- **Copies par carte :**
  - ★ et ★★ : maximum **2 exemplaires** par carte.
  - ★★★ : maximum **1 exemplaire** par carte.
  - ∞ Légendaire : maximum **1 exemplaire** par carte légendaire (PeopleSpheres n'existant qu'en un seul exemplaire dans le pool, cette règle la limite naturellement à 1 dans le deck). Règle générique posée pour de futures extensions : max 1 copie par légendaire, max 2 légendaires différentes par deck.
- **Domaines représentés :** aucune contrainte obligatoire. Un deck peut être mono-domaine (pour maximiser la fiabilité des paliers de synergie élevés, notamment le palier 6) ou multi-domaine (pour maximiser la polyvalence et le bonus de PeopleSpheres, qui scale avec le nombre de domaines différents en jeu — voir §7). Recommandation de conception : 2 à 3 domaines dominants pour activer les paliers 4/6 de façon fiable dans un deck de 30 cartes.

---

## 6. Règles générales

| Paramètre | Valeur |
|---|---|
| **PV du héros** | 30 |
| **Plateau** | Jusqu'à **7 cartes en jeu** par joueur, plateau unique partagé (**pas de lanes séparées** — n'importe quelle carte peut cibler n'importe quelle carte adverse en jeu, sous réserve de Provocation). |
| **Main de départ** | Joueur 1 (premier à jouer) : 3 cartes. Joueur 2 : 4 cartes, plus +1 cristal de mana ce tour uniquement à son premier tour (compensation classique du désavantage de ne pas jouer en premier). |
| **Pioche** | 1 carte au début de chaque tour, y compris le tout premier tour de chaque joueur. |
| **Avatar** | Optionnel : dans le deck builder, chaque joueur peut choisir explicitement un domaine comme avatar (par défaut : le domaine dominant de son deck, auto-détecté, aucune action requise). Ce choix détermine le pouvoir héroïque ET la capacité signature ci-dessous. |
| **Pouvoir héroïque** | Un pouvoir par domaine, déterminé par l'avatar. Coût 2-3 mana, utilisable une fois par tour. |
| **Capacité signature** | Un effet plus puissant par domaine, déterminé par l'avatar, utilisable **une seule fois par partie** (pas par tour). Coût 3-4 mana. |
| **Soutien de crise (rattrapage)** | Si un joueur commence son tour avec au plus 40 % de ses PV max **et** moins de PV que son adversaire, il reçoit +1 cristal de mana ce tour uniquement (jamais permanent) — un petit coup de pouce borné pour éviter qu'une avance précoce ne se transforme en victoire écrasante par simple effet boule de neige. |
| **Fatigue** | Si un joueur doit piocher alors que son deck est vide, il subit des dégâts directs au héros égaux à un compteur qui augmente de 1 à chaque pioche en fatigue (1ère pioche en fatigue = 1 dégât, 2ème = 2, 3ème = 3, etc., cumulatif sur toute la partie). |
| **Attaque** | Chaque carte peut attaquer une fois par tour. Une carte qui vient d'être jouée ne peut pas attaquer ce tour-là, sauf si elle a Charge. Le héros n'attaque pas directement (pas de système d'arme en v1) : il agit uniquement via les cartes et leurs capacités. |
| **Condition de victoire** | Le héros adverse tombe à 0 PV ou moins. Égalité si les deux héros tombent à 0 PV simultanément (ex. combat mutuel ou fatigue simultanée). |

---

## 7. Pool de cartes (204 + PeopleSpheres)

Pour chaque domaine, 15 cartes-créature sont réparties ainsi : 6 ★ (3 à coût 1, 3 à coût 2), 6 ★★ (2 à coût 3, 2 à coût 4, 2 à coût 5), 3 ★★★ (1 à coût 6, 1 à coût 7, 1 à coût 8), plus 2 cartes Action (effets ponctuels sans stats, noms fictifs plutôt que noms d'éditeurs réels) — soit 17 cartes par domaine, 12 domaines, 204 cartes + PeopleSpheres. Chaque domaine applique un ratio ATK/DEF/HP cohérent avec son thème :

| Domaine | Ratio ATK / DEF / HP |
|---|---|
| PAIE/GA | 20 / 30 / 50 (stabilité, HP dominant) |
| GTA | 15 / 45 / 40 (DEF dominant) |
| RECRUTEMENT | 40 / 15 / 45 (ATK/HP, DEF faible — cartes tempo) |
| FORMATION | 25 / 25 / 50 (équilibré, HP dominant — les stats grossissent avec le temps) |
| TALENT/PERFORMANCE | 50 / 15 / 35 (ATK dominant) |
| PILOTAGE/BI | 15 / 25 / 60 (HP dominant, cartes "support information") |
| PRÉVENTION & SÉCURITÉ | 20 / 45 / 45 (DEF/HP, réduction de dégâts au héros) |
| CONFORMITÉ & RÉMUNÉRATION | 25 / 30 / 45 (équilibré DEF/HP, affaiblit l'ATK adverse) |
| NOTES DE FRAIS & TRÉSORERIE | 25 / 25 / 45 (équilibré, génère du mana) |
| DÉMATÉRIALISATION & ARCHIVES | 20 / 25 / 55 (HP dominant, cartes "manipulation de pioche/défausse") |
| MOBILITÉ & INTÉGRATION | 45 / 20 / 40 (ATK dominant, Charge fréquente — cartes tempo agressives) |
| DIGITAL WORKPLACE & IA | 25 / 25 / 45 (équilibré, ATK scale avec la diversité de domaines en jeu) |

### 7.1 PAIE / GA — Stabilité

| Nom | Niveau | Coût | ATK | DEF | HP | Capacité | PF |
|---|---|---|---|---|---|---|---|
| ADP | ★★★ | 8 | 3 | 5 | 8 | Effet d'Entrée : héros récupère 4 PV. Aura : dégâts subis par votre héros réduits de 1. | |
| SAP SuccessFactors | ★★★ | 7 | 3 | 5 | 7 | Effet d'Entrée : héros récupère 3 PV et piochez 1 carte PAIE/GA de votre deck. | |
| Oracle | ★★★ | 6 | 3 | 4 | 7 | Aura : au début de votre tour, héros récupère 2 PV. | PF |
| Ceridian Dayforce | ★★ | 5 | 3 | 3 | 6 | Effet d'Entrée : héros récupère 2 PV. | |
| Cegid | ★★ | 5 | 2 | 4 | 6 | Effet d'Entrée : +2 DEF permanent à une carte PAIE/GA alliée. | |
| Infor | ★★ | 4 | 3 | 2 | 6 | Effet d'Entrée : héros récupère 2 PV. | |
| Cegedim | ★★ | 4 | 2 | 3 | 6 | Aura : +1 PV soigné au héros à chaque fois qu'une carte PAIE/GA meurt. | |
| Talentia | ★★ | 3 | 1 | 3 | 6 | Effet d'Entrée : héros récupère 1 PV. | |
| SD Worx | ★★ | 3 | 2 | 3 | 5 | Effet Final : héros récupère 2 PV. | |
| PayFit | ★ | 2 | 2 | 2 | 4 | Charge. | |
| Deel | ★ | 2 | 2 | 1 | 5 | Effet d'Entrée : héros récupère 1 PV. | |
| Sigma-RH | ★ | 2 | 1 | 3 | 4 | — (carte vanille) | |
| Nibelis | ★ | 1 | 2 | 1 | 3 | — (carte vanille) | |
| Insér | ★ | 1 | 1 | 1 | 4 | — (carte vanille) | PF |
| NovRH | ★ | 1 | 1 | 2 | 3 | — (carte vanille) | |

### 7.2 GTA — Défense

| Nom | Niveau | Coût | ATK | DEF | HP | Capacité | PF |
|---|---|---|---|---|---|---|---|
| Kelio | ★★★ | 8 | 2 | 7 | 7 | Provocation. Effet d'Entrée : toutes vos cartes GTA en jeu gagnent +2 DEF permanent. | |
| Horoquartz | ★★★ | 7 | 2 | 7 | 6 | Provocation. Effet d'Entrée : la carte GTA alliée avec le plus faible DEF gagne +3 DEF. | |
| Chronotime | ★★★ | 6 | 2 | 6 | 6 | Provocation. Aura : réduit de 1 les dégâts subis par cette carte au combat (cumulable avec DEF). | |
| Bodet | ★★ | 5 | 2 | 5 | 5 | Provocation. | |
| Octime | ★★ | 5 | 2 | 4 | 6 | Effet d'Entrée : +2 DEF permanent à une carte GTA alliée. | |
| Tamigo | ★★ | 4 | 2 | 5 | 4 | Provocation. Effet d'Entrée : piochez 1 carte si vous contrôlez 2 cartes GTA ou plus. | |
| Combo | ★★ | 4 | 1 | 5 | 5 | Provocation. | |
| Skello | ★★ | 3 | 2 | 5 | 3 | Effet d'Entrée : +1 DEF à toutes vos cartes GTA en jeu ce tour-ci. | |
| ZeTime | ★★ | 3 | 1 | 4 | 5 | Provocation. | |
| Élap | ★ | 2 | 2 | 3 | 3 | Provocation. | |
| Visual Planning | ★ | 2 | 1 | 4 | 3 | Effet d'Entrée : regardez la carte du dessus de votre pioche. | |
| Weekera | ★ | 2 | 1 | 3 | 4 | Provocation. | |
| Domino | ★ | 1 | 1 | 3 | 2 | Provocation. | PF |
| Timeplus | ★ | 1 | 0 | 3 | 3 | Provocation (mur défensif pur, 0 ATK). | PF |
| incotec OHRIS | ★ | 1 | 1 | 2 | 3 | Provocation. | |

### 7.3 RECRUTEMENT — Tempo

| Nom | Niveau | Coût | ATK | DEF | HP | Capacité | PF |
|---|---|---|---|---|---|---|---|
| SmartRecruiters | ★★★ | 8 | 6 | 3 | 7 | Effet d'Entrée : piochez 2 cartes. Les 2 prochaines cartes RECRUTEMENT jouées ce tour coûtent 2 de moins. | |
| Greenhouse | ★★★ | 7 | 6 | 2 | 7 | Effet d'Entrée : piochez 2 cartes. | |
| iCIMS | ★★★ | 6 | 6 | 2 | 6 | Effet d'Entrée : piochez 1 carte. La prochaine carte RECRUTEMENT jouée ce tour coûte 2 de moins. | |
| Lever | ★★ | 5 | 5 | 2 | 5 | Effet d'Entrée : piochez 1 carte. | |
| Eightfold.ai | ★★ | 5 | 4 | 2 | 6 | Effet d'Entrée : regardez les 3 cartes du dessus de votre pioche, gardez-en 1 en main. | |
| Phenom | ★★ | 4 | 4 | 2 | 5 | Effet d'Entrée : la prochaine carte jouée ce tour coûte 1 de moins. | |
| Teamtailor | ★★ | 4 | 4 | 1 | 6 | Effet d'Entrée : piochez 1 carte si votre main contient 3 cartes ou moins. | |
| HelloWork | ★★ | 3 | 4 | 2 | 4 | Effet d'Entrée : piochez 1 carte, puis défaussez 1 carte. | |
| Taleez | ★★ | 3 | 3 | 2 | 5 | Effet d'Entrée : la prochaine carte RECRUTEMENT jouée ce tour coûte 1 de moins. | |
| Flatchr | ★ | 2 | 3 | 1 | 4 | Effet d'Entrée : piochez 1 carte si vous contrôlez déjà une carte RECRUTEMENT. | |
| CleverConnect | ★ | 2 | 2 | 1 | 5 | Effet d'Entrée : regardez la carte du dessus de votre pioche. | |
| Marvin Recruiter | ★ | 2 | 3 | 1 | 4 | Charge. | |
| Gestmax | ★ | 1 | 2 | 1 | 3 | — (carte vanille) | PF |
| HumanSourcing | ★ | 1 | 2 | 1 | 3 | — (carte vanille) | PF |
| Eolia | ★ | 1 | 2 | 1 | 3 | Effet d'Entrée : votre prochaine carte coûte 1 de moins (une fois par partie). | |

### 7.4 FORMATION — Progression

| Nom | Niveau | Coût | ATK | DEF | HP | Capacité | PF |
|---|---|---|---|---|---|---|---|
| 360Learning | ★★★ | 8 | 4 | 4 | 8 | Aura : au début de votre tour, cette carte gagne +1/+1/+1 permanent. | |
| Skillsoft | ★★★ | 7 | 4 | 4 | 7 | Aura : au début de votre tour, cette carte gagne +1 ATK et +1 HP permanent. | |
| CrossKnowledge | ★★★ | 6 | 3 | 4 | 7 | Aura : au début de votre tour, +1 HP permanent, et +1 ATK supplémentaire si vous contrôlez 2 cartes FORMATION ou plus. | |
| Coursera Business | ★★ | 5 | 3 | 3 | 6 | Aura : au début de votre tour, +1 ATK et +1 HP permanent. | |
| Coorpacademy | ★★ | 5 | 2 | 4 | 6 | Aura : au début de votre tour, +1 ATK et +1 HP permanent. | |
| Rise Up | ★★ | 4 | 3 | 3 | 5 | Aura : au début de votre tour, +1 ATK et +1 HP permanent. | |
| MySkillCamp | ★★ | 4 | 2 | 3 | 6 | Aura : au début de votre tour, +1 ATK et +1 HP permanent. | |
| EdFlex | ★★ | 3 | 2 | 3 | 5 | Aura : au début de votre tour, +1 HP permanent. | |
| Articulate | ★★ | 3 | 3 | 2 | 5 | Aura : au début de votre tour, +1 ATK permanent. | |
| Digiforma | ★ | 2 | 2 | 2 | 4 | Aura : au début de votre tour, +1 HP permanent. | |
| iSpring | ★ | 2 | 1 | 2 | 5 | Aura : au début de votre tour, +1 HP permanent. | |
| Dendreo | ★ | 2 | 2 | 1 | 5 | Aura : au début de votre tour, +1 HP permanent. | |
| Moodle | ★ | 1 | 1 | 2 | 3 | Aura : au début de votre tour, +1 HP permanent. | PF |
| Chamilo | ★ | 1 | 1 | 1 | 4 | Aura : au début de votre tour, +1 HP permanent. | PF |
| Ymag | ★ | 1 | 2 | 1 | 3 | Aura : au début de votre tour, +1 ATK permanent. | |

### 7.5 TALENT / PERFORMANCE — Puissance

| Nom | Niveau | Coût | ATK | DEF | HP | Capacité | PF |
|---|---|---|---|---|---|---|---|
| Cornerstone | ★★★ | 8 | 8 | 2 | 6 | Effet d'Entrée : +3 ATK permanent à toutes vos cartes TALENT/PERFORMANCE en jeu. | |
| Talentsoft | ★★★ | 7 | 7 | 2 | 6 | Effet d'Entrée : +2 ATK permanent à toutes vos cartes TALENT/PERFORMANCE en jeu. | |
| Beqom | ★★★ | 6 | 7 | 2 | 5 | Effet d'Entrée : +2 ATK permanent à une carte alliée ciblée. | |
| Culture Amp | ★★ | 5 | 6 | 2 | 4 | Effet d'Entrée : +1 ATK permanent à toutes vos cartes TALENT/PERFORMANCE en jeu. | |
| Beamery | ★★ | 5 | 5 | 2 | 5 | Effet d'Entrée : +2 ATK permanent à une carte alliée ciblée. | |
| 15Five | ★★ | 4 | 5 | 2 | 4 | Effet d'Entrée : +1 ATK permanent à une carte alliée ciblée. | |
| Zest | ★★ | 4 | 4 | 2 | 5 | Charge. +1 ATK si vous contrôlez 2 cartes TALENT/PERFORMANCE ou plus. | |
| Elevo | ★★ | 3 | 5 | 1 | 4 | Effet d'Entrée : +1 ATK permanent à une carte alliée ciblée. | |
| Neobrain | ★★ | 3 | 4 | 2 | 4 | Effet d'Entrée : regardez le dessus de votre pioche ; si TALENT/PERFORMANCE, +1 ATK permanent à cette carte. | |
| Fuel50 | ★ | 2 | 4 | 1 | 3 | Charge. | |
| WorkBoard | ★ | 2 | 3 | 1 | 4 | Effet d'Entrée : +1 ATK permanent à une carte alliée ciblée. | |
| Whoz | ★ | 2 | 4 | 1 | 3 | — (carte vanille) | |
| Empowill | ★ | 1 | 3 | 1 | 2 | — (carte vanille) | PF |
| Reflektive | ★ | 1 | 3 | 1 | 2 | — (carte vanille) | PF |
| PeopleGoal | ★ | 1 | 2 | 1 | 3 | — (carte vanille) | |

### 7.6 PILOTAGE / BI — Information

| Nom | Niveau | Coût | ATK | DEF | HP | Capacité | PF |
|---|---|---|---|---|---|---|---|
| Power BI | ★★★ | 8 | 2 | 4 | 10 | Effet d'Entrée : regardez les 3 cartes du dessus de votre pioche, remettez-les dans l'ordre de votre choix. | |
| Tableau | ★★★ | 7 | 2 | 4 | 9 | Effet d'Entrée : piochez 2 cartes, gardez celle de votre choix, défaussez l'autre. | |
| Anaplan | ★★★ | 6 | 2 | 3 | 9 | Effet d'Entrée : regardez la main de l'adversaire. | |
| Qlik | ★★ | 5 | 2 | 3 | 7 | Effet d'Entrée : piochez 2 cartes, gardez celle de votre choix, défaussez l'autre. | |
| Board | ★★ | 5 | 2 | 3 | 7 | Effet d'Entrée : regardez les 2 cartes du dessus de votre pioche, gardez-en 1 sur le dessus. | |
| SAP BusinessObjects | ★★ | 4 | 2 | 3 | 6 | Effet d'Entrée : regardez la carte du dessus de votre pioche ; vous pouvez la défausser pour piocher la suivante. | |
| Dataiku | ★★ | 4 | 2 | 3 | 6 | Effet d'Entrée : regardez la carte du dessus de la pioche adverse. | |
| Sisense | ★★ | 3 | 2 | 2 | 6 | Effet d'Entrée : regardez la carte du dessus de votre pioche. | |
| Domo | ★★ | 3 | 1 | 2 | 7 | Effet d'Entrée : regardez la carte du dessus de votre pioche. | |
| Jedox | ★ | 2 | 1 | 2 | 5 | Effet d'Entrée : regardez la carte du dessus de votre pioche. | |
| GoodData | ★ | 2 | 1 | 2 | 5 | — (carte vanille) | |
| JasperSoft | ★ | 2 | 1 | 1 | 6 | — (carte vanille) | |
| SAS | ★ | 1 | 1 | 1 | 4 | — (carte vanille) | PF |
| IBM Cognos | ★ | 1 | 1 | 1 | 4 | — (carte vanille) | PF |
| Oracle Hyperion | ★ | 1 | 1 | 1 | 4 | — (carte vanille) | |

### 7.7 PRÉVENTION & SÉCURITÉ — Rempart

| Nom | Niveau | Coût | ATK | DEF | HP | Capacité | PF |
|---|---|---|---|---|---|---|---|
| Previsoft | ★★★ | 8 | 3 | 6 | 8 | Aura : dégâts subis par votre héros réduits de 2. |  |
| Riskoo | ★★★ | 7 | 2 | 6 | 7 | Provocation. Effet d'Entrée : +2 DEF à toutes vos cartes Prévention & Sécurité en jeu (permanent). |  |
| ALEA Prevention | ★★★ | 6 | 2 | 5 | 7 | Aura : dégâts reçus par cette carte au combat réduits de 1. | PF |
| HSE | ★★ | 5 | 2 | 4 | 6 | Effet d'Entrée : héros récupère 2 PV. |  |
| Agile | ★★ | 5 | 3 | 3 | 5 | Effet d'Entrée : +2 DEF à une carte alliée du même domaine. |  |
| PROG/NOV | ★★ | 4 | 2 | 4 | 5 | Aura : dégâts subis par votre héros réduits de 1. |  |
| DOTNET | ★★ | 4 | 2 | 3 | 5 | Provocation. |  |
| GHS | ★★ | 3 | 1 | 4 | 5 | Effet d'Entrée : héros récupère 1 PV. |  |
| Cogilog | ★★ | 3 | 2 | 3 | 4 | Effet Final : héros récupère 2 PV. |  |
| Alfatea | ★ | 2 | 2 | 2 | 4 | Charge. |  |
| TDC Sécurité | ★ | 2 | 1 | 3 | 3 | — (carte vanille) |  |
| Preventeo | ★ | 2 | 1 | 2 | 4 | Effet d'Entrée : Regardez la carte du dessus de votre pioche. |  |
| WinLassie | ★ | 1 | 1 | 2 | 3 | — (carte vanille) |  |
| Acciline+ | ★ | 1 | 1 | 1 | 4 | — (carte vanille) | PF |
| ASYS | ★ | 1 | 0 | 2 | 3 | — (carte vanille) | PF |

### 7.8 CONFORMITÉ & RÉMUNÉRATION — Contrôle

| Nom | Niveau | Coût | ATK | DEF | HP | Capacité | PF |
|---|---|---|---|---|---|---|---|
| Altaÿs SIRH | ★★★ | 8 | 4 | 4 | 8 | Effet d'Entrée : Piochez 1 carte. Effet d'Entrée : Défaussez 1 carte(s) au hasard. |  |
| TriNet Zenefits | ★★★ | 7 | 4 | 4 | 7 | Effet d'Entrée : +2 DEF à toutes vos cartes Conformité & Rémunération en jeu (permanent). |  |
| Delegatio | ★★★ | 6 | 3 | 4 | 7 | Aura : +1 DEF au début de votre tour. | PF |
| Alcuin | ★★ | 5 | 3 | 3 | 6 | Effet d'Entrée : Piochez 1 carte. |  |
| Smart BDESE | ★★ | 5 | 3 | 3 | 5 | Effet d'Entrée : Regardez la main adverse. |  |
| ZenDSN | ★★ | 4 | 3 | 2 | 6 | Effet d'Entrée : Regardez le dessus de la pioche ; vous pouvez la défausser pour piocher la suivante. |  |
| Allshare | ★★ | 4 | 2 | 3 | 5 | Effet d'Entrée : +1 DEF / +1 HP à une carte alliée ciblée. |  |
| Cotranet | ★★ | 3 | 2 | 2 | 5 | Effet d'Entrée : Défaussez 1 carte(s) au hasard. Effet d'Entrée : Piochez 1 carte. |  |
| BDES Online | ★★ | 3 | 2 | 3 | 4 | Effet d'Entrée : Regardez la carte du dessus de votre pioche. |  |
| WTW | ★ | 2 | 2 | 2 | 4 | Charge. |  |
| Xactly | ★ | 2 | 2 | 1 | 4 | Effet d'Entrée : +1 ATK à une carte alliée ciblée. |  |
| HRSoft | ★ | 2 | 1 | 2 | 4 | — (carte vanille) |  |
| Varicent | ★ | 1 | 1 | 2 | 3 | — (carte vanille) |  |
| Primeum | ★ | 1 | 2 | 1 | 3 | — (carte vanille) | PF |
| J.P. Morgan Workplace Solutions | ★ | 1 | 1 | 1 | 4 | — (carte vanille) | PF |

### 7.9 NOTES DE FRAIS & TRÉSORERIE — Liquidités

| Nom | Niveau | Coût | ATK | DEF | HP | Capacité | PF |
|---|---|---|---|---|---|---|---|
| Lucca | ★★★ | 8 | 3 | 4 | 9 | Effet d'Entrée : Réduit de 2 le coût de 2 carte(s) Notes de Frais & Trésorerie suivante(s) ce tour. |  |
| N2F | ★★★ | 7 | 3 | 4 | 8 | Effet d'Entrée : Piochez 1 carte. Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) suivante(s) ce tour. |  |
| Jenji | ★★★ | 6 | 3 | 3 | 7 | Aura : héros récupère 1 PV au début de votre tour. | PF |
| Notilus | ★★ | 5 | 3 | 3 | 6 | Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) Notes de Frais & Trésorerie suivante(s) ce tour. |  |
| ONexpense | ★★ | 5 | 2 | 3 | 6 | Effet d'Entrée : héros récupère 2 PV. |  |
| Yeap | ★★ | 4 | 3 | 2 | 5 | Effet d'Entrée : Piochez 1 carte. |  |
| SAP Concur | ★★ | 4 | 2 | 3 | 5 | Effet d'Entrée : +2 DEF à une carte alliée du même domaine. |  |
| Rydoo | ★★ | 3 | 2 | 2 | 5 | Effet d'Entrée : Piochez 1 si vous contrôlez 2+ cartes Notes de Frais & Trésorerie. |  |
| Expensya | ★★ | 3 | 3 | 1 | 5 | Charge. |  |
| Carlabella | ★ | 2 | 2 | 2 | 4 | Effet d'Entrée : Regardez la carte du dessus de votre pioche. |  |
| Pyeo | ★ | 2 | 2 | 1 | 4 | — (carte vanille) |  |
| Mooncard | ★ | 2 | 1 | 2 | 4 | — (carte vanille) |  |
| Spendesk | ★ | 1 | 2 | 1 | 3 | — (carte vanille) | PF |
| Soldo | ★ | 1 | 1 | 1 | 4 | — (carte vanille) |  |
| Openpaye | ★ | 1 | 1 | 2 | 3 | — (carte vanille) |  |

### 7.10 DÉMATÉRIALISATION & ARCHIVES — Mémoire

| Nom | Niveau | Coût | ATK | DEF | HP | Capacité | PF |
|---|---|---|---|---|---|---|---|
| Numeno | ★★★ | 8 | 3 | 5 | 8 | Effet d'Entrée : Piochez 3, gardez 1 (le reste part au cimetière). |  |
| neoboxRH | ★★★ | 7 | 3 | 4 | 8 | Effet d'Entrée : Regardez les 3 cartes du dessus, choisissez celle que vous piocherez en premier. |  |
| Esker | ★★★ | 6 | 2 | 4 | 8 | Aura : héros récupère 1 PV à chaque mort d'une carte Dématérialisation & Archives. |  |
| Zeendoc | ★★ | 5 | 2 | 3 | 7 | Effet d'Entrée : Regardez le dessus de la pioche ; vous pouvez la défausser pour piocher la suivante. |  |
| Nuxeo | ★★ | 5 | 3 | 3 | 6 | Effet d'Entrée : Regardez le dessus de la pioche adverse. |  |
| Primobox | ★★ | 4 | 2 | 3 | 6 | Effet d'Entrée : Regardez les 2 cartes du dessus de votre pioche. |  |
| Digiposte | ★★ | 4 | 2 | 2 | 6 | Effet Final : Piochez 1 carte. |  |
| Coffreo | ★★ | 3 | 2 | 3 | 5 | Effet d'Entrée : Regardez la carte du dessus de votre pioche. |  |
| DigiTech | ★★ | 3 | 1 | 3 | 5 | — (carte vanille) |  |
| Dimo | ★ | 2 | 2 | 2 | 4 | — (carte vanille) |  |
| Numerize | ★ | 2 | 1 | 2 | 5 | — (carte vanille) |  |
| Securibox | ★ | 2 | 1 | 2 | 4 | — (carte vanille) | PF |
| Docaposte | ★ | 1 | 1 | 2 | 4 | — (carte vanille) |  |
| PeopleDoc | ★ | 1 | 2 | 1 | 3 | — (carte vanille) | PF |
| CS | ★ | 1 | 1 | 1 | 4 | — (carte vanille) |  |

### 7.11 MOBILITÉ & INTÉGRATION — Élan

| Nom | Niveau | Coût | ATK | DEF | HP | Capacité | PF |
|---|---|---|---|---|---|---|---|
| Atlas | ★★★ | 8 | 6 | 3 | 7 | Charge. Effet d'Entrée : +2 ATK à toutes vos cartes Mobilité & Intégration en jeu (ce tour-ci). |  |
| Helma International | ★★★ | 7 | 5 | 3 | 7 | Effet d'Entrée : Piochez 2 cartes. |  |
| Topia | ★★★ | 6 | 5 | 2 | 7 | Charge. | PF |
| AIRINC | ★★ | 5 | 4 | 2 | 6 | Effet d'Entrée : +2 ATK à une carte alliée ciblée. |  |
| RIVAL | ★★ | 5 | 4 | 3 | 5 | Charge. |  |
| Talmundo | ★★ | 4 | 4 | 2 | 5 | Effet d'Entrée : Piochez 1 carte. |  |
| Staff & Go | ★★ | 4 | 3 | 2 | 5 | Charge. |  |
| Workelo | ★★ | 3 | 3 | 2 | 5 | Effet d'Entrée : Regardez la carte du dessus de votre pioche. |  |
| HeyTeam | ★★ | 3 | 3 | 1 | 5 | Effet d'Entrée : Piochez 1 si vous contrôlez 2+ cartes Mobilité & Intégration. |  |
| Knowmore | ★ | 2 | 3 | 1 | 4 | Charge. |  |
| WelcomApp | ★ | 2 | 2 | 2 | 4 | — (carte vanille) |  |
| Wobee | ★ | 2 | 2 | 1 | 4 | — (carte vanille) |  |
| Remote.com | ★ | 1 | 2 | 1 | 3 | — (carte vanille) | PF |
| Oyster HR | ★ | 1 | 1 | 2 | 3 | — (carte vanille) |  |
| Papaya Global | ★ | 1 | 2 | 1 | 3 | — (carte vanille) | PF |

### 7.12 DIGITAL WORKPLACE & IA — Réseau

| Nom | Niveau | Coût | ATK | DEF | HP | Capacité | PF |
|---|---|---|---|---|---|---|---|
| Powell Software | ★★★ | 8 | 4 | 4 | 8 | Effet d'Entrée : Piochez 1 carte. Effet d'Entrée : Regardez la main adverse. |  |
| ServiceNow | ★★★ | 7 | 4 | 3 | 7 | Effet d'Entrée : +1 ATK à toutes vos cartes Digital Workplace & IA en jeu (permanent). |  |
| Intercom | ★★★ | 6 | 3 | 3 | 7 | Aura : +1 ATK au début de votre tour. |  |
| elium | ★★ | 5 | 3 | 3 | 6 | Effet d'Entrée : Piochez 1 carte. |  |
| happeo | ★★ | 5 | 3 | 2 | 6 | Effet d'Entrée : +1 ATK à une carte alliée ciblée. |  |
| Asana | ★★ | 4 | 3 | 2 | 5 | Effet d'Entrée : Piochez 1 si votre main a 3 cartes ou moins. |  |
| Trello | ★★ | 4 | 2 | 3 | 5 | Effet d'Entrée : Regardez la carte du dessus de votre pioche. |  |
| Clevy | ★★ | 3 | 3 | 1 | 5 | Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) suivante(s) ce tour. |  |
| inbenta | ★★ | 3 | 2 | 2 | 5 | Effet d'Entrée : +1 DEF à une carte alliée du même domaine. |  |
| Jalios | ★ | 2 | 2 | 2 | 4 | — (carte vanille) |  |
| lumapps | ★ | 2 | 2 | 1 | 4 | Charge. |  |
| Notion | ★ | 2 | 1 | 2 | 4 | — (carte vanille) |  |
| HeavenHR | ★ | 1 | 1 | 2 | 3 | — (carte vanille) |  |
| Crisp | ★ | 1 | 2 | 1 | 3 | — (carte vanille) | PF |
| dydu | ★ | 1 | 1 | 1 | 4 | — (carte vanille) | PF |

### 7.13 Légendaire — PeopleSpheres

| Nom | Domaine | Niveau | Coût | ATK | DEF | HP | Capacité |
|---|---|---|---|---|---|---|---|
| **PeopleSpheres** | Transversal (les 12 domaines) | ∞ | 10 | 6 | 6 | 15 | **Synchronisation Universelle** — Effet d'Entrée : pour chaque domaine différent représenté parmi vos cartes en jeu (hors PeopleSpheres, maximum 6 — plafonné par la taille du plateau), cette carte gagne +1/+1/+1 permanent et vous piochez 1 carte. Votre héros récupère en plus 1 PV par domaine représenté. (Effet maximal à 6 domaines simultanés en jeu : +6/+6/+6, 6 cartes piochées, 6 PV soignés — le plateau ne pouvant contenir plus de 6 autres cartes.) |

PeopleSpheres compte comme membre de chacun des 12 domaines pour l'activation des paliers de synergie (§2), et bénéficie/inflige les modificateurs de la mécanique Point Faible (§4) lorsqu'elle affronte une carte marquée PF.

---

## 8. Tableau récapitulatif complet

*(Ce tableau couvre le pool "classique" des 6 domaines historiques : 90 cartes-créature + PeopleSpheres. PF = porte le tag "Point Faible vs PeopleSpheres". Pour le détail des cartes-créature des 6 domaines de la Guilde des Éditeurs Spécialisés — ajoutées avec l'extension à 12 domaines — voir §7.7 à §7.12. Les cartes Action des 12 domaines (2 par domaine, effets ponctuels sans stats) ne sont pas reprises dans ce tableau condensé ; voir §7 et la collection en jeu pour leur liste complète.)*

| Nom | Domaine | Niveau | Coût | ATK | DEF | HP | Capacité résumée | PF |
|---|---|---|---|---|---|---|---|---|
| ADP | PAIE/GA | ★★★ | 8 | 3 | 5 | 8 | Soin héros 4 + réduction dégâts subis 1 | |
| SAP SuccessFactors | PAIE/GA | ★★★ | 7 | 3 | 5 | 7 | Soin héros 3 + pioche ciblée | |
| Oracle | PAIE/GA | ★★★ | 6 | 3 | 4 | 7 | Soin héros 2/tour | PF |
| Ceridian Dayforce | PAIE/GA | ★★ | 5 | 3 | 3 | 6 | Soin héros 2 | |
| Cegid | PAIE/GA | ★★ | 5 | 2 | 4 | 6 | +2 DEF alliée | |
| Infor | PAIE/GA | ★★ | 4 | 3 | 2 | 6 | Soin héros 2 | |
| Cegedim | PAIE/GA | ★★ | 4 | 2 | 3 | 6 | Soin 1 à chaque mort PAIE/GA | |
| Talentia | PAIE/GA | ★★ | 3 | 1 | 3 | 6 | Soin héros 1 | |
| SD Worx | PAIE/GA | ★★ | 3 | 2 | 3 | 5 | Effet Final : soin héros 2 | |
| PayFit | PAIE/GA | ★ | 2 | 2 | 2 | 4 | Charge | |
| Deel | PAIE/GA | ★ | 2 | 2 | 1 | 5 | Soin héros 1 | |
| Sigma-RH | PAIE/GA | ★ | 2 | 1 | 3 | 4 | Vanille | |
| Nibelis | PAIE/GA | ★ | 1 | 2 | 1 | 3 | Vanille | |
| Insér | PAIE/GA | ★ | 1 | 1 | 1 | 4 | Vanille | PF |
| NovRH | PAIE/GA | ★ | 1 | 1 | 2 | 3 | Vanille | |
| Kelio | GTA | ★★★ | 8 | 2 | 7 | 7 | Provocation + +2 DEF domaine | |
| Horoquartz | GTA | ★★★ | 7 | 2 | 7 | 6 | Provocation + +3 DEF ciblé | |
| Chronotime | GTA | ★★★ | 6 | 2 | 6 | 6 | Provocation + réduction dégâts 1 | |
| Bodet | GTA | ★★ | 5 | 2 | 5 | 5 | Provocation | |
| Octime | GTA | ★★ | 5 | 2 | 4 | 6 | +2 DEF alliée | |
| Tamigo | GTA | ★★ | 4 | 2 | 5 | 4 | Provocation + pioche conditionnelle | |
| Combo | GTA | ★★ | 4 | 1 | 5 | 5 | Provocation | |
| Skello | GTA | ★★ | 3 | 2 | 5 | 3 | +1 DEF domaine (ce tour) | |
| ZeTime | GTA | ★★ | 3 | 1 | 4 | 5 | Provocation | |
| Élap | GTA | ★ | 2 | 2 | 3 | 3 | Provocation | |
| Visual Planning | GTA | ★ | 2 | 1 | 4 | 3 | Regarde pioche | |
| Weekera | GTA | ★ | 2 | 1 | 3 | 4 | Provocation | |
| Domino | GTA | ★ | 1 | 1 | 3 | 2 | Provocation | PF |
| Timeplus | GTA | ★ | 1 | 0 | 3 | 3 | Provocation (mur 0 ATK) | PF |
| incotec OHRIS | GTA | ★ | 1 | 1 | 2 | 3 | Provocation | |
| SmartRecruiters | RECRUTEMENT | ★★★ | 8 | 6 | 3 | 7 | Pioche 2 + réduction coût x2 | |
| Greenhouse | RECRUTEMENT | ★★★ | 7 | 6 | 2 | 7 | Pioche 2 | |
| iCIMS | RECRUTEMENT | ★★★ | 6 | 6 | 2 | 6 | Pioche 1 + réduction coût 2 | |
| Lever | RECRUTEMENT | ★★ | 5 | 5 | 2 | 5 | Pioche 1 | |
| Eightfold.ai | RECRUTEMENT | ★★ | 5 | 4 | 2 | 6 | Regarde 3, garde 1 | |
| Phenom | RECRUTEMENT | ★★ | 4 | 4 | 2 | 5 | Réduction coût 1 | |
| Teamtailor | RECRUTEMENT | ★★ | 4 | 4 | 1 | 6 | Pioche conditionnelle | |
| HelloWork | RECRUTEMENT | ★★ | 3 | 4 | 2 | 4 | Pioche 1 / défausse 1 | |
| Taleez | RECRUTEMENT | ★★ | 3 | 3 | 2 | 5 | Réduction coût 1 | |
| Flatchr | RECRUTEMENT | ★ | 2 | 3 | 1 | 4 | Pioche conditionnelle | |
| CleverConnect | RECRUTEMENT | ★ | 2 | 2 | 1 | 5 | Regarde pioche | |
| Marvin Recruiter | RECRUTEMENT | ★ | 2 | 3 | 1 | 4 | Charge | |
| Gestmax | RECRUTEMENT | ★ | 1 | 2 | 1 | 3 | Vanille | PF |
| HumanSourcing | RECRUTEMENT | ★ | 1 | 2 | 1 | 3 | Vanille | PF |
| Eolia | RECRUTEMENT | ★ | 1 | 2 | 1 | 3 | Réduction coût 1 (1x/partie) | |
| 360Learning | FORMATION | ★★★ | 8 | 4 | 4 | 8 | +1/+1/+1 par tour | |
| Skillsoft | FORMATION | ★★★ | 7 | 4 | 4 | 7 | +1 ATK/+1 HP par tour | |
| CrossKnowledge | FORMATION | ★★★ | 6 | 3 | 4 | 7 | +1 HP par tour (+1 ATK si synergie) | |
| Coursera Business | FORMATION | ★★ | 5 | 3 | 3 | 6 | +1 ATK/+1 HP par tour | |
| Coorpacademy | FORMATION | ★★ | 5 | 2 | 4 | 6 | +1 ATK/+1 HP par tour | |
| Rise Up | FORMATION | ★★ | 4 | 3 | 3 | 5 | +1 ATK/+1 HP par tour | |
| MySkillCamp | FORMATION | ★★ | 4 | 2 | 3 | 6 | +1 ATK/+1 HP par tour | |
| EdFlex | FORMATION | ★★ | 3 | 2 | 3 | 5 | +1 HP par tour | |
| Articulate | FORMATION | ★★ | 3 | 3 | 2 | 5 | +1 ATK par tour | |
| Digiforma | FORMATION | ★ | 2 | 2 | 2 | 4 | +1 HP par tour | |
| iSpring | FORMATION | ★ | 2 | 1 | 2 | 5 | +1 HP par tour | |
| Dendreo | FORMATION | ★ | 2 | 2 | 1 | 5 | +1 HP par tour | |
| Moodle | FORMATION | ★ | 1 | 1 | 2 | 3 | +1 HP par tour | PF |
| Chamilo | FORMATION | ★ | 1 | 1 | 1 | 4 | +1 HP par tour | PF |
| Ymag | FORMATION | ★ | 1 | 2 | 1 | 3 | +1 ATK par tour | |
| Cornerstone | TALENT/PERF. | ★★★ | 8 | 8 | 2 | 6 | +3 ATK domaine | |
| Talentsoft | TALENT/PERF. | ★★★ | 7 | 7 | 2 | 6 | +2 ATK domaine | |
| Beqom | TALENT/PERF. | ★★★ | 6 | 7 | 2 | 5 | +2 ATK ciblé | |
| Culture Amp | TALENT/PERF. | ★★ | 5 | 6 | 2 | 4 | +1 ATK domaine | |
| Beamery | TALENT/PERF. | ★★ | 5 | 5 | 2 | 5 | +2 ATK ciblé | |
| 15Five | TALENT/PERF. | ★★ | 4 | 5 | 2 | 4 | +1 ATK ciblé | |
| Zest | TALENT/PERF. | ★★ | 4 | 4 | 2 | 5 | Charge + ATK conditionnel | |
| Elevo | TALENT/PERF. | ★★ | 3 | 5 | 1 | 4 | +1 ATK ciblé | |
| Neobrain | TALENT/PERF. | ★★ | 3 | 4 | 2 | 4 | Info pioche + ATK conditionnel | |
| Fuel50 | TALENT/PERF. | ★ | 2 | 4 | 1 | 3 | Charge | |
| WorkBoard | TALENT/PERF. | ★ | 2 | 3 | 1 | 4 | +1 ATK ciblé | |
| Whoz | TALENT/PERF. | ★ | 2 | 4 | 1 | 3 | Vanille | |
| Empowill | TALENT/PERF. | ★ | 1 | 3 | 1 | 2 | Vanille | PF |
| Reflektive | TALENT/PERF. | ★ | 1 | 3 | 1 | 2 | Vanille | PF |
| PeopleGoal | TALENT/PERF. | ★ | 1 | 2 | 1 | 3 | Vanille | |
| Power BI | PILOTAGE/BI | ★★★ | 8 | 2 | 4 | 10 | Réordonne top 3 pioche | |
| Tableau | PILOTAGE/BI | ★★★ | 7 | 2 | 4 | 9 | Pioche 2, garde 1 | |
| Anaplan | PILOTAGE/BI | ★★★ | 6 | 2 | 3 | 9 | Regarde main adverse | |
| Qlik | PILOTAGE/BI | ★★ | 5 | 2 | 3 | 7 | Pioche 2, garde 1 | |
| Board | PILOTAGE/BI | ★★ | 5 | 2 | 3 | 7 | Regarde top 2, garde 1 | |
| SAP BusinessObjects | PILOTAGE/BI | ★★ | 4 | 2 | 3 | 6 | Filtre top pioche | |
| Dataiku | PILOTAGE/BI | ★★ | 4 | 2 | 3 | 6 | Regarde pioche adverse | |
| Sisense | PILOTAGE/BI | ★★ | 3 | 2 | 2 | 6 | Regarde pioche | |
| Domo | PILOTAGE/BI | ★★ | 3 | 1 | 2 | 7 | Regarde pioche | |
| Jedox | PILOTAGE/BI | ★ | 2 | 1 | 2 | 5 | Regarde pioche | |
| GoodData | PILOTAGE/BI | ★ | 2 | 1 | 2 | 5 | Vanille | |
| JasperSoft | PILOTAGE/BI | ★ | 2 | 1 | 1 | 6 | Vanille | |
| SAS | PILOTAGE/BI | ★ | 1 | 1 | 1 | 4 | Vanille | PF |
| IBM Cognos | PILOTAGE/BI | ★ | 1 | 1 | 1 | 4 | Vanille | PF |
| Oracle Hyperion | PILOTAGE/BI | ★ | 1 | 1 | 1 | 4 | Vanille | |
| **PeopleSpheres** | Transversal | ∞ | 10 | 6 | 6 | 15 | Synchronisation Universelle (scale ×6 cartes alliées max en jeu) | |

**Total pool "classique" (ce tableau) : 90 cartes de collection + 1 Légendaire = 91 cartes.**
**Total pool complet du jeu (12 domaines, §7) : 204 cartes de collection (17 par domaine × 12) + 1 Légendaire = 205 cartes.**

---

*Fin du document. En attente de validation avant lancement de l'implémentation.*
