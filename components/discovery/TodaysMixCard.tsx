import Link from "next/link";
import type { PublishedArticle } from "@/lib/content/schema";
import { formatDate } from "@/lib/utils";

interface TodaysMixCardProps {
  article: PublishedArticle;
}

export function TodaysMixCard({ article }: TodaysMixCardProps) {
  const href = `/intelligence/${article.meta.slug}`;

  return (
    <article className="border-b border-[var(--ref-ny-border)] pb-6 last:border-0">
      <Link href={href} className="group block">
        <h3 className="title-mix-article group-hover:underline">
          {article.meta.title}
        </h3>
        <p className="mt-2 font-ui text-sm text-[var(--ref-ws-muted)] line-clamp-2">
          {article.meta.dek}
        </p>
        <p className="mt-3 font-ui text-xs text-[var(--ref-apple-muted)]">
          {article.meta.publishedAt
            ? formatDate(article.meta.publishedAt)
            : "Recently"}{" "}
          · {article.readingTime} min
        </p>
      </Link>
    </article>
  );
}
