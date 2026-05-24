import type { PublishedArticle } from "@/lib/content/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function articleJsonLd(article: PublishedArticle) {
  const { meta } = article;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.metaDescription,
    abstract: meta.aiSummary,
    datePublished: meta.publishedAt,
    dateModified: meta.publishedAt,
    author: {
      "@type": "Person",
      name: "Dina",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "DinaResearch",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/intelligence/${meta.slug}`,
    keywords: [...meta.topics, ...meta.tags].join(", "),
    articleSection: meta.topics[0],
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dina",
    description:
      "Strategic researcher and analyst focused on markets, industries, and institutional transformation.",
    url: `${SITE_URL}/about`,
    sameAs: ["https://linkedin.com"],
    jobTitle: "Researcher & Strategic Analyst",
    knowsAbout: [
      "Market Intelligence",
      "Industry Analysis",
      "Strategic Foresight",
      "Innovation Strategy",
    ],
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
