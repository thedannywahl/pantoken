#!/usr/bin/env node

/**
 * Translates CLI strings for pantoken-ai using the translation adapter.
 *
 * Run via: npm run translate
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runI18nTranslationCli } from "@pantoken/translation-adapters";
import { CANVAS_LOCALES } from "./lib/canvas-locales.ts";

async function main(): Promise<void> {
  const source = JSON.parse(readFileSync(resolve("src/i18n.json"), "utf8"));
  await runI18nTranslationCli({
    label: "@pantoken/ai strings",
    source,
    targetLocales: Object.keys(CANVAS_LOCALES),
    cachePath: (locale) => `i18n-cache/${locale}.json`,
  });
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
