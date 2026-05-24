import type { ArticleMeta, ContentBlock } from "@/lib/content/schema";

export interface ArticleRegistryEntry {
  meta: ArticleMeta;
  blocks: ContentBlock[];
}

export const articleRegistry: Record<string, ArticleRegistryEntry> = {};

export const articleSlugs = Object.keys(articleRegistry);
