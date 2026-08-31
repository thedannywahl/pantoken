#!/usr/bin/env node

/**
 * Translates `src/i18n.json`'s UI strings (date/time/back — see `@pantoken/i18n`'s `LocaleBundle`
 * consumers) into every Canvas locale via the configured adapter.
 *
 * Run with `I18N_TRANSLATION_ADAPTER=ai` for real translations; the default `glossary` adapter is
 * a CI-safe passthrough used to verify the pipeline without AI credentials.
 *
 * After running, commit the updated `i18n-cache/*.json` files — `@pantoken/i18n#generate` reads
 * them directly to build its `LocaleBundle`s.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { readVerbatimKeys, runI18nTranslationCli } from "@pantoken/translation-adapters";
import { CANVAS_LOCALES } from "./lib/canvas-locales.ts";

async function main(): Promise<void> {
  const source = JSON.parse(readFileSync(resolve("src/i18n.json"), "utf8")) as Record<
    string,
    string
  >;
  // "yyyy-mm-dd" is the ISO date format most locales keep verbatim; some (e.g. Dutch's
  // "jjjj-mm-dd") do localize it — see src/i18n.verbatim.json.
  const verbatimKeys = readVerbatimKeys(resolve("src/i18n.verbatim.json"));

  await runI18nTranslationCli({
    label: "@pantoken/web-components strings",
    source,
    targetLocales: Object.keys(CANVAS_LOCALES),
    cachePath: (locale: string) => `i18n-cache/${locale}.json`,
    verbatimKeys,
  });
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
