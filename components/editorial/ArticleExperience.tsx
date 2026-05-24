"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArticleRenderer,
  ChapterNav,
  CommentSection,
  EditorialMetaBar,
  ReadingModeToggle,
  ShareSheet,
} from "@/components/editorial";
import { CaseStudyCard } from "@/components/discovery";
import { ScrollReveal } from "@/components/motion";
import { Chip } from "@/components/ui/Chip";
import { AnalyticsTracker } from "@/lib/analytics/client";
import type { PublishedArticle } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

interface ArticleExperienceProps {
  article: PublishedArticle;
  related: PublishedArticle[];
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ArticleExperience({ article, related }: ArticleExperienceProps) {
  const [mode, setMode] = useState<"immersive" | "focus" | "research">("immersive");
  const { meta } = article;

  const chapters = useMemo(
    () =>
      article.blocks
        .filter((b) => b.type === "narrative" && b.heading)
        .map((b) => {
          const heading = b.type === "narrative" ? b.heading! : "";
          return { id: slugifyHeading(heading), label: heading };
        }),
    [article.blocks],
  );

  return (
    <>
      <AnalyticsTracker articleSlug={meta.slug} />

      <article className="pb-24">
        {/* Volume10 — expansive focal hero with negative space */}
        <header className="bg-[var(--surface-bg-inset)] pt-[calc(var(--header-height)+2rem)] pb-16 md:pb-24">
          <div className="container-editorial">
            <nav className="mb-8 flex flex-wrap items-center gap-2 font-ui text-xs uppercase tracking-wider text-[var(--surface-text-muted)] no-print">
              <Link href="/" className="hover:text-[var(--surface-text)]">
                Home
              </Link>
              <span>/</span>
              <Link href="/intelligence" className="hover:text-[var(--surface-text)]">
                Intelligence
              </Link>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,var(--ref-measure-v10))_1fr] lg:items-end">
              <div>
                <p className="label-case-study">Case study</p>
                <h1 className="hero-v10-title mt-4">{meta.title}</h1>
                <p className="type-lead mt-6 font-body text-[var(--surface-text-muted)]">
                  {meta.dek}
                </p>
                <EditorialMetaBar
                  publishedAt={meta.publishedAt}
                  readingTime={article.readingTime}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 no-print lg:justify-end">
                <div className="flex flex-wrap gap-2">
                  {meta.topics.map((topic) => (
                    <Chip key={topic} href={`/topics/${topic}`}>
                      {topic}
                    </Chip>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <ReadingModeToggle mode={mode} onChange={setMode} />
                  <ShareSheet slug={meta.slug} title={meta.title} />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div
          className={cn(
            "mx-auto max-w-[1440px] px-6 lg:px-8",
            mode === "focus" && "bg-[var(--surface-bg)]",
          )}
        >
          <div
            className={cn(
              "grid gap-12 pt-12 lg:gap-16",
              mode !== "focus" && "lg:grid-cols-[1fr_220px]",
            )}
          >
            <div
              className={cn(
                mode === "focus" && "reading-measure",
              )}
            >
              {mode === "research" && chapters.length > 0 && (
                <aside className="no-print mb-10 border border-[var(--surface-border)] bg-[var(--surface-bg-elevated)] p-6">
                  <p className="label-mission">Research outline</p>
                  <ul className="mt-4 space-y-2 font-ui text-sm">
                    {chapters.map((ch) => (
                      <li key={ch.id}>
                        <a href={`#${ch.id}`} className="hover:underline">
                          {ch.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}

              <ArticleRenderer blocks={article.blocks} mode={mode} skipHero />

              {meta.keyTakeaways.length > 0 && (
                <ScrollReveal>
                  <section className="case-study-section reading-measure">
                    <h2>Impact and outcomes</h2>
                    <ul className="mt-4 space-y-3">
                      {meta.keyTakeaways.map((t) => (
                        <li
                          key={t}
                          className="flex gap-3 font-body text-base leading-relaxed text-[var(--ref-ws-text)]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--ref-v10-green)]" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </section>
                </ScrollReveal>
              )}

              <CommentSection articleSlug={meta.slug} articleTitle={meta.title} />
            </div>

            {mode !== "focus" && chapters.length > 0 && (
              <aside className="hidden lg:block">
                <ChapterNav chapters={chapters} />
              </aside>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-[var(--surface-border)] bg-[var(--surface-bg-inset)] py-16">
            <div className="container-editorial">
              <p className="label-case-study">Explore another case study</p>
              <h2 className="mt-2 font-ui text-2xl font-bold text-[var(--surface-text)]">
                Related insights
              </h2>
              <div className="scroll-case-rail mt-8 flex gap-4 overflow-x-auto pb-4">
                {related.map((r) => (
                  <CaseStudyCard key={r.meta.slug} article={r} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}

