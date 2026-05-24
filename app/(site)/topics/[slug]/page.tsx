import { notFound } from "next/navigation";
import { TodaysMixCard } from "@/components/discovery";
import { PageHero } from "@/components/layout";
import { FadeIn } from "@/components/motion";
import {
  filterArticlesByTopic,
  getPublishedArticles,
  getTopicBySlug,
  TOPICS,
} from "@/lib/content/loader";
import { buildSiteMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};
  return buildSiteMetadata(topic.name, topic.description, `/topics/${slug}`);
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const articles = filterArticlesByTopic(await getPublishedArticles(), slug);

  return (
    <>
      <PageHero
        label="Topic cluster"
        title={topic.name}
        description={topic.description}
      />

      <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-8">
        <div className="magazine-layout">
          <aside className="magazine-caption">
            <p className="label-case-study">About this cluster</p>
            <p className="mt-3">{topic.description}</p>
            <p className="mt-6 font-mono text-xs">
              {articles.length} article{articles.length === 1 ? "" : "s"}
            </p>
            <hr className="editorial-rule mt-8 hidden lg:block" />
          </aside>

          <div>
            <h2 className="section-todays-mix">In this topic</h2>
            <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {articles.map((article, i) => (
                <li key={article.meta.slug}>
                  <FadeIn delay={i * 0.04}>
                    <TodaysMixCard article={article} />
                  </FadeIn>
                </li>
              ))}
            </ul>

            {articles.length === 0 && (
              <p className="mt-8 font-ui text-[var(--ref-ws-muted)]">
                No articles in this topic yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
