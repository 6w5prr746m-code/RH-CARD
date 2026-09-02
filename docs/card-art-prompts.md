# RH CARD — Card Illustration Prompts (fantasy/heroic direction, v2)

One image-generation prompt per card (97 total), for an external image model
(Midjourney, DALL-E, Gemini/"nano banana", Stable Diffusion, etc.). Generate
each image, then drop the result at `art/<card-id>.png` and add the id to
`REAL_ART_IDS` in `js/data/cardart.js` — the game automatically prefers the
real image over the generative placeholder for that card, and falls back to
the placeholder automatically if the file is ever missing or fails to load.

**Changelog vs the previous version**: several generated images came out
looking too similar to each other. This version composes each prompt from
five independent, deterministically-picked axes (body/silhouette, pose,
signature prop, backdrop, material accent) instead of one short domain
description, plus a gameplay-derived visual flourish pulled from the card's
actual ability — so two cards in the same domain and archetype now differ in
pose, prop, setting, and finish, not just in name.

## Art direction (shared style guide — keep every card consistent)

- **Concept**: each card is reimagined as a **heroic fantasy character** —
  a champion, a construct/golem, or a monster/beast — not a literal software
  product. The real SIRH editor name only survives as a **fantasy nickname**
  ("PayFit, the Swift Paymaster") and a one-line in-universe legend; the
  *visual* is 100% fantasy trading-card art (think Magic: The Gathering /
  Hearthstone splash art), never a screenshot, logo, or corporate scene.
- **No literal logos, wordmarks, or real-world branding** anywhere in the
  image, and **no readable text**.
- **Three archetypes**: 🦸 Hero (humanoid champion), 🗿 Golem/Construct
  (magical machine or animated statue), 🐉 Monster/Beast (creature).
- **Domain identity carries through materials, not logos** (coins/ledgers
  for Paie/GA, shields/gears for GTA, bows/compasses for Recrutement,
  vines/growth for Formation, lightning/energy for Talent-Performance,
  charts/data-nodes for Pilotage/BI).
- **Palette**: the domain's hex color drives armor trim / glow / hide
  markings, kept consistent across the set.
- **Composition**: dynamic pose, dramatic rim lighting, painterly digital
  illustration (not photorealistic, not 3D render, not flat vector).
- **Detail scales with rarity**: cleaner for 1★ commons, increasingly epic
  for 3★ and the legendary card.
- **Mood**: heroic, awe-inspiring, a little larger-than-life.

Each entry gives: real name + fantasy nickname (context only), archetype,
domain + hex color, rarity, one-line legend, ability context, and the
ready-to-paste prompt.

---


## Légendaire

### 1. PeopleSpheres — *PeopleSpheres, l'Unificateur des Six Domaines*  `peoplespheres`
- 👑 Déité unificatrice · Domaine : Transversal (#7d3bd1) · Rareté : ∞
- Légende : PeopleSpheres ne choisit pas de camp : elle unit tous les domaines sous une seule bannière.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Synchronisation Universelle : pour chaque domaine différent en jeu (max 6), +1/+1/+1, piochez 1 carte et soignez 1 PV. Compte comme membre des 6 domaines pour les synergies.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration. A radiant, transcendent hero-deity figure standing at the convergence of six glowing pathways (one per domain: gold coins, steel shields, scouting arrows, blooming vines, crackling lightning, and streaming data-light), their form and armor woven from all six motifs merging into one being. Dominant color accent: deep violet (#7d3bd1) with rainbow glints from the six domain colors. legendary-tier grandeur: the most epic, elaborate, and luminous composition in the set, dramatic god-rays, sweeping scale. Dramatic god-rays, sweeping heroic pose, no readable text, no logos, no real-world branding, no photorealism, no 3D render — a unifying "platform deity" that towers above every other card in the set.

## Paie / GA

### 2. Audit Paie Express — *Audit Paie Express, the Vigilant Treasury Guardian*  `audit-paie-express`
- 🗿 Golem · Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Légende : Selon la légende, Audit Paie Express n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Héros récupère 3 PV. Effet d'Entrée : Récupère une carte Paie / GA du deck.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a hulking vault-golem with a chest like a bank-vault door, gears and coin-slots embedded in its stone body, reared up to full height, asserting dominance, bearing an ornate abacus staff topped with a spinning coin, etched with fine obsidian inlay. Backdrop: a marble counting-house atrium under warm golden light. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a soft healing glow gathering faintly around their hands. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "Audit Paie Express, the Vigilant Treasury Guardian" for flavor only.

### 3. Deel — *Deel, the Vigilant Treasury Guardian*  `deel`
- 🗿 Golem · Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Légende : Selon la légende, Deel n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Héros récupère 1 PV.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a rolling treasury-cart golem with wheel-like coin-hubs and a ledger-scroll banner, reared up to full height, asserting dominance, bearing an ornate abacus staff topped with a spinning coin, etched with fine obsidian inlay. Backdrop: a mountain of minted coins rising into soft mist. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a soft healing glow gathering faintly around their hands. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "Deel, the Vigilant Treasury Guardian" for flavor only.

### 4. Insér — *Insér, the Unyielding Vault Warden*  `inser`
- 🦸 Hero · Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Légende : Selon la légende, Insér n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a veiled treasury oracle wrapped in chain woven from minted coins, frozen in a dramatic three-quarter power stance, bearing a coin-purse overflowing with softly glowing currency, wrapped in frayed ceremonial cloth. Backdrop: an endless vault corridor glowing with stacked gold. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "Insér, the Unyielding Vault Warden" for flavor only.

### 5. Nibelis — *Nibelis, the Cunning Treasury Guardian*  `nibelis`
- 🗿 Golem · Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Légende : Selon la légende, Nibelis n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a hulking vault-golem with a chest like a bank-vault door, gears and coin-slots embedded in its stone body, leaping into action with cloak/mane flaring behind, bearing a vault-key wrought from solid gold, etched with fine obsidian inlay. Backdrop: a marble counting-house atrium under warm golden light. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "Nibelis, the Cunning Treasury Guardian" for flavor only.

### 6. NovRH — *NovRH, the Gleaming Vault Warden*  `novrh`
- 🗿 Golem · Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Légende : Selon la légende, NovRH n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a hulking vault-golem with a chest like a bank-vault door, gears and coin-slots embedded in its stone body, arms/limbs spread wide in a triumphant display of power, bearing a glowing coin-scale balanced perfectly in one hand, dusted with fine motes of drifting light. Backdrop: a vast treasury hall lined with towering coin-pillars. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "NovRH, the Gleaming Vault Warden" for flavor only.

### 7. PayFit — *PayFit, the Relentless Vault Warden*  `payfit`
- 🦸 Hero · Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Légende : Selon la légende, PayFit n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Charge.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a broad-shouldered exchequer-warrior whose pauldrons are stamped with vault-seal insignia, balanced on uneven footing atop rubble or broken terrain, bearing a glowing coin-scale balanced perfectly in one hand, wrapped in weathered leather bindings. Backdrop: a grand ledger-archive with shelves stretching into the distance. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "PayFit, the Relentless Vault Warden" for flavor only.

### 8. Sigma-RH — *Sigma-RH, the Ancient Ledger Keeper*  `sigma-rh`
- 🦸 Hero · Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Légende : Selon la légende, Sigma-RH n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a stoic paymaster-knight in gold-trimmed armor etched with ledger-line engravings, caught mid-stride in a confident forward advance, bearing a vault-key wrought from solid gold, inlaid with faintly glowing runic script. Backdrop: a marble counting-house atrium under warm golden light. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "Sigma-RH, the Ancient Ledger Keeper" for flavor only.

### 9. Cegedim — *Cegedim, the Silent Coin Sentinel*  `cegedim`
- 🗿 Golem · Domaine : Paie / GA (#3b6fd1) · Rareté : ★★
- Légende : Selon la légende, Cegedim n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Aura : héros récupère 1 PV à chaque mort d'une carte Paie / GA.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a rolling treasury-cart golem with wheel-like coin-hubs and a ledger-scroll banner, striding forward through drifting embers or motes of light, bearing a massive iron ledger-tome bound in gold chains, accented with small cascading embers. Backdrop: an endless vault corridor glowing with stacked gold. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "Cegedim, the Silent Coin Sentinel" for flavor only.

### 10. Cegid — *Cegid, the Steadfast Coin Sentinel*  `cegid`
- 🗿 Golem · Domaine : Paie / GA (#3b6fd1) · Rareté : ★★
- Légende : Selon la légende, Cegid n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +2 DEF à une carte alliée du même domaine.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a towering statue of fused coinage, cracks glowing with molten gold light, crouched and coiled, ready to spring, bearing an ornate abacus staff topped with a spinning coin, etched with fine obsidian inlay. Backdrop: a mountain of minted coins rising into soft mist. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a faint empowering aura reaching out toward an unseen ally. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "Cegid, the Steadfast Coin Sentinel" for flavor only.

### 11. Ceridian Dayforce — *Ceridian Dayforce, the Swift Vault Warden*  `ceridian-dayforce`
- 🗿 Golem · Domaine : Paie / GA (#3b6fd1) · Rareté : ★★
- Légende : Selon la légende, Ceridian Dayforce n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Héros récupère 2 PV.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a slender counting-house automaton with an abacus-frame ribcage and coin-disc joints, arms/limbs spread wide in a triumphant display of power, bearing a coin-purse overflowing with softly glowing currency, dusted with fine motes of drifting light. Backdrop: a marble counting-house atrium under warm golden light. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a soft healing glow gathering faintly around their hands. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "Ceridian Dayforce, the Swift Vault Warden" for flavor only.

### 12. Infor — *Infor, the Silent Paymaster*  `infor`
- 🗿 Golem · Domaine : Paie / GA (#3b6fd1) · Rareté : ★★
- Légende : Selon la légende, Infor n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Héros récupère 2 PV.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a squat, immovable strongbox-golem, its armored plates stamped with ledger-grid patterns, standing tall in a commanding, wide-legged guard stance, bearing an ornate abacus staff topped with a spinning coin, accented with small cascading embers. Backdrop: a mountain of minted coins rising into soft mist. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a soft healing glow gathering faintly around their hands. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "Infor, the Silent Paymaster" for flavor only.

### 13. SD Worx — *SD Worx, the Silent Coin Sentinel*  `sd-worx`
- 🗿 Golem · Domaine : Paie / GA (#3b6fd1) · Rareté : ★★
- Légende : Selon la légende, SD Worx n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Effet Final : Héros récupère 2 PV.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a rolling treasury-cart golem with wheel-like coin-hubs and a ledger-scroll banner, caught mid-stride in a confident forward advance, bearing a vault-key wrought from solid gold, inlaid with faintly glowing runic script. Backdrop: a mountain of minted coins rising into soft mist. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a soft healing glow gathering faintly around their hands. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "SD Worx, the Silent Coin Sentinel" for flavor only.

### 14. Talentia — *Talentia, the Silent Coin Sentinel*  `talentia`
- 🐉 Monster · Domaine : Paie / GA (#3b6fd1) · Rareté : ★★
- Légende : Selon la légende, Talentia n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Héros récupère 1 PV.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a small vault-hound beast with a coin-plated hide and a ledger-line mane, striding forward through drifting embers or motes of light, bearing a vault-key wrought from solid gold, accented with small cascading embers. Backdrop: a vast treasury hall lined with towering coin-pillars. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a soft healing glow gathering faintly around their hands. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "Talentia, the Silent Coin Sentinel" for flavor only.

### 15. ADP — *ADP, the Relentless Treasury Guardian*  `adp`
- 🗿 Golem · Domaine : Paie / GA (#3b6fd1) · Rareté : ★★★
- Légende : Selon la légende, ADP n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Aura : dégâts subis par votre héros réduits de 1. Effet d'Entrée : Héros récupère 4 PV.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a slender counting-house automaton with an abacus-frame ribcage and coin-disc joints, balanced on uneven footing atop rubble or broken terrain, bearing a strongbox shield emblazoned with a ledger-grid sigil, wrapped in weathered leather bindings. Backdrop: an endless vault corridor glowing with stacked gold. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a soft healing glow gathering faintly around their hands. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "ADP, the Relentless Treasury Guardian" for flavor only.

### 16. Oracle — *Oracle, the Steadfast Coin Sentinel*  `oracle`
- 🐉 Monster · Domaine : Paie / GA (#3b6fd1) · Rareté : ★★★
- Légende : Selon la légende, Oracle n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Aura : héros récupère 2 PV au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a serpentine coin-drake with scales like overlapping gold coins, coiled atop a hoard, leaping into action with cloak/mane flaring behind, bearing an ornate abacus staff topped with a spinning coin, edged in oxidized bronze detailing. Backdrop: an endless vault corridor glowing with stacked gold. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "Oracle, the Steadfast Coin Sentinel" for flavor only.

### 17. SAP SuccessFactors — *SAP SuccessFactors, the Vigilant Coin Sentinel*  `sap-successfactors`
- 🦸 Hero · Domaine : Paie / GA (#3b6fd1) · Rareté : ★★★
- Légende : Selon la légende, SAP SuccessFactors n'a jamais laissé un compte en souffrance, veillant sur chaque pièce comme sur un trésor sacré.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Héros récupère 3 PV. Effet d'Entrée : Récupère une carte Paie / GA du deck.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a composed treasury champion in navy-and-gold plate mail, a great ledger-tome chained to their hip, reared up to full height, asserting dominance, bearing a vault-key wrought from solid gold, edged in oxidized bronze detailing. Backdrop: a marble counting-house atrium under warm golden light. Accent color #3b6fd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a soft healing glow gathering faintly around their hands. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Paie / GA" theme, named "SAP SuccessFactors, the Vigilant Coin Sentinel" for flavor only.

## GTA

### 18. Alerte Absentéisme — *Alerte Absentéisme, the Vigilant Clockwork Guardian*  `alerte-absenteisme`
- 🦸 Hero · Domaine : GTA (#3c9a5f) · Rareté : ★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Alerte Absentéisme.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +2 DEF à toutes vos cartes GTA en jeu (ce tour-ci).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a disciplined bastion-guard in layered plate armor, an hourglass-tipped mace in hand, crouched and coiled, ready to spring, bearing a tower-shield etched with a rotating gear-clock face, edged in oxidized bronze detailing. Backdrop: a fortress interior lit by rows of slow-turning gears. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: radiant energy visibly spreading outward from them. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Alerte Absentéisme, the Vigilant Clockwork Guardian" for flavor only.

### 19. Domino — *Domino, the Silent Time Warden*  `domino`
- 🐉 Monster · Domaine : GTA (#3c9a5f) · Rareté : ★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Domino.
- Contexte gameplay (inspiration uniquement) : Provocation.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a coiled rampart-serpent with brick-textured scales, standing tall in a commanding, wide-legged guard stance, bearing a set of interlocking brass keys hanging from a chain, accented with small cascading embers. Backdrop: a rampart walkway lined with banners, overlooking a misty valley. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: standing protectively between the viewer and unseen danger, shield or bulk forward. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Domino, the Silent Time Warden" for flavor only.

### 20. Élap — *Élap, the Resolute Clockwork Guardian*  `elap`
- 🦸 Hero · Domaine : GTA (#3c9a5f) · Rareté : ★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Élap.
- Contexte gameplay (inspiration uniquement) : Provocation.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a disciplined bastion-guard in layered plate armor, an hourglass-tipped mace in hand, caught mid-stride in a confident forward advance, bearing a set of interlocking brass keys hanging from a chain, accented with small cascading embers. Backdrop: a besieged gatehouse with drawbridge chains glowing faintly. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: standing protectively between the viewer and unseen danger, shield or bulk forward. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Élap, the Resolute Clockwork Guardian" for flavor only.

### 21. incotec OHRIS — *incotec OHRIS, the Gleaming Fortress Sentinel*  `incotec-ohris`
- 🗿 Golem · Domaine : GTA (#3c9a5f) · Rareté : ★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de incotec OHRIS.
- Contexte gameplay (inspiration uniquement) : Provocation.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a bastion-golem built from interlocking stone shield-plates and clockwork gears, its core a glowing hourglass, arms/limbs spread wide in a triumphant display of power, bearing a folded battle-standard bearing a calendar-grid emblem, trimmed in tarnished silver filigree. Backdrop: a fortress interior lit by rows of slow-turning gears. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: standing protectively between the viewer and unseen danger, shield or bulk forward. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "incotec OHRIS, the Gleaming Fortress Sentinel" for flavor only.

### 22. Timeplus — *Timeplus, the Radiant Time Warden*  `timeplus`
- 🗿 Golem · Domaine : GTA (#3c9a5f) · Rareté : ★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Timeplus.
- Contexte gameplay (inspiration uniquement) : Provocation.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a colossal gate-golem, its chest a slowly opening iron portcullis, frozen in a dramatic three-quarter power stance, bearing a folded battle-standard bearing a calendar-grid emblem, wrapped in frayed ceremonial cloth. Backdrop: a fortress interior lit by rows of slow-turning gears. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: standing protectively between the viewer and unseen danger, shield or bulk forward. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Timeplus, the Radiant Time Warden" for flavor only.

### 23. Visual Planning — *Visual Planning, the Resolute Time Warden*  `visual-planning`
- 🗿 Golem · Domaine : GTA (#3c9a5f) · Rareté : ★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Visual Planning.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a segmented drawbridge-golem, chains rattling from its armored limbs, standing tall in a commanding, wide-legged guard stance, bearing a set of interlocking brass keys hanging from a chain, accented with small cascading embers. Backdrop: a fortress interior lit by rows of slow-turning gears. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: one eye closed in focused foresight, the other glowing faintly. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Visual Planning, the Resolute Time Warden" for flavor only.

### 24. Weekera — *Weekera, the Silent Shield Bearer*  `weekera`
- 🐉 Monster · Domaine : GTA (#3c9a5f) · Rareté : ★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Weekera.
- Contexte gameplay (inspiration uniquement) : Provocation.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a great watch-owl beast with clock-gear feathers and a lantern-lit gaze, striding forward through drifting embers or motes of light, bearing a lantern that projects a shifting clock-face beam, accented with small cascading embers. Backdrop: a rampart walkway lined with banners, overlooking a misty valley. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: standing protectively between the viewer and unseen danger, shield or bulk forward. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Weekera, the Silent Shield Bearer" for flavor only.

### 25. Bodet — *Bodet, the Cunning Bastion Knight*  `bodet`
- 🗿 Golem · Domaine : GTA (#3c9a5f) · Rareté : ★★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Bodet.
- Contexte gameplay (inspiration uniquement) : Provocation.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a towering sentinel-construct wrapped in overlapping armor plates that rotate like clock hands, crouched and coiled, ready to spring, bearing a tower-shield etched with a rotating gear-clock face, edged in oxidized bronze detailing. Backdrop: an ancient clocktower courtyard lit by a massive gear-mechanism. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: standing protectively between the viewer and unseen danger, shield or bulk forward. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Bodet, the Cunning Bastion Knight" for flavor only.

### 26. Combo — *Combo, the Ancient Bastion Knight*  `combo`
- 🦸 Hero · Domaine : GTA (#3c9a5f) · Rareté : ★★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Combo.
- Contexte gameplay (inspiration uniquement) : Provocation.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a towering rampart-warrior clad in interlocking brick-patterned armor, striding forward through drifting embers or motes of light, bearing a lantern that projects a shifting clock-face beam, inlaid with faintly glowing runic script. Backdrop: a besieged gatehouse with drawbridge chains glowing faintly. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: standing protectively between the viewer and unseen danger, shield or bulk forward. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Combo, the Ancient Bastion Knight" for flavor only.

### 27. Octime — *Octime, the Towering Bastion Knight*  `octime`
- 🦸 Hero · Domaine : GTA (#3c9a5f) · Rareté : ★★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Octime.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +2 DEF à une carte alliée du même domaine.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a towering rampart-warrior clad in interlocking brick-patterned armor, kneeling low before rising into motion, gathering energy, bearing an hourglass-headed war-hammer, dusted with fine motes of drifting light. Backdrop: a rampart walkway lined with banners, overlooking a misty valley. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a faint empowering aura reaching out toward an unseen ally. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Octime, the Towering Bastion Knight" for flavor only.

### 28. Skello — *Skello, the Vigilant Shield Bearer*  `skello`
- 🐉 Monster · Domaine : GTA (#3c9a5f) · Rareté : ★★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Skello.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +1 DEF à toutes vos cartes GTA en jeu (ce tour-ci).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a hulking guardian-beast whose hide is fused with interlocking shield scales, reared up to full height, asserting dominance, bearing a set of interlocking brass keys hanging from a chain, edged in oxidized bronze detailing. Backdrop: a fortress interior lit by rows of slow-turning gears. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: radiant energy visibly spreading outward from them. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Skello, the Vigilant Shield Bearer" for flavor only.

### 29. Tamigo — *Tamigo, the Swift Bastion Knight*  `tamigo`
- 🗿 Golem · Domaine : GTA (#3c9a5f) · Rareté : ★★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Tamigo.
- Contexte gameplay (inspiration uniquement) : Provocation. Effet d'Entrée : Piochez 1 si vous contrôlez 2+ cartes GTA.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a segmented drawbridge-golem, chains rattling from its armored limbs, arms/limbs spread wide in a triumphant display of power, bearing an hourglass-headed war-hammer, dusted with fine motes of drifting light. Backdrop: a rampart walkway lined with banners, overlooking a misty valley. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: standing protectively between the viewer and unseen danger, shield or bulk forward. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Tamigo, the Swift Bastion Knight" for flavor only.

### 30. ZeTime — *ZeTime, the Resolute Shield Bearer*  `zetime`
- 🗿 Golem · Domaine : GTA (#3c9a5f) · Rareté : ★★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de ZeTime.
- Contexte gameplay (inspiration uniquement) : Provocation.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a colossal gate-golem, its chest a slowly opening iron portcullis, striding forward through drifting embers or motes of light, bearing a lantern that projects a shifting clock-face beam, inlaid with faintly glowing runic script. Backdrop: a fortress interior lit by rows of slow-turning gears. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: standing protectively between the viewer and unseen danger, shield or bulk forward. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "ZeTime, the Resolute Shield Bearer" for flavor only.

### 31. Chronotime — *Chronotime, the Cunning Bastion Knight*  `chronotime`
- 🦸 Hero · Domaine : GTA (#3c9a5f) · Rareté : ★★★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Chronotime.
- Contexte gameplay (inspiration uniquement) : Provocation. Aura : dégâts reçus par cette carte au combat réduits de 1.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a disciplined bastion-guard in layered plate armor, an hourglass-tipped mace in hand, leaping into action with cloak/mane flaring behind, bearing a tower-shield etched with a rotating gear-clock face, edged in oxidized bronze detailing. Backdrop: a fortress interior lit by rows of slow-turning gears. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: standing protectively between the viewer and unseen danger, shield or bulk forward. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Chronotime, the Cunning Bastion Knight" for flavor only.

### 32. Horoquartz — *Horoquartz, the Radiant Time Warden*  `horoquartz`
- 🐉 Monster · Domaine : GTA (#3c9a5f) · Rareté : ★★★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Horoquartz.
- Contexte gameplay (inspiration uniquement) : Provocation. Effet d'Entrée : +3 DEF à la carte alliée du domaine avec le plus faible DEF.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a hulking guardian-beast whose hide is fused with interlocking shield scales, mid-turn, glancing back over one shoulder as if just alerted, bearing a coiled measuring-chain used as both tool and weapon, wrapped in frayed ceremonial cloth. Backdrop: an ancient clocktower courtyard lit by a massive gear-mechanism. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: standing protectively between the viewer and unseen danger, shield or bulk forward. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Horoquartz, the Radiant Time Warden" for flavor only.

### 33. Kelio — *Kelio, the Cunning Time Warden*  `kelio`
- 🦸 Hero · Domaine : GTA (#3c9a5f) · Rareté : ★★★
- Légende : Aucune brèche dans le temps ou les rangs n'a jamais franchi la garde de Kelio.
- Contexte gameplay (inspiration uniquement) : Provocation. Effet d'Entrée : +2 DEF à toutes vos cartes GTA en jeu (permanent).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a stern timekeeper-paladin with a shield-arm fused into a rotating gear-disc, leaping into action with cloak/mane flaring behind, bearing a tower-shield etched with a rotating gear-clock face, etched with fine obsidian inlay. Backdrop: a besieged gatehouse with drawbridge chains glowing faintly. Accent color #3c9a5f used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: standing protectively between the viewer and unseen danger, shield or bulk forward. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "GTA" theme, named "Kelio, the Cunning Time Warden" for flavor only.

## Recrutement

### 34. CleverConnect — *CleverConnect, the Unyielding Beacon Ranger*  `cleverconnect`
- 🦸 Hero · Domaine : Recrutement (#d1a53b) · Rareté : ★
- Légende : Selon la légende, CleverConnect repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a swift trailblazer cloaked in wind-torn fabric, twin daggers drawn, frozen in a dramatic three-quarter power stance, bearing a set of throwing daggers etched with tiny crosshair runes, wrapped in weathered leather bindings. Backdrop: a dense forest trail marked with glowing scouting-runes. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: one eye closed in focused foresight, the other glowing faintly. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "CleverConnect, the Unyielding Beacon Ranger" for flavor only.

### 35. Eolia — *Eolia, the Silent Scout Warden*  `eolia`
- 🗿 Golem · Domaine : Recrutement (#d1a53b) · Rareté : ★
- Légende : Selon la légende, Eolia repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) suivante(s) ce tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a slender scouting-construct with articulated brass limbs and a rotating targeting lens for a head, caught mid-stride in a confident forward advance, bearing a hunting horn wrapped in trail-marker ribbons, accented with small cascading embers. Backdrop: an open plain under a sky streaked with compass-like light trails. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a shimmer of discount-runes trailing from their hand. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "Eolia, the Silent Scout Warden" for flavor only.

### 36. Flatchr — *Flatchr, the Silent Talent Hunter*  `flatchr`
- 🦸 Hero · Domaine : Recrutement (#d1a53b) · Rareté : ★
- Légende : Selon la légende, Flatchr repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Piochez 1 si vous contrôlez 1+ cartes Recrutement.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a masked bounty-ranger with a quiver of glowing tracking-arrows, striding forward through drifting embers or motes of light, bearing a hunting horn wrapped in trail-marker ribbons, inlaid with faintly glowing runic script. Backdrop: a dense forest trail marked with glowing scouting-runes. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "Flatchr, the Silent Talent Hunter" for flavor only.

### 37. Gestmax — *Gestmax, the Unyielding Scout Warden*  `gestmax`
- 🦸 Hero · Domaine : Recrutement (#d1a53b) · Rareté : ★
- Légende : Selon la légende, Gestmax repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a nimble pathfinder balanced atop a floating compass-rune platform, mid-turn, glancing back over one shoulder as if just alerted, bearing a set of throwing daggers etched with tiny crosshair runes, wrapped in weathered leather bindings. Backdrop: a cliffside vantage point at dawn, mist below. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "Gestmax, the Unyielding Scout Warden" for flavor only.

### 38. HumanSourcing — *HumanSourcing, the Radiant Scout Warden*  `humansourcing`
- 🦸 Hero · Domaine : Recrutement (#d1a53b) · Rareté : ★
- Légende : Selon la légende, HumanSourcing repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a swift trailblazer cloaked in wind-torn fabric, twin daggers drawn, frozen in a dramatic three-quarter power stance, bearing a hand-held radar dish mounted on a short staff, wrapped in weathered leather bindings. Backdrop: a cliffside vantage point at dawn, mist below. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "HumanSourcing, the Radiant Scout Warden" for flavor only.

### 39. Marvin Recruiter — *Marvin Recruiter, the Relentless Headhunter*  `marvin-recruiter`
- 🐉 Monster · Domaine : Recrutement (#d1a53b) · Rareté : ★
- Légende : Selon la légende, Marvin Recruiter repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Charge.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a wolf-like tracker beast with a radar-dish ruff around its neck, mid-turn, glancing back over one shoulder as if just alerted, bearing a set of throwing daggers etched with tiny crosshair runes, wrapped in frayed ceremonial cloth. Backdrop: a bustling frontier outpost hung with trail-banners. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "Marvin Recruiter, the Relentless Headhunter" for flavor only.

### 40. Campagne de Sourcing — *Campagne de Sourcing, the Unyielding Scout Warden*  `campagne-de-sourcing`
- 🦸 Hero · Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Légende : Selon la légende, Campagne de Sourcing repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Piochez 2 cartes.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a nimble pathfinder balanced atop a floating compass-rune platform, frozen in a dramatic three-quarter power stance, bearing a hand-held radar dish mounted on a short staff, wrapped in weathered leather bindings. Backdrop: a cliffside vantage point at dawn, mist below. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a glowing card-like sliver of light materializing at their fingertips. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "Campagne de Sourcing, the Unyielding Scout Warden" for flavor only.

### 41. Eightfold.ai — *Eightfold.ai, the Radiant Trailblazer*  `eightfold-ai`
- 🦸 Hero · Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Légende : Selon la légende, Eightfold.ai repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Piochez 3, gardez 1 (le reste part au cimetière).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a hooded headhunter with a spyglass-eye and a coiled lasso of light, mid-turn, glancing back over one shoulder as if just alerted, bearing a spyglass that glows faintly at the lens, wrapped in frayed ceremonial cloth. Backdrop: a cliffside vantage point at dawn, mist below. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: several glowing slivers of light orbiting, one brightening as it is chosen. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "Eightfold.ai, the Radiant Trailblazer" for flavor only.

### 42. HelloWork — *HelloWork, the Towering Headhunter*  `hellowork`
- 🦸 Hero · Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Légende : Selon la légende, HelloWork repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Piochez 1 carte. Effet d'Entrée : Défaussez 1 carte(s) au hasard.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a hooded headhunter with a spyglass-eye and a coiled lasso of light, captured mid-leap between two platforms or ledges, bearing a hand-held radar dish mounted on a short staff, dusted with fine motes of drifting light. Backdrop: a cliffside vantage point at dawn, mist below. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a glowing card-like sliver of light materializing at their fingertips. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "HelloWork, the Towering Headhunter" for flavor only.

### 43. Lever — *Lever, the Steadfast Trailblazer*  `lever`
- 🐉 Monster · Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Légende : Selon la légende, Lever repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Piochez 1 carte.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a darting hummingbird-beast trailing glowing scouting-runes, reared up to full height, asserting dominance, bearing a longbow carved with a compass-rose inlay, etched with fine obsidian inlay. Backdrop: a dense forest trail marked with glowing scouting-runes. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a glowing card-like sliver of light materializing at their fingertips. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "Lever, the Steadfast Trailblazer" for flavor only.

### 44. Phenom — *Phenom, the Gleaming Scout Warden*  `phenom`
- 🐉 Monster · Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Légende : Selon la légende, Phenom repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) suivante(s) ce tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a darting hummingbird-beast trailing glowing scouting-runes, captured mid-leap between two platforms or ledges, bearing a hand-held radar dish mounted on a short staff, dusted with fine motes of drifting light. Backdrop: a cliffside vantage point at dawn, mist below. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a shimmer of discount-runes trailing from their hand. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "Phenom, the Gleaming Scout Warden" for flavor only.

### 45. Taleez — *Taleez, the Swift Trailblazer*  `taleez`
- 🐉 Monster · Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Légende : Selon la légende, Taleez repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) Recrutement suivante(s) ce tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a hawk-hound hybrid beast with radiant target-ring eyes and a streamlined feathered form, kneeling low before rising into motion, gathering energy, bearing a spyglass that glows faintly at the lens, trimmed in tarnished silver filigree. Backdrop: a dense forest trail marked with glowing scouting-runes. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a shimmer of discount-runes trailing from their hand. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "Taleez, the Swift Trailblazer" for flavor only.

### 46. Teamtailor — *Teamtailor, the Steadfast Beacon Ranger*  `teamtailor`
- 🦸 Hero · Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Légende : Selon la légende, Teamtailor repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Piochez 1 si votre main a 3 cartes ou moins.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a swift trailblazer cloaked in wind-torn fabric, twin daggers drawn, leaping into action with cloak/mane flaring behind, bearing a coiled rope-lasso trailing motes of targeting light, etched with fine obsidian inlay. Backdrop: a cliffside vantage point at dawn, mist below. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "Teamtailor, the Steadfast Beacon Ranger" for flavor only.

### 47. Greenhouse — *Greenhouse, the Relentless Talent Hunter*  `greenhouse`
- 🗿 Golem · Domaine : Recrutement (#d1a53b) · Rareté : ★★★
- Légende : Selon la légende, Greenhouse repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Piochez 2 cartes.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a compass-headed sentry automaton with radiating brass antennae, frozen in a dramatic three-quarter power stance, bearing a hand-held radar dish mounted on a short staff, wrapped in weathered leather bindings. Backdrop: an open plain under a sky streaked with compass-like light trails. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a glowing card-like sliver of light materializing at their fingertips. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "Greenhouse, the Relentless Talent Hunter" for flavor only.

### 48. iCIMS — *iCIMS, the Radiant Trailblazer*  `icims`
- 🗿 Golem · Domaine : Recrutement (#d1a53b) · Rareté : ★★★
- Légende : Selon la légende, iCIMS repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Piochez 1 carte. Effet d'Entrée : Réduit de 2 le coût de 1 carte(s) Recrutement suivante(s) ce tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a spider-legged surveyor-golem with beacon-lights along its back, frozen in a dramatic three-quarter power stance, bearing a hand-held radar dish mounted on a short staff, wrapped in weathered leather bindings. Backdrop: a windswept ridge overlooking an unmapped frontier. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a glowing card-like sliver of light materializing at their fingertips. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "iCIMS, the Radiant Trailblazer" for flavor only.

### 49. SmartRecruiters — *SmartRecruiters, the Unyielding Trailblazer*  `smartrecruiters`
- 🐉 Monster · Domaine : Recrutement (#d1a53b) · Rareté : ★★★
- Légende : Selon la légende, SmartRecruiters repère un talent avant même que celui-ci ne se connaisse lui-même.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Piochez 2 cartes. Effet d'Entrée : Réduit de 2 le coût de 2 carte(s) Recrutement suivante(s) ce tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a hawk-hound hybrid beast with radiant target-ring eyes and a streamlined feathered form, balanced on uneven footing atop rubble or broken terrain, bearing a set of throwing daggers etched with tiny crosshair runes, wrapped in frayed ceremonial cloth. Backdrop: a dense forest trail marked with glowing scouting-runes. Accent color #d1a53b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a glowing card-like sliver of light materializing at their fingertips. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Recrutement" theme, named "SmartRecruiters, the Unyielding Trailblazer" for flavor only.

## Formation

### 50. Chamilo — *Chamilo, the Towering Bloomkeeper*  `chamilo`
- 🐉 Monster · Domaine : Formation (#d1723b) · Rareté : ★
- Légende : Chaque être touché par Chamilo finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 HP au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a fawn-like sprout-beast with budding leaf-antlers still unfurling, captured mid-leap between two platforms or ledges, bearing a seed-pouch spilling glowing motes as it moves, dusted with fine motes of drifting light. Backdrop: a terraced garden glowing with layered blossoms at dusk. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "Chamilo, the Towering Bloomkeeper" for flavor only.

### 51. Dendreo — *Dendreo, the Gleaming Sage of Ascension*  `dendreo`
- 🐉 Monster · Domaine : Formation (#d1723b) · Rareté : ★
- Légende : Chaque être touché par Dendreo finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 HP au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a cocooned chrysalis-beast cracking open with new growth, kneeling low before rising into motion, gathering energy, bearing a seed-pouch spilling glowing motes as it moves, trimmed in tarnished silver filigree. Backdrop: a mountainside of blooming terraces catching golden sunrise. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "Dendreo, the Gleaming Sage of Ascension" for flavor only.

### 52. Digiforma — *Digiforma, the Cunning Rootkeeper*  `digiforma`
- 🗿 Golem · Domaine : Formation (#d1723b) · Rareté : ★
- Légende : Chaque être touché par Digiforma finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 HP au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a topiary-golem sculpted into an ever-rising spiral hedge, crouched and coiled, ready to spring, bearing a wooden training-rod wrapped in climbing vines, etched with fine obsidian inlay. Backdrop: a mountainside of blooming terraces catching golden sunrise. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "Digiforma, the Cunning Rootkeeper" for flavor only.

### 53. iSpring — *iSpring, the Silent Bloomkeeper*  `ispring`
- 🗿 Golem · Domaine : Formation (#d1723b) · Rareté : ★
- Légende : Chaque être touché par iSpring finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 HP au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a terraced garden-golem with staircase-shaped moss-covered shoulders, caught mid-stride in a confident forward advance, bearing a scroll of pressed leaves that unfurl new growth as it opens, inlaid with faintly glowing runic script. Backdrop: a misty valley where saplings grow visibly taller in the light. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "iSpring, the Silent Bloomkeeper" for flavor only.

### 54. Moodle — *Moodle, the Resolute Sage of Ascension*  `moodle`
- 🗿 Golem · Domaine : Formation (#d1723b) · Rareté : ★
- Légende : Chaque être touché par Moodle finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 HP au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a stone golem cracked open by climbing roots, light spilling from the growth within, caught mid-stride in a confident forward advance, bearing a blooming staff crowned with an ever-opening flower of light, inlaid with faintly glowing runic script. Backdrop: a misty valley where saplings grow visibly taller in the light. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "Moodle, the Resolute Sage of Ascension" for flavor only.

### 55. Ymag — *Ymag, the Cunning Sage of Ascension*  `ymag`
- 🗿 Golem · Domaine : Formation (#d1723b) · Rareté : ★
- Légende : Chaque être touché par Ymag finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 ATK au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a terraced garden-golem with staircase-shaped moss-covered shoulders, reared up to full height, asserting dominance, bearing a scroll of pressed leaves that unfurl new growth as it opens, etched with fine obsidian inlay. Backdrop: a misty valley where saplings grow visibly taller in the light. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "Ymag, the Cunning Sage of Ascension" for flavor only.

### 56. Articulate — *Articulate, the Resolute Mentor of the Grove*  `articulate`
- 🗿 Golem · Domaine : Formation (#d1723b) · Rareté : ★★
- Légende : Chaque être touché par Articulate finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 ATK au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a terraced garden-golem with staircase-shaped moss-covered shoulders, striding forward through drifting embers or motes of light, bearing a blooming staff crowned with an ever-opening flower of light, accented with small cascading embers. Backdrop: a terraced garden glowing with layered blossoms at dusk. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "Articulate, the Resolute Mentor of the Grove" for flavor only.

### 57. Coorpacademy — *Coorpacademy, the Relentless Growth Warden*  `coorpacademy`
- 🦸 Hero · Domaine : Formation (#d1723b) · Rareté : ★★
- Légende : Chaque être touché par Coorpacademy finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 ATK / +1 HP au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a patient grove-guardian in bark-textured armor, vines climbing toward a glowing crown of leaves, balanced on uneven footing atop rubble or broken terrain, bearing a gnarled walking-staff that doubles as a young sapling, wrapped in frayed ceremonial cloth. Backdrop: a terraced garden glowing with layered blossoms at dusk. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "Coorpacademy, the Relentless Growth Warden" for flavor only.

### 58. Coursera Business — *Coursera Business, the Gleaming Sage of Ascension*  `coursera-business`
- 🦸 Hero · Domaine : Formation (#d1723b) · Rareté : ★★
- Légende : Chaque être touché par Coursera Business finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 ATK / +1 HP au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a wise mentor-sage draped in robes of interwoven roots and light, staff crowned with a blooming rune, captured mid-leap between two platforms or ledges, bearing a lantern housing a tiny growing sapling, trimmed in tarnished silver filigree. Backdrop: an ancient tree-library with spiraling wooden stairways. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "Coursera Business, the Gleaming Sage of Ascension" for flavor only.

### 59. EdFlex — *EdFlex, the Steadfast Bloomkeeper*  `edflex`
- 🦸 Hero · Domaine : Formation (#d1723b) · Rareté : ★★
- Légende : Chaque être touché par EdFlex finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 HP au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a patient grove-guardian in bark-textured armor, vines climbing toward a glowing crown of leaves, reared up to full height, asserting dominance, bearing a blooming staff crowned with an ever-opening flower of light, etched with fine obsidian inlay. Backdrop: a sunlit grove where staircases of roots climb toward the canopy. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "EdFlex, the Steadfast Bloomkeeper" for flavor only.

### 60. MySkillCamp — *MySkillCamp, the Resolute Growth Warden*  `myskillcamp`
- 🐉 Monster · Domaine : Formation (#d1723b) · Rareté : ★★
- Légende : Chaque être touché par MySkillCamp finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 ATK / +1 HP au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a cocooned chrysalis-beast cracking open with new growth, caught mid-stride in a confident forward advance, bearing a blooming staff crowned with an ever-opening flower of light, accented with small cascading embers. Backdrop: a sunlit grove where staircases of roots climb toward the canopy. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "MySkillCamp, the Resolute Growth Warden" for flavor only.

### 61. Rise Up — *Rise Up, the Swift Growth Warden*  `rise-up`
- 🦸 Hero · Domaine : Formation (#d1723b) · Rareté : ★★
- Légende : Chaque être touché par Rise Up finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 ATK / +1 HP au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a wise mentor-sage draped in robes of interwoven roots and light, staff crowned with a blooming rune, arms/limbs spread wide in a triumphant display of power, bearing a lantern housing a tiny growing sapling, trimmed in tarnished silver filigree. Backdrop: a sunlit grove where staircases of roots climb toward the canopy. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "Rise Up, the Swift Growth Warden" for flavor only.

### 62. Session de Coaching — *Session de Coaching, the Towering Growth Warden*  `session-de-coaching`
- 🗿 Golem · Domaine : Formation (#d1723b) · Rareté : ★★
- Légende : Chaque être touché par Session de Coaching finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +2 ATK / +2 HP à une carte alliée ciblée.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a seed-pod golem slowly splitting open to reveal a glowing sapling core, arms/limbs spread wide in a triumphant display of power, bearing a lantern housing a tiny growing sapling, trimmed in tarnished silver filigree. Backdrop: a sunlit grove where staircases of roots climb toward the canopy. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a faint empowering aura reaching out toward an unseen ally. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "Session de Coaching, the Towering Growth Warden" for flavor only.

### 63. 360Learning — *360Learning, the Gleaming Rootkeeper*  `360learning`
- 🦸 Hero · Domaine : Formation (#d1723b) · Rareté : ★★★
- Légende : Chaque être touché par 360Learning finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 ATK / +1 DEF / +1 HP au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a wise mentor-sage draped in robes of interwoven roots and light, staff crowned with a blooming rune, captured mid-leap between two platforms or ledges, bearing a gnarled walking-staff that doubles as a young sapling, dusted with fine motes of drifting light. Backdrop: an ancient tree-library with spiraling wooden stairways. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "360Learning, the Gleaming Rootkeeper" for flavor only.

### 64. CrossKnowledge — *CrossKnowledge, the Silent Mentor of the Grove*  `crossknowledge`
- 🦸 Hero · Domaine : Formation (#d1723b) · Rareté : ★★★
- Légende : Chaque être touché par CrossKnowledge finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 HP au début de votre tour. (++1 ATK si 2+ cartes Formation)
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a young initiate-hero mid-transformation, one arm already wreathed in blossoming vines, standing tall in a commanding, wide-legged guard stance, bearing a scroll of pressed leaves that unfurl new growth as it opens, inlaid with faintly glowing runic script. Backdrop: an ancient tree-library with spiraling wooden stairways. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "CrossKnowledge, the Silent Mentor of the Grove" for flavor only.

### 65. Skillsoft — *Skillsoft, the Swift Growth Warden*  `skillsoft`
- 🗿 Golem · Domaine : Formation (#d1723b) · Rareté : ★★★
- Légende : Chaque être touché par Skillsoft finit par grandir au-delà de ce qu'il croyait possible.
- Contexte gameplay (inspiration uniquement) : Aura : +1 ATK / +1 HP au début de votre tour.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a stone golem cracked open by climbing roots, light spilling from the growth within, captured mid-leap between two platforms or ledges, bearing a seed-pouch spilling glowing motes as it moves, trimmed in tarnished silver filigree. Backdrop: a mountainside of blooming terraces catching golden sunrise. Accent color #d1723b used for armor trim, glow, or hide markings, consistent with the card's domain identity. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Formation" theme, named "Skillsoft, the Swift Growth Warden" for flavor only.

## Talent / Performance

### 66. Empowill — *Empowill, the Swift Ace of Power*  `empowill`
- 🐉 Monster · Domaine : Talent / Performance (#c13b3b) · Rareté : ★
- Légende : Selon la légende, Empowill n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a raptor-beast with wings of crackling energy feathers, captured mid-leap between two platforms or ledges, bearing a trophy-shaped warhammer trailing lightning, dusted with fine motes of drifting light. Backdrop: a mountaintop dueling ground wreathed in electric mist. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Empowill, the Swift Ace of Power" for flavor only.

### 67. Fuel50 — *Fuel50, the Unyielding Storm Champion*  `fuel50`
- 🐉 Monster · Domaine : Talent / Performance (#c13b3b) · Rareté : ★
- Légende : Selon la légende, Fuel50 n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Charge.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a coiled storm-serpent whose scales spark with each movement, mid-turn, glancing back over one shoulder as if just alerted, bearing a coiled energy-whip sparking at the tip, wrapped in weathered leather bindings. Backdrop: a mountaintop dueling ground wreathed in electric mist. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Fuel50, the Unyielding Storm Champion" for flavor only.

### 68. PeopleGoal — *PeopleGoal, the Ancient Performance Warlord*  `peoplegoal`
- 🗿 Golem · Domaine : Talent / Performance (#c13b3b) · Rareté : ★
- Légende : Selon la légende, PeopleGoal n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a towering war-golem with a core like a glowing performance gauge, energy venting from its joints, standing tall in a commanding, wide-legged guard stance, bearing a banner crackling with barely-contained static energy, inlaid with faintly glowing runic script. Backdrop: a torch-lit tournament ground roaring with unseen crowds. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "PeopleGoal, the Ancient Performance Warlord" for flavor only.

### 69. Reflektive — *Reflektive, the Radiant Lightning Warden*  `reflektive`
- 🐉 Monster · Domaine : Talent / Performance (#c13b3b) · Rareté : ★
- Légende : Selon la légende, Reflektive n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a sleek predator wreathed in electric arcs, its spine lined with jagged performance-spike plates, frozen in a dramatic three-quarter power stance, bearing a coiled energy-whip sparking at the tip, wrapped in weathered leather bindings. Backdrop: a grand coliseum under a sky split by lightning. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Reflektive, the Radiant Lightning Warden" for flavor only.

### 70. Whoz — *Whoz, the Steadfast Ace of Power*  `whoz`
- 🦸 Hero · Domaine : Talent / Performance (#c13b3b) · Rareté : ★
- Légende : Selon la légende, Whoz n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a lightning-charged warrior-champion in angular battle armor crackling with energy, reared up to full height, asserting dominance, bearing a pair of energy-charged gauntlets crackling with arcs, edged in oxidized bronze detailing. Backdrop: a torch-lit tournament ground roaring with unseen crowds. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Whoz, the Steadfast Ace of Power" for flavor only.

### 71. WorkBoard — *WorkBoard, the Unyielding Performance Warlord*  `workboard`
- 🦸 Hero · Domaine : Talent / Performance (#c13b3b) · Rareté : ★
- Légende : Selon la légende, WorkBoard n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +1 ATK à une carte alliée ciblée.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a lightning-charged warrior-champion in angular battle armor crackling with energy, balanced on uneven footing atop rubble or broken terrain, bearing twin energy blades humming with stored power, wrapped in weathered leather bindings. Backdrop: a grand coliseum under a sky split by lightning. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a faint empowering aura reaching out toward an unseen ally. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "WorkBoard, the Unyielding Performance Warlord" for flavor only.

### 72. 15Five — *15Five, the Steadfast Performance Warlord*  `15five`
- 🦸 Hero · Domaine : Talent / Performance (#c13b3b) · Rareté : ★★
- Légende : Selon la légende, 15Five n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +1 ATK à une carte alliée ciblée.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a sprinting arena-champion leaving a trail of electric afterimages, crouched and coiled, ready to spring, bearing a podium-shaped shield etched with tally marks of victories, etched with fine obsidian inlay. Backdrop: a cracked battlefield plateau lit by intermittent lightning flashes. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a faint empowering aura reaching out toward an unseen ally. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "15Five, the Steadfast Performance Warlord" for flavor only.

### 73. Beamery — *Beamery, the Unyielding Podium Sentinel*  `beamery`
- 🦸 Hero · Domaine : Talent / Performance (#c13b3b) · Rareté : ★★
- Légende : Selon la légende, Beamery n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +2 ATK à une carte alliée ciblée.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a sprinting arena-champion leaving a trail of electric afterimages, mid-turn, glancing back over one shoulder as if just alerted, bearing a coiled energy-whip sparking at the tip, wrapped in frayed ceremonial cloth. Backdrop: a cracked battlefield plateau lit by intermittent lightning flashes. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a faint empowering aura reaching out toward an unseen ally. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Beamery, the Unyielding Podium Sentinel" for flavor only.

### 74. Culture Amp — *Culture Amp, the Swift Performance Warlord*  `culture-amp`
- 🦸 Hero · Domaine : Talent / Performance (#c13b3b) · Rareté : ★★
- Légende : Selon la légende, Culture Amp n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +1 ATK à toutes vos cartes Talent / Performance en jeu (permanent).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a radiant duelist crowned with a podium-shaped halo, twin energy-blades trailing lightning arcs, arms/limbs spread wide in a triumphant display of power, bearing a coiled energy-whip sparking at the tip, trimmed in tarnished silver filigree. Backdrop: a torch-lit tournament ground roaring with unseen crowds. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: radiant energy visibly spreading outward from them. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Culture Amp, the Swift Performance Warlord" for flavor only.

### 75. Elevo — *Elevo, the Unyielding Ace of Power*  `elevo`
- 🦸 Hero · Domaine : Talent / Performance (#c13b3b) · Rareté : ★★
- Légende : Selon la légende, Elevo n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +1 ATK à une carte alliée ciblée.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a sprinting arena-champion leaving a trail of electric afterimages, frozen in a dramatic three-quarter power stance, bearing a coiled energy-whip sparking at the tip, wrapped in weathered leather bindings. Backdrop: a grand coliseum under a sky split by lightning. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a faint empowering aura reaching out toward an unseen ally. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Elevo, the Unyielding Ace of Power" for flavor only.

### 76. Neobrain — *Neobrain, the Steadfast Storm Champion*  `neobrain`
- 🐉 Monster · Domaine : Talent / Performance (#c13b3b) · Rareté : ★★
- Légende : Selon la légende, Neobrain n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Regardez le dessus de la pioche ; +1 ATK si c'est une carte Talent / Performance.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a sleek predator wreathed in electric arcs, its spine lined with jagged performance-spike plates, reared up to full height, asserting dominance, bearing a banner crackling with barely-contained static energy, edged in oxidized bronze detailing. Backdrop: a storm-lit arena crackling with static in the air. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Neobrain, the Steadfast Storm Champion" for flavor only.

### 77. Zest — *Zest, the Steadfast Storm Champion*  `zest`
- 🦸 Hero · Domaine : Talent / Performance (#c13b3b) · Rareté : ★★
- Légende : Selon la légende, Zest n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Charge. Effet d'Entrée : +1 ATK à elle-même si vous contrôlez 2+ cartes Talent / Performance.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a radiant duelist crowned with a podium-shaped halo, twin energy-blades trailing lightning arcs, crouched and coiled, ready to spring, bearing a pair of energy-charged gauntlets crackling with arcs, edged in oxidized bronze detailing. Backdrop: a storm-lit arena crackling with static in the air. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Zest, the Steadfast Storm Champion" for flavor only.

### 78. Beqom — *Beqom, the Cunning Storm Champion*  `beqom`
- 🐉 Monster · Domaine : Talent / Performance (#c13b3b) · Rareté : ★★★
- Légende : Selon la légende, Beqom n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +2 ATK à une carte alliée ciblée.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a stag-like thunder-beast with antlers of forked lightning, crouched and coiled, ready to spring, bearing a podium-shaped shield etched with tally marks of victories, etched with fine obsidian inlay. Backdrop: a mountaintop dueling ground wreathed in electric mist. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a faint empowering aura reaching out toward an unseen ally. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Beqom, the Cunning Storm Champion" for flavor only.

### 79. Cornerstone — *Cornerstone, the Ancient Podium Sentinel*  `cornerstone`
- 🐉 Monster · Domaine : Talent / Performance (#c13b3b) · Rareté : ★★★
- Légende : Selon la légende, Cornerstone n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +3 ATK à toutes vos cartes Talent / Performance en jeu (permanent).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a sleek predator wreathed in electric arcs, its spine lined with jagged performance-spike plates, standing tall in a commanding, wide-legged guard stance, bearing a podium-shaped shield etched with tally marks of victories, accented with small cascading embers. Backdrop: a torch-lit tournament ground roaring with unseen crowds. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: radiant energy visibly spreading outward from them. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Cornerstone, the Ancient Podium Sentinel" for flavor only.

### 80. Prime de Performance — *Prime de Performance, the Steadfast Podium Sentinel*  `prime-de-performance`
- 🦸 Hero · Domaine : Talent / Performance (#c13b3b) · Rareté : ★★★
- Légende : Selon la légende, Prime de Performance n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +3 ATK à toutes vos cartes Talent / Performance en jeu (permanent).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a lightning-charged warrior-champion in angular battle armor crackling with energy, reared up to full height, asserting dominance, bearing a pair of energy-charged gauntlets crackling with arcs, edged in oxidized bronze detailing. Backdrop: a grand coliseum under a sky split by lightning. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: radiant energy visibly spreading outward from them. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Prime de Performance, the Steadfast Podium Sentinel" for flavor only.

### 81. Talentsoft — *Talentsoft, the Steadfast Lightning Warden*  `talentsoft`
- 🐉 Monster · Domaine : Talent / Performance (#c13b3b) · Rareté : ★★★
- Légende : Selon la légende, Talentsoft n'a jamais perdu un duel de performance.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : +2 ATK à toutes vos cartes Talent / Performance en jeu (permanent).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a coiled storm-serpent whose scales spark with each movement, crouched and coiled, ready to spring, bearing a banner crackling with barely-contained static energy, edged in oxidized bronze detailing. Backdrop: a cracked battlefield plateau lit by intermittent lightning flashes. Accent color #c13b3b used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: radiant energy visibly spreading outward from them. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Talent / Performance" theme, named "Talentsoft, the Steadfast Lightning Warden" for flavor only.

## Pilotage / BI

### 82. GoodData — *GoodData, the Unyielding Signal Sentinel*  `gooddata`
- 🗿 Golem · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Légende : Rien n'échappe au regard de GoodData, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a hunched archivist-construct with scroll-like data-ribbons unspooling from its back, frozen in a dramatic three-quarter power stance, bearing a stack of softly glowing data-tablets bound by light, wrapped in weathered leather bindings. Backdrop: an archive of floating light-scrolls stretching into darkness. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "GoodData, the Unyielding Signal Sentinel" for flavor only.

### 83. IBM Cognos — *IBM Cognos, the Resolute Oracle of Insight*  `ibm-cognos`
- 🦸 Hero · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Légende : Rien n'échappe au regard de IBM Cognos, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a cloaked forecaster standing atop a floating platform of interlocking chart-panels, striding forward through drifting embers or motes of light, bearing a telescope lined with faintly glowing data-runes, accented with small cascading embers. Backdrop: a crystalline chamber refracting streams of data-light. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "IBM Cognos, the Resolute Oracle of Insight" for flavor only.

### 84. JasperSoft — *JasperSoft, the Radiant All-Seeing Analyst*  `jaspersoft`
- 🦸 Hero · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Légende : Rien n'échappe au regard de JasperSoft, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a hooded strategist-seer surrounded by floating chart-glyphs and glowing data-threads, frozen in a dramatic three-quarter power stance, bearing a stack of softly glowing data-tablets bound by light, wrapped in frayed ceremonial cloth. Backdrop: an archive of floating light-scrolls stretching into darkness. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "JasperSoft, the Radiant All-Seeing Analyst" for flavor only.

### 85. Jedox — *Jedox, the Vigilant Signal Sentinel*  `jedox`
- 🐉 Monster · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Légende : Rien n'échappe au regard de Jedox, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a many-eyed watcher-beast, each eye a small glowing chart, perched atop a lattice of light-threads, reared up to full height, asserting dominance, bearing a telescope lined with faintly glowing data-runes, etched with fine obsidian inlay. Backdrop: a vast control-chamber lit by drifting constellations of data. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: one eye closed in focused foresight, the other glowing faintly. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "Jedox, the Vigilant Signal Sentinel" for flavor only.

### 86. Oracle Hyperion — *Oracle Hyperion, the Towering Signal Sentinel*  `oracle-hyperion`
- 🦸 Hero · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Légende : Rien n'échappe au regard de Oracle Hyperion, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a calm data-oracle in flowing robes lined with circuit-like embroidery, one hand raised toward a floating dashboard, captured mid-leap between two platforms or ledges, bearing a crystal orb displaying shifting live charts, dusted with fine motes of drifting light. Backdrop: an archive of floating light-scrolls stretching into darkness. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "Oracle Hyperion, the Towering Signal Sentinel" for flavor only.

### 87. Reporting Flash — *Reporting Flash, the Gleaming Data Seer*  `reporting-flash`
- 🗿 Golem · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Légende : Rien n'échappe au regard de Reporting Flash, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Piochez 2, gardez 1 (le reste part au cimetière).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a many-armed calculator-golem, each hand tipped with a small glowing readout, arms/limbs spread wide in a triumphant display of power, bearing a lantern that projects streaming lines of light like a graph, trimmed in tarnished silver filigree. Backdrop: a vast control-chamber lit by drifting constellations of data. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: several glowing slivers of light orbiting, one brightening as it is chosen. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "Reporting Flash, the Gleaming Data Seer" for flavor only.

### 88. SAS — *SAS, the Swift Data Seer*  `sas`
- 🦸 Hero · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Légende : Rien n'échappe au regard de SAS, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a sharp-eyed analyst-mage holding a crystal ball that displays shifting graphs, kneeling low before rising into motion, gathering energy, bearing a lantern that projects streaming lines of light like a graph, dusted with fine motes of drifting light. Backdrop: an archive of floating light-scrolls stretching into darkness. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. clean detail level: a clear, readable silhouette, moderate ornamentation. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "SAS, the Swift Data Seer" for flavor only.

### 89. Board — *Board, the Vigilant All-Seeing Analyst*  `board`
- 🗿 Golem · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★
- Légende : Rien n'échappe au regard de Board, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Regardez les 2 cartes du dessus de votre pioche.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: an oracle-construct golem with a chest-cavity of floating holographic charts and glowing data-node eyes, crouched and coiled, ready to spring, bearing a floating holographic dashboard hovering at their side, etched with fine obsidian inlay. Backdrop: a mountaintop watch-post beneath a sky of glowing star-charts. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: one eye closed in focused foresight, the other glowing faintly. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "Board, the Vigilant All-Seeing Analyst" for flavor only.

### 90. Dataiku — *Dataiku, the Radiant Chart Warden*  `dataiku`
- 🐉 Monster · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★
- Légende : Rien n'échappe au regard de Dataiku, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Regardez le dessus de la pioche adverse.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a coiled serpent-beast whose scales shift like a live heatmap, frozen in a dramatic three-quarter power stance, bearing a lantern that projects streaming lines of light like a graph, wrapped in weathered leather bindings. Backdrop: a crystalline chamber refracting streams of data-light. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "Dataiku, the Radiant Chart Warden" for flavor only.

### 91. Domo — *Domo, the Unyielding Signal Sentinel*  `domo`
- 🐉 Monster · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★
- Légende : Rien n'échappe au regard de Domo, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a many-eyed watcher-beast, each eye a small glowing chart, perched atop a lattice of light-threads, mid-turn, glancing back over one shoulder as if just alerted, bearing a lantern that projects streaming lines of light like a graph, wrapped in frayed ceremonial cloth. Backdrop: a crystalline chamber refracting streams of data-light. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: one eye closed in focused foresight, the other glowing faintly. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "Domo, the Unyielding Signal Sentinel" for flavor only.

### 92. Qlik — *Qlik, the Unyielding All-Seeing Analyst*  `qlik`
- 🗿 Golem · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★
- Légende : Rien n'échappe au regard de Qlik, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Piochez 2, gardez 1 (le reste part au cimetière).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a hunched archivist-construct with scroll-like data-ribbons unspooling from its back, frozen in a dramatic three-quarter power stance, bearing a lantern that projects streaming lines of light like a graph, wrapped in weathered leather bindings. Backdrop: a starlit observatory ringed with floating chart-panels. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: several glowing slivers of light orbiting, one brightening as it is chosen. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "Qlik, the Unyielding All-Seeing Analyst" for flavor only.

### 93. SAP BusinessObjects — *SAP BusinessObjects, the Radiant Signal Sentinel*  `sap-businessobjects`
- 🐉 Monster · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★
- Légende : Rien n'échappe au regard de SAP BusinessObjects, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Regardez le dessus de la pioche ; vous pouvez la défausser pour piocher la suivante.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a many-eyed watcher-beast, each eye a small glowing chart, perched atop a lattice of light-threads, mid-turn, glancing back over one shoulder as if just alerted, bearing a lantern that projects streaming lines of light like a graph, wrapped in frayed ceremonial cloth. Backdrop: an archive of floating light-scrolls stretching into darkness. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "SAP BusinessObjects, the Radiant Signal Sentinel" for flavor only.

### 94. Sisense — *Sisense, the Silent All-Seeing Analyst*  `sisense`
- 🗿 Golem · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★
- Légende : Rien n'échappe au regard de Sisense, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a many-armed calculator-golem, each hand tipped with a small glowing readout, caught mid-stride in a confident forward advance, bearing a telescope lined with faintly glowing data-runes, accented with small cascading embers. Backdrop: a starlit observatory ringed with floating chart-panels. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: one eye closed in focused foresight, the other glowing faintly. strong detail level: clear silhouette with notable ornamentation and a sense of presence. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "Sisense, the Silent All-Seeing Analyst" for flavor only.

### 95. Anaplan — *Anaplan, the Swift All-Seeing Analyst*  `anaplan`
- 🦸 Hero · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★★
- Légende : Rien n'échappe au regard de Anaplan, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Regardez la main adverse.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A heroic humanoid champion: a scholarly cartographer-hero unrolling a living, glowing map of data-trails, arms/limbs spread wide in a triumphant display of power, bearing a stack of softly glowing data-tablets bound by light, trimmed in tarnished silver filigree. Backdrop: a vast control-chamber lit by drifting constellations of data. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: a faint all-seeing glow behind their eyes. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "Anaplan, the Swift All-Seeing Analyst" for flavor only.

### 96. Power BI — *Power BI, the Unyielding Oracle of Insight*  `power-bi`
- 🐉 Monster · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★★
- Légende : Rien n'échappe au regard de Power BI, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Regardez les 3 cartes du dessus, choisissez celle que vous piocherez en premier.
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A fantastical creature/beast: a fox-like insight-beast with a tail that fans out into a glowing bar-chart, balanced on uneven footing atop rubble or broken terrain, bearing a crystal orb displaying shifting live charts, wrapped in weathered leather bindings. Backdrop: a starlit observatory ringed with floating chart-panels. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: small glowing motes rearranging themselves in the air before them. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "Power BI, the Unyielding Oracle of Insight" for flavor only.

### 97. Tableau — *Tableau, the Ancient Data Seer*  `tableau`
- 🗿 Golem · Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★★
- Légende : Rien n'échappe au regard de Tableau, qui lit l'avenir dans les flux de données.
- Contexte gameplay (inspiration uniquement) : Effet d'Entrée : Piochez 2, gardez 1 (le reste part au cimetière).
- **Prompt** :

> Premium fantasy trading-card splash art, painterly digital illustration (Magic: The Gathering / Hearthstone quality). A towering construct/golem creature: a spherical orrery-golem orbited by small glowing data-satellites, caught mid-stride in a confident forward advance, bearing a telescope lined with faintly glowing data-runes, accented with small cascading embers. Backdrop: an archive of floating light-scrolls stretching into darkness. Accent color #7d3bd1 used for armor trim, glow, or hide markings, consistent with the card's domain identity. A gameplay-flavored detail: several glowing slivers of light orbiting, one brightening as it is chosen. epic detail level: rich ornamentation, a strong sense of power and importance, dramatic lighting. Dramatic rim lighting, no readable text, no real-world logos, wordmarks, or corporate branding anywhere, not photorealistic, not a 3D render — a wholly fictional fantasy character merely inspired by the "Pilotage / BI" theme, named "Tableau, the Ancient Data Seer" for flavor only.
