---
"@pantoken/translation-adapters": patch
"@pantoken/scaffold": patch
"@pantoken/ai": patch
---

Renamed the generated-locale-bundle index export from `LOCALES` to `MESSAGES` (in
`generateLocaleBundles`'s codegen template, consumed by `@pantoken/scaffold` and `@pantoken/ai`'s
generated `locales/index.ts`). It maps locale → key → string, i.e. a message catalog, not a locale
list — the old name collided in meaning with `@pantoken/i18n`'s locale registry. Updated both
packages' `cli.ts` to import/export `MESSAGES` accordingly.
