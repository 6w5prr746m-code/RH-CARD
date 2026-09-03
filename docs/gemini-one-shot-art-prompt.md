# RH CARD — Prompt "one-shot" pour Gemini (205 illustrations de cartes)

Ce fichier contient **un seul prompt**, prêt à copier-coller tel quel dans Gemini
(app, Gemini API, ou Google AI Studio). Il embarque la charte graphique complète
ET la liste exhaustive des 205 cartes du jeu, pour que Gemini puisse tout
générer sans aller-retour.

⚠️ **Réalité technique à connaître avant de copier-coller** (voir aussi la note
en bas de ce fichier) : générer et zipper 205 images en une seule réponse n'est
possible que si l'outil Gemini que vous utilisez peut réellement **exécuter du
code ET appeler un modèle de génération d'image depuis ce code** (typiquement
Google AI Studio "Build"/canvas avec exécution de code + accès à l'API Imagen/
Gemini Image, moyennant une clé API). Dans l'app Gemini grand public (chat
classique), une seule conversation ne peut produire que quelques images par
message — le prompt ci-dessous est conçu pour fonctionner quand même dans ce
cas : il précise explicitement de traiter la liste **dans l'ordre, sans sauter
de carte**, lot par lot, pour que vous puissiez répondre "continue" autant de
fois que nécessaire.

---

## PROMPT À COPIER-COLLER (tout ce qui suit, jusqu'à la fin du fichier)

Tu es un directeur artistique et un générateur d'images travaillant pour le jeu de cartes "RH CARD". Ta mission : produire une illustration pour CHACUNE des 205 cartes listées plus bas, en respectant strictement la charte graphique ci-dessous, puis nommer et livrer les fichiers exactement comme indiqué.

### Charte graphique (identique pour toutes les cartes — à respecter sans exception)

- **Concept** : chaque carte est réinventée comme un **personnage de fantasy héroïque** (héros, créature, construct/golem, esprit...) — jamais un logo, une capture d'écran ou une scène corporate. Le nom réel de l'éditeur SIRH ne sert que de clin d'œil dans un sous-titre fantastique ("PayFit, le Prompt Trésorier"), jamais affiché comme texte dans l'image.
- **Aucun texte lisible, aucun logo, aucune marque réelle** dans l'image.
- **Identité de domaine = une race/archétype de créature fixe**, indiquée dans l'en-tête de chaque section ci-dessous (ex : toutes les cartes "Paie / GA" sont des elfes gardiens-soigneurs). Fais varier la pose, l'équipement, l'expression et le décor d'une carte à l'autre au sein d'un même domaine — jamais deux images identiques — mais garde la race/silhouette de base reconnaissable.
- **Palette** : utilise la couleur du domaine (donnée en hex ci-dessous) comme accent dominant (armure, aura, marquages), sur un fond qui reste sombre/atmosphérique pour faire ressortir le personnage.
- **Rareté → intensité** : ★ = design simple et lisible ; ★★ = plus d'ornementation ; ★★★ = épique, détaillé, pose de pouvoir ; Légendaire = la carte la plus grandiose et lumineuse de tout le set.
- **Type "Action"** : ces cartes ne sont pas des créatures combattantes mais des objets/sorts/effets (parchemin, rune, artefact, explosion de lumière...) — pas de personnage, juste l'objet/effet en pleine action, même palette et même univers visuel.
- **Style** : illustration numérique peinte façon carte à collectionner premium (qualité Magic: The Gathering / Hearthstone), pas de photoréalisme, pas de rendu 3D, pas de style vectoriel plat.
- **Format** : carré 1:1, minimum 1024×1024px, sujet centré, bien visible, occupant une bonne partie du cadre (ni minuscule au milieu d'un décor vide, ni coupé). Aucun cadre, bordure, grille, filigrane, signature ou overlay de type interface ne doit apparaître dans l'image — uniquement l'illustration.

### Couleurs par domaine (hex)

- Transversal (PeopleSpheres) : #1c1c28
- Paie / GA : #3b6fd1 · GTA : #3c9a5f · Recrutement : #d1a53b · Formation : #d1723b · Talent / Performance : #b03b3b · Pilotage / BI : #7d3bd1
- Prévention & Sécurité : #2ea3a3 · Conformité & Rémunération : #5a5a8a · Notes de Frais & Trésorerie : #8a6b2f · Dématérialisation & Archives : #4a6b5a · Mobilité & Intégration : #c93b7a · Digital Workplace & IA : #4aa8d1

### Nommage et livraison des fichiers (impératif)

- Chaque image doit être enregistrée avec **exactement** le nom de fichier indiqué entre backticks avant chaque carte ci-dessous (ex. `adp.jpg`) — ne jamais renommer, ne jamais traduire, ne jamais ajouter de suffixe.
- Format de sortie : `.jpg`.
- **Si tu peux exécuter du code et appeler un outil de génération d'image depuis ce code** : parcours la liste ci-dessous dans l'ordre, génère chaque image avec ces réglages, enregistre-la sous son nom exact, puis **compresse l'ensemble des 205 fichiers dans une seule archive `rhcard-art.zip`** (fichiers à la racine du zip, pas de sous-dossier) et fournis ce zip en résultat final. Ne t'arrête pas avant d'avoir traité les 205 entrées.
- **Si tu ne peux pas exécuter de code / pas de zip possible** : génère les images directement dans la conversation, dans l'ordre exact de la liste, en traitant autant de cartes que possible par réponse ; indique clairement à la fin de chaque réponse la prochaine carte à traiter, et continue automatiquement dès que je réponds "continue" — jusqu'à avoir traité les 205 entrées, sans en sauter aucune.

### Liste complète des 205 cartes à générer

Format de chaque ligne : `nom-de-fichier.jpg` — **Nom de la carte** | Rareté | Type | repère d'ambiance (issu de sa capacité de jeu, à utiliser comme inspiration visuelle libre, jamais comme texte dans l'image)


### Transversal — Déité unificatrice mi-robot mi-lumière (fusion des 12 domaines)
- `peoplespheres.jpg` — **PeopleSpheres** | Légendaire | Créature | Synchronisation Universelle : pour chaque domaine différent en jeu, gagne en puissance et soigne le héros — la déité qui unit les 12 domaines.

### Paie / GA — Elfe gardien-soigneur (armure discrète, gestes précis)
- `adp.jpg` — **ADP** | ★★★ | Créature | Aura : dégâts subis par votre héros réduits de 1. Effet d'Entrée : Héros récupère 4 PV.
- `sap-successfactors.jpg` — **SAP SuccessFactors** | ★★★ | Créature | Effet d'Entrée : Héros récupère 3 PV. Effet d'Entrée : Récupère une carte Paie / GA du deck.
- `oracle.jpg` — **Oracle** | ★★★ | Créature | Aura : héros récupère 2 PV au début de votre tour.
- `ceridian-dayforce.jpg` — **Ceridian Dayforce** | ★★ | Créature | Effet d'Entrée : Héros récupère 2 PV.
- `cegid.jpg` — **Cegid** | ★★ | Créature | Effet d'Entrée : +2 DEF à une carte alliée du même domaine.
- `infor.jpg` — **Infor** | ★★ | Créature | Effet d'Entrée : Héros récupère 2 PV.
- `cegedim.jpg` — **Cegedim** | ★★ | Créature | Aura : héros récupère 1 PV à chaque mort d'une carte Paie / GA.
- `talentia.jpg` — **Talentia** | ★★ | Créature | Effet d'Entrée : Héros récupère 1 PV.
- `sd-worx.jpg` — **SD Worx** | ★★ | Créature | Effet Final : Héros récupère 2 PV.
- `payfit.jpg` — **PayFit** | ★ | Créature | Charge.
- `deel.jpg` — **Deel** | ★ | Créature | Effet d'Entrée : Héros récupère 1 PV.
- `sigma-rh.jpg` — **Sigma-RH** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `nibelis.jpg` — **Nibelis** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `inser.jpg` — **Insér** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `novrh.jpg` — **NovRH** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `audit-paie-express.jpg` — **Audit Paie Express** | ★ | Action | Effet d'Entrée : Héros récupère 3 PV. Effet d'Entrée : Récupère une carte Paie / GA du deck.
- `plan-de-continuite.jpg` — **Plan de Continuité** | ★★ | Action | Effet d'Entrée : Héros récupère 5 PV.

### GTA — Troll protecteur massif (bouclier, posture de blocage)
- `kelio.jpg` — **Kelio** | ★★★ | Créature | Provocation. Effet d'Entrée : +2 DEF à toutes vos cartes GTA en jeu (permanent).
- `horoquartz.jpg` — **Horoquartz** | ★★★ | Créature | Provocation. Effet d'Entrée : +3 DEF à la carte alliée du domaine avec le plus faible DEF.
- `chronotime.jpg` — **Chronotime** | ★★★ | Créature | Provocation. Aura : dégâts reçus par cette carte au combat réduits de 1.
- `bodet.jpg` — **Bodet** | ★★ | Créature | Provocation.
- `octime.jpg` — **Octime** | ★★ | Créature | Effet d'Entrée : +2 DEF à une carte alliée du même domaine.
- `tamigo.jpg` — **Tamigo** | ★★ | Créature | Provocation. Effet d'Entrée : Piochez 1 si vous contrôlez 2+ cartes GTA.
- `combo.jpg` — **Combo** | ★★ | Créature | Provocation.
- `skello.jpg` — **Skello** | ★★ | Créature | Effet d'Entrée : +1 DEF à toutes vos cartes GTA en jeu (ce tour-ci).
- `zetime.jpg` — **ZeTime** | ★★ | Créature | Provocation.
- `elap.jpg` — **Élap** | ★ | Créature | Provocation.
- `visual-planning.jpg` — **Visual Planning** | ★ | Créature | Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- `weekera.jpg` — **Weekera** | ★ | Créature | Provocation.
- `domino.jpg` — **Domino** | ★ | Créature | Provocation.
- `timeplus.jpg` — **Timeplus** | ★ | Créature | Provocation.
- `incotec-ohris.jpg` — **incotec OHRIS** | ★ | Créature | Provocation.
- `alerte-absenteisme.jpg` — **Alerte Absentéisme** | ★ | Action | Effet d'Entrée : +2 DEF à toutes vos cartes GTA en jeu (ce tour-ci).
- `renfort-de-securite.jpg` — **Renfort de Sécurité** | ★★ | Action | Effet d'Entrée : +3 DEF / +1 HP à une carte alliée ciblée.

### Recrutement — Éclaireur/ninja agile (capuche, arc ou lame courte)
- `smartrecruiters.jpg` — **SmartRecruiters** | ★★★ | Créature | Effet d'Entrée : Piochez 2 cartes. Effet d'Entrée : Réduit de 2 le coût de 2 carte(s) Recrutement suivante(s) ce tour.
- `greenhouse.jpg` — **Greenhouse** | ★★★ | Créature | Effet d'Entrée : Piochez 2 cartes.
- `icims.jpg` — **iCIMS** | ★★★ | Créature | Effet d'Entrée : Piochez 1 carte. Effet d'Entrée : Réduit de 2 le coût de 1 carte(s) Recrutement suivante(s) ce tour.
- `lever.jpg` — **Lever** | ★★ | Créature | Effet d'Entrée : Piochez 1 carte.
- `eightfold-ai.jpg` — **Eightfold.ai** | ★★ | Créature | Effet d'Entrée : Piochez 3, gardez 1 (le reste part au cimetière).
- `phenom.jpg` — **Phenom** | ★★ | Créature | Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) suivante(s) ce tour.
- `teamtailor.jpg` — **Teamtailor** | ★★ | Créature | Effet d'Entrée : Piochez 1 si votre main a 3 cartes ou moins.
- `hellowork.jpg` — **HelloWork** | ★★ | Créature | Effet d'Entrée : Piochez 1 carte. Effet d'Entrée : Défaussez 1 carte(s) au hasard.
- `taleez.jpg` — **Taleez** | ★★ | Créature | Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) Recrutement suivante(s) ce tour.
- `flatchr.jpg` — **Flatchr** | ★ | Créature | Effet d'Entrée : Piochez 1 si vous contrôlez 1+ cartes Recrutement.
- `cleverconnect.jpg` — **CleverConnect** | ★ | Créature | Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- `marvin-recruiter.jpg` — **Marvin Recruiter** | ★ | Créature | Charge.
- `gestmax.jpg` — **Gestmax** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `humansourcing.jpg` — **HumanSourcing** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `eolia.jpg` — **Eolia** | ★ | Créature | Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) suivante(s) ce tour.
- `campagne-de-sourcing.jpg` — **Campagne de Sourcing** | ★★ | Action | Effet d'Entrée : Piochez 2 cartes.
- `cooptation-express.jpg` — **Cooptation Express** | ★ | Action | Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) Recrutement suivante(s) ce tour.

### Formation — Mage/sorcier en apprentissage (grimoire, aura qui grandit)
- `360learning.jpg` — **360Learning** | ★★★ | Créature | Aura : +1 ATK / +1 DEF / +1 HP au début de votre tour.
- `skillsoft.jpg` — **Skillsoft** | ★★★ | Créature | Aura : +1 ATK / +1 HP au début de votre tour.
- `crossknowledge.jpg` — **CrossKnowledge** | ★★★ | Créature | Aura : +1 HP au début de votre tour. (++1 ATK si 2+ cartes Formation)
- `coursera-business.jpg` — **Coursera Business** | ★★ | Créature | Aura : +1 ATK / +1 HP au début de votre tour.
- `coorpacademy.jpg` — **Coorpacademy** | ★★ | Créature | Aura : +1 ATK / +1 HP au début de votre tour.
- `rise-up.jpg` — **Rise Up** | ★★ | Créature | Aura : +1 ATK / +1 HP au début de votre tour.
- `myskillcamp.jpg` — **MySkillCamp** | ★★ | Créature | Aura : +1 ATK / +1 HP au début de votre tour.
- `edflex.jpg` — **EdFlex** | ★★ | Créature | Aura : +1 HP au début de votre tour.
- `articulate.jpg` — **Articulate** | ★★ | Créature | Aura : +1 ATK au début de votre tour.
- `digiforma.jpg` — **Digiforma** | ★ | Créature | Aura : +1 HP au début de votre tour.
- `ispring.jpg` — **iSpring** | ★ | Créature | Aura : +1 HP au début de votre tour.
- `dendreo.jpg` — **Dendreo** | ★ | Créature | Aura : +1 HP au début de votre tour.
- `moodle.jpg` — **Moodle** | ★ | Créature | Aura : +1 HP au début de votre tour.
- `chamilo.jpg` — **Chamilo** | ★ | Créature | Aura : +1 HP au début de votre tour.
- `ymag.jpg` — **Ymag** | ★ | Créature | Aura : +1 ATK au début de votre tour.
- `session-de-coaching.jpg` — **Session de Coaching** | ★★ | Action | Effet d'Entrée : +2 ATK / +2 HP à une carte alliée ciblée.
- `parcours-certifiant.jpg` — **Parcours Certifiant** | ★ | Action | Effet d'Entrée : Piochez 1 si vous contrôlez 2+ cartes Formation.

### Talent / Performance — Dragon ou dracain puissant (écailles, énergie brute)
- `cornerstone.jpg` — **Cornerstone** | ★★★ | Créature | Effet d'Entrée : +3 ATK à toutes vos cartes Talent / Performance en jeu (permanent).
- `talentsoft.jpg` — **Talentsoft** | ★★★ | Créature | Effet d'Entrée : +2 ATK à toutes vos cartes Talent / Performance en jeu (permanent).
- `beqom.jpg` — **Beqom** | ★★★ | Créature | Effet d'Entrée : +2 ATK à une carte alliée ciblée.
- `culture-amp.jpg` — **Culture Amp** | ★★ | Créature | Effet d'Entrée : +1 ATK à toutes vos cartes Talent / Performance en jeu (permanent).
- `beamery.jpg` — **Beamery** | ★★ | Créature | Effet d'Entrée : +2 ATK à une carte alliée ciblée.
- `15five.jpg` — **15Five** | ★★ | Créature | Effet d'Entrée : +1 ATK à une carte alliée ciblée.
- `zest.jpg` — **Zest** | ★★ | Créature | Charge. Effet d'Entrée : +1 ATK à elle-même si vous contrôlez 2+ cartes Talent / Performance.
- `elevo.jpg` — **Elevo** | ★★ | Créature | Effet d'Entrée : +1 ATK à une carte alliée ciblée.
- `neobrain.jpg` — **Neobrain** | ★★ | Créature | Effet d'Entrée : Regardez le dessus de la pioche ; +1 ATK si c'est une carte Talent / Performance.
- `fuel50.jpg` — **Fuel50** | ★ | Créature | Charge.
- `workboard.jpg` — **WorkBoard** | ★ | Créature | Effet d'Entrée : +1 ATK à une carte alliée ciblée.
- `whoz.jpg` — **Whoz** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `empowill.jpg` — **Empowill** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `reflektive.jpg` — **Reflektive** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `peoplegoal.jpg` — **PeopleGoal** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `prime-de-performance.jpg` — **Prime de Performance** | ★★★ | Action | Effet d'Entrée : +3 ATK à toutes vos cartes Talent / Performance en jeu (permanent).
- `coup-de-boost.jpg` — **Coup de Boost** | ★ | Action | Effet d'Entrée : +3 ATK à une carte alliée ciblée.

### Pilotage / BI — Sage-hibou/oracle (multiples yeux ou runes de vision)
- `power-bi.jpg` — **Power BI** | ★★★ | Créature | Effet d'Entrée : Regardez les 3 cartes du dessus, choisissez celle que vous piocherez en premier.
- `tableau.jpg` — **Tableau** | ★★★ | Créature | Effet d'Entrée : Piochez 2, gardez 1 (le reste part au cimetière).
- `anaplan.jpg` — **Anaplan** | ★★★ | Créature | Effet d'Entrée : Regardez la main adverse.
- `qlik.jpg` — **Qlik** | ★★ | Créature | Effet d'Entrée : Piochez 2, gardez 1 (le reste part au cimetière).
- `board.jpg` — **Board** | ★★ | Créature | Effet d'Entrée : Regardez les 2 cartes du dessus de votre pioche.
- `sap-businessobjects.jpg` — **SAP BusinessObjects** | ★★ | Créature | Effet d'Entrée : Regardez le dessus de la pioche ; vous pouvez la défausser pour piocher la suivante.
- `dataiku.jpg` — **Dataiku** | ★★ | Créature | Effet d'Entrée : Regardez le dessus de la pioche adverse.
- `sisense.jpg` — **Sisense** | ★★ | Créature | Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- `domo.jpg` — **Domo** | ★★ | Créature | Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- `jedox.jpg` — **Jedox** | ★ | Créature | Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- `gooddata.jpg` — **GoodData** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `jaspersoft.jpg` — **JasperSoft** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `sas.jpg` — **SAS** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `ibm-cognos.jpg` — **IBM Cognos** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `oracle-hyperion.jpg` — **Oracle Hyperion** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `reporting-flash.jpg` — **Reporting Flash** | ★ | Action | Effet d'Entrée : Piochez 2, gardez 1 (le reste part au cimetière).
- `tableau-de-bord-predictif.jpg` — **Tableau de Bord Prédictif** | ★★ | Action | Effet d'Entrée : Regardez la main adverse et réordonnez le dessus de votre pioche.

### Prévention & Sécurité — Golem de garde en pierre/métal (rôle de rempart)
- `previsoft.jpg` — **Previsoft** | ★★★ | Créature | Aura : dégâts subis par votre héros réduits de 2.
- `riskoo.jpg` — **Riskoo** | ★★★ | Créature | Provocation. Effet d'Entrée : +2 DEF à toutes vos cartes Prévention & Sécurité en jeu (permanent).
- `alea-prevention.jpg` — **ALEA Prevention** | ★★★ | Créature | Aura : dégâts reçus par cette carte au combat réduits de 1.
- `hse.jpg` — **HSE** | ★★ | Créature | Effet d'Entrée : Héros récupère 2 PV.
- `agile-prevention.jpg` — **Agile** | ★★ | Créature | Effet d'Entrée : +2 DEF à une carte alliée du même domaine.
- `prog-nov.jpg` — **PROG/NOV** | ★★ | Créature | Aura : dégâts subis par votre héros réduits de 1.
- `dotnet-prevention.jpg` — **DOTNET** | ★★ | Créature | Provocation.
- `ghs.jpg` — **GHS** | ★★ | Créature | Effet d'Entrée : Héros récupère 1 PV.
- `cogilog.jpg` — **Cogilog** | ★★ | Créature | Effet Final : Héros récupère 2 PV.
- `alfatea.jpg` — **Alfatea** | ★ | Créature | Charge.
- `tdc-securite.jpg` — **TDC Sécurité** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `preventeo.jpg` — **Preventeo** | ★ | Créature | Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- `winlassie.jpg` — **WinLassie** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `acciline-plus.jpg` — **Acciline+** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `asys.jpg` — **ASYS** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `exercice-evacuation.jpg` — **Exercice d'Évacuation** | ★ | Action | Effet d'Entrée : +2 DEF à toutes vos cartes Prévention & Sécurité en jeu (ce tour-ci).
- `plan-de-prevention.jpg` — **Plan de Prévention** | ★★ | Action | Effet d'Entrée : Héros récupère 5 PV.

### Conformité & Rémunération — Djinn du droit (fumée/énergie contractuelle, autoritaire)
- `altays-sirh.jpg` — **Altaÿs SIRH** | ★★★ | Créature | Effet d'Entrée : Piochez 1 carte. Effet d'Entrée : Défaussez 1 carte(s) au hasard.
- `trinet-zenefits.jpg` — **TriNet Zenefits** | ★★★ | Créature | Effet d'Entrée : +2 DEF à toutes vos cartes Conformité & Rémunération en jeu (permanent).
- `delegatio.jpg` — **Delegatio** | ★★★ | Créature | Aura : +1 DEF au début de votre tour.
- `alcuin.jpg` — **Alcuin** | ★★ | Créature | Effet d'Entrée : Piochez 1 carte.
- `smart-bdese.jpg` — **Smart BDESE** | ★★ | Créature | Effet d'Entrée : Regardez la main adverse.
- `zendsn.jpg` — **ZenDSN** | ★★ | Créature | Effet d'Entrée : Regardez le dessus de la pioche ; vous pouvez la défausser pour piocher la suivante.
- `allshare.jpg` — **Allshare** | ★★ | Créature | Effet d'Entrée : +1 DEF / +1 HP à une carte alliée ciblée.
- `cotranet.jpg` — **Cotranet** | ★★ | Créature | Effet d'Entrée : Défaussez 1 carte(s) au hasard. Effet d'Entrée : Piochez 1 carte.
- `bdes-online.jpg` — **BDES Online** | ★★ | Créature | Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- `wtw.jpg` — **WTW** | ★ | Créature | Charge.
- `xactly.jpg` — **Xactly** | ★ | Créature | Effet d'Entrée : +1 ATK à une carte alliée ciblée.
- `hrsoft.jpg` — **HRSoft** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `varicent.jpg` — **Varicent** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `primeum.jpg` — **Primeum** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `jp-morgan-workplace.jpg` — **J.P. Morgan Workplace Solutions** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `controle-fiscal.jpg` — **Contrôle Fiscal** | ★ | Action | Effet d'Entrée : Défaussez 1 carte(s) au hasard. Effet d'Entrée : Piochez 1 carte.
- `negociation-salariale.jpg` — **Négociation Salariale** | ★★ | Action | Effet d'Entrée : +2 ATK / +2 DEF à une carte alliée ciblée.

### Notes de Frais & Trésorerie — Gobelin comptable (sacs de pièces, ruse mercantile)
- `lucca.jpg` — **Lucca** | ★★★ | Créature | Effet d'Entrée : Réduit de 2 le coût de 2 carte(s) Notes de Frais & Trésorerie suivante(s) ce tour.
- `n2f.jpg` — **N2F** | ★★★ | Créature | Effet d'Entrée : Piochez 1 carte. Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) suivante(s) ce tour.
- `jenji.jpg` — **Jenji** | ★★★ | Créature | Aura : héros récupère 1 PV au début de votre tour.
- `notilus.jpg` — **Notilus** | ★★ | Créature | Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) Notes de Frais & Trésorerie suivante(s) ce tour.
- `onexpense.jpg` — **ONexpense** | ★★ | Créature | Effet d'Entrée : Héros récupère 2 PV.
- `yeap.jpg` — **Yeap** | ★★ | Créature | Effet d'Entrée : Piochez 1 carte.
- `sap-concur.jpg` — **SAP Concur** | ★★ | Créature | Effet d'Entrée : +2 DEF à une carte alliée du même domaine.
- `rydoo.jpg` — **Rydoo** | ★★ | Créature | Effet d'Entrée : Piochez 1 si vous contrôlez 2+ cartes Notes de Frais & Trésorerie.
- `expensya.jpg` — **Expensya** | ★★ | Créature | Charge.
- `carlabella.jpg` — **Carlabella** | ★ | Créature | Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- `pyeo.jpg` — **Pyeo** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `mooncard.jpg` — **Mooncard** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `spendesk.jpg` — **Spendesk** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `soldo.jpg` — **Soldo** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `openpaye.jpg` — **Openpaye** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `cloture-mensuelle.jpg` — **Clôture Mensuelle** | ★ | Action | Effet d'Entrée : Piochez 2, gardez 1 (le reste part au cimetière).
- `avance-sur-frais.jpg` — **Avance sur Frais** | ★★ | Action | Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) Notes de Frais & Trésorerie suivante(s) ce tour.

### Dématérialisation & Archives — Spectre archiviste (translucide, parchemins flottants)
- `numeno.jpg` — **Numeno** | ★★★ | Créature | Effet d'Entrée : Piochez 3, gardez 1 (le reste part au cimetière).
- `neoboxrh.jpg` — **neoboxRH** | ★★★ | Créature | Effet d'Entrée : Regardez les 3 cartes du dessus, choisissez celle que vous piocherez en premier.
- `esker.jpg` — **Esker** | ★★★ | Créature | Aura : héros récupère 1 PV à chaque mort d'une carte Dématérialisation & Archives.
- `zeendoc.jpg` — **Zeendoc** | ★★ | Créature | Effet d'Entrée : Regardez le dessus de la pioche ; vous pouvez la défausser pour piocher la suivante.
- `nuxeo.jpg` — **Nuxeo** | ★★ | Créature | Effet d'Entrée : Regardez le dessus de la pioche adverse.
- `primobox.jpg` — **Primobox** | ★★ | Créature | Effet d'Entrée : Regardez les 2 cartes du dessus de votre pioche.
- `digiposte.jpg` — **Digiposte** | ★★ | Créature | Effet Final : Piochez 1 carte.
- `coffreo.jpg` — **Coffreo** | ★★ | Créature | Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- `digitech.jpg` — **DigiTech** | ★★ | Créature | Carte vanille (aucune capacité spéciale).
- `dimo-archives.jpg` — **Dimo** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `numerize.jpg` — **Numerize** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `securibox.jpg` — **Securibox** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `docaposte.jpg` — **Docaposte** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `peopledoc.jpg` — **PeopleDoc** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `cs-archives.jpg` — **CS** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `signature-electronique.jpg` — **Signature Électronique** | ★ | Action | Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- `purge-rgpd.jpg` — **Purge RGPD** | ★★ | Action | Effet d'Entrée : Filtre le dessus de la pioche puis pioche une carte.

### Mobilité & Intégration — Fée voyageuse (ailes, mouvement/vitesse)
- `atlas-mobilite.jpg` — **Atlas** | ★★★ | Créature | Charge. Effet d'Entrée : +2 ATK à toutes vos cartes Mobilité & Intégration en jeu (ce tour-ci).
- `helma-international.jpg` — **Helma International** | ★★★ | Créature | Effet d'Entrée : Piochez 2 cartes.
- `topia.jpg` — **Topia** | ★★★ | Créature | Charge.
- `airinc.jpg` — **AIRINC** | ★★ | Créature | Effet d'Entrée : +2 ATK à une carte alliée ciblée.
- `rival.jpg` — **RIVAL** | ★★ | Créature | Charge.
- `talmundo.jpg` — **Talmundo** | ★★ | Créature | Effet d'Entrée : Piochez 1 carte.
- `staff-and-go.jpg` — **Staff & Go** | ★★ | Créature | Charge.
- `workelo.jpg` — **Workelo** | ★★ | Créature | Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- `heyteam.jpg` — **HeyTeam** | ★★ | Créature | Effet d'Entrée : Piochez 1 si vous contrôlez 2+ cartes Mobilité & Intégration.
- `knowmore.jpg` — **Knowmore** | ★ | Créature | Charge.
- `welcomapp.jpg` — **WelcomApp** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `wobee.jpg` — **Wobee** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `remote-com.jpg` — **Remote.com** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `oyster-hr.jpg` — **Oyster HR** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `papaya-global.jpg` — **Papaya Global** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `portail-accueil.jpg` — **Portail d'Accueil** | ★ | Action | Effet d'Entrée : +2 ATK à une carte alliée ciblée.
- `visa-express.jpg` — **Visa Express** | ★★ | Action | Effet d'Entrée : Piochez 1 si vous contrôlez 2+ cartes Mobilité & Intégration.

### Digital Workplace & IA — Entité-araignée numérique/IA (pattes mécaniques, fils lumineux)
- `powell-software.jpg` — **Powell Software** | ★★★ | Créature | Effet d'Entrée : Piochez 1 carte. Effet d'Entrée : Regardez la main adverse.
- `servicenow-rh.jpg` — **ServiceNow** | ★★★ | Créature | Effet d'Entrée : +1 ATK à toutes vos cartes Digital Workplace & IA en jeu (permanent).
- `intercom.jpg` — **Intercom** | ★★★ | Créature | Aura : +1 ATK au début de votre tour.
- `elium.jpg` — **elium** | ★★ | Créature | Effet d'Entrée : Piochez 1 carte.
- `happeo.jpg` — **happeo** | ★★ | Créature | Effet d'Entrée : +1 ATK à une carte alliée ciblée.
- `asana.jpg` — **Asana** | ★★ | Créature | Effet d'Entrée : Piochez 1 si votre main a 3 cartes ou moins.
- `trello.jpg` — **Trello** | ★★ | Créature | Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- `clevy.jpg` — **Clevy** | ★★ | Créature | Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) suivante(s) ce tour.
- `inbenta.jpg` — **inbenta** | ★★ | Créature | Effet d'Entrée : +1 DEF à une carte alliée du même domaine.
- `jalios.jpg` — **Jalios** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `lumapps.jpg` — **lumapps** | ★ | Créature | Charge.
- `notion.jpg` — **Notion** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `heavenhr.jpg` — **HeavenHR** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `crisp.jpg` — **Crisp** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `dydu.jpg` — **dydu** | ★ | Créature | Carte vanille (aucune capacité spéciale).
- `notification-push.jpg` — **Notification Push** | ★ | Action | Effet d'Entrée : Piochez 2 cartes.
- `mise-a-jour-systeme.jpg` — **Mise à Jour Système** | ★★★ | Action | Effet d'Entrée : +3 ATK à toutes vos cartes Digital Workplace & IA en jeu (permanent).

*(Fin de la liste — 205 cartes.)*

## Après génération

1. Récupère les 205 fichiers `.jpg` (soit via le zip `rhcard-art.zip`, soit un par un si Gemini les a donnés en plusieurs réponses).
2. Dépose-les dans le dossier `art/` du repo (à côté de `art/peoplespheres.jpg` déjà présent).
3. Pour chaque carte livrée, ajoute son id dans `REAL_ART_IDS` (`js/data/cardart.js`), ex. `['adp', 'jpg'],` — le jeu bascule alors automatiquement sur l'illustration réelle pour cette carte, avec retour à l'art génératif si jamais le fichier est absent ou corrompu.
4. Aucune autre modification n'est nécessaire.
