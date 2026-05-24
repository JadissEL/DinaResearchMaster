import Link from "next/link";
import {
  ArticleCard,
  BentoMixGrid,
  CaseStudyCard,
  IntelligenceTile,
  PromoBand,
} from "@/components/discovery";
import { TrustStrip } from "@/components/layout";
import { FadeIn } from "@/components/motion";
import { TextBalancer } from "@/components/ui";
import { getPublishedArticles, TOPICS } from "@/lib/content/loader";
import { buildSiteMetadata } from "@/lib/seo/metadata";
import { personJsonLd, JsonLd } from "@/lib/seo/jsonld";

export const metadata = buildSiteMetadata(
  "Giving space to ideas",
  "A premium intelligence ecosystem for market insight, industry analysis, and strategic foresight.",
  "/",
);

export default async function HomePage() {
  const articles = await getPublishedArticles();
  const featured = articles[0];
  const todaysMix = articles.slice(0, 6);
  const caseStudies = articles.slice(0, 4);
  const today = new Date().toISOString().slice(0, 10);
  const monthYear = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <JsonLd data={personJsonLd()} />

      <div className="masthead-strip container-editorial flex items-center justify-between py-3">
        <span>Intelligence {"\u00b7"} Research {"\u00b7"} Foresight</span>
        <time dateTime={today} suppressHydrationWarning>
          {monthYear}
        </time>
      </div>

      <section className="bg-[var(--surface-bg-inset)] pt-[var(--header-height)]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[minmax(0,var(--ref-measure-v10))_1fr] lg:min-h-[90vh]">
          <div className="flex flex-col justify-center px-6 py-16 lg:px-10 lg:py-24">
            <FadeIn>
              <p className="label-mission">DinaResearch</p>
              <h1 className="hero-v10-title mt-6">
                <TextBalancer as="span">Giving space to ideas</TextBalancer>
              </h1>
              <p className="mt-8 max-w-md font-ui text-base leading-relaxed text-[var(--surface-text-muted)]">
                Boutique intelligence for markets, industries, and the
                transformations shaping what comes next.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/intelligence" className="btn-v10 btn-v10-primary">
                  Explore intelligence
                </Link>
                <Link href="/connect" className="btn-v10 btn-v10-ghost">
                  Get in touch
                </Link>
              </div>
            </FadeIn>
          </div>

          <div className="flex items-center overflow-hidden border-t border-[var(--surface-border)] lg:border-t-0 lg:border-l">
            <div className="scroll-case-rail flex gap-4 overflow-x-auto px-6 py-10 lg:px-8">
              {caseStudies.length > 0 ? (
                caseStudies.map((article) => (
                  <CaseStudyCard key={article.meta.slug} article={article} />
                ))
              ) : (
                <p className="font-ui text-sm text-[var(--surface-text-muted)]">
                  Case studies coming soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-bg-elevated)] py-20">
        <div className="container-editorial">
          <FadeIn>
            <div className="flex items-end justify-between border-b border-[var(--surface-border)] pb-6">
              <h2 className="section-todays-mix">Today&apos;s Mix</h2>
              <Link
                href="/intelligence"
                className="font-ui text-sm text-[var(--surface-text-muted)] hover:text-[var(--surface-text)]"
              >
                View all {"\u2192"}
              </Link>
            </div>
          </FadeIn>

          <BentoMixGrid articles={todaysMix} />
        </div>
      </section>

      {featured && (
        <section className="bg-ref-v10-beige py-20">
          <div className="container-editorial">
            <FadeIn>
              <p className="label-case-study">Featured research</p>
              <h2 className="mt-2 font-ui text-2xl font-bold text-[var(--surface-text)] md:text-3xl">
                Deep analysis
              </h2>
            </FadeIn>
            <div className="mt-10">
              <ArticleCard article={featured} variant="featured" />
            </div>
          </div>
        </section>
      )}

      <section>
        {TOPICS.slice(0, 4).map((topic, i) => (
          <IntelligenceTile
            key={topic.slug}
            title={topic.name}
            subtitle={`Explore ${topic.name.toLowerCase()}`}
            href={`/topics/${topic.slug}`}
            index={i}
          />
        ))}
      </section>

      <section className="bg-black py-20 text-white">
        <div className="container-editorial">
          <FadeIn>
            <p className="label-mission text-[var(--ref-v10-orange)]">Our key sectors</p>
            <h2 className="mt-4 font-ui text-3xl font-medium md:text-4xl">
              Topic constellation
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TOPICS.map((topic, i) => (
              <FadeIn key={topic.slug} delay={i * 0.05}>
                <Link
                  href={`/topics/${topic.slug}`}
                  className="block border border-white/15 p-6 transition hover:border-[var(--ref-v10-pink)] hover:bg-white/5"
                >
                  <h3 className="font-ui text-base font-medium">{topic.name}</h3>
                  <p className="mt-2 text-sm text-white/60">{topic.description}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <PromoBand
        title="Join the conversation on the latest research"
        cta="View discussions"
        href="/discussions"
      />

      <TrustStrip />

      <section className="bg-[var(--surface-bg-inset)] py-24">
        <div className="container-editorial max-w-3xl text-center">
          <FadeIn>
            <p className="label-mission">Intelligence brief</p>
            <h2 className="mt-4 font-ui text-3xl font-bold text-[var(--surface-text)] md:text-4xl">
              Start a conversation
            </h2>
            <p className="mt-4 font-ui text-[var(--surface-text-muted)]">
              Curated insights for those who think in systems, not headlines.
            </p>
            <Link href="/connect" className="btn-v10 btn-v10-primary mt-10">
              Get in touch
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
