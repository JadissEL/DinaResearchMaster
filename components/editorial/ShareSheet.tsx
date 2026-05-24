"use client";

import { useState } from "react";
import { Share2, BookOpen, Microscope, Link2, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics/client";

interface ShareSheetProps {
  slug: string;
  title: string;
}

export function ShareSheet({ slug, title }: ShareSheetProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = `${siteUrl}/intelligence/${slug}`;

  const shareLinkedIn = () => {
    trackEvent("SHARE_CLICK", { slug, platform: "linkedin" });
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    trackEvent("SHARE_CLICK", { slug, platform: "copy" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="no-print relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="btn-v10 btn-v10-ghost px-3 py-2 text-xs"
      >
        <Share2 className="mr-1.5 inline h-3.5 w-3.5" />
        Share
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 min-w-[220px] border border-black/10 bg-white p-4 shadow-lg">
          <p className="label-case-study mb-3">Share insight</p>
          <p className="mb-3 font-ui text-xs text-[var(--ref-ws-muted)] line-clamp-2">
            {title}
          </p>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={shareLinkedIn}
              className="link-ref flex items-center gap-2 px-2 py-2 text-left text-sm"
            >
              <Share2 className="h-4 w-4" />
              LinkedIn
            </button>
            <button
              type="button"
              onClick={copyLink}
              className="link-ref flex items-center gap-2 px-2 py-2 text-left text-sm"
            >
              {copied ? (
                <Check className="h-4 w-4 text-[var(--ref-v10-green)]" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
              {copied ? "Copied" : "Copy link"}
            </button>
            <a
              href={`/api/og/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ref flex items-center gap-2 px-2 py-2 text-sm"
              onClick={() => trackEvent("OG_GENERATED", { slug })}
            >
              Preview card
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export function ReadingModeToggle({
  mode,
  onChange,
}: {
  mode: "immersive" | "focus" | "research";
  onChange: (mode: "immersive" | "focus" | "research") => void;
}) {
  const modes = [
    { id: "immersive" as const, label: "Read", icon: BookOpen },
    { id: "focus" as const, label: "Focus", icon: BookOpen },
    { id: "research" as const, label: "Research", icon: Microscope },
  ];

  return (
    <div className="mode-toggle-ref no-print" role="group" aria-label="Reading mode">
      {modes.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          data-active={mode === id}
          onClick={() => {
            onChange(id);
            trackEvent("FOCUS_MODE_TOGGLE", { mode: id });
          }}
        >
          <Icon className="mr-1 inline h-3 w-3" aria-hidden />
          {label}
        </button>
      ))}
    </div>
  );
}
