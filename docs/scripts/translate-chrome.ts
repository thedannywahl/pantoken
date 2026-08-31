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

// Not prose: a literal HTTP status code, the CDN picker's output-format tokens (an HTML tag and a
// CSS at-rule keyword, not English words), and "Canvas"/"Canvas high contrast" — InstUI's declared
// theme names, not generic English words, so every locale keeps them as-is. `getStartedTabs.
// agentPrompt` is a real sentence (see get-started.ts's docblock) and goes through translation
// normally, even though its URL must survive unchanged.
const verbatimSources = new Set([
  ENGLISH_UI_STRINGS.chrome.notFound.code,
  ENGLISH_UI_STRINGS.cdnPicker.formatLink,
  ENGLISH_UI_STRINGS.cdnPicker.formatImport,
  ENGLISH_UI_STRINGS.cdnPicker.themeCanvas,
  ENGLISH_UI_STRINGS.cdnPicker.themeCanvasHighContrast,
  ENGLISH_UI_STRINGS.themeSelector.canvas,
  ENGLISH_UI_STRINGS.themeSelector.canvasHighContrast,
]);

for (const locale of NON_ROOT_LOCALES) {
  const adapter = createTranslationAdapter(locale);
  const memory = TranslationMemory.load(locale, "chrome");

  await translateUnits(adapter, memory, units, {
    verbatimSources,
    locale,
    defaultVerbatim: { allow: ["en*"] },
  });

  memory.save();
  console.log(
    `✓ localized ${units.length} UI strings for '${locale}' via '${adapter.name}' ` +
      `(${memory.misses} translated, ${memory.hits} cached)`,
  );
}
