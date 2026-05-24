"use client";

import { cn } from "@/lib/utils";

export function ProgressBar({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reading-progress-track fixed top-0 left-0 right-0 z-[60] h-0.5",
        className,
      )}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="reading-progress-fill"
        style={{ width: `${Math.min(100, progress * 100)}%` }}
      />
    </div>
  );
}
