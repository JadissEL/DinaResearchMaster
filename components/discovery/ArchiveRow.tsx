import Link from "next/link";
import type { PublishedArticle } from "@/lib/content/schema";
import { formatDate } from "@/lib/utils";

interface ArchiveRowProps {
  article: PublishedArticle;
  index: number;
}

export function ArchiveRow({ article, index }: ArchiveRowProps) {
  const { meta } = article;

  return (
    <li className="archive-row list-none">
      <span className="font-mono text-xs text-[var(--surface-text-muted)]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <Link
          href={`/intelligence/${meta.slug}`}
          className="font-body text-xl text-[var(--surface-text)] hover:underline md:text-2xl"
        >
          {meta.title}
        </Link>
        <p className="mt-2 font-ui text-sm text-[var(--surface-text-muted)] line-clamp-2">
          {meta.dek}
        </p>
      </div>
      <span className="font-ui text-xs text-[var(--surface-text-muted)]">
        {meta.publishedAt ? formatDate(meta.publishedAt) : "Recent"}
        <br />
        {article.readingTime} min
      </span>
    </li>
  );
}
