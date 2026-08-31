#!/usr/bin/env node

/**
 * Translates CLI strings using the translation adapter. Reads src/i18n.json,
 * diffs it against cached i18n-cache/*.json files, and for each missing key,
 * prompts for a translation (via spawnPrompt).
 *
 * Run via: npm run translate
 * Set I18N_TRANSLATION_ADAPTER and I18N_TRANSLATION_COMMAND env vars to choose model/command.
 */

import { resolve } from "node:path";
import { runI18nTranslationCli, sha256 } from "@pantoken/translation-adapters";
import { collectI18nSource } from "./i18n-sources.ts";
import { CANVAS_LOCALES } from "./lib/canvas-locales.ts";

// Legacy caches may still key entries by sha256(key) instead of the plain key.
async function main(): Promise<void> {
  const { source, verbatimKeys } = collectI18nSource(resolve("."));
  await runI18nTranslationCli({
    label: "@pantoken/scaffold strings",
    source,
    targetLocales: Object.keys(CANVAS_LOCALES),
    cachePath: (locale) => `i18n-cache/${locale}.json`,
    isCached: (key, cache) => sha256(key) in cache || key in cache,
    cachedValue: (key, cache) => cache[sha256(key)] ?? cache[key],
    verbatimKeys,
  });
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
