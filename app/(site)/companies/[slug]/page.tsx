import { notFound } from "next/navigation";
import Link from "next/link";
import { CaseStudyCard } from "@/components/discovery";
import { PageHero } from "@/components/layout";
import { getPublishedArticles } from "@/lib/content/loader";
import { buildSiteMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getPublishedArticles();
  const entity = articles
    .flatMap((a) => a.meta.entities)
    .find((e) => e.slug === slug);
  if (!entity) return {};
  return buildSiteMetadata(
    entity.name,
    `Research and intelligence related to ${entity.name}.`,
    `/companies/${slug}`,
  );
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getPublishedArticles();
  const related = articles.filter((a) =>
    a.meta.entities.some((e) => e.slug === slug),
  );

  const entity = related[0]?.meta.entities.find((e) => e.slug === slug);
  if (!entity) notFound();

  return (
    <>
      <PageHero
        label={`Entity · ${entity.type.toLowerCase()}`}
        title={entity.name}
        description={`Intelligence linked to ${entity.name} across published research.`}
      />

      <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-8">
        <p className="label-case-study">Related case studies</p>
        <div className="scroll-case-rail mt-8 flex gap-4 overflow-x-auto pb-4">
          {related.map((article) => (
            <CaseStudyCard key={article.meta.slug} article={article} />
          ))}
        </div>

        {related.length === 0 && (
          <p className="mt-12 font-ui text-[var(--ref-ws-muted)]">
            No articles linked yet.{" "}
            <Link href="/intelligence" className="link-ref">
              Browse intelligence
            </Link>
          </p>
        )}
      </section>
    </>
  );
}
