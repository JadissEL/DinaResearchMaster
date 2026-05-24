"use client";

import { cn } from "@/lib/utils";
import { useActiveSection } from "./useActiveSection";

interface ChapterNavProps {
  chapters: { id: string; label: string }[];
  className?: string;
  showFloatingAnchor?: boolean;
}

export function ChapterNav({
  chapters,
  className,
  showFloatingAnchor = true,
}: ChapterNavProps) {
  const sectionIds = chapters.map((chapter) => chapter.id);
  const activeId = useActiveSection(sectionIds);
  const activeChapter = chapters.find((chapter) => chapter.id === activeId);

  if (chapters.length === 0) return null;

  return (
    <>
      <nav
        className={cn("chapter-nav no-print", className)}
        aria-label="Article sections"
      >
        <p className="label-case-study mb-4">On this page</p>
        <ul className="space-y-1">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                data-active={activeId === chapter.id ? "true" : undefined}
                aria-current={activeId === chapter.id ? "true" : undefined}
              >
                {chapter.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {showFloatingAnchor && activeChapter && (
        <aside
          className="reading-anchor no-print lg:hidden"
          aria-live="polite"
          aria-label="Current section"
        >
          <p className="label-case-study">Now reading</p>
          <p className="mt-1 font-ui text-sm leading-snug text-[var(--surface-text)]">
            {activeChapter.label}
          </p>
          <a
            href={`#${activeChapter.id}`}
            className="mt-2 inline-flex font-ui text-xs text-[var(--surface-accent)] hover:underline"
          >
            Jump to section
          </a>
        </aside>
      )}
    </>
  );
}
