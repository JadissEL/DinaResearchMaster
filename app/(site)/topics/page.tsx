import { IntelligenceTile } from "@/components/discovery";
import { PageHero } from "@/components/layout";
import { TOPICS } from "@/lib/content/loader";
import { buildSiteMetadata } from "@/lib/seo/metadata";

export const metadata = buildSiteMetadata(
  "Topics",
  "Explore Morocco market research by topic—investors, startups, initiatives, events, and more.",
  "/topics",
);

export default function TopicsPage() {
  return (
    <>
      <PageHero
        label="Explore topics"
        title="Morocco research topics"
        description="Market panorama, companies, investors, startup funding, initiatives, and ecosystem events."
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
