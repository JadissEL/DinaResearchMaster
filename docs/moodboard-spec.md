# Unified Moodboard Spec (Reference Integration)

This document captures the synthesized design language from reference sites until custom screenshots are provided.

## Spatial rhythm

- **Hero:** 90vh max, gradient overlay at 15–25% opacity, single focal headline
- **Section padding:** 5rem vertical (`py-20`) on desktop
- **Card grid:** 3–4 columns with 1.5rem gap, staggered entrance 60–80ms

## Navigation

- Transparent at top → glass compact bar on scroll
- Reading progress: 2px purple-pink gradient line on articles
- Mobile: consider bottom nav in v2 (header-only for v1)

## Typography hierarchy

| Level | Font | Size |
|-------|------|------|
| Hero H1 | Fraunces | clamp(2.5rem, 5vw, 4.5rem) |
| Section H2 | Fraunces | 1.875–2.25rem |
| Body | Source Serif 4 | 1.125rem / 1.75 leading |
| UI | Inter | 0.875rem |

## Card patterns

- Rounded 2xl, white/80 background, purple-100 border
- Hover: lift 2px + soft shadow expansion
- Featured card: 2-column split image/content

## Motion

- Section fade-up on scroll (once)
- No text animation during read
- Lenis smooth scroll globally (reduced-motion bypass)

## When screenshots arrive

1. Extract spacing ratios and hero composition
2. Adjust card aspect ratios if needed
3. Tune gradient angles and opacity
4. Update this file with dated notes
