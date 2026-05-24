import type { Metadata, Viewport } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "DinaResearch",
  title: "DinaResearch — Morocco Market Intelligence",
  description:
    "Market and company research on Morocco—investor trends, startup funding, initiatives, events, and ecosystem data.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/api/og/default`,
  links: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@dinaresearch.com",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Dina", url: `${SITE_URL}/about` }],
  creator: "DinaResearch",
  publisher: siteConfig.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${SITE_URL}/api/og/default`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${SITE_URL}/api/og/default`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ed" },
    { media: "(prefers-color-scheme: dark)", color: "#1a0a2e" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};
