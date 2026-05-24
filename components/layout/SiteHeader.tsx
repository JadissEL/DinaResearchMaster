"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MobileNav } from "@/components/layout/MobileNav";
import { SiteSearch } from "@/components/layout/SiteSearch";
import { NAV_TAXONOMY } from "@/lib/reference-ux";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isArticle = pathname.startsWith("/intelligence/");

  return (
    <>
      {isArticle && <ProgressBar progress={progress} />}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-200 max-[320px]:py-2",
          scrolled || !isHome
            ? "border-[var(--surface-border)] bg-[var(--surface-bg-elevated)]/95 py-3 backdrop-blur-md"
            : "border-transparent bg-[var(--surface-bg-inset)] py-5",
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            className="font-ui text-sm font-bold uppercase tracking-[0.2em] text-[var(--surface-text)]"
          >
            DinaResearch
          </Link>

          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Main"
          >
            {NAV_TAXONOMY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-ui text-xs uppercase tracking-wider transition-colors",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "text-[var(--surface-text)]"
                    : "text-[var(--surface-text-muted)] hover:text-[var(--surface-text)]",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/about"
              className={cn(
                "font-ui text-xs uppercase tracking-wider transition-colors",
                pathname === "/about"
                  ? "text-[var(--surface-text)]"
                  : "text-[var(--surface-text-muted)] hover:text-[var(--surface-text)]",
              )}
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <SiteSearch />
            <Link
              href="/connect"
              className="btn-v10 btn-v10-primary hidden px-4 py-2 text-sm md:inline-flex"
            >
              Get in touch
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
