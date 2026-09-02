---
"@pantoken/docs": patch
---

Extracted the hardcoded, Hungarian-only structural-term glossary (headings, badges, table labels in
generated API docs) out of `GlossaryTranslationAdapter` into `docs/scripts/glossary.ts` as plain data,
matched against a per-locale `<locale>.glossary.json` translation-memory cache instead of a static
regex table. A new `translate-glossary.ts` script (`docs:glossary:locales`/`:claude`/`:agy`) fills that
cache for every Canvas locale, the same way `translate-chrome.ts` already does for UI chrome strings.
