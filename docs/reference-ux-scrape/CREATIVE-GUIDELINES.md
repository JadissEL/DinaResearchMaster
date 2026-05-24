# Creative UX Guidelines — DinaResearch

Derived from **live scrape** (`docs/reference-ux-scrape/`) + **2026 editorial best practices**.

## Reference sites → patterns

| Source | Pattern | Implementation |
|--------|---------|----------------|
| [Volume10](https://www.volume10.com/home) | Split hero, case study rail, Mandate/Impact sections | Home hero, `CaseStudyCard`, article "Impact and outcomes" |
| [Volume10 case studies](https://www.volume10.com/case-studies) | Structured narrative: context → solutions → outcomes | `case-study-section`, orange `label-mission` headings |
| [The New Yorker](https://www.newyorker.com/) | "Today's Mix" grid, serif titles 22–28px | `TodaysMixCard`, `section-todays-mix` |
| [Apple](https://www.apple.com/gr/) | Full-bleed product tiles, 12px muted labels | `IntelligenceTile` |
| [Wealthsimple](https://www.wealthsimple.com/en-ca) | Trust display type, near-white `#fcfcfc` | `TrustStrip`, `display-ws` |
| [TGI Fridays](https://www.fridays.gr/) | Promo band energy, red CTA | `PromoBand` |

## 2026 best practices applied

### Typography & reading ([Flip180 Media, 2026](https://flip180media.com/tips-for-periodical-publishers/magazine-website-redesign-strategy-ux-layout-ideas-for-2026/))
- Serif body + sans UI labels
- Line-height 1.65, measure ~42rem (50–75 characters)
- Mobile-first single column for long-form

### Long-form composition ([Themes.News](https://themes.news/layout-techniques-for-long-form-posts-lessons-from-expansive))
- Expansive focal hero with negative space
- Sticky chapter nav (`ChapterNav`) between sections
- Visual rhythm via borders and section labels—not purple gradients

### Scroll & motion ([Chrome scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations), [Creative Alive 2026](https://creativealive.com/scroll-driven-storytelling-complete-2026-css-guide/))
- Native `animation-timeline: view()` via `.reveal-on-scroll` (progressive enhancement)
- Framer Motion fallback in `FadeIn`
- `prefers-reduced-motion` respected everywhere

### Performance & UX ([UXPin SEO/UX 2026](https://www.uxpin.com/studio/blog/ux-seo-guide/))
- Flat IA (3–4 clicks max)
- Touch targets ≥48px on CTAs
- No scrolljacking; progress bar on articles only

## 2026 creative patterns (online research)

### Scroll-driven typography ([Codrops Exat, 2026](https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/))
- Scroll as structural tool, not decoration
- `.reveal-on-scroll`, `.tile-hover-lift` — restrained motion
- Hover comparisons on tiles (IntelligenceTile)

### Magazine systems ([NYT Magazine redesign](https://www.itsnicethat.com/features/gail-bichler-the-new-york-times-magazine-redesign-publication-spotlight-080426))
- `.editorial-rule` — standardized rule lines
- `.magazine-layout` — caption column + main (7-col inspired)
- Top margin furniture, spacious headers

### Modern archive ([The Ken Intermission](https://the-ken.com/blog/most-podcasts-end-with-a-transcript-ours-didnt/))
- `.archive-row` on `/research` index
- Curated index numbering, continuous scroll journey

### Editorial restraint ([The Atlantic IQ,UA](https://artemisward.substack.com/p/iqua-designing-the-future-of-a-storied))
- Motion supports reading, never delays it
- Bespoke sections only where story demands (case study vs mix vs tile)


**Do**
- Use scraped tokens (`--ref-v10-*`, `--ref-ws-*`) before brand purple
- Label sections with uppercase micro-type (CASE STUDY, OUR MISSION)
- Square CTAs on conversion paths (`btn-v10`)

**Don't**
- Reintroduce generic "AI SaaS" purple gradients on editorial surfaces
- Duplicate hero (ArticleExperience header + hero block — use `skipHero`)
- Round everything — Volume10 uses 0px radius on buttons

## Accessibility (WCAG 2.2 AA)

- **Skip link** — `SkipToContent` → `#main-content` ([Sam Cheek 2026](https://samcheek.com/blog/web-accessibility-a11y-guide-2026))
- **Focus visible** — `:focus-visible` green outline ([W3C 2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance))
- **Focus not obscured** — `scroll-margin-top` on headings + main ([Line25 2026](https://line25.com/articles/web-accessibility-checklist-2026/))
- **Reduced motion** — `prefers-reduced-motion` in FadeIn + disabled scroll reveals

## Files to touch when extending

- `styles/reference-ux.css` — utility classes
- `styles/semantic-tokens.css` — surface tokens + dark mode + bento grid
- `lib/reference-ux.ts` — token constants
- `components/discovery/*` — cards, tiles, promo, `BentoMixGrid`
- `components/layout/MobileNav.tsx` — mobile drawer
- `components/layout/ThemeToggle.tsx` — light / dark / system
- `components/editorial/ArticleExperience.tsx` — article shell

## Pass 2026-05-24 — Semantic tokens & bento

Sources: [cr0x.net design tokens](https://cr0x.net/en/docs-theme-design-tokens/), [DEV 2026 trends](https://dev.to/studiomeyer_io/web-design-trends-2026-what-actually-held-up-after-six-months-23p8), [TypeUI publication skill](https://www.typeui.sh/design-skills/publication).

- **`--surface-*` tokens** — bg / elevated / inset / text / border / accent (green spot color, not purple prose)
- **Dark mode first-class** — `prefers-color-scheme: dark` + `data-theme` override via footer `ThemeToggle`
- **Bento grid** — Today's Mix on homepage (`BentoMixGrid`, lead story spans 7 cols)
- **Mobile nav** — full-screen drawer with taxonomy links (Volume10 square CTA)
- **Container** — `.container-editorial` clamp padding, max 1440px

## Pass 2026-05-24c — Longform reading UX

Sources: [Themes.News expansive layouts](https://themes.news/layout-techniques-for-long-form-posts-lessons-from-expansive), [Theknow longform 2026](https://theknow.life/designing-readable-longform-2026), [Unbreaking sidenotes](https://unbreaking.org/blog/tech-note-sidenotes/).

- **Active chapter nav** — `IntersectionObserver` in `ChapterNav` + `data-active` / `aria-current`
- **Floating reading anchor** — `.reading-anchor` bottom-right on mobile (Themes.News focal device)
- **Micro-typography** — `.reading-body` line-height 1.7, fluid font-size via `clamp()`
- **Progressive disclosure** — `.reading-disclosure` for author notes (`<details>`)
- **Figcaptions** — `.figcaption-ref` on media blocks
- **Surface token migration** — ArticleRenderer, PageHero, homepage, footer
