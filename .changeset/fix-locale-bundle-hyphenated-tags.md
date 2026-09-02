---
"@pantoken/translation-adapters": patch
---

Fixed `generateLocaleBundles()` producing invalid TypeScript for hyphenated locale tags (e.g.
`en-AU`, `fr-CA`, `zh-Hans`) — the generated `LOCALE_EN-AU` identifier and unquoted `en-AU:` object
key were syntax errors. Identifiers now replace `-` with `_` (`LOCALE_EN_AU`) and locale keys in the
`LOCALES` map are quoted.
