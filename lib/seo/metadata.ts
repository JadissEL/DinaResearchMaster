import type { Metadata } from "next";
import type { PublishedArticle } from "@/lib/content/schema";
import { siteConfig } from "@/lib/site-config";

export function buildArticleMetadata(article: PublishedArticle): Metadata {
  const { meta } = article;
  const url = `${siteConfig.url}/intelligence/${meta.slug}`;

  return {
    title: meta.ogTitle ?? meta.title,
    description: meta.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? meta.metaDescription,
      publishedTime: meta.publishedAt,
      siteName: siteConfig.name,
      images: meta.heroImage
        ? [{ url: `${siteConfig.url}${meta.heroImage}`, width: 1200, height: 630 }]
        : [{ url: `${siteConfig.url}/api/og/${meta.slug}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.metaDescription,
    },
    other: {
      "ai-summary": meta.aiSummary,
    },
  };
}

export function buildSiteMetadata(
  title: string,
  description: string,
  path = "",
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}${path}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}
