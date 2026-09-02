---
"@pantoken/docs": minor
"@pantoken/scaffold": patch
"@pantoken/ai": patch
---

Expanded the docs site's i18n infrastructure from 2 locales (`root`/`hu`) to all 44 Canvas locales
(`@pantoken/i18n`'s `CANVAS_LOCALES`). `.vitepress/i18n.ts` now derives `DocsLocale` and route
structure from `CANVAS_LOCALES` instead of a hardcoded union, and splits translatable UI chrome into
a content-addressed `<locale>.chrome.json` cache (see the new `docs:chrome:locales*` scripts and
`translate-chrome.ts`), falling back to English until a locale is translated. `build-api-locales.ts`
and `check-locale-parity.ts` now loop over every non-root locale instead of only `hu`, and the
`glossary`/`ai` translation adapters take a target locale instead of hardcoding Hungarian (the
glossary's structural-term dictionary is still `hu`-only; other locales pass through untranslated
terms until someone adds their glossary). The nav's language flyout is now a searchable `<select>`
instead of a flat link list, which scales to 44+ options with built-in browser type-to-search.
`@pantoken/scaffold` and `@pantoken/ai`'s `translate`/`check-drift` scripts now target every Canvas
locale (matching `@pantoken/web-components`'s existing pattern) instead of only `hu`.

Actual AI translation of the 43 new locales' guides/API docs is a follow-up: run
`vp run docs:locales:translate` (or `:agy`) to fill in real translations; until then, untranslated
locales render the English source as a passthrough.
