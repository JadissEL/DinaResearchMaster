import { z } from "zod";

export const articleTypeSchema = z.enum([
  "INSIGHT",
  "RESEARCH_BRIEF",
  "COMPANY_STORY",
  "TREND_REPORT",
  "RISK_OUTLOOK",
  "FUTURE_SIGNAL",
  "ACADEMIC_REFLECTION",
  "PERSPECTIVE",
]);

export const heroBlockSchema = z.object({
  type: z.literal("hero"),
  title: z.string(),
  dek: z.string(),
  mood: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

export const narrativeBlockSchema = z.object({
  type: z.literal("narrative"),
  content: z.string(),
  heading: z.string().optional(),
});

export const pullQuoteBlockSchema = z.object({
  type: z.literal("pullQuote"),
  quote: z.string(),
  attribution: z.string().optional(),
});

export const statRevealBlockSchema = z.object({
  type: z.literal("statReveal"),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      context: z.record(z.string(), z.string()).optional(),
    }),
  ),
});

export const timelineBlockSchema = z.object({
  type: z.literal("timeline"),
  title: z.string().optional(),
  events: z.array(
    z.object({
      date: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  ),
});

export const researchBlockSchema = z.object({
  type: z.literal("researchBlock"),
  title: z.string(),
  methodology: z.string().optional(),
  sources: z.array(z.string()),
  caveats: z.string().optional(),
});

export const comparisonBlockSchema = z.object({
  type: z.literal("comparison"),
  title: z.string(),
  columns: z.array(
    z.object({
      label: z.string(),
      points: z.array(z.string()),
    }),
  ),
});

export const riskScenarioBlockSchema = z.object({
  type: z.literal("riskScenario"),
  title: z.string(),
  scenarios: z.array(
    z.object({
      challenge: z.string(),
      impact: z.string(),
      mitigation: z.string().optional(),
    }),
  ),
});

export const opportunityMapBlockSchema = z.object({
  type: z.literal("opportunityMap"),
  title: z.string(),
  opportunities: z.array(
    z.object({
      area: z.string(),
      description: z.string(),
      signal: z.string().optional(),
    }),
  ),
});

export const predictionBlockSchema = z.object({
  type: z.literal("prediction"),
  title: z.string(),
  prediction: z.string(),
  confidence: z.enum(["low", "medium", "high"]),
  horizon: z.string(),
  rationale: z.string(),
});

export const mediaFullBlockSchema = z.object({
  type: z.literal("mediaFull"),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

export const mediaInsetBlockSchema = z.object({
  type: z.literal("mediaInset"),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  align: z.enum(["left", "right", "center"]).optional(),
});

export const relatedInsightsBlockSchema = z.object({
  type: z.literal("relatedInsights"),
  slugs: z.array(z.string()).optional(),
});

export const discussionPromptBlockSchema = z.object({
  type: z.literal("discussionPrompt"),
  question: z.string(),
});

export const citationListBlockSchema = z.object({
  type: z.literal("citationList"),
  citations: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      url: z.string().optional(),
    }),
  ),
});

export const authorNoteBlockSchema = z.object({
  type: z.literal("authorNote"),
  content: z.string(),
});

export const contentBlockSchema = z.discriminatedUnion("type", [
  heroBlockSchema,
  narrativeBlockSchema,
  pullQuoteBlockSchema,
  statRevealBlockSchema,
  timelineBlockSchema,
  researchBlockSchema,
  comparisonBlockSchema,
  riskScenarioBlockSchema,
  opportunityMapBlockSchema,
  predictionBlockSchema,
  mediaFullBlockSchema,
  mediaInsetBlockSchema,
  relatedInsightsBlockSchema,
  discussionPromptBlockSchema,
  citationListBlockSchema,
  authorNoteBlockSchema,
]);

export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type ArticleType = z.infer<typeof articleTypeSchema>;

export const articleMetaSchema = z.object({
  slug: z.string().min(1),
  type: articleTypeSchema,
  title: z.string().min(1),
  dek: z.string().min(1),
  aiSummary: z.string().min(50).max(600),
  metaDescription: z.string().min(50).max(160),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  topics: z.array(z.string()).min(1),
  tags: z.array(z.string()).default([]),
  entities: z
    .array(
      z.object({
        slug: z.string(),
        name: z.string(),
        type: z.enum(["COMPANY", "MARKET", "PERSON", "INDUSTRY"]),
      }),
    )
    .default([]),
  relatedSlugs: z.array(z.string()).default([]),
  publishedAt: z.string().optional(),
  heroImage: z.string().optional(),
  heroMood: z.string().optional(),
  keyTakeaways: z.array(z.string()).min(1),
});

export type ArticleMeta = z.infer<typeof articleMetaSchema>;

export const articleContentSchema = z.object({
  meta: articleMetaSchema,
  blocks: z.array(contentBlockSchema).min(1),
});

export type ArticleContent = z.infer<typeof articleContentSchema>;

export interface PublishedArticle extends ArticleContent {
  readingTime: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}
