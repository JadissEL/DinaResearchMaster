import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { NAV_TAXONOMY } from "@/lib/reference-ux";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--surface-border)] bg-[var(--surface-bg)]">
      <div className="container-editorial py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[var(--surface-text)]">
              {siteConfig.name}
            </p>
            <p className="display-ws mt-6 !text-3xl md:!text-4xl">
              More is more.
            </p>
            <p className="mt-4 max-w-sm font-ui text-sm leading-relaxed text-[var(--surface-text-muted)]">
              {siteConfig.description}
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <p className="label-apple-module uppercase tracking-wider">Explore</p>
            <ul className="mt-4 space-y-2 font-ui text-sm text-[var(--surface-text)]">
              {NAV_TAXONOMY.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[var(--surface-accent)] hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="label-apple-module uppercase tracking-wider">Connect</p>
            <ul className="mt-4 space-y-2 font-ui text-sm text-[var(--surface-text)]">
              <li>
                <Link href="/about" className="hover:text-[var(--surface-accent)] hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/connect" className="hover:text-[var(--surface-accent)] hover:underline">
                  Get in touch
                </Link>
              </li>
              <li>
                <a href={`mailto:${siteConfig.links.email}`} className="hover:text-[var(--surface-accent)] hover:underline">
                  Email
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--surface-accent)] hover:underline"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <aside className="footer-signature" aria-label="Platform credits">
          <span className="footer-signature-flourish" aria-hidden />
          <p className="footer-signature-text">
            Done by Dina Bouabdallah and Jadiss El Antaki
          </p>
        </aside>

        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--surface-border)] pt-8 font-ui text-xs text-[var(--surface-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
