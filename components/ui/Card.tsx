import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  as?: "article" | "div";
}

export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "group relative overflow-hidden border border-black/10 bg-white shadow-sm transition-all duration-[var(--motion-medium)] hover:border-[var(--ref-v10-green)]/40 hover:shadow-md",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function CardImage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[var(--ref-v10-gray)] to-[var(--ref-v10-beige)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-6", className)}>{children}</div>;
}
