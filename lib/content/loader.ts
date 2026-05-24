import type { PublishedArticle } from "./schema";
import { articleContentSchema } from "./schema";
import { readingTimeFromBlocks } from "@/lib/utils";
import { isDatabaseConfigured, prisma } from "@/lib/db/prisma";
import { articleRegistry, articleSlugs } from "@/content/articles/registry";

export async function loadArticleFromFile(
  slug: string,
): Promise<PublishedArticle | null> {
  const entry = articleRegistry[slug];
  if (!entry) return null;

  const parsed = articleContentSchema.parse({
    meta: entry.meta,
    blocks: entry.blocks,
  });

  return {
    ...parsed,
    readingTime: readingTimeFromBlocks(parsed.blocks),
    status: "PUBLISHED",
  };
}

export async function getAllArticleSlugs(): Promise<string[]> {
  return articleSlugs;
}

export async function loadAllArticlesFromFiles(): Promise<PublishedArticle[]> {
  const articles = await Promise.all(articleSlugs.map((slug) => loadArticleFromFile(slug)));
  return articles
    .filter((a): a is PublishedArticle => a !== null)
    .sort(
      (a, b) =>
        new Date(b.meta.publishedAt ?? 0).getTime() -
        new Date(a.meta.publishedAt ?? 0).getTime(),
    );
}

export async function getArticleBySlug(
  slug: string,
): Promise<PublishedArticle | null> {
  if (isDatabaseConfigured()) {
    try {
      const dbArticle = await prisma.article.findUnique({
        where: { slug, status: "PUBLISHED" },
        include: {
          topics: { include: { topic: true } },
          tags: { include: { tag: true } },
          entities: { include: { entity: true } },
        },
      });

      if (dbArticle) {
        const blocks = dbArticle.blocks as PublishedArticle["blocks"];
        const seo = dbArticle.seo as {
          metaDescription?: string;
          keyTakeaways?: string[];
        } | null;
        return {
          meta: {
            slug: dbArticle.slug,
            type: dbArticle.type as PublishedArticle["meta"]["type"],
            title: dbArticle.title,
            dek: dbArticle.dek,
            aiSummary: dbArticle.aiSummary ?? "",
            metaDescription: seo?.metaDescription ?? dbArticle.dek,
            topics: dbArticle.topics.map((t) => t.topic.slug),
            tags: dbArticle.tags.map((t) => t.tag.slug),
            entities: dbArticle.entities.map((e) => ({
              slug: e.entity.slug,
              name: e.entity.name,
              type: e.entity.type as "COMPANY" | "MARKET" | "PERSON" | "INDUSTRY",
            })),
            relatedSlugs: [],
            publishedAt: dbArticle.publishedAt?.toISOString(),
            heroImage: dbArticle.heroImage ?? undefined,
            heroMood: dbArticle.heroMood ?? undefined,
            keyTakeaways: seo?.keyTakeaways ?? [],
          },
          blocks,
          readingTime: dbArticle.readingTime,
          status: dbArticle.status as PublishedArticle["status"],
        };
      }
    } catch {
      // fall through to file loader
    }
  }

  return loadArticleFromFile(slug);
}

export async function getPublishedArticles(): Promise<PublishedArticle[]> {
  if (isDatabaseConfigured()) {
    try {
      const dbArticles = await prisma.article.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
      });

      if (dbArticles.length > 0) {
        const results = await Promise.all(
          dbArticles.map((a) => getArticleBySlug(a.slug)),
        );
        return results.filter((a): a is PublishedArticle => a !== null);
      }
    } catch {
      // fall through
    }
  }

  return loadAllArticlesFromFiles();
}

export const TOPICS = [
  {
    slug: "morocco-panorama",
    name: "Moroccan Market Panorama",
    description:
      "Macro view, sector structure, and market dynamics across the Moroccan economy.",
  },
  {
    slug: "companies",
    name: "Company Research",
    description:
      "Profiles, performance, and strategic moves of Moroccan companies and groups.",
  },
  {
    slug: "investors",
    name: "Investors & Capital",
    description:
      "Domestic and international investor activity, capital flows, and market entry.",
  },
  {
    slug: "startups",
    name: "Startup Funding",
    description:
      "Venture rounds, funds, accelerators, and funding trends in Morocco.",
  },
  {
    slug: "initiatives",
    name: "Initiatives & Programs",
    description:
      "Public policies, institutional programs, and private initiatives shaping the market.",
  },
  {
    slug: "events",
    name: "Events & Ecosystem",
    description:
      "Conferences, demo days, ecosystem gatherings, and industry calendars.",
  },
] as const;

export function getTopicBySlug(slug: string) {
  return TOPICS.find((t) => t.slug === slug);
}

export function filterArticlesByTopic(
  articles: PublishedArticle[],
  topicSlug: string,
) {
  return articles.filter((a) => a.meta.topics.includes(topicSlug));
}
