import Link from "next/link";
import type { PublishedArticle } from "@/lib/content/schema";
import { formatDate } from "@/lib/utils";

interface BentoMixGridProps {
  articles: PublishedArticle[];
}

export function BentoMixGrid({ articles }: BentoMixGridProps) {
  if (articles.length === 0) {
    return (
      <p className="mt-10 font-ui text-sm text-[var(--surface-text-muted)]">
        Research on Morocco&apos;s markets, companies, investors, and startups
        will appear here as it is published.
      </p>
    );
  }

  const [lead, ...rest] = articles;

  return (
    <div className="bento-grid mt-10">
      <div className="bento-cell bento-feature">
        <Link
          href={`/intelligence/${lead.meta.slug}`}
          className="group flex h-full flex-col justify-end"
        >
          <p className="label-case-study">Lead story</p>
          <h3 className="mt-3 font-body text-2xl leading-snug text-[var(--surface-text)] group-hover:underline md:text-3xl">
            {lead.meta.title}
          </h3>
          <p className="mt-3 line-clamp-3 font-ui text-sm text-[var(--surface-text-muted)]">
            {lead.meta.dek}
          </p>
          <p className="mt-4 font-ui text-xs text-[var(--surface-text-muted)]">
            {lead.meta.publishedAt ? formatDate(lead.meta.publishedAt) : "Recently"}{" "}
            · {lead.readingTime} min
          </p>
        </Link>
      </div>

      {rest.slice(0, 5).map((article, i) => (
        <div
          key={article.meta.slug}
          className={`bento-cell ${i < 2 ? "bento-standard" : "bento-half md:col-span-5"}`}
        >
          <Link
            href={`/intelligence/${article.meta.slug}`}
            className="group block h-full"
          >
            <h3 className="title-mix-article text-xl group-hover:underline">
              {article.meta.title}
            </h3>
            <p className="mt-2 line-clamp-2 font-ui text-sm text-[var(--surface-text-muted)]">
              {article.meta.dek}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
