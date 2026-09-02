---
"@pantoken/docs": patch
---

Untangled two colliding names in `docs/.vitepress/i18n.ts`: its own `LOCALES` (the per-locale
VitePress theme-config proxy) is renamed `LOCALE_THEMES`, and its own `LocaleMeta` type (route
structure plus translated UI chrome) is renamed `LocaleTheme` — both previously shadowed
`@pantoken/i18n`'s exports of the same names. Updated the `@pantoken/i18n` import (`CANVAS_LOCALES` →
`LOCALES`) and all `config.ts` usages accordingly.
