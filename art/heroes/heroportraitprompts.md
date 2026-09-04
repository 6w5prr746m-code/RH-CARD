# RH CARD — Portraits de Héros (12 prompts, un par domaine)

Ces 12 prompts génèrent les **portraits de héros** utilisés dans le badge rond
en haut/bas de l'écran de jeu — l'icône qui représente le joueur ou l'IA
selon le domaine choisi comme avatar (voir `renderHeroPortrait` dans
`js/ui/board.js`). Contrairement aux 205 cartes de la collection, ces
portraits ne représentent pas un éditeur SIRH précis : ils représentent
**le chef, l'incarnation la plus iconique de la race de créature du domaine**
— utilisée indifféremment pour le joueur, l'IA, ou (en duel local) l'un ou
l'autre des deux joueurs, selon le domaine qu'ils ont choisi comme avatar.

## Différences avec les prompts de cartes (voir `card-art-prompts.md`)

- **Cadrage buste/portrait** (tête et épaules, regard vers l'objectif), pas une pose d'action dynamique plein pied — ce portrait sera recadré en cercle dans l'interface, donc le visage doit rester bien centré et lisible même très recadré serré.
- **Un seul portrait par domaine** (pas un par carte) : c'est la figure la plus emblématique et la plus élevée en rang de sa race — le chef, l'ancien, le grand maître — pas un simple soldat.
- Même charte graphique par ailleurs (illustration peinte premium, aucun texte/logo, couleur du domaine en accent, aucun cadre/filigrane).

## Nommage et intégration

Chaque image doit être enregistrée sous le nom indiqué entre backticks (ex. `hero-paie-ga.jpg`), déposée dans **`art/heroes/`** (nouveau sous-dossier à créer). Le code n'est pas encore câblé pour lire ces fichiers — une fois les 12 images générées, dis-le moi et j'ajoute le mapping `HERO_FACE_REAL_IDS` (même principe que `REAL_ART_IDS` pour les cartes : le jeu affiche l'image réelle si présente, et retombe automatiquement sur l'emoji actuel sinon).

---

### 1. Paie / GA — Elfe gardien-soigneur (chef de guilde)  `hero-paie-ga`
- 🧝 Domaine : Paie / GA (#3b6fd1)
- **Prompt** :

> Premium fantasy trading-card portrait bust, painterly digital illustration (Magic: The Gathering / Hearthstone quality hero portrait, not an action card). The elder chieftain of the elven guardian-healer clan that leads the Paie / GA domain: a dignified, silver-haired elf with calm, kind eyes, wearing an ornate coin-and-ledger circlet as a mark of leadership, robes trimmed in deep blue (#3b6fd1) and soft gold thread, a faint warm healing glow resting in one open palm held near the chest. Head and shoulders framed, facing the viewer with quiet authority, centered and filling most of the frame. Backdrop: a softly blurred golden treasury-hall glow, out of focus behind the subject. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character. Format: square 1:1 image, at least 1024x1024px, portrait/bust composition (not a full dynamic action pose) so the face reads clearly even when cropped into a small circle. Absolutely no visible frame, border, rectangle, grid, crop-marks, watermark, signature, or any UI-like overlay anywhere in the image — pure illustration only.

### 2. GTA — Troll protecteur massif (capitaine de la garde)  `hero-gta`
- 🧌 Domaine : GTA (#3c9a5f)
- **Prompt** :

> Premium fantasy trading-card portrait bust, painterly digital illustration (Magic: The Gathering / Hearthstone quality hero portrait, not an action card). The battle-worn captain of the troll protector legion that leads the GTA domain: a broad, scarred troll with a stern but steady gaze, wearing a banded-plate gorget etched with clock-gear motifs, a heavy green (#3c9a5f) cloak clasped at one shoulder, a single old tusk-notch for every year of unbroken service. Head and shoulders framed, facing the viewer squarely, centered and filling most of the frame. Backdrop: a softly blurred torch-lit guardroom, out of focus behind the subject. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character. Format: square 1:1 image, at least 1024x1024px, portrait/bust composition (not a full dynamic action pose) so the face reads clearly even when cropped into a small circle. Absolutely no visible frame, border, rectangle, grid, crop-marks, watermark, signature, or any UI-like overlay anywhere in the image — pure illustration only.

### 3. Recrutement — Éclaireur/ninja agile (maître-éclaireur)  `hero-recrutement`
- 🥷 Domaine : Recrutement (#d1a53b)
- **Prompt** :

> Premium fantasy trading-card portrait bust, painterly digital illustration (Magic: The Gathering / Hearthstone quality hero portrait, not an action card). The master-scout who leads every ninja-scout of the Recrutement domain: a lean, hooded figure with sharp, alert amber eyes just visible beneath a low cowl, a golden (#d1a53b) sash marked with countless small route-sigils earned over years of successful hires, one gloved hand raised near the chin in a thoughtful, appraising gesture. Head and shoulders framed, facing the viewer with a keen, evaluating look, centered and filling most of the frame. Backdrop: a softly blurred windswept crossroads at dawn, out of focus behind the subject. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character. Format: square 1:1 image, at least 1024x1024px, portrait/bust composition (not a full dynamic action pose) so the face reads clearly even when cropped into a small circle. Absolutely no visible frame, border, rectangle, grid, crop-marks, watermark, signature, or any UI-like overlay anywhere in the image — pure illustration only.

### 4. Formation — Mage/sorcier en apprentissage (archimage-mentor)  `hero-formation`
- 🧙 Domaine : Formation (#d1723b)
- **Prompt** :

> Premium fantasy trading-card portrait bust, painterly digital illustration (Magic: The Gathering / Hearthstone quality hero portrait, not an action card). The senior archmage-mentor who oversees every apprentice of the Formation domain: a warm, weathered wizard with a long beard threaded with small living vines, wearing deep orange (#d1723b) robes embroidered with a slowly climbing growth-pattern, half-moon spectacles perched low, one hand resting on an open, gently glowing grimoire held at chest height. Head and shoulders framed, facing the viewer with a patient, encouraging expression, centered and filling most of the frame. Backdrop: a softly blurred sunlit study draped in climbing vines, out of focus behind the subject. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character. Format: square 1:1 image, at least 1024x1024px, portrait/bust composition (not a full dynamic action pose) so the face reads clearly even when cropped into a small circle. Absolutely no visible frame, border, rectangle, grid, crop-marks, watermark, signature, or any UI-like overlay anywhere in the image — pure illustration only.

### 5. Talent / Performance — Dragon ou dracain puissant (dragon-alpha)  `hero-talent-perf`
- 🐉 Domaine : Talent / Performance (#b03b3b)
- **Prompt** :

> Premium fantasy trading-card portrait bust, painterly digital illustration (Magic: The Gathering / Hearthstone quality hero portrait, not an action card). The undefeated alpha-dragon champion who leads every dracain of the Talent / Performance domain: a powerful, battle-scarred dragon head and neck, deep red (#b03b3b) scales catching hard light, small arcs of static electricity crackling faintly between two short, thick horns, eyes narrowed with fierce, confident intensity. Head and shoulders/neck framed, facing the viewer head-on with dominant presence, centered and filling most of the frame. Backdrop: a softly blurred storm-lit arena, out of focus behind the subject. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character. Format: square 1:1 image, at least 1024x1024px, portrait/bust composition (not a full dynamic action pose) so the face reads clearly even when cropped into a small circle. Absolutely no visible frame, border, rectangle, grid, crop-marks, watermark, signature, or any UI-like overlay anywhere in the image — pure illustration only.

### 6. Pilotage / BI — Sage-hibou/oracle (grand oracle)  `hero-pilotage-bi`
- 🦉 Domaine : Pilotage / BI (#7d3bd1)
- **Prompt** :

> Premium fantasy trading-card portrait bust, painterly digital illustration (Magic: The Gathering / Hearthstone quality hero portrait, not an action card). The grand oracle who leads every owl-sage of the Pilotage / BI domain: a tall, dignified owl-spirit with wide, luminous violet-gold eyes (#7d3bd1 accent) that seem to hold shifting constellations, feathers patterned like a faint star-chart, a small halo of drifting light-motes just above the head. Head and shoulders framed, facing the viewer with an unblinking, all-knowing gaze, centered and filling most of the frame. Backdrop: a softly blurred starlit observatory, out of focus behind the subject. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character. Format: square 1:1 image, at least 1024x1024px, portrait/bust composition (not a full dynamic action pose) so the face reads clearly even when cropped into a small circle. Absolutely no visible frame, border, rectangle, grid, crop-marks, watermark, signature, or any UI-like overlay anywhere in the image — pure illustration only.

### 7. Prévention & Sécurité — Golem de garde (grand gardien de pierre)  `hero-prevention`
- 🗿 Domaine : Prévention & Sécurité (#2ea3a3)
- **Prompt** :

> Premium fantasy trading-card portrait bust, painterly digital illustration (Magic: The Gathering / Hearthstone quality hero portrait, not an action card). The great stone warden who commands every guardian-golem of the Prévention & Sécurité domain: a massive carved-granite head and shoulders, deep teal (#2ea3a3) warning-runes glowing faintly in every seam, a single steady lantern-eye set in the center of the brow, ancient moss softening otherwise sharp stone features. Head and shoulders framed, facing the viewer with immovable, watchful calm, centered and filling most of the frame. Backdrop: a softly blurred fog-wrapped checkpoint, out of focus behind the subject. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character. Format: square 1:1 image, at least 1024x1024px, portrait/bust composition (not a full dynamic action pose) so the face reads clearly even when cropped into a small circle. Absolutely no visible frame, border, rectangle, grid, crop-marks, watermark, signature, or any UI-like overlay anywhere in the image — pure illustration only.

### 8. Conformité & Rémunération — Djinn du droit (grand arbitre)  `hero-conformite`
- 🧞 Domaine : Conformité & Rémunération (#5a5a8a)
- **Prompt** :

> Premium fantasy trading-card portrait bust, painterly digital illustration (Magic: The Gathering / Hearthstone quality hero portrait, not an action card). The grand arbiter who presides over every law-djinn of the Conformité & Rémunération domain: a stern, regal smoke-bodied djinn head and shoulders, deep slate-violet (#5a5a8a) robes dissolving into fine legal script at the edges, a crown of small floating wax seals orbiting the brow, eyes that seem to read something just past the viewer. Head and shoulders framed, facing the viewer with formal, unshakeable authority, centered and filling most of the frame. Backdrop: a softly blurred marble tribunal chamber, out of focus behind the subject. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character. Format: square 1:1 image, at least 1024x1024px, portrait/bust composition (not a full dynamic action pose) so the face reads clearly even when cropped into a small circle. Absolutely no visible frame, border, rectangle, grid, crop-marks, watermark, signature, or any UI-like overlay anywhere in the image — pure illustration only.

### 9. Notes de Frais & Trésorerie — Gobelin comptable (maître de guilde)  `hero-tresorerie`
- 👺 Domaine : Notes de Frais & Trésorerie (#8a6b2f)
- **Prompt** :

> Premium fantasy trading-card portrait bust, painterly digital illustration (Magic: The Gathering / Hearthstone quality hero portrait, not an action card). The shrewd guildmaster who leads every counting-goblin of the Notes de Frais & Trésorerie domain: a grinning, sharp-toothed goblin head and shoulders, warm bronze-gold (#8a6b2f) robes lined with dozens of tiny coin-charms, spectacles pushed up on the forehead, one clawed hand raised holding a single gleaming coin up to the light. Head and shoulders framed, facing the viewer with a sly, satisfied smile, centered and filling most of the frame. Backdrop: a softly blurred candlelit counting-house, out of focus behind the subject. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character. Format: square 1:1 image, at least 1024x1024px, portrait/bust composition (not a full dynamic action pose) so the face reads clearly even when cropped into a small circle. Absolutely no visible frame, border, rectangle, grid, crop-marks, watermark, signature, or any UI-like overlay anywhere in the image — pure illustration only.

### 10. Dématérialisation & Archives — Spectre archiviste (archiviste en chef)  `hero-archives`
- 👻 Domaine : Dématérialisation & Archives (#4a6b5a)
- **Prompt** :

> Premium fantasy trading-card portrait bust, painterly digital illustration (Magic: The Gathering / Hearthstone quality hero portrait, not an action card). The eldest archivist-spectre who watches over every ghost of the Dématérialisation & Archives domain: a translucent, dignified ghost head and shoulders, faint sage-green (#4a6b5a) glow bleeding through tattered librarian's robes, half-faded spectacles, a small ring of glowing file-tags drifting slowly around the head like a halo. Head and shoulders framed, facing the viewer with a solemn, knowing expression, centered and filling most of the frame. Backdrop: a softly blurred candlelit archive of endless shelves, out of focus behind the subject. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character. Format: square 1:1 image, at least 1024x1024px, portrait/bust composition (not a full dynamic action pose) so the face reads clearly even when cropped into a small circle. Absolutely no visible frame, border, rectangle, grid, crop-marks, watermark, signature, or any UI-like overlay anywhere in the image — pure illustration only.

### 11. Mobilité & Intégration — Fée voyageuse (reine des chemins)  `hero-mobilite`
- 🧚 Domaine : Mobilité & Intégration (#c93b7a)
- **Prompt** :

> Premium fantasy trading-card portrait bust, painterly digital illustration (Magic: The Gathering / Hearthstone quality hero portrait, not an action card). The tireless wayfinder-queen who leads every traveler-fairy of the Mobilité & Intégration domain: a bright, wind-swept fairy head and shoulders, delicate dragonfly-wing motifs traced in warm pink-magenta (#c93b7a) light behind the head, a small glowing compass pendant at the throat, hair caught mid-motion as if always about to depart. Head and shoulders framed, facing the viewer with an eager, welcoming smile, centered and filling most of the frame. Backdrop: a softly blurred sunset sky crossed by glowing travel-routes, out of focus behind the subject. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character. Format: square 1:1 image, at least 1024x1024px, portrait/bust composition (not a full dynamic action pose) so the face reads clearly even when cropped into a small circle. Absolutely no visible frame, border, rectangle, grid, crop-marks, watermark, signature, or any UI-like overlay anywhere in the image — pure illustration only.

### 12. Digital Workplace & IA — Entité-araignée numérique (cœur du réseau)  `hero-reseau`
- 👾 Domaine : Digital Workplace & IA (#4aa8d1)
- **Prompt** :

> Premium fantasy trading-card portrait bust, painterly digital illustration (Magic: The Gathering / Hearthstone quality hero portrait, not an action card). The central hub-intelligence that commands every digital spider-construct of the Digital Workplace & IA domain: a sleek, angular AI-construct head and shoulders assembled from softly humming light-panels, cool sky-blue (#4aa8d1) circuitry-like markings pulsing gently across a glassy translucent surface, a single bright status-light where an eye would be, fine light-threads trailing from the shoulders like a cloak. Head and shoulders framed, facing the viewer with a calm, precise, faintly luminous presence, centered and filling most of the frame. Backdrop: a softly blurred dark server-hall lit by drifting threads of light, out of focus behind the subject. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character. Format: square 1:1 image, at least 1024x1024px, portrait/bust composition (not a full dynamic action pose) so the face reads clearly even when cropped into a small circle. Absolutely no visible frame, border, rectangle, grid, crop-marks, watermark, signature, or any UI-like overlay anywhere in the image — pure illustration only.
