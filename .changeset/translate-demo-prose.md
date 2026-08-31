---
"@pantoken/docs": patch
---

Ran a real AI translation pass over the locale demo pages (`docs/<locale>/demos/*.html`), which had
been silently left as English passthrough by an earlier run of the default (keyless) glossary
adapter. `ar`, `ca`, `da`, `en-AU`, `en-CA`, `hy`, and `nl` are now genuinely translated; the
translation-memory cache for every other locale was cleared of the stale English passthrough
entries so the next `docs:demos:locales:claude`/`:agy` run retranslates them for real instead of
serving fake cache hits (a third-party AI provider quota limit stopped this run partway through).
`hu`'s pre-existing curated translations were left untouched.
