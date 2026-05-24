import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { isDatabaseConfigured, prisma } from "@/lib/db/prisma";
import type { AnalyticsEventType } from "@/lib/analytics/client";

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const body = await request.json();
    const { sessionId, events } = body as {
      sessionId?: string;
      events: Array<{
        eventType: AnalyticsEventType;
        articleId?: string;
        payload?: Record<string, unknown>;
      }>;
    };

    if (!events?.length) {
      return NextResponse.json({ error: "No events" }, { status: 400 });
    }

    await prisma.analyticsEvent.createMany({
      data: events.map((event) => ({
        eventType: event.eventType,
        sessionId,
        payload: (event.payload ?? undefined) as Prisma.InputJsonValue | undefined,
      })),
    });

    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ ok: true, stored: false });
  }
}
