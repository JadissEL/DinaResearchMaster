# Content Authoring

## Workflow

1. Create folder: `content/articles/<slug>/`
2. Add `meta.json` (SEO, topics, entities, takeaways)
3. Add `index.content.ts` with typed blocks
4. Register in `content/articles/registry.ts`
5. Validate & publish: `npm run publish -- <slug>`

## Block types

`hero`, `narrative`, `pullQuote`, `statReveal`, `timeline`, `researchBlock`, `comparison`, `riskScenario`, `opportunityMap`, `prediction`, `mediaFull`, `mediaInset`, `authorNote`, `citationList`, `discussionPrompt`, `relatedInsights`

## Entity links in narrative

Use `[[entity-slug]]` in narrative content for inline entity links.

## Validation gates

- Required: title, dek, slug, topics, aiSummary, metaDescription, keyTakeaways, hero block
- Warnings: internal links, related content
