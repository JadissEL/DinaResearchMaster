import { redirect } from "next/navigation";
import { getArticleBySlug } from "@/lib/content/loader";

export default async function ResearchSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (article) {
    redirect(`/intelligence/${slug}`);
  }
  redirect("/research");
}
