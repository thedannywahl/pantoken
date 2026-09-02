---
"@pantoken/i18n-engine": minor
---

Phase 2 of the localization-engine plan: real `extract`/`translate`/`render` for the `docs.guides`
space.

- `src/extract.ts` — promotes the offset-splice technique proven in the Phase 0 spike into a real
  extractor: `collectProseRanges`/`extractFileUnits`/`extractGuideSpace` collect only prose `text`
  mdast nodes (code fences stay preserved verbatim — translating prose inside `html`/`jsx`/`mermaid`
  fences needs the embedded sub-extractors, which are real Phase 4 work). `renderFile` splices
  resolved translations back by absolute offset.
- `src/pipeline.ts` — `runExtractGuides` writes a real POT from `docs/guide/**`; `runTranslateGuides`
  keeps each locale's PO current via `msgmerge` (a deliberate no-op beyond that: there's no
  authorized real AI backend wired up, so untranslated entries stay untranslated rather than faking
  a translation); `runRenderGuides` splices each locale's PO back into `docs/{locale}/guide/**`,
  falling back to the English source for anything untranslated.
- `i18n extract`/`translate`/`render` are now real for `docs.guides` (and the default when no space
  is given); every other space still reports not-yet-implemented.

Verified end-to-end via the built CLI binary against a real `docs/guide` fixture, and via the actual
`docs/guide` corpus in tests (extracts 20+ real units; the shell-fenced agent-bootstrap prompt is
correctly NOT extracted).
