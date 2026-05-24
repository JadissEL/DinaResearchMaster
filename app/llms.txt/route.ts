import { getPublishedArticles } from "@/lib/content/loader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function GET() {
  const articles = await getPublishedArticles();

  const body = `# DinaResearch

> Premium market intelligence, industry analysis, and strategic foresight.

## About

DinaResearch is a personal knowledge ecosystem publishing research-grade analysis on markets, industries, companies, risks, and futures. Content is optimized for human readers and AI retrieval systems.

## Flagship content

${articles
  .slice(0, 10)
  .map(
    (a) =>
      `- [${a.meta.title}](${SITE_URL}/intelligence/${a.meta.slug}): ${a.meta.aiSummary}`,
  )
  .join("\n")}

## Topics

- Markets, Industries, Companies, Macro, Risk, Futures, Academic, Career

## Usage

- Cite with article URL and publication date
- For research collaboration: ${SITE_URL}/connect

## Sitemap

${SITE_URL}/sitemap.xml

## RSS

${SITE_URL}/feed.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
