---
"@pantoken/ai": patch
"@pantoken/scaffold": patch
"@pantoken/web-components": patch
---

Renamed each package's build-script-only locale-registry copy to match `@pantoken/i18n`'s renamed
`LOCALES`/`LocaleInfo` (was `CANVAS_LOCALES`/`LocaleMeta`): `scripts/lib/canvas-locales.ts` →
`scripts/lib/locales.ts` in each package. The duplication itself is unchanged (still a deliberate
copy to avoid a new workspace dependency in build scripts) — only the naming is decoupled from Canvas.
