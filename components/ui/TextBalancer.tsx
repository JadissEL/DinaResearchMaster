import { cn } from "@/lib/utils";

export function TextBalancer({
  children,
  as: Tag = "span",
  className,
}: {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  return (
    <Tag className={cn("text-balance", className)}>{children}</Tag>
  );
}
