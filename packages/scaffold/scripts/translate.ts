#!/usr/bin/env node

/**
 * Translates CLI strings using the translation adapter. Reads src/i18n.json,
 * diffs it against cached i18n-cache/*.json files, and for each missing key,
 * prompts for a translation (via spawnPrompt).
 *
 * Run via: npm run translate
 * Set I18N_TRANSLATION_ADAPTER and I18N_TRANSLATION_COMMAND env vars to choose model/command.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnPrompt, sha256 } from "@pantoken/translation-adapters";

const adapter = process.env.I18N_TRANSLATION_ADAPTER || "ai";
const command = process.env.I18N_TRANSLATION_COMMAND;

async function main() {
  const source = JSON.parse(readFileSync(resolve("src/i18n.json"), "utf8"));
  const sourceKeys = new Set(Object.keys(source));

  // Define target locales (English is always the source, never needs translation)
  const targetLocales = ["hu"];

  console.log(`📋 Translating @pantoken/scaffold strings (${adapter})\n`);

  for (const locale of targetLocales) {
    if (locale === "en") continue; // Skip English, it's the source

    const cacheFile = resolve(`i18n-cache/${locale}.json`);
    let cache: Record<string, string>;

    try {
      cache = JSON.parse(readFileSync(cacheFile, "utf8"));
    } catch {
      console.log(`Creating new cache for locale: ${locale}`);
      cache = {};
    }

    // Find missing keys by comparing hashes
    const missingKeys = [];
    for (const key of sourceKeys) {
      const hash = sha256(key);
      if (!(hash in cache) && !(key in cache)) {
        missingKeys.push(key);
      }
    }

    if (missingKeys.length === 0) {
      console.log(`✓ ${locale}: all strings translated`);
      continue;
    }

    console.log(`🔄 ${locale}: translating ${missingKeys.length} new string(s)...`);

    // Create a prompt for all missing keys
    const stringsList = missingKeys.map((k) => `- "${k}": "${source[k]}"`).join("\n");

    const prompt = `Translate these UI strings from English into ${locale} (for a CLI):

${stringsList}

Respond with a JSON object mapping each original key to its translation, using the exact same keys. Only the translations, nothing else.`;

    try {
      const result = await spawnPrompt(prompt, {
        adapter,
        command,
        model: undefined, // Let the adapter choose default
      });

      // Parse the translation result
      const translated = JSON.parse(result);

      // Merge translations into cache
      for (const key of missingKeys) {
        if (key in translated) {
          cache[key] = translated[key];
        }
      }

      // Write back to cache file
      writeFileSync(cacheFile, JSON.stringify(cache, null, 2) + "\n", "utf8");
      console.log(`✓ ${locale}: saved ${missingKeys.length} translation(s)\n`);
    } catch (err) {
      console.error(`❌ Failed to translate for locale ${locale}:`, err);
      process.exit(1);
    }
  }

  console.log(`✨ All translations complete!`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
