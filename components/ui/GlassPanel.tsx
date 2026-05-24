import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-[var(--surface-border)] bg-[var(--surface-bg-elevated)] shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
