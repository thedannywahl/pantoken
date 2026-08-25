---
"@pantoken/cssdoc-model": minor
---

Initial release of `@pantoken/cssdoc-model` — a private, build-time helper that parses a package's own
unminified generated CSS into a cssdoc `CssDocEntry[]` model and writes it to `dist/model.json`
(`buildCssDocModel`, `writeCssDocModel`). Extracted from the near-identical logic duplicated across
`@pantoken/pantoken`, `@pantoken/plugin-custom-components`, and `@pantoken/plugin-layouts`, which now
depend on it instead.
