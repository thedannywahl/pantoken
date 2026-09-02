---
"@pantoken/translation-adapters": minor
---

Added a global `defaultVerbatim` fallback option to `runI18nTranslationCli`, applied to any source
key with no per-key `verbatim` policy in its `src/i18n.json` entry (a key's own policy always takes
precedence). Pairs with the new `localeFamilyGlobs(locales)` helper, which derives one `"<lang>*"`
glob per unique base language from a locale list (e.g. `CANVAS_LOCALES`'s ~47 codes) — so a
blanket rule like "English and Portuguese variants may legitimately match the source" can be built
as `{ allow: localeFamilyGlobs([...]) }` instead of hand-typing every regional variant.
