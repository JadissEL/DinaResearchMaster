import type { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/lib/content/loader";
import { TOPICS } from "@/lib/content/loader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllArticleSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/intelligence`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/topics`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/research`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/discussions`, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/connect`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const topicPages = TOPICS.map((t) => ({
    url: `${SITE_URL}/topics/${t.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const articlePages = slugs.map((slug) => ({
    url: `${SITE_URL}/intelligence/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...topicPages, ...articlePages];
}
