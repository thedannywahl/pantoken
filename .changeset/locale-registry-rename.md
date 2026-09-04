---
"@pantoken/i18n-engine": patch
---

Renamed the internal locale registry: `CANVAS_LOCALES` → `LOCALES`, the `LocaleMeta` interface →
`LocaleInfo`, and `src/lib/canvas-locales.ts` → `src/lib/locales.ts`. This decouples the registry's
name from Canvas — the data is still seeded from Canvas LMS's supported-language list, but pantoken
no longer frames the registry as "the set of locales Canvas supports." `CANVAS_LOCALES` and
`LocaleMeta` are no longer exported; consumers should import `LOCALES` and `LocaleInfo` instead.
