import Link from "next/link";
import { TrustStrip } from "@/components/layout";
import { FadeIn } from "@/components/motion";
import { buildSiteMetadata } from "@/lib/seo/metadata";
import { personJsonLd, JsonLd } from "@/lib/seo/jsonld";

export const metadata = buildSiteMetadata(
  "About",
  "Research philosophy, credentials, and the mind behind DinaResearch.",
  "/about",
);

const FOCUS_AREAS = [
  "Market & industry intelligence",
  "Innovation & transformation",
  "Strategic foresight",
  "Healthcare & institutions",
  "Academic research",
  "PhD journey reflections",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />

      <section className="bg-ref-v10-gray pt-[calc(var(--header-height)+3rem)] pb-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
          <FadeIn>
            <p className="label-mission">About</p>
            <h1 className="hero-v10-title mt-6 max-w-3xl">Research with depth</h1>
            <p className="mt-8 max-w-2xl font-body text-xl leading-relaxed text-black/70">
              A personal intelligence ecosystem{"\u2014"}not a consulting brochure. Ideas
              deserve room to breathe.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <FadeIn className="space-y-6 reading-body">
          <p>
            DinaResearch spans markets and industries, company histories and
            transformations, economic trends and risk outlooks, future signals
            and academic reflection. Each piece is crafted to be read deeply.
          </p>
          <p>
            The philosophy: question assumptions, map systems, communicate with
            clarity. Analysis should hold under pressure. Writing should earn
            trust without asking for it.
          </p>
        </FadeIn>

        <FadeIn className="mt-16 border border-black/10 bg-white p-8 md:p-10">
          <h2 className="label-mission">Our mission</h2>
          <p className="mt-4 font-body text-lg leading-relaxed text-black">
            Give space to ideas that advance collective understanding{"\u2014"}through
            rigorous analysis, not sales narratives.
          </p>
          <h2 className="label-mission mt-10">Areas of focus</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 font-ui text-sm text-black">
            {FOCUS_AREAS.map((item) => (
              <li key={item} className="flex gap-2 border-l-2 border-[var(--ref-v10-green)] pl-3">
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="mt-16 text-center">
          <p className="font-ui text-[var(--ref-ws-muted)]">
            Interested in research conversations or collaboration?
          </p>
          <Link href="/connect" className="btn-v10 btn-v10-primary mt-8">
            Get in touch
          </Link>
        </FadeIn>
      </section>

      <TrustStrip />
    </>
  );
}

