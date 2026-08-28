---
"@pantoken/ai": patch
"@pantoken/scaffold": patch
"@pantoken/translation-adapters": patch
---

Extract the duplicated "generate locale bundles from i18n-cache" codegen (identical in
`ai/pantoken-ai/scripts/generate.ts` and `packages/scaffold/scripts/generate.ts`) into a shared
`generateLocaleBundles()` in `@pantoken/translation-adapters`.
