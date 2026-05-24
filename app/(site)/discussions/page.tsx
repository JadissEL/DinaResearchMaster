import Link from "next/link";
import { PromoBand, TodaysMixCard } from "@/components/discovery";
import { FadeIn } from "@/components/motion";
import { getPublishedArticles } from "@/lib/content/loader";
import { buildSiteMetadata } from "@/lib/seo/metadata";

export const metadata = buildSiteMetadata(
  "Discussions",
  "Active conversations and collective intelligence across research articles.",
  "/discussions",
);

export default async function DiscussionsPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <PromoBand
        title="Active discussions across the latest research"
        cta="Browse topics"
        href="/topics"
      />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <FadeIn>
          <h2 className="section-todays-mix">Join a conversation</h2>
          <p className="mt-4 max-w-2xl font-ui text-base text-[var(--ref-ws-muted)]">
            Moderated perspectives on published intelligence. Share insight that
            advances collective understanding.
          </p>
        </FadeIn>

        <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <li key={article.meta.slug}>
              <FadeIn delay={i * 0.04}>
                <TodaysMixCard article={article} />
                <Link
                  href={`/discussions/${article.meta.slug}`}
                  className="btn-v10 btn-v10-ghost mt-4 inline-flex text-sm"
                >
                  Join discussion
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
