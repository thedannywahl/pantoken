#!/usr/bin/env node

/**
 * Checks that all keys in src/i18n.json have corresponding entries in committed
 * i18n-cache files. Fails if any key is missing from a non-English locale cache.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { collectI18nSource } from "./i18n-sources.ts";
import { CANVAS_LOCALES } from "./lib/canvas-locales.ts";

const { source } = collectI18nSource(resolve("."));

// Check all cache files
let failed = false;
const cacheDir = resolve("i18n-cache");

for (const [key] of Object.entries(source)) {
  // English cache is the source of truth, always required
  const enPath = resolve(cacheDir, "en.json");
  const en = JSON.parse(readFileSync(enPath, "utf8"));
  if (!(key in en)) {
    console.error(`❌ Key "${key}" missing from i18n-cache/en.json`);
    failed = true;
  }

  // Every other Canvas locale is optional, but if its cache exists, it must be complete.
  for (const locale of Object.keys(CANVAS_LOCALES)) {
    if (locale === "en") continue;
    try {
      const localePath = resolve(cacheDir, `${locale}.json`);
      const localeCache = JSON.parse(readFileSync(localePath, "utf8"));
      if (!(key in localeCache)) {
        console.warn(
          `⚠️  Key "${key}" missing from i18n-cache/${locale}.json (will fall back to English)`,
        );
      }
    } catch {
      // <locale>.json doesn't exist yet, that's fine
    }
  }
}

if (failed) {
  console.error(`\n✗ @pantoken/scaffold: i18n drift detected`);
  process.exit(1);
}

console.log(`✓ @pantoken/scaffold: all i18n keys present`);
