---
"@pantoken/docs": patch
---

Fixed a translation-drift bug in the generated-API markdown segmenter: a standalone `-flag` paragraph
(e.g. the `-nocard` marker `build-css-api.ts` emits before an `@example` fence) was classified as
`prose` and sent to the translator, because stripping its leading `-` still left Latin letters for
`hasProseWords` to match. `classifyBlock` now recognizes flag-only blocks and preserves them verbatim,
so a mistranslated marker can no longer break card rendering on translated pages.
