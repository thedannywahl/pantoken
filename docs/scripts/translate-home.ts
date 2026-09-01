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
import { TranslationMemory, keyFor, translateUnits } from "./translation-memory.ts";

const docsRoot = join(import.meta.dirname, "..");
const source = readFileSync(join(docsRoot, "index.md"), "utf8");

// The only frontmatter keys VitePress renders as visible home-page copy.
const TRANSLATABLE_KEY = /^(\s*)(text|tagline|title|details):(\s*)(.*)$/;
const LINK_KEY = /^(\s*)link:(\s*)(\/.*)$/;

// `&grave;...&grave;` stands in for backticks in `details` (literal backticks in this hand-authored
// frontmatter render oddly). Swap them for real backticks before translating so the shared batch
// masking in `api-translation.ts` protects the wrapped command instead of letting the model translate
// it as prose, then swap back on the way out.
const toBackticks = (text: string): string => text.replace(/&grave;([^&]*?)&grave;/g, "`$1`");
const toGrave = (text: string): string => text.replace(/`([^`]*)`/g, "&grave;$1&grave;");

const lines = source.split("\n");
const values = lines.flatMap((line) => {
  const value = line.match(TRANSLATABLE_KEY)?.[4];
  return value ? [value] : [];
});

const units = [...new Set(values)].map((value) => ({
  kind: "text" as const,
  source: toBackticks(value),
}));

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
    .map((line) => {
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
