import { CaseStudyCard, TodaysMixCard } from "@/components/discovery";
import { PageHero } from "@/components/layout";
import { FadeIn } from "@/components/motion";
import { getPublishedArticles } from "@/lib/content/loader";
import { buildSiteMetadata } from "@/lib/seo/metadata";

export const metadata = buildSiteMetadata(
  "Research",
  "Deep research briefs, company histories, and transformation narratives.",
  "/research",
);

export default async function ResearchPage() {
  const articles = await getPublishedArticles();
  const research = articles.filter((a) =>
    ["RESEARCH_BRIEF", "COMPANY_STORY", "TREND_REPORT"].includes(a.meta.type),
  );

  return (
    <>
      <PageHero
        label="Research archive"
        title="Deep analysis"
        description="Long-form briefs, company transformations, and sector deep divesâ€”curated like a modern editorial archive."
        variant="archive"
      />

      <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-8">
        {research.length > 0 && (
          <>
            <p className="label-case-study">Featured case studies</p>
            <div className="scroll-case-rail mt-6 flex gap-4 overflow-x-auto pb-4">
              {research.slice(0, 4).map((article) => (
                <CaseStudyCard key={article.meta.slug} article={article} />
              ))}
            </div>
            <hr className="editorial-rule editorial-rule-thick mt-16" />
          </>
        )}

        <p className="label-case-study mt-12">Full index</p>
        <ul className="mt-6">
          {research.map((article, i) => (
            <li key={article.meta.slug} className="archive-row">
              <FadeIn delay={i * 0.03}>
                <span className="font-mono text-xs text-[var(--ref-apple-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <TodaysMixCard article={article} />
              </FadeIn>
            </li>
          ))}
        </ul>

        {research.length === 0 && (
          <p className="mt-12 font-ui text-[var(--ref-ws-muted)]">
            No research briefs published yet.
          </p>
        )}
      </section>
    </>
  );
}

