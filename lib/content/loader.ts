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
    slug: "markets",
    name: "Markets",
    description: "Macro movements, market structure, and capital flows.",
  },
  {
    slug: "industries",
    name: "Industries",
    description: "Sector dynamics, competitive landscapes, and value chains.",
  },
  {
    slug: "companies",
    name: "Companies",
    description: "Corporate histories, transformations, and strategic pivots.",
  },
  {
    slug: "macro",
    name: "Macro",
    description: "Economic cycles, policy, and global business trends.",
  },
  {
    slug: "risk",
    name: "Risk",
    description: "Threats, vulnerabilities, and scenario planning.",
  },
  {
    slug: "futures",
    name: "Futures",
    description: "Signals, forecasts, and strategic foresight.",
  },
  {
    slug: "academic",
    name: "Academic",
    description: "Research reflections and scholarly perspectives.",
  },
  {
    slug: "career",
    name: "Career",
    description: "Professional growth and PhD journey insights.",
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
