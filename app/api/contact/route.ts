import { NextResponse } from "next/server";
import { isDatabaseConfigured, prisma } from "@/lib/db/prisma";
import { sendContactNotification } from "@/lib/email/resend";

export async function POST(request: Request) {
  try {
    const { name, email, topic, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (isDatabaseConfigured()) {
      await prisma.contactSubmission.create({
        data: { name, email, topic: topic ?? "General", message },
      });
    }

    await sendContactNotification({
      name,
      email,
      topic: topic ?? "General",
      message,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
