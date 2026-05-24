import type { Metadata } from "next";
import { AppProviders } from "@/components/providers/AppProviders";
import { SmoothScrollProvider } from "@/components/motion";
import { SiteHeader, SiteFooter, SkipToContent } from "@/components/layout";
import { buildSiteMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSiteMetadata(
  "Intelligence & Research",
  "Premium market intelligence, industry analysis, and strategic foresight.",
);

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
      <SmoothScrollProvider>
        <SkipToContent />
        <SiteHeader />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex min-h-screen flex-1 flex-col outline-none"
        >
          {children}
        </main>
        <SiteFooter />
      </SmoothScrollProvider>
    </AppProviders>
  );
}
