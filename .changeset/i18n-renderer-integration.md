---
"@pantoken/react": patch
"@pantoken/vue": patch
"@pantoken/svelte": patch
---

Add locale convenience APIs to the framework renderer packages.

- **`@pantoken/react`** — `<TokenProvider>` accepts a `locale` prop (`string | LocaleBundle`); when set it calls `registerLocalized(locale)` instead of `register()`. Re-exports `registerLocalized` from `@pantoken/i18n` for callers that register manually.
- **`@pantoken/vue`** — `app.use(PantokenVue, { locale })` accepts an optional `locale` option (`string | LocaleBundle`); when set it calls `registerLocalized(locale)` instead of `register()`.
- **`@pantoken/svelte`** — re-exports `registerLocalized` from `@pantoken/i18n` for callers who register outside a component lifecycle.
