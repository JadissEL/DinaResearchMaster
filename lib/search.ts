import type { PublishedArticle } from "@/lib/content/schema";

export type SearchResultItem = {
  slug: string;
  title: string;
  dek: string;
  readingTime: number;
  topics: string[];
};

export function searchPublishedArticles(
  articles: PublishedArticle[],
  query: string,
): PublishedArticle[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return articles.filter((article) => {
    const { meta } = article;
    const haystack = [
      meta.title,
      meta.dek,
      meta.aiSummary,
      meta.metaDescription,
      ...meta.topics,
      ...meta.tags,
      ...meta.entities.map((e) => e.name),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export function toSearchResults(
  articles: PublishedArticle[],
): SearchResultItem[] {
  return articles.map((article) => ({
    slug: article.meta.slug,
    title: article.meta.title,
    dek: article.meta.dek,
    readingTime: article.readingTime,
    topics: article.meta.topics,
  }));
}
