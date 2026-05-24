"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import type { SearchResultItem } from "@/lib/search";

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else {
      dialog.close();
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}`,
        );
        const data = (await response.json()) as { results: SearchResultItem[] };
        setResults(data.results ?? []);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => window.clearTimeout(timer);
  }, [query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="search-trigger hidden items-center gap-2 md:inline-flex"
        aria-label="Search intelligence"
      >
        <Search className="h-4 w-4" aria-hidden />
        <span>Search</span>
        <kbd className="search-kbd">⌘K</kbd>
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-v10 btn-v10-ghost px-3 py-2 md:hidden"
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </button>

      <dialog
        ref={dialogRef}
        className="search-dialog"
        aria-labelledby="search-dialog-title"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="search-dialog-panel">
          <h2 id="search-dialog-title" className="sr-only">
            Search articles
          </h2>
          <div className="flex items-center gap-3 border-b border-[var(--surface-border)] pb-4">
            <Search className="h-5 w-5 shrink-0 text-[var(--surface-text-muted)]" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Morocco market research, companies, topics…"
              className="input-ref flex-1 border-0 bg-transparent px-0 focus:shadow-none"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-v10 btn-v10-ghost px-2 py-2"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 max-h-[50vh] overflow-y-auto">
            {loading && (
              <p className="font-ui text-sm text-[var(--surface-text-muted)]">
                Searching…
              </p>
            )}
            {!loading && query.trim() && results.length === 0 && (
              <p className="font-ui text-sm text-[var(--surface-text-muted)]">
                No results for &ldquo;{query}&rdquo;.
              </p>
            )}
            {!loading && results.length > 0 && (
              <ul className="space-y-1">
                {results.map((result) => (
                  <li key={result.slug}>
                    <Link
                      href={`/intelligence/${result.slug}`}
                      className="search-result-row"
                      onClick={() => setOpen(false)}
                    >
                      <span className="font-body text-base text-[var(--surface-text)]">
                        {result.title}
                      </span>
                      <span className="mt-1 block line-clamp-2 font-ui text-xs text-[var(--surface-text-muted)]">
                        {result.dek}
                      </span>
                      <span className="mt-2 font-mono text-[0.6875rem] text-[var(--surface-text-muted)]">
                        {result.readingTime} min read
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {!loading && query.trim() && (
              <Link
                href={`/search?q=${encodeURIComponent(query.trim())}`}
                className="mt-4 inline-flex font-ui text-sm text-[var(--surface-accent)] hover:underline"
                onClick={() => setOpen(false)}
              >
                View all results →
              </Link>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
