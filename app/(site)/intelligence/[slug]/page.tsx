import { notFound } from "next/navigation";
import { ArticleExperience } from "@/components/editorial/ArticleExperience";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getPublishedArticles,
} from "@/lib/content/loader";
import { buildArticleMetadata } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd, JsonLd } from "@/lib/seo/jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
  return buildArticleMetadata(article);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const all = await getPublishedArticles();
  const related = all
    .filter(
      (a) =>
        a.meta.slug !== slug &&
        a.meta.topics.some((t) => article.meta.topics.includes(t)),
    )
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(article),
          breadcrumbJsonLd([
            { name: "Home", url: SITE_URL },
            { name: "Intelligence", url: `${SITE_URL}/intelligence` },
            {
              name: article.meta.title,
              url: `${SITE_URL}/intelligence/${slug}`,
            },
          ]),
        ]}
      />
      <ArticleExperience article={article} related={related} />
    </>
  );
}
