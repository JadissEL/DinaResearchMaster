import Link from "next/link";
import { TrustStrip } from "@/components/layout";
import { FadeIn } from "@/components/motion";
import { buildSiteMetadata } from "@/lib/seo/metadata";
import { personJsonLd, JsonLd } from "@/lib/seo/jsonld";

export const metadata = buildSiteMetadata(
  "About",
  "DinaResearch publishes market and company research focused on Morocco—investors, startups, initiatives, and events.",
  "/about",
);

const FOCUS_AREAS = [
  "Moroccan market panorama and sector analysis",
  "Company research and competitive intelligence",
  "Domestic and international investor trends",
  "Startup funding, venture activity, and cap tables",
  "Public and private initiatives and programs",
  "Events, ecosystems, and market data",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />

      <section className="bg-ref-v10-gray pt-[calc(var(--header-height)+3rem)] pb-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
          <FadeIn>
            <p className="label-mission">About</p>
            <h1 className="hero-v10-title mt-6 max-w-3xl">
              Research on Morocco&apos;s market
            </h1>
            <p className="mt-8 max-w-2xl font-body text-xl leading-relaxed text-black/70">
              A publishing platform for market research, company analysis, and
              ecosystem intelligence focused on Morocco.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <FadeIn className="space-y-6 reading-body">
          <p>
            DinaResearch covers the Moroccan panorama: how markets move, which
            companies lead or transform, how domestic and foreign investors
            allocate capital, and how startups raise funding across stages.
          </p>
          <p>
            We also track initiatives, programs, and events that shape the
            ecosystem—so decision-makers can read structured research, not
            scattered headlines.
          </p>
        </FadeIn>

        <FadeIn className="mt-16 border border-black/10 bg-white p-8 md:p-10">
          <h2 className="label-mission">Our mission</h2>
          <p className="mt-4 font-body text-lg leading-relaxed text-black">
            Publish rigorous market and company research on Morocco{"\u2014"}for
            investors, founders, analysts, and institutions who need clarity on
            capital, companies, and ecosystem signals.
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
            Have research to share or want to collaborate on Morocco market coverage?
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
