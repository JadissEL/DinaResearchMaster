"use client";

import type { ContentBlock } from "@/lib/content/schema";
import { FadeIn } from "@/components/motion/FadeIn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";
import Link from "next/link";

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderNarrative(content: string) {
  const parts = content.split(/\[\[([^\]]+)\]\]/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <Link
          key={i}
          href={`/companies/${part}`}
          className="font-medium text-[var(--ref-v10-green)] underline underline-offset-2 hover:text-[var(--surface-text)]"
        >
          {part.replace(/-/g, " ")}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function BlockRenderer({
  block,
  index,
  mode: _mode,
  dropCap = false,
}: {
  block: ContentBlock;
  index: number;
  mode: "immersive" | "focus" | "research";
  dropCap?: boolean;
}) {
  switch (block.type) {
    case "hero":
      return (
        <header className="relative mb-16 overflow-hidden bg-[var(--surface-bg-inset)] py-16 md:py-20">
          <ScrollReveal className="reading-measure">
            <p className="label-case-study">{block.mood ?? "Intelligence"}</p>
            <h1 className="hero-v10-title mt-4">{block.title}</h1>
            <p className="type-lead mt-6 font-body text-[var(--surface-text-muted)]">
              {block.dek}
            </p>
          </ScrollReveal>
        </header>
      );

    case "narrative":
      return (
        <FadeIn delay={index * 0.02} className="reading-measure mb-10">
          {block.heading && (
            <h2
              id={slugifyHeading(block.heading)}
              className="label-mission mb-4 scroll-mt-28"
            >
              {block.heading}
            </h2>
          )}
          <div className={cn("reading-body prose-dina", dropCap && "drop-cap")}>
            <p>{renderNarrative(block.content)}</p>
          </div>
        </FadeIn>
      );

    case "pullQuote":
      return (
        <ScrollReveal className="reading-measure my-16">
          <blockquote className="pull-quote-ref">
            <p>&ldquo;{block.quote}&rdquo;</p>
            {block.attribution && (
              <cite className="mt-4 block font-ui text-sm not-italic text-[var(--surface-text-muted)]">
                — {block.attribution}
              </cite>
            )}
          </blockquote>
        </ScrollReveal>
      );

    case "statReveal":
      return (
        <FadeIn className="my-16">
          <div className="grid gap-6 sm:grid-cols-3">
            {block.stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-[var(--surface-border)] bg-[var(--surface-bg-elevated)] p-6 text-center"
              >
                <p className="stat-ref">{stat.value}</p>
                <p className="mt-2 font-ui text-sm font-medium text-[var(--surface-text)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      );

    case "timeline":
      return (
        <FadeIn className="my-16 measure mx-auto">
          {block.title && (
            <h2 className="label-mission mb-6 block">
              {block.title}
            </h2>
          )}
          <ol className="relative space-y-8 border-l-2 border-[var(--surface-border)] pl-8">
            {block.events.map((event) => (
              <li key={event.date} className="relative">
                <span className="absolute -left-[2.4rem] flex h-4 w-4 items-center justify-center bg-[var(--ref-v10-green)] ring-4 ring-[var(--surface-bg)]" />
                <time className="font-mono text-sm text-[var(--ref-v10-green)]">
                  {event.date}
                </time>
                <h3 className="mt-1 font-display text-lg font-semibold text-[var(--surface-text)]">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--surface-text-muted)]">
                  {event.description}
                </p>
              </li>
            ))}
          </ol>
        </FadeIn>
      );

    case "researchBlock":
      return (
        <FadeIn className="my-16">
          <div className="border border-[var(--surface-border)] bg-[var(--surface-bg-elevated)] p-8">
            <h2 className="label-mission mb-4 block">{block.title}</h2>
            {block.methodology && (
              <p className="mt-4 font-ui text-sm leading-relaxed text-[var(--ref-ws-muted)]">
                <strong className="text-[var(--surface-text)]">Methodology:</strong>{" "}
                {block.methodology}
              </p>
            )}
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--surface-text-muted)]">
              {block.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
            {block.caveats && (
              <p className="mt-4 text-xs italic text-gray-500">{block.caveats}</p>
            )}
          </div>
        </FadeIn>
      );

    case "comparison":
      return (
        <FadeIn className="my-16">
          <h2 className="label-mission mb-6 block">
            {block.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {block.columns.map((col) => (
              <div
                key={col.label}
                className="border border-[var(--surface-border)] bg-[var(--surface-bg-elevated)] p-6"
              >
                <h3 className="font-semibold text-[var(--surface-text)]">{col.label}</h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--surface-text-muted)]">
                  {col.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-green-soft-dark">â€¢</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>
      );

    case "riskScenario":
      return (
        <FadeIn className="my-16">
          <h2 className="label-mission mb-6 block">
            {block.title}
          </h2>
          <div className="space-y-4">
            {block.scenarios.map((scenario) => (
              <div
                key={scenario.challenge}
                className="border border-[var(--ref-v10-orange)]/30 bg-ref-v10-beige/30 p-6"
              >
                <h3 className="font-semibold text-[var(--surface-text)]">
                  {scenario.challenge}
                </h3>
                <p className="mt-2 text-sm text-[var(--surface-text-muted)]">{scenario.impact}</p>
                {scenario.mitigation && (
                  <p className="mt-3 text-sm text-green-soft-dark">
                    Mitigation: {scenario.mitigation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      );

    case "opportunityMap":
      return (
        <FadeIn className="my-16">
          <h2 className="label-mission mb-6 block">
            {block.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.opportunities.map((opp) => (
              <div
                key={opp.area}
                className="border border-[var(--surface-border)] bg-[var(--surface-bg-elevated)] p-5"
              >
                <h3 className="font-semibold text-[var(--surface-text)]">{opp.area}</h3>
                <p className="mt-2 text-sm text-[var(--surface-text-muted)]">{opp.description}</p>
                {opp.signal && (
                  <p className="mt-3 font-mono text-xs text-[var(--ref-v10-green)]">
                    Signal: {opp.signal}
                  </p>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      );

    case "prediction":
      return (
        <FadeIn className="my-16">
          <div className="border border-black/15 bg-black p-8 text-white">
            <p className="label-case-study text-[var(--ref-v10-orange)]">
              Future Signal · {block.confidence} confidence
            </p>
            <h2 className="mt-2 font-ui text-xl font-medium text-white">
              {block.title}
            </h2>
            <p className="mt-4 font-body text-lg leading-relaxed text-white/85">
              {block.prediction}
            </p>
            <p className="mt-4 font-ui text-sm text-white/60">
              Horizon: {block.horizon}
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-white/70">
              {block.rationale}
            </p>
          </div>
        </FadeIn>
      );

    case "mediaFull":
      return (
        <FadeIn className="my-16 -mx-6 md:-mx-12">
          <figure>
            <div className="aspect-[21/9] bg-gradient-to-br from-[var(--ref-v10-gray)] to-[var(--ref-v10-beige)]" />
            {block.caption && (
              <figcaption
                className="figcaption-ref"
                data-align="center"
              >
                {block.caption}
              </figcaption>
            )}
          </figure>
        </FadeIn>
      );

    case "mediaInset":
      return (
        <FadeIn
          className={cn(
            "my-10 measure mx-auto",
            block.align === "right" && "md:float-right md:ml-8 md:max-w-sm",
            block.align === "left" && "md:float-left md:mr-8 md:max-w-sm",
          )}
        >
          <figure>
            <div className="aspect-[4/3] bg-gradient-to-br from-[var(--ref-v10-gray)] to-[var(--ref-v10-beige)]" />
            {block.caption && (
              <figcaption className="figcaption-ref" data-align="left">
                {block.caption}
              </figcaption>
            )}
          </figure>
        </FadeIn>
      );

    case "authorNote":
      return (
        <FadeIn className="my-12 measure mx-auto">
          <details className="reading-disclosure">
            <summary>Author&apos;s note</summary>
            <div className="reading-disclosure-body">{block.content}</div>
          </details>
        </FadeIn>
      );

    case "citationList":
      return (
        <FadeIn className="my-12 measure mx-auto">
          <h2 className="mb-4 font-display text-lg font-semibold text-[var(--surface-text)]">
            References
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-[var(--surface-text-muted)]">
            {block.citations.map((citation) => (
              <li key={citation.id} id={`ref-${citation.id}`}>
                {citation.url ? (
                  <a
                    href={citation.url}
                    className="link-ref underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {citation.text}
                  </a>
                ) : (
                  citation.text
                )}
              </li>
            ))}
          </ol>
        </FadeIn>
      );

    case "discussionPrompt":
      return (
        <FadeIn className="my-12 measure mx-auto">
          <div className="border border-[var(--surface-border)] bg-[var(--surface-bg-inset)] p-6 text-center">
            <p className="label-case-study">Join the discussion</p>
            <p className="mt-3 font-body text-lg text-[var(--surface-text)]">
              {block.question}
            </p>
          </div>
        </FadeIn>
      );

    case "relatedInsights":
      return null;

    default:
      return null;
  }
}

export function ArticleRenderer({
  blocks,
  mode = "immersive",
  skipHero = false,
}: {
  blocks: ContentBlock[];
  mode?: "immersive" | "focus" | "research";
  skipHero?: boolean;
}) {
  const firstNarrativeIndex = blocks.findIndex((b) => b.type === "narrative");

  return (
    <div className="article-content">
      {blocks.map((block, index) => {
        if (skipHero && block.type === "hero") return null;
        return (
          <BlockRenderer
            key={`${block.type}-${index}`}
            block={block}
            index={index}
            mode={mode}
            dropCap={index === firstNarrativeIndex}
          />
        );
      })}
    </div>
  );
}

