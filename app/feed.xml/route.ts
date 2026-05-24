import { getPublishedArticles } from "@/lib/content/loader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function GET() {
  const articles = await getPublishedArticles();

  const items = articles
    .map(
      (a) => `
    <item>
      <title><![CDATA[${a.meta.title}]]></title>
      <link>${SITE_URL}/intelligence/${a.meta.slug}</link>
      <guid>${SITE_URL}/intelligence/${a.meta.slug}</guid>
      <description><![CDATA[${a.meta.dek}]]></description>
      <pubDate>${a.meta.publishedAt ? new Date(a.meta.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DinaResearch Intelligence</title>
    <link>${SITE_URL}</link>
    <description>Premium market intelligence and strategic research</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
