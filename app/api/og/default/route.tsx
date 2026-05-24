import { ImageResponse } from "@vercel/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #1a0a2e 0%, #4a2d7a 40%, #ec4899 100%)",
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
            {siteConfig.name}
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
            Intelligence & Research
          </span>
          <h1
            style={{
              color: "white",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              margin: 0,
              maxWidth: 900,
            }}
          >
            Giving space to ideas
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
            {siteConfig.description}
          </p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
