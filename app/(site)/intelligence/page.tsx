import { TodaysMixCard } from "@/components/discovery";
import { PageHero } from "@/components/layout";
import { FadeIn } from "@/components/motion";
import { getPublishedArticles } from "@/lib/content/loader";
import { buildSiteMetadata } from "@/lib/seo/metadata";

export const metadata = buildSiteMetadata(
  "Latest Research",
  "Latest market and company research on Morocco—investors, startups, initiatives, and events.",
  "/intelligence",
);

export default async function IntelligencePage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <PageHero
        label="Research hub"
        title="Latest"
        description="Market and company research on Morocco—investor trends, startup funding, initiatives, and ecosystem data."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex items-end justify-between border-b border-[var(--ref-ny-border)] pb-6">
          <h2 className="section-todays-mix">All research</h2>
          <span className="font-mono text-xs text-[var(--ref-apple-muted)]">
            {articles.length} published
          </span>
        </div>

        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <li key={article.meta.slug}>
              <FadeIn delay={i * 0.04}>
                <TodaysMixCard article={article} />
              </FadeIn>
            </li>
          ))}
        </ul>

        {articles.length === 0 && (
          <p className="mt-12 font-ui text-[var(--ref-ws-muted)]">
            No research published yet.
          </p>
        )}
      </section>
    </>
  );
}
