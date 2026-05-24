import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { isDatabaseConfigured, prisma } from "@/lib/db/prisma";
import { getArticleBySlug } from "@/lib/content/loader";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { articleSlug, authorName, authorEmail, body: commentBody, parentId, honeypot } =
      body;

    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!articleSlug || !authorName || !commentBody) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { error: "Comments require database configuration" },
        { status: 503 },
      );
    }

    const article = await getArticleBySlug(articleSlug);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    let articleId: string;
    const dbArticle = await prisma.article.findUnique({
      where: { slug: articleSlug },
    });

    if (dbArticle) {
      articleId = dbArticle.id;
    } else {
      const created = await prisma.article.create({
        data: {
          slug: articleSlug,
          type: article.meta.type,
          status: "PUBLISHED",
          title: article.meta.title,
          dek: article.meta.dek,
          blocks: article.blocks,
          readingTime: article.readingTime,
          aiSummary: article.meta.aiSummary,
          seo: {
            metaDescription: article.meta.metaDescription,
            keyTakeaways: article.meta.keyTakeaways,
          },
          publishedAt: article.meta.publishedAt
            ? new Date(article.meta.publishedAt)
            : new Date(),
          heroImage: article.meta.heroImage,
          heroMood: article.meta.heroMood,
        },
      });
      articleId = created.id;
    }

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0] ?? "unknown";
    const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 16);

    await prisma.comment.create({
      data: {
        articleId,
        parentId: parentId ?? null,
        authorName,
        authorEmail: authorEmail ?? null,
        body: commentBody,
        status: "PENDING",
        ipHash,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const articleSlug = searchParams.get("articleSlug");
  const status = searchParams.get("status") ?? "APPROVED";

  if (!articleSlug) {
    return NextResponse.json({ error: "articleSlug required" }, { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ comments: [] });
  }

  try {
    const article = await prisma.article.findUnique({
      where: { slug: articleSlug },
    });
    if (!article) return NextResponse.json({ comments: [] });

    const comments = await prisma.comment.findMany({
      where: {
        articleId: article.id,
        status: status as "APPROVED" | "PENDING",
        parentId: null,
      },
      include: {
        replies: {
          where: { status: "APPROVED" },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json({ comments: [] });
  }
}
