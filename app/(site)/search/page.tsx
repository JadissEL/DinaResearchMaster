import Link from "next/link";
import { ArchiveRow } from "@/components/discovery/ArchiveRow";
import { PageHero } from "@/components/layout";
import { getPublishedArticles } from "@/lib/content/loader";
import { searchPublishedArticles } from "@/lib/search";
import { buildSiteMetadata } from "@/lib/seo/metadata";

export const metadata = buildSiteMetadata(
  "Search",
  "Search intelligence articles, topics, and research across DinaResearch.",
  "/search",
);

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const articles = await getPublishedArticles();
  const results = q ? searchPublishedArticles(articles, q) : [];

  return (
    <>
      <PageHero
        label="Search"
        title={q ? `Results for “${q}”` : "Search the archive"}
        description="Find intelligence by title, topic, company, or keyword."
      />

      <section className="container-editorial pb-24">
        <form action="/search" method="get" className="max-w-2xl">
          <label htmlFor="search-q" className="sr-only">
            Search query
          </label>
          <div className="flex gap-2">
            <input
              id="search-q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Markets, innovation, companies…"
              className="input-ref flex-1"
              autoComplete="off"
            />
            <button type="submit" className="btn-v10 btn-v10-primary shrink-0">
              Search
            </button>
          </div>
        </form>

        {q && (
          <p className="mt-8 font-ui text-sm text-[var(--surface-text-muted)]">
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
        )}

        <ul className="mt-6">
          {results.map((article, index) => (
            <ArchiveRow key={article.meta.slug} article={article} index={index} />
          ))}
        </ul>

        {q && results.length === 0 && (
          <p className="mt-12 font-ui text-[var(--surface-text-muted)]">
            No articles match your query. Try broader terms or browse{" "}
            <Link href="/intelligence" className="text-[var(--surface-accent)] hover:underline">
              all intelligence
            </Link>
            .
          </p>
        )}
      </section>
    </>
  );
}
