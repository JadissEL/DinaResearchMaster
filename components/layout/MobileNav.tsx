"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_TAXONOMY } from "@/lib/reference-ux";

const MOBILE_LINKS = [
  ...NAV_TAXONOMY,
  { href: "/about", label: "About" },
  { href: "/connect", label: "Connect" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="btn-v10 btn-v10-ghost px-3 py-2"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {open && (
        <nav
          id="mobile-nav-panel"
          className="fixed inset-0 top-[var(--header-height)] z-40 border-t border-[var(--surface-border)] bg-[var(--surface-bg-elevated)] px-6 py-8"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {MOBILE_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block border-b border-[var(--surface-border)] py-4 font-ui text-sm uppercase tracking-wider",
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "text-[var(--surface-text)]"
                      : "text-[var(--surface-text-muted)]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/connect"
            className="btn-v10 btn-v10-primary mt-8 inline-flex w-full justify-center"
          >
            Get in touch
          </Link>
        </nav>
      )}
    </div>
  );
}
