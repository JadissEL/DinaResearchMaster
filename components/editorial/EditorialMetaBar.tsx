import { formatDate } from "@/lib/utils";

interface EditorialMetaBarProps {
  publishedAt?: string;
  readingTime: number;
  author?: string;
}

export function EditorialMetaBar({
  publishedAt,
  readingTime,
  author = "DinaResearch",
}: EditorialMetaBarProps) {
  return (
    <div className="editorial-meta-bar" role="group" aria-label="Article metadata">
      <p>
        By <strong>{author}</strong>
      </p>
      <p>{publishedAt ? formatDate(publishedAt) : "Recently published"}</p>
      <p>{readingTime} min read</p>
    </div>
  );
}

