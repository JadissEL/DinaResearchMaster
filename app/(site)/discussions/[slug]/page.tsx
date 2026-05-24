import { notFound } from "next/navigation";
import Link from "next/link";
import { CommentSection } from "@/components/editorial";
import { PageHero } from "@/components/layout";
import { FadeIn } from "@/components/motion";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/content/loader";
import { buildSiteMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return buildSiteMetadata(
    `Discussion: ${article.meta.title}`,
    `Join the conversation on ${article.meta.title}`,
    `/discussions/${slug}`,
  );
}

export default async function DiscussionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <PageHero
        label="Collective intelligence"
        title={article.meta.title}
        description={article.meta.dek}
        variant="archive"
      />

      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        <FadeIn>
          <Link href={`/intelligence/${slug}`} className="link-ref text-sm">
            ← Read the full article
          </Link>
        </FadeIn>

        <CommentSection
          articleSlug={article.meta.slug}
          articleTitle={article.meta.title}
        />
      </div>
    </>
  );
}
