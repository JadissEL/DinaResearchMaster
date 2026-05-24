import Link from "next/link";
import type { PublishedArticle } from "@/lib/content/schema";

interface CaseStudyCardProps {
  article: PublishedArticle;
  className?: string;
}

export function CaseStudyCard({ article, className = "" }: CaseStudyCardProps) {
  const href = `/intelligence/${article.meta.slug}`;

  return (
    <Link
      href={href}
      className={`group relative flex h-[420px] w-[320px] shrink-0 flex-col justify-end overflow-hidden bg-black p-6 transition-transform duration-300 hover:scale-[1.02] md:w-[380px] ${className}`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#222] via-[#4580dc]/40 to-[#387a47]/50"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/20" aria-hidden />
      <div className="relative">
        <p className="label-case-study">Case study</p>
        <h3 className="mt-3 font-ui text-[1.2rem] font-normal leading-snug text-white">
          {article.meta.title}
        </h3>
      </div>
    </Link>
  );
}

