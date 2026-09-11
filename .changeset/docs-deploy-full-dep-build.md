---
"@pantoken/docs": patch
---

Fix the deploy workflow still failing with `ERR_MODULE_NOT_FOUND` after the previous fix, this time on `@pantoken/web-components`. `changed-pages.ts` and `docs/.vitepress/i18n.ts` import several workspace packages' built output directly, not just `@pantoken/i18n-engine`. The workflow now builds `@pantoken/docs`'s full dependency graph before resolving changed docs, instead of one package at a time.
