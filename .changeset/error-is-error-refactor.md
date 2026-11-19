---
"@pantoken/scaffold": patch
"@pantoken/inline-styles": patch
"@pantoken/components": patch
"@pantoken/translation-adapters": patch
"@pantoken/i18n-engine": patch
---

Refactor error checks to use Error.isError() instead of instanceof

Replace 10 instanceof Error patterns with the standard Error.isError() helper
(ES2022 feature) across:

- packages/scaffold/src/cli.ts (3 occurrences)
- packages/scaffold/scripts/sync-readme-locales.ts (1 occurrence)
- packages/scaffold/tests/index.test.ts (1 occurrence)
- formats/inline-styles/src/cli.ts (1 occurrence)
- formats/components/scripts/audit-accessibility.ts (1 occurrence)
- tools/translation-adapters/src/shim.ts (1 occurrence)
- tools/i18n-engine/src/lint.ts (2 occurrences)

Error.isError() is the standard, more explicit way to check if an unknown value
is an Error instance, improving code clarity and consistency.
