"use client";

import { useEffect, useRef } from "react";

export type AnalyticsEventType =
  | "PAGE_VIEW"
  | "SCROLL_DEPTH"
  | "READ_TIME"
  | "SHARE_CLICK"
  | "COMMENT_SUBMIT"
  | "FOCUS_MODE_TOGGLE"
  | "ENTITY_LINK_CLICK"
  | "DOWNLOAD_PDF"
  | "OG_GENERATED";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("dr_session_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("dr_session_id", id);
  }
  return id;
}

const queue: Array<{
  eventType: AnalyticsEventType;
  articleId?: string;
  payload?: Record<string, unknown>;
}> = [];

let flushTimer: ReturnType<typeof setTimeout> | null = null;

function flush() {
  if (queue.length === 0) return;
  const batch = [...queue];
  queue.length = 0;

  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: getSessionId(),
      events: batch,
    }),
  }).catch(() => {
    // silently fail — analytics should not break UX
  });
}

export function trackEvent(
  eventType: AnalyticsEventType,
  payload?: Record<string, unknown>,
) {
  queue.push({
    eventType,
    payload: { ...payload, articleSlug: payload?.slug },
  });

  if (!flushTimer) {
    flushTimer = setTimeout(() => {
      flush();
      flushTimer = null;
    }, 2000);
  }
}

export function AnalyticsTracker({ articleSlug }: { articleSlug?: string }) {
  const scrollMarks = useRef(new Set<number>());

  useEffect(() => {
    trackEvent("PAGE_VIEW", { slug: articleSlug });

    const onScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((window.scrollY / docHeight) * 100);
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark && !scrollMarks.current.has(mark)) {
          scrollMarks.current.add(mark);
          trackEvent("SCROLL_DEPTH", { slug: articleSlug, depth: mark });
        }
      }
    };

    const readInterval = setInterval(() => {
      trackEvent("READ_TIME", { slug: articleSlug, seconds: 30 });
    }, 30000);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(readInterval);
      flush();
    };
  }, [articleSlug]);

  return null;
}
