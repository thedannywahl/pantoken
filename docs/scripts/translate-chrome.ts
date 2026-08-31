/**
 * Translate the docs UI chrome (nav/sidebar labels, CDN picker, "get started" tabs, VitePress
 * default-theme strings, search UI — see `.vitepress/i18n.ts`'s `UiStrings`) into every non-root
 * locale, mirroring `translate-guides.ts`/`build-api-locales.ts` for prose.
 *
 * Run with `DOCS_TRANSLATION_ADAPTER=ai` for real translations; the default `glossary` adapter is a
 * keyless passthrough (the glossary can't translate prose, so `i18n.ts` renders English until a real
 * run fills the cache — see the poison-cache guard in `translation-memory.ts`).
 *
 * Content-addressed by English text (`kind: "text"`, same convention as sidebar labels), so only new
 * or edited UI strings reach the adapter on a re-run.
 */
import { ENGLISH_UI_STRINGS, NON_ROOT_LOCALES, flattenStrings } from "../.vitepress/i18n.ts";
import { createTranslationAdapter } from "./api-translation.ts";
import { TranslationMemory, translateUnits } from "./translation-memory.ts";

const units = flattenStrings(ENGLISH_UI_STRINGS).map(({ text }) => ({
  kind: "text" as const,
  source: text,
}));

for (const locale of NON_ROOT_LOCALES) {
  const adapter = createTranslationAdapter(locale);
  const memory = TranslationMemory.load(locale, "chrome");

  await translateUnits(adapter, memory, units);

  memory.save();
  console.log(
    `✓ localized ${units.length} UI strings for '${locale}' via '${adapter.name}' ` +
      `(${memory.misses} translated, ${memory.hits} cached)`,
  );
}
