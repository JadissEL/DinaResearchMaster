import { NextResponse } from "next/server";
import { isDatabaseConfigured, prisma } from "@/lib/db/prisma";

function checkAuth(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

export async function PATCH(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { commentId, status } = await request.json();
  if (!commentId || !status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await prisma.comment.update({
    where: { id: commentId },
    data: { status },
  });

  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ comments: [] });
  }

  const comments = await prisma.comment.findMany({
    where: { status: "PENDING" },
    include: { article: { select: { slug: true, title: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ comments });
}
