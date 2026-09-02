/**
 * Translate the VitePress home page (`docs/index.md`'s frontmatter) into every non-root locale,
 * mirroring `translate-guides.ts`. VitePress renders `hero`/`features` frontmatter values directly on
 * the page, so `hero.text`, `hero.tagline`, each action's `text`, and each feature's `title`/`details`
 * need real translation. `hero.name` (the "pantoken" wordmark), `theme`, `link`, and the icon
 * `light`/`dark` asset paths are structural and stay untouched; `link` values get locale-prefixed
 * instead (`/guide/x` -\> `/<locale>/guide/x`), matching the hand-authored `hu/index.md`.
 *
 * Run with `DOCS_TRANSLATION_ADAPTER=ai` for real translations; the default `glossary` adapter is a
 * keyless passthrough. Content-addressed by English text (`kind: "text"`), so only new or edited
 * copy reaches the adapter on a re-run.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";
import { createTranslationAdapter } from "./api-translation.ts";
import {
  LINK_KEY,
  TRANSLATABLE_KEY,
  collectHomeUnits,
  frontmatterRange,
  toBackticks,
  toGrave,
} from "./home-i18n.ts";
import { TranslationMemory, keyFor, translateUnits } from "./translation-memory.ts";

const docsRoot = join(import.meta.dirname, "..");
const source = readFileSync(join(docsRoot, "index.md"), "utf8");

const lines = source.split("\n");
// All of the page's copy lives in frontmatter, so no frontmatter means the file isn't a home page any
// more — fail loudly rather than writing 43 untranslated copies.
const range = frontmatterRange(lines);
if (!range) {
  throw new Error("docs/index.md has no YAML frontmatter — the home page's copy lives there.");
}
const [frontmatterStart, frontmatterEnd] = range;
const inFrontmatter = (index: number): boolean =>
  index >= frontmatterStart && index < frontmatterEnd;

// `check-locale-drift.ts` derives the same units from the same helper, so the `docs.home` drift check
// can never disagree with what this script caches.
const units = collectHomeUnits(source).map((value) => ({ kind: "text" as const, source: value }));

for (const locale of NON_ROOT_LOCALES) {
  const outPath = join(docsRoot, locale, "index.md");
  mkdirSync(dirname(outPath), { recursive: true });

  const adapter = createTranslationAdapter(locale);
  const memory = TranslationMemory.load(locale, "home");

  console.log(
    `🔄 ${locale}: checking ${units.length} home page string(s) via '${adapter.name}'...`,
  );

  const translations = await translateUnits(adapter, memory, units, {
    locale,
    defaultVerbatim: { allow: ["en*"] },
  });

  const localized = lines
    .map((line, index) => {
      // Body prose is off limits: the key regexes would happily match a markdown list like
      // `- title: Naming things` and rewrite it as if it were frontmatter.
      if (!inFrontmatter(index)) return line;
      const translatable = line.match(TRANSLATABLE_KEY);
      if (translatable) {
        const [, indent, key, gap, value] = translatable;
        if (value.length === 0) return line;
        const translated = translations.get(keyFor("text", toBackticks(value))) ?? value;
        return `${indent}${key}:${gap}${toGrave(translated)}`;
      }
      const link = line.match(LINK_KEY);
      if (link) {
        const [, indent, gap, value] = link;
        return `${indent}link:${gap}/${locale}${value}`;
      }
      return line;
    })
    .join("\n");

  writeFileSync(outPath, localized);

  memory.save();
  console.log(
    `✓ ${locale}: localized the home page via '${adapter.name}' ` +
      `(${memory.misses} translated, ${memory.hits} cached)`,
  );
}
