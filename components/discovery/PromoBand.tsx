import Link from "next/link";

interface PromoBandProps {
  title: string;
  cta: string;
  href: string;
}

export function PromoBand({ title, cta, href }: PromoBandProps) {
  return (
    <section className="promo-fridays relative overflow-hidden py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, transparent, transparent 40px, rgba(255,255,255,0.15) 40px, rgba(255,255,255,0.15) 80px)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
        <p className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-white/90">
          Active now
        </p>
        <h2 className="mt-4 font-ui text-3xl font-medium leading-tight text-white md:text-5xl">
          {title}
        </h2>
        <Link
          href={href}
          className="btn-v10 mt-10 inline-flex border-2 border-white bg-white text-[var(--ref-fridays-red)] hover:bg-transparent hover:text-white"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
