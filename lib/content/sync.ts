import { validateArticleContent } from "@/lib/content/validator";
import { readingTimeFromBlocks } from "@/lib/utils";
import type { ArticleContent } from "@/lib/content/schema";
import { isDatabaseConfigured, prisma } from "@/lib/db/prisma";
import { articleRegistry } from "@/content/articles/registry";

export async function loadArticleContentFromDisk(
  slug: string,
): Promise<ArticleContent | null> {
  const entry = articleRegistry[slug];
  if (!entry) return null;
  return { meta: entry.meta, blocks: entry.blocks };
}

export async function syncArticleToDatabase(slug: string) {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not configured");
  }

  const content = await loadArticleContentFromDisk(slug);
  if (!content) throw new Error(`Article not found: ${slug}`);

  const validation = validateArticleContent(content);
  if (!validation.success || !validation.data) {
    throw new Error(`Validation failed:\n${validation.errors.join("\n")}`);
  }

  const { meta, blocks } = validation.data;
  const readingTime = readingTimeFromBlocks(blocks);

  const article = await prisma.article.upsert({
    where: { slug: meta.slug },
    create: {
      slug: meta.slug,
      type: meta.type,
      status: "PUBLISHED",
      title: meta.title,
      dek: meta.dek,
      blocks,
      readingTime,
      aiSummary: meta.aiSummary,
      seo: {
        metaDescription: meta.metaDescription,
        ogTitle: meta.ogTitle,
        ogDescription: meta.ogDescription,
        keyTakeaways: meta.keyTakeaways,
      },
      publishedAt: meta.publishedAt ? new Date(meta.publishedAt) : new Date(),
      heroImage: meta.heroImage,
      heroMood: meta.heroMood,
    },
    update: {
      type: meta.type,
      status: "PUBLISHED",
      title: meta.title,
      dek: meta.dek,
      blocks,
      readingTime,
      aiSummary: meta.aiSummary,
      seo: {
        metaDescription: meta.metaDescription,
        ogTitle: meta.ogTitle,
        ogDescription: meta.ogDescription,
        keyTakeaways: meta.keyTakeaways,
      },
      publishedAt: meta.publishedAt ? new Date(meta.publishedAt) : new Date(),
      heroImage: meta.heroImage,
      heroMood: meta.heroMood,
    },
  });

  for (const topicSlug of meta.topics) {
    const topic = await prisma.topic.upsert({
      where: { slug: topicSlug },
      create: {
        slug: topicSlug,
        name: topicSlug.charAt(0).toUpperCase() + topicSlug.slice(1),
      },
      update: {},
    });
    await prisma.articleTopic.upsert({
      where: {
        articleId_topicId: { articleId: article.id, topicId: topic.id },
      },
      create: { articleId: article.id, topicId: topic.id },
      update: {},
    });
  }

  for (const tagSlug of meta.tags) {
    const tag = await prisma.tag.upsert({
      where: { slug: tagSlug },
      create: { slug: tagSlug, name: tagSlug },
      update: {},
    });
    await prisma.articleTag.upsert({
      where: { articleId_tagId: { articleId: article.id, tagId: tag.id } },
      create: { articleId: article.id, tagId: tag.id },
      update: {},
    });
  }

  for (const entity of meta.entities) {
    const ent = await prisma.entity.upsert({
      where: { slug: entity.slug },
      create: {
        slug: entity.slug,
        name: entity.name,
        type: entity.type,
      },
      update: { name: entity.name, type: entity.type },
    });
    await prisma.articleEntity.upsert({
      where: {
        articleId_entityId: { articleId: article.id, entityId: ent.id },
      },
      create: { articleId: article.id, entityId: ent.id },
      update: {},
    });
  }

  return { article, warnings: validation.warnings };
}

export async function syncAllArticles() {
  const results = [];
  for (const slug of Object.keys(articleRegistry)) {
    results.push(await syncArticleToDatabase(slug));
  }
  return results;
}
