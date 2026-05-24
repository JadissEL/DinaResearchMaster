import { chromium } from "playwright";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loadScrapeFn(): Promise<() => unknown> {
  const raw = await fs.readFile(
    path.join(__dirname, "scrape-browser-fn.mjs"),
    "utf-8",
  );
  const match = raw.match(/export const SCRAPE_FN = (\(\) => \{[\s\S]*\});/);
  if (!match) throw new Error("Could not parse SCRAPE_FN from scrape-browser-fn.mjs");
  // eslint-disable-next-line no-new-func
  return new Function(`return ${match[1]}`)() as () => unknown;
}

const SITES = [
  {
    id: "volume10",
    url: "https://www.volume10.com/home",
    name: "Volume10",
  },
  {
    id: "apple",
    url: "https://www.apple.com/gr/",
    name: "Apple Greece",
  },
  {
    id: "newyorker",
    url: "https://www.newyorker.com/",
    name: "The New Yorker",
  },
  {
    id: "wealthsimple",
    url: "https://www.wealthsimple.com/en-ca",
    name: "Wealthsimple",
  },
  {
    id: "fridays",
    url: "https://www.fridays.gr/",
    name: "TGI Fridays Greece",
  },
];

const OUT_DIR = path.join(process.cwd(), "docs", "reference-ux-scrape");

interface ScrapedSite {
  id: string;
  name: string;
  url: string;
  viewport: { width: number; height: number };
  title: string;
  metaDescription: string | null;
  themeColor: string | null;
  fonts: string[];
  colors: string[];
  navLinks: Array<{ text: string; href: string }>;
  headings: Array<{ level: string; text: string; fontSize: string; fontFamily: string; color: string }>;
  buttons: Array<{ text: string; bg: string; color: string; borderRadius: string; fontSize: string }>;
  sections: Array<{ tag: string; className: string; rect: { width: number; height: number; top: number } }>;
  layout: {
    bodyBg: string;
    bodyColor: string;
    bodyFont: string;
    maxContentWidth: number | null;
    hasStickyHeader: boolean;
    headerHeight: number | null;
  };
  interactions: {
    linkCount: number;
    buttonCount: number;
    hasVideo: boolean;
    hasCarousel: boolean;
    scrollHeight: number;
  };
  scrapedAt: string;
}

async function scrapePage(
  page: import("playwright").Page,
  site: (typeof SITES)[0],
  scrapeFn: () => unknown,
): Promise<ScrapedSite> {
  await page.goto(site.url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);

  // Dismiss common overlays
  for (const sel of [
    'button:has-text("Accept")',
    'button:has-text("Continue")',
    'button:has-text("Continue to the site")',
    '[aria-label="Close"]',
  ]) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 1500 })) await btn.click();
    } catch {
      /* ignore */
    }
  }

  await page.waitForTimeout(1000);

  const data = (await page.evaluate(scrapeFn)) as Omit<
    ScrapedSite,
    "id" | "name" | "url" | "viewport" | "scrapedAt"
  >;

  return {
    id: site.id,
    name: site.name,
    url: site.url,
    viewport: { width: 1440, height: 900 },
    ...data,
    scrapedAt: new Date().toISOString(),
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(path.join(OUT_DIR, "screenshots"), { recursive: true });

  const scrapeFn = await loadScrapeFn();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  const all: ScrapedSite[] = [];

  for (const site of SITES) {
    console.log(`Scraping ${site.name}...`);
    const page = await context.newPage();
    try {
      const scraped = await scrapePage(page, site, scrapeFn);
      all.push(scraped);

      await page.screenshot({
        path: path.join(OUT_DIR, "screenshots", `${site.id}-hero.png`),
        fullPage: false,
      });
      await page.screenshot({
        path: path.join(OUT_DIR, "screenshots", `${site.id}-full.png`),
        fullPage: true,
      });

      await fs.writeFile(
        path.join(OUT_DIR, `${site.id}.json`),
        JSON.stringify(scraped, null, 2),
      );
      console.log(`  ✓ ${site.id}`);
    } catch (err) {
      console.error(`  ✗ ${site.id}:`, err);
      all.push({
        id: site.id,
        name: site.name,
        url: site.url,
        viewport: { width: 1440, height: 900 },
        title: "",
        metaDescription: null,
        themeColor: null,
        fonts: [],
        colors: [],
        navLinks: [],
        headings: [],
        buttons: [],
        sections: [],
        layout: {
          bodyBg: "",
          bodyColor: "",
          bodyFont: "",
          maxContentWidth: null,
          hasStickyHeader: false,
          headerHeight: null,
        },
        interactions: {
          linkCount: 0,
          buttonCount: 0,
          hasVideo: false,
          hasCarousel: false,
          scrollHeight: 0,
        },
        scrapedAt: new Date().toISOString(),
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  await fs.writeFile(
    path.join(OUT_DIR, "all-sites.json"),
    JSON.stringify(all, null, 2),
  );

  // Generate human-readable audit markdown
  const md = generateAuditMarkdown(all);
  await fs.writeFile(path.join(OUT_DIR, "UI-UX-AUDIT.md"), md);
  console.log(`\nDone. See docs/reference-ux-scrape/UI-UX-AUDIT.md`);
}

function generateAuditMarkdown(sites: ScrapedSite[]): string {
  const lines: string[] = [
    "# Reference UI/UX Audit (Live Scrape)",
    "",
    `Scraped: ${new Date().toISOString()}`,
    "Viewport: 1440×900 desktop",
    "",
    "Screenshots in `./screenshots/`",
    "",
  ];

  for (const s of sites) {
    lines.push(`---`, "", `## ${s.name}`, "", `- **URL:** ${s.url}`, `- **Title:** ${s.title}`, "");
    if (s.metaDescription) lines.push(`- **Meta:** ${s.metaDescription.slice(0, 200)}`, "");
    lines.push("### Layout & chrome", "");
    lines.push(`| Property | Value |`);
    lines.push(`|----------|-------|`);
    lines.push(`| Body background | ${s.layout.bodyBg} |`);
    lines.push(`| Body text color | ${s.layout.bodyColor} |`);
    lines.push(`| Body font | ${s.layout.bodyFont.slice(0, 80)} |`);
    lines.push(`| Sticky/fixed header | ${s.layout.hasStickyHeader} |`);
    lines.push(`| Header height | ${s.layout.headerHeight ?? "n/a"}px |`);
    lines.push(`| Main content width | ${s.layout.maxContentWidth ?? "n/a"}px |`);
    lines.push(`| Page scroll height | ${s.interactions.scrollHeight}px |`);
    lines.push(`| Has video | ${s.interactions.hasVideo} |`);
    lines.push(`| Has carousel | ${s.interactions.hasCarousel} |`);
    lines.push("");

    lines.push("### Typography (headings sampled)", "");
    lines.push(`| Level | Sample | Size | Weight | Color |`);
    lines.push(`|-------|--------|------|--------|-------|`);
    for (const h of s.headings.slice(0, 8)) {
      lines.push(
        `| ${h.level} | ${h.text.slice(0, 50).replace(/\|/g, "/")} | ${h.fontSize} | ${(h as { fontWeight?: string }).fontWeight ?? ""} | ${h.color} |`,
      );
    }
    lines.push("");

    lines.push("### Navigation links", "");
    for (const l of s.navLinks.slice(0, 10)) {
      lines.push(`- ${l.text}`);
    }
    lines.push("");

    lines.push("### Color palette (computed, sample)", "");
    lines.push(s.colors.slice(0, 15).map((c) => `\`${c}\``).join(" · "));
    lines.push("");

    lines.push("### Font families detected", "");
    lines.push(s.fonts.map((f) => `\`${f}\``).join(", "));
    lines.push("");

    lines.push("### Major sections (DOM)", "");
    for (const sec of s.sections.slice(0, 6)) {
      lines.push(`- \`${sec.tag}\` ${sec.rect.width}×${sec.rect.height}px @ top ${sec.rect.top}px`);
    }
    lines.push("");
  }

  lines.push("---", "", "## Cross-site synthesis for DinaResearch", "", "### Navigation");
  lines.push("- **Volume10 / Apple:** Minimal top nav, brand left, sparse links");
  lines.push("- **New Yorker:** Rich taxonomy nav + section labels on homepage");
  lines.push("- **Wealthsimple:** Product modules as nav destinations");
  lines.push("- **Fridays:** Utility nav (book, find us) + promo-first home", "");
  lines.push("### Hero patterns");
  lines.push("- **Volume10:** Statement headline + case study cards immediately below");
  lines.push("- **Apple:** Full-bleed product tiles, one hero per scroll viewport");
  lines.push("- **New Yorker:** Featured story + Today's Mix grid");
  lines.push("- **Wealthsimple:** Motion/video hero + product grid");
  lines.push("- **Fridays:** Rotating promo carousel + membership CTA", "");
  lines.push("### Recommended DinaResearch mapping");
  lines.push("| Pattern | Source | Apply to |");
  lines.push("|---------|--------|----------|");
  lines.push("| Split headline + case study rail | Volume10 | Home hero + Featured Research |");
  lines.push("| Scroll-section product blocks | Apple / Wealthsimple | Intelligence categories |");
  lines.push("| Today's Mix editorial grid | New Yorker | Home curated feed |");
  lines.push("| Trust / social proof strip | Wealthsimple | About / footer |");
  lines.push("| Event/promo energy | Fridays | Active discussions module |");

  return lines.join("\n");
}

main().catch(console.error);
