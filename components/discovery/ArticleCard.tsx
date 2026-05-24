import Link from "next/link";
import { Card, CardContent, CardImage } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import type { PublishedArticle } from "@/lib/content/schema";
import { formatDate } from "@/lib/utils";

const TYPE_LABELS: Record<string, string> = {
  INSIGHT: "Insight",
  RESEARCH_BRIEF: "Research Brief",
  COMPANY_STORY: "Company Story",
  TREND_REPORT: "Trend Report",
  RISK_OUTLOOK: "Risk Outlook",
  FUTURE_SIGNAL: "Future Signal",
  ACADEMIC_REFLECTION: "Academic Reflection",
  PERSPECTIVE: "Perspective",
};

type ArticleCardVariant = "default" | "featured" | "mix";

interface ArticleCardProps {
  article: PublishedArticle;
  variant?: ArticleCardVariant;
  /** @deprecated use variant="featured" */
  featured?: boolean;
}

export function ArticleCard({
  article,
  variant = "default",
  featured,
}: ArticleCardProps) {
  const href = `/intelligence/${article.meta.slug}`;
  const resolvedVariant = featured ? "featured" : variant;

  if (resolvedVariant === "mix") {
    return (
      <article className="border-b border-[var(--ref-ny-border)] pb-6">
        <Link href={href} className="group block">
          <h3 className="title-mix-article group-hover:underline">
            {article.meta.title}
          </h3>
          <p className="mt-2 font-ui text-sm text-[var(--ref-ws-muted)] line-clamp-2">
            {article.meta.dek}
          </p>
        </Link>
      </article>
    );
  }

  if (resolvedVariant === "featured") {
    return (
      <article className="grid overflow-hidden border border-black/10 bg-white md:grid-cols-2">
        <Link href={href} className="contents md:grid md:grid-cols-2 md:col-span-2">
          <CardImage className="aspect-[4/3] rounded-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#222] via-[#4580dc]/30 to-[#387a47]/40" />
            <div className="absolute inset-0 flex items-end p-8">
              <span className="label-case-study bg-black/40 px-2 py-1 text-white">
                {TYPE_LABELS[article.meta.type] ?? article.meta.type}
              </span>
            </div>
          </CardImage>
          <CardContent className="flex flex-col justify-center rounded-none p-8 md:p-12">
            <p className="label-case-study">Case study</p>
            <h3 className="mt-4 font-ui text-2xl font-medium leading-tight text-black md:text-3xl">
              {article.meta.title}
            </h3>
            <p className="mt-4 font-ui text-base leading-relaxed text-black/65 line-clamp-4">
              {article.meta.dek}
            </p>
            <p className="mt-6 font-ui text-sm text-black/45">
              {article.meta.publishedAt
                ? formatDate(article.meta.publishedAt)
                : "Recently"}{" "}
              · {article.readingTime} min read
            </p>
          </CardContent>
        </Link>
      </article>
    );
  }

  return (
    <Card as="article" className="flex h-full flex-col rounded-none border-black/10">
      <Link href={href} className="flex flex-1 flex-col">
        <CardImage className="aspect-[16/9] rounded-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--ref-v10-gray)] to-[var(--ref-v10-beige)]" />
        </CardImage>
        <CardContent className="flex flex-1 flex-col">
          <span className="label-case-study">
            {TYPE_LABELS[article.meta.type] ?? article.meta.type}
          </span>
          <h3 className="mt-2 font-ui text-lg font-medium leading-snug text-black group-hover:text-[var(--ref-v10-green)]">
            {article.meta.title}
          </h3>
          <p className="mt-2 flex-1 font-ui text-sm leading-relaxed text-black/60 line-clamp-2">
            {article.meta.dek}
          </p>
        </CardContent>
      </Link>
      {article.meta.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 px-6 pb-6">
          {article.meta.topics.slice(0, 2).map((topic) => (
            <Chip key={topic} href={`/topics/${topic}`}>
              {topic}
            </Chip>
          ))}
        </div>
      )}
    </Card>
  );
}

