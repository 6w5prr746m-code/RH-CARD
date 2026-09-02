# RH CARD — Card Illustration Prompts

One image-generation prompt per card (97 total), for an external image model
(Midjourney, DALL-E, Gemini/"nano banana", Stable Diffusion, etc.). Generate
each image, then drop the result at `art/<card-id>.png` and add the id to
`REAL_ART_IDS` in `js/data/cardart.js` — the game automatically prefers the
real image over the generative placeholder for that card, and falls back to
the placeholder automatically if the file is ever missing or fails to load.

## Art direction (shared style guide — keep every card consistent)

- **Subject**: abstract / conceptual corporate-tech illustration — geometric
  shapes, data motifs, light and gradient. **Never** a literal logo, wordmark,
  or trademark of any real company (ADP, SAP, Oracle, Workday, etc., are all
  represented purely as *domain archetypes*, not as themselves).
- **No readable text** anywhere in the image (no logos, no labels, no UI
  chrome with legible words).
- **Composition**: landscape / widescreen banner, roughly a 12:7 aspect ratio
  (matches a 240×140 card-art panel), single focal motif centered or
  rule-of-thirds, generous negative space near the edges (the UI overlays a
  domain icon on top of the center of the image).
- **Rendering style**: flat-to-soft-gradient vector/digital illustration —
  think modern B2B SaaS marketing art or a premium abstract trading-card
  splash, not photorealism, not 3D render, not painterly/sketchy.
- **Lighting**: a soft radial glow from the upper-center, dark-to-vivid
  gradient background (light source roughly at 50%/32% of the frame).
- **Palette**: anchor every card to its **domain color** (hex given per
  card below) as the dominant gradient hue, with a brighter accent tint of
  the same hue for the motif itself. Keep saturation and contrast consistent
  across the set so all 97 cards read as one unified deck.
- **Complexity scales with rarity**: simpler/cleaner for 1★ commons, richer
  and more elaborate for 3★ and the legendary card (see each prompt's
  "detail level").
- **Mood**: confident, precise, technological, professional — never chaotic,
  never dark/horror, never cartoonish.

Each entry below gives: the card name (context only, do not render as text),
domain + hex color, rarity/detail level, ability context (for motif
inspiration only), and the ready-to-paste prompt.

---


## Légendaire

### 1. PeopleSpheres  `peoplespheres`
- Domaine : Transversal (#7d3bd1) · Rareté : ∞
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Synchronisation Universelle : pour chaque domaine différent en jeu (max 6), +1/+1/+1, piochez 1 carte et soignez 1 PV. Compte comme membre des 6 domaines pour les synergies.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Deep violet gradient background (#7d3bd1 as the dominant hue, darkening toward the edges) with a bright radial glow from the upper-center. Central motif: a radiant globe-and-network hybrid, with thin luminous lines reaching out toward all edges of the frame, suggesting a platform that unifies every other domain — legendary grandeur: the most elaborate, luminous, and dynamic composition in the set, radiating energy from a central focal point, epic scale. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render — a premium, unifying "platform of platforms" visual. Confident, precise, technological mood.

## Paie / GA

### 2. Audit Paie Express  `audit-paie-express`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Héros récupère 3 PV. Effet d'Entrée : Récupère une carte Paie / GA du deck.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a balanced ledger grid with softly pulsing account-line nodes (conveys stability and reliability), framed slightly right-of-center with negative space breathing on the left, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 3. Deel  `deel`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Héros récupère 1 PV.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a balanced ledger grid with softly pulsing account-line nodes (conveys stability and reliability), framed slightly right-of-center with negative space breathing on the left, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 4. Insér  `inser`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a minimalist vault-door silhouette with a radiant keyhole core (conveys stability and reliability), centered symmetrically with fine radiating light rays behind it, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 5. Nibelis  `nibelis`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a balanced ledger grid with softly pulsing account-line nodes (conveys stability and reliability), framed slightly right-of-center with negative space breathing on the left, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 6. NovRH  `novrh`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a minimalist vault-door silhouette with a radiant keyhole core (conveys stability and reliability), floating above a faint horizon line for a sense of depth, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 7. PayFit  `payfit`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Charge.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a symmetrical scale/balance silhouette rendered in soft light (conveys stability and reliability), framed slightly left-of-center with negative space breathing on the right, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 8. Sigma-RH  `sigma-rh`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a stack of glowing coin-plates arranged in a rising spiral (conveys stability and reliability), set against a subtle diagonal light sweep across the background, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 9. Cegedim  `cegedim`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : héros récupère 1 PV à chaque mort d'une carte Paie / GA.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a stack of glowing coin-plates arranged in a rising spiral (conveys stability and reliability), framed slightly right-of-center with negative space breathing on the left, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 10. Cegid  `cegid`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +2 DEF à une carte alliée du même domaine.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a stack of glowing coin-plates arranged in a rising spiral (conveys stability and reliability), set against a subtle diagonal light sweep across the background, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 11. Ceridian Dayforce  `ceridian-dayforce`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Héros récupère 2 PV.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a symmetrical scale/balance silhouette rendered in soft light (conveys stability and reliability), centered symmetrically with fine radiating light rays behind it, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 12. Infor  `infor`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Héros récupère 2 PV.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a balanced ledger grid with softly pulsing account-line nodes (conveys stability and reliability), ringed by a thin halo of soft particles for extra glow, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 13. SD Worx  `sd-worx`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet Final : Héros récupère 2 PV.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a balanced ledger grid with softly pulsing account-line nodes (conveys stability and reliability), set against a subtle diagonal light sweep across the background, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 14. Talentia  `talentia`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Héros récupère 1 PV.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a balanced ledger grid with softly pulsing account-line nodes (conveys stability and reliability), ringed by a thin halo of soft particles for extra glow, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 15. ADP  `adp`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : dégâts subis par votre héros réduits de 1. Effet d'Entrée : Héros récupère 4 PV.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a symmetrical scale/balance silhouette rendered in soft light (conveys stability and reliability), framed slightly left-of-center with negative space breathing on the right, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 16. Oracle  `oracle`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : héros récupère 2 PV au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a balanced ledger grid with softly pulsing account-line nodes (conveys stability and reliability), ringed by a thin halo of soft particles for extra glow, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

### 17. SAP SuccessFactors  `sap-successfactors`
- Domaine : Paie / GA (#3b6fd1) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Héros récupère 3 PV. Effet d'Entrée : Récupère une carte Paie / GA du deck.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3b6fd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a calm horizon-line ledger with a cluster of floating coin motifs (conveys stability and reliability), ringed by a thin halo of soft particles for extra glow, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Paie / GA" HR-software theme.

## GTA

### 18. Alerte Absentéisme  `alerte-absenteisme`
- Domaine : GTA (#3c9a5f) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +2 DEF à toutes vos cartes GTA en jeu (ce tour-ci).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: overlapping hexagonal shield plates stacked in defensive layers (conveys defense and structure), ringed by a thin halo of soft particles for extra glow, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 19. Domino  `domino`
- Domaine : GTA (#3c9a5f) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Provocation.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a radiant shield emblem ringed by calendar-grid fragments (conveys defense and structure), framed slightly right-of-center with negative space breathing on the left, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 20. Élap  `elap`
- Domaine : GTA (#3c9a5f) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Provocation.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a radiant shield emblem ringed by calendar-grid fragments (conveys defense and structure), set against a subtle diagonal light sweep across the background, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 21. incotec OHRIS  `incotec-ohris`
- Domaine : GTA (#3c9a5f) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Provocation.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: layered armor plating arranged like a rising bastion (conveys defense and structure), floating above a faint horizon line for a sense of depth, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 22. Timeplus  `timeplus`
- Domaine : GTA (#3c9a5f) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Provocation.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: layered armor plating arranged like a rising bastion (conveys defense and structure), floating above a faint horizon line for a sense of depth, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 23. Visual Planning  `visual-planning`
- Domaine : GTA (#3c9a5f) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a radiant shield emblem ringed by calendar-grid fragments (conveys defense and structure), set against a subtle diagonal light sweep across the background, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 24. Weekera  `weekera`
- Domaine : GTA (#3c9a5f) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Provocation.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: overlapping hexagonal shield plates stacked in defensive layers (conveys defense and structure), ringed by a thin halo of soft particles for extra glow, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 25. Bodet  `bodet`
- Domaine : GTA (#3c9a5f) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Provocation.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a geometric watchtower silhouette wrapped in soft time-grid lines (conveys defense and structure), ringed by a thin halo of soft particles for extra glow, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 26. Combo  `combo`
- Domaine : GTA (#3c9a5f) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Provocation.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: overlapping hexagonal shield plates stacked in defensive layers (conveys defense and structure), framed slightly right-of-center with negative space breathing on the left, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 27. Octime  `octime`
- Domaine : GTA (#3c9a5f) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +2 DEF à une carte alliée du même domaine.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a fortress silhouette built from interlocking clock-face gears (conveys defense and structure), floating above a faint horizon line for a sense of depth, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 28. Skello  `skello`
- Domaine : GTA (#3c9a5f) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +1 DEF à toutes vos cartes GTA en jeu (ce tour-ci).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a radiant shield emblem ringed by calendar-grid fragments (conveys defense and structure), framed slightly right-of-center with negative space breathing on the left, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 29. Tamigo  `tamigo`
- Domaine : GTA (#3c9a5f) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Provocation. Effet d'Entrée : Piochez 1 si vous contrôlez 2+ cartes GTA.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a set of concentric defensive rings anchored by a central shield core (conveys defense and structure), centered symmetrically with fine radiating light rays behind it, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 30. ZeTime  `zetime`
- Domaine : GTA (#3c9a5f) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Provocation.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: overlapping hexagonal shield plates stacked in defensive layers (conveys defense and structure), ringed by a thin halo of soft particles for extra glow, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 31. Chronotime  `chronotime`
- Domaine : GTA (#3c9a5f) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Provocation. Aura : dégâts reçus par cette carte au combat réduits de 1.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: overlapping hexagonal shield plates stacked in defensive layers (conveys defense and structure), ringed by a thin halo of soft particles for extra glow, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 32. Horoquartz  `horoquartz`
- Domaine : GTA (#3c9a5f) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Provocation. Effet d'Entrée : +3 DEF à la carte alliée du domaine avec le plus faible DEF.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: layered armor plating arranged like a rising bastion (conveys defense and structure), centered symmetrically with fine radiating light rays behind it, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

### 33. Kelio  `kelio`
- Domaine : GTA (#3c9a5f) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Provocation. Effet d'Entrée : +2 DEF à toutes vos cartes GTA en jeu (permanent).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #3c9a5f (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: overlapping hexagonal shield plates stacked in defensive layers (conveys defense and structure), set against a subtle diagonal light sweep across the background, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "GTA" HR-software theme.

## Recrutement

### 34. CleverConnect  `cleverconnect`
- Domaine : Recrutement (#d1a53b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a compass-rose motif with radiating scouting trails (conveys speed and tempo), framed slightly left-of-center with negative space breathing on the right, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 35. Eolia  `eolia`
- Domaine : Recrutement (#d1a53b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) suivante(s) ce tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a magnifying-glass silhouette formed from converging light rays (conveys speed and tempo), set against a subtle diagonal light sweep across the background, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 36. Flatchr  `flatchr`
- Domaine : Recrutement (#d1a53b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Piochez 1 si vous contrôlez 1+ cartes Recrutement.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a cluster of arrows converging toward a central target ring (conveys speed and tempo), framed slightly right-of-center with negative space breathing on the left, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 37. Gestmax  `gestmax`
- Domaine : Recrutement (#d1a53b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a network of scouting beacons connected by directional lines (conveys speed and tempo), centered symmetrically with fine radiating light rays behind it, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 38. HumanSourcing  `humansourcing`
- Domaine : Recrutement (#d1a53b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a network of scouting beacons connected by directional lines (conveys speed and tempo), floating above a faint horizon line for a sense of depth, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 39. Marvin Recruiter  `marvin-recruiter`
- Domaine : Recrutement (#d1a53b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Charge.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a network of scouting beacons connected by directional lines (conveys speed and tempo), framed slightly left-of-center with negative space breathing on the right, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 40. Campagne de Sourcing  `campagne-de-sourcing`
- Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Piochez 2 cartes.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a compass-rose motif with radiating scouting trails (conveys speed and tempo), floating above a faint horizon line for a sense of depth, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 41. Eightfold.ai  `eightfold-ai`
- Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Piochez 3, gardez 1 (le reste part au cimetière).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a network of scouting beacons connected by directional lines (conveys speed and tempo), floating above a faint horizon line for a sense of depth, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 42. HelloWork  `hellowork`
- Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Piochez 1 carte. Effet d'Entrée : Défaussez 1 carte(s) au hasard.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a compass-rose motif with radiating scouting trails (conveys speed and tempo), floating above a faint horizon line for a sense of depth, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 43. Lever  `lever`
- Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Piochez 1 carte.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a cluster of arrows converging toward a central target ring (conveys speed and tempo), ringed by a thin halo of soft particles for extra glow, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 44. Phenom  `phenom`
- Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) suivante(s) ce tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a radar-sweep motif with pulsing concentric search rings (conveys speed and tempo), centered symmetrically with fine radiating light rays behind it, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 45. Taleez  `taleez`
- Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Réduit de 1 le coût de 1 carte(s) Recrutement suivante(s) ce tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a compass-rose motif with radiating scouting trails (conveys speed and tempo), centered symmetrically with fine radiating light rays behind it, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 46. Teamtailor  `teamtailor`
- Domaine : Recrutement (#d1a53b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Piochez 1 si votre main a 3 cartes ou moins.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a cluster of arrows converging toward a central target ring (conveys speed and tempo), framed slightly right-of-center with negative space breathing on the left, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 47. Greenhouse  `greenhouse`
- Domaine : Recrutement (#d1a53b) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Piochez 2 cartes.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a compass-rose motif with radiating scouting trails (conveys speed and tempo), framed slightly left-of-center with negative space breathing on the right, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 48. iCIMS  `icims`
- Domaine : Recrutement (#d1a53b) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Piochez 1 carte. Effet d'Entrée : Réduit de 2 le coût de 1 carte(s) Recrutement suivante(s) ce tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a network of scouting beacons connected by directional lines (conveys speed and tempo), floating above a faint horizon line for a sense of depth, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

### 49. SmartRecruiters  `smartrecruiters`
- Domaine : Recrutement (#d1a53b) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Piochez 2 cartes. Effet d'Entrée : Réduit de 2 le coût de 2 carte(s) Recrutement suivante(s) ce tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1a53b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a compass-rose motif with radiating scouting trails (conveys speed and tempo), floating above a faint horizon line for a sense of depth, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Recrutement" HR-software theme.

## Formation

### 50. Chamilo  `chamilo`
- Domaine : Formation (#d1723b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 HP au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: concentric growth rings expanding outward like tree rings (conveys progression and growth), centered symmetrically with fine radiating light rays behind it, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 51. Dendreo  `dendreo`
- Domaine : Formation (#d1723b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 HP au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a rising arrow path spiraling gently through soft light bands (conveys progression and growth), floating above a faint horizon line for a sense of depth, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 52. Digiforma  `digiforma`
- Domaine : Formation (#d1723b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 HP au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: an ascending staircase silhouette dissolving into light at the top (conveys progression and growth), framed slightly right-of-center with negative space breathing on the left, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 53. iSpring  `ispring`
- Domaine : Formation (#d1723b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 HP au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: an ascending staircase silhouette dissolving into light at the top (conveys progression and growth), framed slightly right-of-center with negative space breathing on the left, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 54. Moodle  `moodle`
- Domaine : Formation (#d1723b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 HP au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: an ascending staircase silhouette dissolving into light at the top (conveys progression and growth), set against a subtle diagonal light sweep across the background, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 55. Ymag  `ymag`
- Domaine : Formation (#d1723b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 ATK au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: an ascending staircase silhouette dissolving into light at the top (conveys progression and growth), ringed by a thin halo of soft particles for extra glow, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 56. Articulate  `articulate`
- Domaine : Formation (#d1723b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 ATK au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: layered terraces climbing toward a bright horizon (conveys progression and growth), ringed by a thin halo of soft particles for extra glow, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 57. Coorpacademy  `coorpacademy`
- Domaine : Formation (#d1723b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 ATK / +1 HP au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a rising arrow path spiraling gently through soft light bands (conveys progression and growth), centered symmetrically with fine radiating light rays behind it, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 58. Coursera Business  `coursera-business`
- Domaine : Formation (#d1723b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 ATK / +1 HP au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: concentric growth rings expanding outward like tree rings (conveys progression and growth), framed slightly left-of-center with negative space breathing on the right, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 59. EdFlex  `edflex`
- Domaine : Formation (#d1723b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 HP au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: layered terraces climbing toward a bright horizon (conveys progression and growth), set against a subtle diagonal light sweep across the background, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 60. MySkillCamp  `myskillcamp`
- Domaine : Formation (#d1723b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 ATK / +1 HP au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: layered terraces climbing toward a bright horizon (conveys progression and growth), framed slightly right-of-center with negative space breathing on the left, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 61. Rise Up  `rise-up`
- Domaine : Formation (#d1723b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 ATK / +1 HP au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a sprouting seedling silhouette rendered as clean geometric shapes (conveys progression and growth), floating above a faint horizon line for a sense of depth, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 62. Session de Coaching  `session-de-coaching`
- Domaine : Formation (#d1723b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +2 ATK / +2 HP à une carte alliée ciblée.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a rising arrow path spiraling gently through soft light bands (conveys progression and growth), floating above a faint horizon line for a sense of depth, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 63. 360Learning  `360learning`
- Domaine : Formation (#d1723b) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 ATK / +1 DEF / +1 HP au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: concentric growth rings expanding outward like tree rings (conveys progression and growth), centered symmetrically with fine radiating light rays behind it, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 64. CrossKnowledge  `crossknowledge`
- Domaine : Formation (#d1723b) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 HP au début de votre tour. (++1 ATK si 2+ cartes Formation)
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a branching root-to-canopy motif reaching upward (conveys progression and growth), framed slightly right-of-center with negative space breathing on the left, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

### 65. Skillsoft  `skillsoft`
- Domaine : Formation (#d1723b) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Aura : +1 ATK / +1 HP au début de votre tour.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #d1723b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: concentric growth rings expanding outward like tree rings (conveys progression and growth), floating above a faint horizon line for a sense of depth, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Formation" HR-software theme.

## Talent / Performance

### 66. Empowill  `empowill`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a rising bar-chart silhouette fused with a lightning streak (conveys power and performance), centered symmetrically with fine radiating light rays behind it, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 67. Fuel50  `fuel50`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Charge.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a rising bar-chart silhouette fused with a lightning streak (conveys power and performance), framed slightly left-of-center with negative space breathing on the right, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 68. PeopleGoal  `peoplegoal`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a sharp lightning-bolt burst radiating angular energy lines (conveys power and performance), framed slightly right-of-center with negative space breathing on the left, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 69. Reflektive  `reflektive`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a podium silhouette crowned by a radiant performance spike (conveys power and performance), centered symmetrically with fine radiating light rays behind it, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 70. Whoz  `whoz`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a starburst of sharp performance spikes around a glowing center (conveys power and performance), framed slightly right-of-center with negative space breathing on the left, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 71. WorkBoard  `workboard`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +1 ATK à une carte alliée ciblée.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a trophy-like geometric silhouette wrapped in energy arcs (conveys power and performance), floating above a faint horizon line for a sense of depth, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 72. 15Five  `15five`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +1 ATK à une carte alliée ciblée.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a cluster of angular energy shards converging at a bright core (conveys power and performance), framed slightly right-of-center with negative space breathing on the left, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 73. Beamery  `beamery`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +2 ATK à une carte alliée ciblée.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a rising bar-chart silhouette fused with a lightning streak (conveys power and performance), centered symmetrically with fine radiating light rays behind it, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 74. Culture Amp  `culture-amp`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +1 ATK à toutes vos cartes Talent / Performance en jeu (permanent).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a trophy-like geometric silhouette wrapped in energy arcs (conveys power and performance), framed slightly left-of-center with negative space breathing on the right, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 75. Elevo  `elevo`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +1 ATK à une carte alliée ciblée.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a rising bar-chart silhouette fused with a lightning streak (conveys power and performance), centered symmetrically with fine radiating light rays behind it, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 76. Neobrain  `neobrain`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Regardez le dessus de la pioche ; +1 ATK si c'est une carte Talent / Performance.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a sharp lightning-bolt burst radiating angular energy lines (conveys power and performance), set against a subtle diagonal light sweep across the background, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 77. Zest  `zest`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Charge. Effet d'Entrée : +1 ATK à elle-même si vous contrôlez 2+ cartes Talent / Performance.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a cluster of angular energy shards converging at a bright core (conveys power and performance), set against a subtle diagonal light sweep across the background, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 78. Beqom  `beqom`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +2 ATK à une carte alliée ciblée.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a sharp lightning-bolt burst radiating angular energy lines (conveys power and performance), framed slightly right-of-center with negative space breathing on the left, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 79. Cornerstone  `cornerstone`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +3 ATK à toutes vos cartes Talent / Performance en jeu (permanent).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a cluster of angular energy shards converging at a bright core (conveys power and performance), ringed by a thin halo of soft particles for extra glow, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 80. Prime de Performance  `prime-de-performance`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +3 ATK à toutes vos cartes Talent / Performance en jeu (permanent).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a cluster of angular energy shards converging at a bright core (conveys power and performance), framed slightly right-of-center with negative space breathing on the left, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

### 81. Talentsoft  `talentsoft`
- Domaine : Talent / Performance (#c13b3b) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : +2 ATK à toutes vos cartes Talent / Performance en jeu (permanent).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #c13b3b (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a cluster of angular energy shards converging at a bright core (conveys power and performance), set against a subtle diagonal light sweep across the background, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Talent / Performance" HR-software theme.

## Pilotage / BI

### 82. GoodData  `gooddata`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a network of connected data nodes pulsing along thin light lines (conveys information and insight), floating above a faint horizon line for a sense of depth, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 83. IBM Cognos  `ibm-cognos`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a layered data-stream motif flowing toward a bright focal node (conveys information and insight), set against a subtle diagonal light sweep across the background, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 84. JasperSoft  `jaspersoft`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a telescope/lens silhouette focusing converging data beams (conveys information and insight), centered symmetrically with fine radiating light rays behind it, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 85. Jedox  `jedox`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a layered data-stream motif flowing toward a bright focal node (conveys information and insight), framed slightly right-of-center with negative space breathing on the left, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 86. Oracle Hyperion  `oracle-hyperion`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a telescope/lens silhouette focusing converging data beams (conveys information and insight), centered symmetrically with fine radiating light rays behind it, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 87. Reporting Flash  `reporting-flash`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Piochez 2, gardez 1 (le reste part au cimetière).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a network of connected data nodes pulsing along thin light lines (conveys information and insight), centered symmetrically with fine radiating light rays behind it, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 88. SAS  `sas`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Carte vanille (aucune capacité spéciale).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a constellation of KPI nodes linked by soft directional lines (conveys information and insight), floating above a faint horizon line for a sense of depth, rendered as simple and clean: a single clear motif element, minimal composition. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 89. Board  `board`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Regardez les 2 cartes du dessus de votre pioche.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a layered data-stream motif flowing toward a bright focal node (conveys information and insight), set against a subtle diagonal light sweep across the background, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 90. Dataiku  `dataiku`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Regardez le dessus de la pioche adverse.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a network of connected data nodes pulsing along thin light lines (conveys information and insight), floating above a faint horizon line for a sense of depth, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 91. Domo  `domo`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a constellation of KPI nodes linked by soft directional lines (conveys information and insight), centered symmetrically with fine radiating light rays behind it, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 92. Qlik  `qlik`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Piochez 2, gardez 1 (le reste part au cimetière).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a constellation of KPI nodes linked by soft directional lines (conveys information and insight), centered symmetrically with fine radiating light rays behind it, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 93. SAP BusinessObjects  `sap-businessobjects`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Regardez le dessus de la pioche ; vous pouvez la défausser pour piocher la suivante.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a network of connected data nodes pulsing along thin light lines (conveys information and insight), centered symmetrically with fine radiating light rays behind it, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 94. Sisense  `sisense`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Regardez la carte du dessus de votre pioche.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a dashboard of glowing bar and line charts arranged in a radial cluster (conveys information and insight), set against a subtle diagonal light sweep across the background, rendered as moderate complexity: two or three motif elements combined with clear negative space. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 95. Anaplan  `anaplan`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Regardez la main adverse.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a network of connected data nodes pulsing along thin light lines (conveys information and insight), framed slightly left-of-center with negative space breathing on the right, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 96. Power BI  `power-bi`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Regardez les 3 cartes du dessus, choisissez celle que vous piocherez en premier.
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a constellation of KPI nodes linked by soft directional lines (conveys information and insight), centered symmetrically with fine radiating light rays behind it, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.

### 97. Tableau  `tableau`
- Domaine : Pilotage / BI (#7d3bd1) · Rareté : ★★★
- Contexte gameplay (inspiration uniquement, ne pas illustrer littéralement) : Effet d'Entrée : Piochez 2, gardez 1 (le reste part au cimetière).
- **Prompt** :

> Widescreen abstract corporate-tech illustration, ~12:7 aspect ratio. Gradient background dominated by #7d3bd1 (brighter near the upper-center, darker toward the edges), soft radial glow from the upper-center light source. Central motif: a layered data-stream motif flowing toward a bright focal node (conveys information and insight), set against a subtle diagonal light sweep across the background, rendered as rich complexity: multiple layered motif elements, a strong sense of scale and importance. Flat-to-soft-gradient vector illustration style, no readable text, no logos, no photorealism, no 3D render, generous negative space near the frame edges. Confident, precise, technological mood matching a "Pilotage / BI" HR-software theme.
