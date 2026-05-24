# DinaResearchMaster — README

Premium Morocco market research platform—market and company analysis, investors, startup funding, initiatives, and events.

## Quick start

```bash
cp .env.example .env
# Set DATABASE_URL (Neon PostgreSQL recommended)

npm install
npm run db:push
npm run publish:all
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content publishing

Articles live in `content/articles/<slug>/`. After editing:

```bash
npm run publish -- <article-slug>
# or
npm run publish:all
```

## Key routes

| Route | Purpose |
|-------|---------|
| `/` | Cinematic home |
| `/intelligence` | Article feed |
| `/intelligence/[slug]` | Immersive article |
| `/topics` | Topic clusters |
| `/discussions` | Community index |
| `/about` | Authority page |
| `/connect` | Contact form |
| `/admin/moderation` | Comment moderation |
| `/llms.txt` | AI discovery manifest |

## Stack

- Next.js 16 App Router
- Tailwind CSS 4 + `@tailwindcss/typography` + design tokens
- Framer Motion + Lenis smooth scroll
- Prisma + Neon PostgreSQL
- Vercel Analytics, Speed Insights, `@vercel/og` social cards
- Sonner toasts, Resend (contact email), `react-wrap-balancer`, Sharp

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Prisma generate + production build |
| `npm run build:app` | Next build only (if Prisma DLL is locked on Windows) |
| `npm run format` | Prettier + Tailwind class sorting |
| `npm run scrape:references` | UX audit scrape → `docs/reference-ux-scrape/` |

## Docs

- [Design system](docs/design-system.md)
- [Content authoring](docs/content-authoring.md)
- [SEO checklist](docs/seo-checklist.md)
