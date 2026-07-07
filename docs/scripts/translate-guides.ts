/**
 * Translate the hand-written guide pages into each non-root locale, mirroring `build-api-locales`
 * for prose. The root (`docs/guide/*.md`) is the source; each locale gets a `docs/<locale>/guide/`
 * copy run through the configured adapter.
 *
 * Run with `DOCS_TRANSLATION_ADAPTER=claude-code` for real translations (shells out to `claude`);
 * the default `glossary` adapter is a keyless, deterministic fallback. Fenced code blocks, inline
 * code, and package names are preserved by the adapter, so examples and identifiers stay intact.
 *
 * Each page is diffed against a committed translation memory (keyed by content hash), so only new or
 * edited guides reach the adapter — re-running after a one-page edit costs one translation, not
 * seven. This is a manual workflow — guide translations are committed, not regenerated on every
 * build — so run it after editing the English guides, then review the diff.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { LOCALES } from "../.vitepress/i18n.ts";
import { createTranslationAdapter } from "./api-translation.ts";
import { TranslationMemory, keyFor, translateUnits } from "./translation-memory.ts";

const docsRoot = join(import.meta.dirname, "..");
const guideDir = join(docsRoot, "guide");
const adapter = createTranslationAdapter();

const pages = readdirSync(guideDir)
  .filter((name) => name.endsWith(".md"))
  .toSorted();

const targets = Object.keys(LOCALES).filter((key) => key !== "root");

for (const locale of targets) {
  const outDir = join(docsRoot, locale, "guide");
  mkdirSync(outDir, { recursive: true });

  const memory = TranslationMemory.load(locale, "guides");
  const sources = pages.map((page) => ({
    page,
    source: readFileSync(join(guideDir, page), "utf8"),
  }));

  const translations = translateUnits(
    adapter,
    memory,
    sources.map(({ page, source }) => ({ kind: "markdown", source, filePath: `guide/${page}` })),
  );

  for (const { page, source } of sources) {
    const translated = translations.get(keyFor("markdown", source)) ?? source;
    writeFileSync(join(outDir, page), `${translated.trimEnd()}\n`);
    console.log(`  ${locale}/guide/${page}`);
  }

  memory.save();
  console.log(
    `✓ localized ${pages.length} guide pages for '${locale}' via '${adapter.name}' ` +
      `(${memory.misses} translated, ${memory.hits} cached)`,
  );
}
