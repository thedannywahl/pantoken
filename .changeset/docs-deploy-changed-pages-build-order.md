---
"@pantoken/docs": patch
---

Fix the deploy workflow's "Resolve changed docs" step failing with `ERR_MODULE_NOT_FOUND` on a clean checkout. `changed-pages.ts` imports `@pantoken/i18n-engine`'s built output directly, but nothing built that package before the step ran. The workflow now builds it first.
