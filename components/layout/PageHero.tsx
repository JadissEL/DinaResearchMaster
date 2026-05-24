import { FadeIn } from "@/components/motion";

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
  variant?: "v10" | "archive" | "promo";
}

export function PageHero({
  label,
  title,
  description,
  variant = "v10",
}: PageHeroProps) {
  const bg =
    variant === "promo"
      ? "bg-[var(--ref-fridays-red)] text-white"
      : variant === "archive"
        ? "bg-[var(--surface-bg)]"
        : "bg-[var(--surface-bg-inset)]";

  const labelClass =
    variant === "promo" ? "font-ui text-xs font-bold uppercase tracking-[0.3em] text-white/90" : "label-mission";

  const titleClass =
    variant === "promo"
      ? "mt-4 font-ui text-4xl font-medium leading-tight text-white md:text-5xl"
      : "hero-v10-title mt-6";

  return (
    <section
      className={`${bg} pt-[calc(var(--header-height)+3rem)] pb-16 md:pb-20`}
    >
      <div className="container-editorial">
        <FadeIn>
          <p className={labelClass}>{label}</p>
          <h1 className={titleClass}>{title}</h1>
          {description && (
            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed ${
                variant === "promo"
                  ? "font-ui text-white/85"
                  : "type-lead font-body text-[var(--surface-text-muted)]"
              }`}
            >
              {description}
            </p>
          )}
          <hr className="editorial-rule mt-10 max-w-xs" aria-hidden />
        </FadeIn>
      </div>
    </section>
  );
}


