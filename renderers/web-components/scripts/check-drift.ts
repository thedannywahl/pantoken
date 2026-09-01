#!/usr/bin/env node

/**
 * Detect drift between `src/i18n.json`'s English source strings and the committed
 * `i18n-cache/*.json` translation memory — every key must exist in every Canvas locale's cache
 * file (except `en`, which is the source).
 *
 * Whether a miss blocks the merge or only warns is decided by `i18n-policy.json` (surface
 * `ui.strings`, keyed by locale tier), not by this script. See
 * `tools/translation-adapters/src/drift-policy.ts`.
 *
 * Fill drift locally with `I18N_TRANSLATION_ADAPTER=ai node scripts/translate.ts`, then commit the
 * updated cache files, then run `vp run @pantoken/i18n#generate` to refresh the downstream
 * `LocaleBundle`s.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DriftReporter, parseI18nSource, repoRelative } from "@pantoken/translation-adapters";
import { CANVAS_LOCALES } from "./lib/canvas-locales.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(readFileSync(resolve(__dirname, "../src/i18n.json"), "utf8"));
const { strings: source } = parseI18nSource(raw);
const keys = Object.keys(source);
const cacheDir = resolve(__dirname, "../i18n-cache");
const targets = Object.keys(CANVAS_LOCALES).filter((l) => l !== "en");

/** Return every (locale, key) pair missing from its cache file — exported for testing. */
export function findMissingTranslations(
  dir: string,
  locales: readonly string[],
  translatableKeys: readonly string[],
): Array<{ locale: string; key: string }> {
  const missing: Array<{ locale: string; key: string }> = [];
  for (const locale of locales) {
    const path = join(dir, `${locale}.json`);
    const cache: Record<string, string> = existsSync(path)
      ? JSON.parse(readFileSync(path, "utf8"))
      : {};
    for (const key of translatableKeys) {
      if (!(key in cache)) missing.push({ locale, key });
    }
  }
  return missing;
}

const missing = findMissingTranslations(cacheDir, targets, keys);

const reporter = new DriftReporter({
  label: "@pantoken/web-components UI strings",
  fixCommand: "vp run @pantoken/web-components#translate",
});

for (const { locale, key } of missing) {
  reporter.add({
    surface: "ui.strings",
    locale,
    file: repoRelative(join(cacheDir, `${locale}.json`)),
    detail: `"${key}" (English: ${JSON.stringify(source[key])})`,
  });
}

if (missing.length === 0) {
  console.log(`  ${targets.length} locales × ${keys.length} keys checked`);
}
process.exitCode = reporter.report();
