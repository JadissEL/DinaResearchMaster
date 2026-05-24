import { ImageResponse } from "@vercel/og";
import { getArticleBySlug } from "@/lib/content/loader";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1a0a2e 0%, #4a2d7a 40%, #ec4899 100%)",
          padding: 60,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#6ee7a0",
            }}
          />
          <span style={{ color: "#ede9fe", fontSize: 24, fontWeight: 600 }}>
            DinaResearch
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              color: "#c4b5fd",
              fontSize: 20,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            {article.meta.type.replace(/_/g, " ")}
          </span>
          <h1
            style={{
              color: "white",
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0,
              maxWidth: 900,
            }}
          >
            {article.meta.title}
          </h1>
          <p
            style={{
              color: "#ede4d8",
              fontSize: 28,
              lineHeight: 1.4,
              margin: 0,
              maxWidth: 800,
            }}
          >
            {article.meta.dek}
          </p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
