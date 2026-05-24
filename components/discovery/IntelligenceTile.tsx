import Link from "next/link";

interface IntelligenceTileProps {
  title: string;
  subtitle: string;
  href: string;
  index: number;
}

export function IntelligenceTile({
  title,
  subtitle,
  href,
  index,
}: IntelligenceTileProps) {
  const isDark = index % 2 === 0;

  return (
    <Link
      href={href}
      className={`group tile-hover-lift flex min-h-[min(85vh,720px)] flex-col justify-end p-8 transition-colors md:p-16 ${
        isDark
          ? "bg-[var(--ref-apple-text)] text-white"
          : "bg-[var(--surface-bg)] text-[var(--surface-text)]"
      }`}
    >
      <p className="label-apple-module">{subtitle}</p>
      <h2
        className={`mt-4 max-w-3xl font-ui text-4xl font-medium leading-tight md:text-5xl lg:text-6xl ${
          isDark ? "text-white" : "text-[var(--ref-ws-text)]"
        }`}
      >
        {title}
      </h2>
      <span
        className={`mt-8 inline-flex text-sm font-medium underline-offset-4 group-hover:underline ${
          isDark ? "text-white/80" : "text-[var(--ref-ws-muted)]"
        }`}
      >
        Explore →
      </span>
    </Link>
  );
}
