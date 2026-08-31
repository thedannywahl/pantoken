/**
 * Translate the structural-term glossary (`glossary.ts`'s `GLOSSARY_TERMS` — headings, badges, table
 * labels in generated API docs) into every non-root locale, mirroring `translate-chrome.ts` for UI
 * chrome strings.
 *
 * Run with `DOCS_TRANSLATION_ADAPTER=ai` for real translations; the default `glossary` adapter can't
 * translate itself, so this always uses `createTranslationAdapter`'s selection, not
 * `new GlossaryTranslationAdapter()`. Content-addressed by English term text (`kind: "text"`, same
 * convention as sidebar labels and chrome strings), so only new or edited terms reach the adapter.
 */
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";
import { GLOSSARY_TERMS } from "./glossary.ts";
import { createTranslationAdapter } from "./api-translation.ts";
import { TranslationMemory, translateUnits } from "./translation-memory.ts";

const units = GLOSSARY_TERMS.map(({ term }) => ({ kind: "text" as const, source: term }));

for (const locale of NON_ROOT_LOCALES) {
  const adapter = createTranslationAdapter(locale);
  const memory = TranslationMemory.load(locale, "glossary");

  await translateUnits(adapter, memory, units);

  memory.save();
  console.log(
    `✓ localized ${units.length} glossary terms for '${locale}' via '${adapter.name}' ` +
      `(${memory.misses} translated, ${memory.hits} cached)`,
  );
}
