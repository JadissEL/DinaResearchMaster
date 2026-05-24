import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "v10";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variants: Record<ButtonVariant, string> = {
  v10: "btn-v10 btn-v10-primary",
  primary: "btn-v10 btn-v10-primary",
  secondary: "btn-v10 bg-black text-white hover:bg-[var(--ref-v10-orange)] hover:text-black",
  ghost: "btn-v10 btn-v10-ghost",
  outline: "btn-v10 btn-v10-ghost",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-[var(--motion-fast)] ease-out disabled:opacity-50";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, ...props }, ref) => {
    const classes = cn(baseClasses, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link href={href} className={classes}>
          {props.children}
        </Link>
      );
    }

    return <button ref={ref} className={classes} {...props} />;
  },
);
Button.displayName = "Button";
