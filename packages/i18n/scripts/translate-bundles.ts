/**
 * Translate i18n bundle strings for all Canvas locales via the configured adapter.
 *
 * Run with `I18N_TRANSLATION_ADAPTER=ai` for real translations; the default `glossary` adapter
 * is a CI-safe passthrough used to verify the pipeline without AI credentials.
 *
 * Only strings whose English source hash is absent from the locale's cache file are sent to the
 * adapter — re-running after a single-string edit costs one request per locale, not seven.
 *
 * After running, commit the updated `i18n-cache/*.json` files, then run `build-bundles.ts` (or the
 * `generate` package.json script) to regenerate the locale TypeScript files.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { CANVAS_LOCALES } from "../src/lib/canvas-locales.ts";
import { createTranslationAdapter } from "./lib/translation-adapter.ts";
import { TranslationMemory, keyFor } from "./lib/translation-memory.ts";
import { ENGLISH_SOURCES, TRANSLATABLE_KEYS } from "./lib/keys.ts";

const root = new URL("..", import.meta.url).pathname;
const cacheDir = join(root, "i18n-cache");
mkdirSync(cacheDir, { recursive: true });

const adapter = createTranslationAdapter();
const targets = Object.keys(CANVAS_LOCALES).filter((l) => l !== "en");

let totalHits = 0;
let totalMisses = 0;

for (const locale of targets) {
  const meta = CANVAS_LOCALES[locale]!;
  const memory = TranslationMemory.load(cacheDir, locale);

  // Find which keys need translation (hash absent from cache).
  const missing = TRANSLATABLE_KEYS.filter(
    (key) => memory.get(keyFor(key, ENGLISH_SOURCES[key])) === undefined,
  );
  // Reset hit counters after the probe (get() side-effects counters, we just needed presence check).
  // Re-load to clear the probe counts.
  const memory2 = TranslationMemory.load(cacheDir, locale);

  if (missing.length === 0) {
    console.log(`  ✓ ${locale} — all cached`);
    totalHits += TRANSLATABLE_KEYS.length;
    continue;
  }

  const items = missing.map((key) => ({ id: key, text: ENGLISH_SOURCES[key] }));
  let translated: Record<string, string> = {};
  try {
    translated = await adapter.translateBatch(items, locale, meta.label, (partial) => {
      for (const [id, value] of Object.entries(partial)) {
        memory2.set(
          keyFor(
            id as (typeof TRANSLATABLE_KEYS)[number],
            ENGLISH_SOURCES[id as (typeof TRANSLATABLE_KEYS)[number]],
          ),
          value,
        );
      }
    });
  } catch (err) {
    console.warn(
      `  ! ${locale} — translation failed: ${err instanceof Error ? err.message : String(err)}`,
    );
    continue;
  }

  // Write any remaining results not yet stored via onChunk.
  for (const [id, value] of Object.entries(translated)) {
    memory2.set(
      keyFor(
        id as (typeof TRANSLATABLE_KEYS)[number],
        ENGLISH_SOURCES[id as (typeof TRANSLATABLE_KEYS)[number]],
      ),
      value,
    );
  }
  memory2.save();

  const hits = TRANSLATABLE_KEYS.length - missing.length;
  totalHits += hits;
  totalMisses += missing.length;
  console.log(`  ✓ ${locale} — ${missing.length} translated, ${hits} cached (via ${adapter.name})`);
}

console.log(
  `\n✓ i18n translate: ${totalMisses} translated, ${totalHits} cached across ${targets.length} locales`,
);
