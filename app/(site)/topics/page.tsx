import { IntelligenceTile } from "@/components/discovery";
import { PageHero } from "@/components/layout";
import { TOPICS } from "@/lib/content/loader";
import { buildSiteMetadata } from "@/lib/seo/metadata";

export const metadata = buildSiteMetadata(
  "Topics",
  "Explore intelligence by topic clusters—markets, industries, risk, futures, and more.",
  "/topics",
);

export default function TopicsPage() {
  return (
    <>
      <PageHero
        label="Explore all topics"
        title="Topic clusters"
        description="Semantic clusters for discovering connected research—Apple-style modules, New Yorker taxonomy depth."
      />

      <section>
        {TOPICS.map((topic, i) => (
          <IntelligenceTile
            key={topic.slug}
            title={topic.name}
            subtitle={topic.description}
            href={`/topics/${topic.slug}`}
            index={i}
          />
        ))}
      </section>
    </>
  );
}
