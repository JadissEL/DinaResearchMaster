import Link from "next/link";
import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Chip({ children, href, active, className, onClick }: ChipProps) {
  const classes = cn("chip-ref", className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        data-active={active ? "true" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      data-active={active ? "true" : undefined}
    >
      {children}
    </button>
  );
}
