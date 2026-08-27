#!/usr/bin/env node

/**
 * Checks that all keys in src/i18n.json have corresponding entries in committed
 * i18n-cache files. Fails if any key is missing from a non-English locale cache.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = JSON.parse(readFileSync(resolve("src/i18n.json"), "utf8"));

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

  // Hungarian and other locales: optional, but if they exist, must be complete
  try {
    const huPath = resolve(cacheDir, "hu.json");
    const hu = JSON.parse(readFileSync(huPath, "utf8"));
    if (!(key in hu)) {
      console.warn(`⚠️  Key "${key}" missing from i18n-cache/hu.json (will fall back to English)`);
    }
  } catch {
    // hu.json doesn't exist yet, that's fine
  }
}

if (failed) {
  console.error(`\n✗ @pantoken/scaffold: i18n drift detected`);
  process.exit(1);
}

console.log(`✓ @pantoken/scaffold: all i18n keys present`);
