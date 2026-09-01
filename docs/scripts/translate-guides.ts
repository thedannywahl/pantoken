/**
 * Translate the hand-written guide pages into each non-root locale, mirroring `build-api-locales`
 * for prose. The root (`docs/guide/*.md`) is the source; each locale gets a `docs/<locale>/guide/`
 * copy run through the configured adapter.
 *
 * Run with `DOCS_TRANSLATION_ADAPTER=ai` for real translations (shells out to `claude`);
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
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";
import { createTranslationAdapter } from "./api-translation.ts";
import { preservesMarkdownStructure } from "./markdown-structure.ts";
import { TranslationMemory, keyFor, translateUnits } from "./translation-memory.ts";

const docsRoot = join(import.meta.dirname, "..");
const guideDir = join(docsRoot, "guide");

const pages = readdirSync(guideDir)
  .filter((name) => name.endsWith(".md"))
  .toSorted();

const targets = NON_ROOT_LOCALES;
const formatOnly = process.env.DOCS_TRANSLATION_FORMAT_ONLY === "1";

for (const locale of targets) {
  const outDir = join(docsRoot, locale, "guide");
  mkdirSync(outDir, { recursive: true });

  const sources = pages.map((page) => ({
    page,
    source: readFileSync(join(guideDir, page), "utf8"),
  }));

  if (formatOnly) {
    for (const { page, source } of sources) {
      const outPath = join(outDir, page);
      const existing = readFileSync(outPath, "utf8");
      const localized = preservesMarkdownStructure(source, existing) ? existing : source;
      writeFileSync(outPath, `${localized.trimEnd()}\n`);
    }
    console.log(`✓ ${locale}: repaired ${pages.length} guide page(s)`);
    continue;
  }

  const adapter = createTranslationAdapter(locale);
  const memory = TranslationMemory.load(locale, "guides");

  console.log(`🔄 ${locale}: checking ${pages.length} guide page(s) via '${adapter.name}'...`);

  const translations = await translateUnits(
    adapter,
    memory,
    sources.map(({ page, source }) => ({ kind: "markdown", source, filePath: `guide/${page}` })),
    { locale, defaultVerbatim: { allow: ["en*"] } },
  );

  for (const { page, source } of sources) {
    const translated = translations.get(keyFor("markdown", source)) ?? source;
    const localized = preservesMarkdownStructure(source, translated) ? translated : source;
    writeFileSync(join(outDir, page), `${localized.trimEnd()}\n`);
    console.log(`  ${locale}/guide/${page}`);
  }

  memory.save();
  console.log(
    `✓ ${locale}: localized ${pages.length} guide pages via '${adapter.name}' ` +
      `(${memory.misses} translated, ${memory.hits} cached)`,
  );
}
