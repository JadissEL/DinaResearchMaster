import type { Metadata } from "next";
import { buildSiteMetadata } from "@/lib/seo/metadata";

export const metadata = buildSiteMetadata(
  "Start a conversation",
  "Connect for research discussions, academic collaboration, and professional exchange.",
  "/connect",
);

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
