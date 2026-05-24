import { getPublishedArticles, TOPICS } from "@/lib/content/loader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function GET() {
  const articles = await getPublishedArticles();

  const body = `# DinaResearch

> Market and company research on Morocco—investors, startup funding, initiatives, events, and ecosystem data.

## About

DinaResearch publishes market and company research focused on the Moroccan panorama: investor trends (domestic and international), startup funding, initiatives, programs, and ecosystem events.

## Published research

${
  articles.length > 0
    ? articles
        .slice(0, 10)
        .map(
          (a) =>
            `- [${a.meta.title}](${SITE_URL}/intelligence/${a.meta.slug}): ${a.meta.aiSummary}`,
        )
        .join("\n")
    : "- No articles published yet."
}

## Topics

${TOPICS.map((t) => `- ${t.name}: ${t.description}`).join("\n")}

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
