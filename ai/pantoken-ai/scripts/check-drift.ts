#!/usr/bin/env node

/**
 * Checks that all keys in src/i18n.json have corresponding entries in committed
 * i18n-cache files.
 *
 * Whether a miss blocks the merge or only warns is decided by `i18n-policy.json` (surface `cli.ai`,
 * keyed by locale tier), not by this script. A key missing from `en.json` is a source-integrity
 * failure and blocks by default; a missing translation falls back to English at runtime and only
 * warns.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { DriftReporter, repoRelative } from "@pantoken/translation-adapters";
import { LOCALES } from "./lib/locales.ts";

const source = JSON.parse(readFileSync(resolve("src/i18n.json"), "utf8"));
const cacheDir = resolve("i18n-cache");
const enPath = resolve(cacheDir, "en.json");
const en = JSON.parse(readFileSync(enPath, "utf8"));

const reporter = new DriftReporter({
  label: "@pantoken/ai CLI strings",
  fixCommand: "vp run @pantoken/ai#translate",
});

for (const key of Object.keys(source)) {
  if (!(key in en)) {
    reporter.add({
      surface: "cli.ai",
      locale: "en",
      file: repoRelative(enPath),
      detail: `"${key}" missing from the English source cache`,
    });
  }

  for (const locale of Object.keys(LOCALES)) {
    if (locale === "en") continue;
    // A locale cache that doesn't exist yet is fine — the whole locale falls back to English.
    const localePath = resolve(cacheDir, `${locale}.json`);
    if (!existsSync(localePath)) continue;
    const localeCache = JSON.parse(readFileSync(localePath, "utf8"));
    if (!(key in localeCache)) {
      reporter.add({
        surface: "cli.ai",
        locale,
        file: repoRelative(localePath),
        detail: `"${key}" missing (falls back to English)`,
      });
    }
  }
}

process.exitCode = reporter.report();
