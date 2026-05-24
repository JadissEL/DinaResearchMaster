import { getPublishedArticles } from "@/lib/content/loader";
import { searchPublishedArticles, toSearchResults } from "@/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  const articles = await getPublishedArticles();
  const matches = searchPublishedArticles(articles, q);

  return Response.json({
    query: q,
    results: toSearchResults(matches.slice(0, 8)),
  });
}
