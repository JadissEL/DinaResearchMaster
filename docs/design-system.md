# Design System — DinaResearchMaster

## Visual identity

- **Colors:** Purple (primary depth), Pink (emotional accent), Beige (editorial warmth), Green-soft (interactive/CTA), Black/White (type contrast)
- **Typography:** Fraunces (display), Source Serif 4 (body), Inter (UI), JetBrains Mono (data)
- **Effects:** Soft gradients, glass panels (nav/modals only), layered shadows, restrained glow

## Motion

| Token | Duration | Use |
|-------|----------|-----|
| fast | 180ms | hovers |
| medium | 400ms | section entrances |
| slow | 800ms | hero |
| cinematic | 1200ms+ | scroll-linked (max 1 per viewport) |

Always respect `prefers-reduced-motion`.

## Reference synthesis (unified moodboard)

Patterns extracted from reference sites—not copied:

| Source | Pattern adopted |
|--------|-----------------|
| Volume10 | Editorial restraint, mission framing, case-study hero |
| Apple | Scroll rhythm, typographic scale, section pacing |
| New Yorker | Taxonomy, curated rails, reading hierarchy |
| Wealthsimple | Trust signals, modular product blocks, motion heroes |
| Fridays | Event-style content drops (adapted as “active discussions”) |

## Component tiers

- **Tier A:** Hero sections (home, article)
- **Tier B:** Cards, rails, quotes
- **Tier C:** Forms, comments, admin

## Tokens

See [`styles/tokens.css`](../styles/tokens.css).
