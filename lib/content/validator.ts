import { articleContentSchema, type ArticleContent } from "./schema";

export interface ValidationResult {
  success: boolean;
  data?: ArticleContent;
  errors: string[];
  warnings: string[];
}

export function validateArticleContent(input: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const parsed = articleContentSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      ),
      warnings,
    };
  }

  const { meta, blocks } = parsed.data;

  const hasHero = blocks.some((block) => block.type === "hero");
  if (!hasHero) {
    errors.push("Article must include at least one hero block.");
  }

  const h1Count = blocks.filter((block) => block.type === "hero").length;
  if (h1Count !== 1) {
    warnings.push("Expected exactly one hero block acting as H1.");
  }

  const internalLinkCount = blocks.filter(
    (block) => block.type === "narrative" && block.content.includes("[["),
  ).length;

  if (internalLinkCount < 1 && meta.relatedSlugs.length < 3) {
    warnings.push(
      "SEO: Consider at least 3 internal links via entity refs or relatedSlugs.",
    );
  }

  if (!meta.aiSummary) {
    errors.push("AI summary is required for discoverability.");
  }

  return {
    success: errors.length === 0,
    data: parsed.data,
    errors,
    warnings,
  };
}
