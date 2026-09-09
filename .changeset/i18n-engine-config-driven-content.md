---
"@pantoken/i18n-engine": minor
---

Drive content localization spaces from their configuration instead of hard-coded `docs/` paths.

`include` globs now select a content space's sources, the new `root` field anchors catalog
references, and `segment` gained a `file` value for whole-Markdown units (what `docs.guides` always
used in practice). Content spaces can also be AI-translated like message spaces, via a `FillOptions`
argument on `runTranslateContent`.

The `docs.guides`/`docs.home` special cases are gone, along with the `runExtractGuides`,
`runTranslateGuides`, `runRenderGuides`, `runCheckGuides`, `guidesLocales`, `DOCS_GUIDES`, and
`DOCS_HOME` exports. Call the `runExtractContent`/`runTranslateContent`/`runRenderContent`/
`runCheckContent` equivalents with an explicit space id instead. Existing catalogs and rendered
output are unchanged.
