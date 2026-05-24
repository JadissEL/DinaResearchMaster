import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("secret");

  if (!secret || token !== secret) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const slug = body.slug as string | undefined;

  revalidatePath("/");
  revalidatePath("/intelligence");
  if (slug) {
    revalidatePath(`/intelligence/${slug}`);
  }

  return NextResponse.json({ revalidated: true });
}
