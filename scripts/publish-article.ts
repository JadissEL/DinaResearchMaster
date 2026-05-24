#!/usr/bin/env npx tsx
import { syncArticleToDatabase, syncAllArticles } from "../lib/content/sync";

async function main() {
  const slug = process.argv[2];

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required. Copy .env.example to .env");
    process.exit(1);
  }

  if (slug === "--all") {
    const results = await syncAllArticles();
    console.log(`Synced ${results.length} article(s).`);
    for (const r of results) {
      console.log(`  ✓ ${r.article.slug}`);
      if (r.warnings.length) {
        r.warnings.forEach((w) => console.warn(`    ⚠ ${w}`));
      }
    }
  } else if (slug) {
    const result = await syncArticleToDatabase(slug);
    console.log(`✓ Published: ${result.article.slug}`);
    result.warnings.forEach((w) => console.warn(`  ⚠ ${w}`));
  } else {
    console.log("Usage: npx tsx scripts/publish-article.ts <slug> | --all");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
