---
"@pantoken/translation-adapters": minor
"@pantoken/web-components": patch
"@pantoken/scaffold": patch
"@pantoken/ai": patch
---

Added a "verbatim" policy to the passthrough guard, for source strings that are legitimately
identical to their English translation in some or all locales (e.g. `@pantoken/web-components`'s
`datePlaceholder: "yyyy-mm-dd"`, which most locales keep verbatim). Declare it inline in
`src/i18n.json` by replacing a plain string entry with `{ "string": "...", "verbatim": ... }`, where
`verbatim` is `"allow"` (every locale) or `{ allow?, warn?, error? }` — each a list of locale codes
or `"prefix*"`/`"*"` globs deciding whether an identical response is cached silently, cached with a
warning, or treated as a likely AI failure (the default for any locale matched by neither list).
`@pantoken/translation-adapters` exports `parseI18nSource()` to flatten a `src/i18n.json` into its
plain strings plus a `verbatim` policy map, and `resolveVerbatimAction()` to resolve one key's policy
for a given locale; `runI18nTranslationCli`'s `verbatimKeys` option is replaced by `verbatim`.
`@pantoken/scaffold`'s `collectI18nSource()` now returns `{ source, verbatim }`, merging each
template's own inline policies the same way it merges template strings.
