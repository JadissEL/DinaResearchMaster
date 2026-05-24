import { cn } from "@/lib/utils";

export function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("reveal-on-scroll", className)}>{children}</div>;
}
