---
"@pantoken/translation-adapters": minor
"@pantoken/web-components": patch
"@pantoken/scaffold": patch
"@pantoken/ai": patch
"@pantoken/docs": patch
---

Added a per-key/per-string "verbatim" allowlist to the passthrough guard, for source strings that
are legitimately identical to their English translation in some or all locales (e.g.
`@pantoken/web-components`'s `datePlaceholder: "yyyy-mm-dd"`, which most locales keep verbatim).
Verbatim keys are declared in a sibling `<dir>/i18n.verbatim.json` file (a plain string array) next
to `src/i18n.json`, read via `@pantoken/translation-adapters`' new `readVerbatimKeys()` — so the
allowlist travels with the source content instead of being hardcoded separately in each package's
`translate.ts`. `@pantoken/scaffold`'s `collectI18nSource()` now returns `{ source, verbatimKeys }`
and merges each template's own `i18n.verbatim.json` the same way it already merges template strings.
The docs prose pipeline's `translateUnits()` gained the equivalent `verbatimSources` option.
