/**
 * Detect drift between committed translation caches and the current English source strings.
 *
 * For each Canvas locale × each translatable key: verifies the hash of the current English value
 * is present in `i18n-cache/{locale}.json`. Exits non-zero on any miss so CI (the `i18n-drift`
 * workflow job) fails fast. Safe to run without AI credentials — no network required.
 *
 * Fill drift locally with `vp run @pantoken/i18n#translate`, then commit the updated cache files.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { CANVAS_LOCALES } from "../src/lib/canvas-locales.ts";
import { keyFor } from "./lib/keys.ts";
import { ENGLISH_SOURCES, TRANSLATABLE_KEYS } from "./lib/keys.ts";

const root = new URL("..", import.meta.url).pathname;
const cacheDir = join(root, "i18n-cache");

interface CacheFile {
  version: number;
  entries: Record<string, string>;
}

function loadCacheKeys(locale: string): Set<string> {
  const path = join(cacheDir, `${locale}.json`);
  if (!existsSync(path)) return new Set();
  return new Set(Object.keys((JSON.parse(readFileSync(path, "utf8")) as CacheFile).entries ?? {}));
}

const targets = Object.keys(CANVAS_LOCALES).filter((l) => l !== "en");
const missing: Array<{ locale: string; key: string }> = [];

for (const locale of targets) {
  const cached = loadCacheKeys(locale);
  for (const key of TRANSLATABLE_KEYS) {
    if (!cached.has(keyFor(key, ENGLISH_SOURCES[key]))) {
      missing.push({ locale, key });
    }
  }
}

if (missing.length > 0) {
  console.error(`\n✗ i18n drift: ${missing.length} missing translation(s):\n`);
  for (const { locale, key } of missing) {
    console.error(
      `  ${locale} — "${key}" (English: ${JSON.stringify(ENGLISH_SOURCES[key as keyof typeof ENGLISH_SOURCES])})`,
    );
  }
  console.error(
    `\nRun \`vp run i18n:translate\` to fill missing translations, then commit the updated cache files.`,
  );
  process.exit(1);
}

console.log(
  `✓ i18n drift: all ${targets.length} locales × ${TRANSLATABLE_KEYS.length} keys are current`,
);
