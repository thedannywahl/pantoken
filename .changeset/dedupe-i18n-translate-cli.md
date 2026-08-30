---
"@pantoken/ai": patch
"@pantoken/scaffold": patch
"@pantoken/translation-adapters": patch
---

Extract the duplicated "translate CLI" driver (identical in `ai/pantoken-ai/scripts/translate.ts`
and `packages/scaffold/scripts/translate.ts`) into a shared `runI18nTranslationCli()` in
`@pantoken/translation-adapters`.
