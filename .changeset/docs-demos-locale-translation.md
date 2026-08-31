---
"@pantoken/docs": minor
"@pantoken/demo": minor
---

Translated the self-hosted demo snippet prose (`docs/demos/*.html`, the live examples the `/play`
runner loads by iframe) into every Canvas locale — previously the last untranslated surface, invisible
to the markdown-based translation pipeline. `demoMarkdownIt` gains a `localePrefix` option so a
`demo:self:<name>` fence on a locale page resolves to its translated clone instead of the English
source.
