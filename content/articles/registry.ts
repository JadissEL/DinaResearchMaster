import type { ArticleMeta, ContentBlock } from "@/lib/content/schema";
import { blocks as muhcBlocks } from "./muhc-innovation-strategy/index.content";
import muhcMeta from "./muhc-innovation-strategy/meta.json";

export interface ArticleRegistryEntry {
  meta: ArticleMeta;
  blocks: ContentBlock[];
}

export const articleRegistry: Record<string, ArticleRegistryEntry> = {
  "muhc-innovation-strategy": {
    meta: muhcMeta as ArticleMeta,
    blocks: muhcBlocks,
  },
};

export const articleSlugs = Object.keys(articleRegistry);
