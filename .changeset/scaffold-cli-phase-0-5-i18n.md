---
"@pantoken/scaffold": patch
"@pantoken/ai": patch
---

feat(scaffold): add CLI string localization infrastructure (en)

Implements Phase 0.5: CLI string localization for both @pantoken/scaffold and @pantoken/ai.

For @pantoken/scaffold:

- src/i18n.json: flat key-value map of all user-facing CLI strings (prompts, help text, errors, next-steps)
- i18n-cache/en.json: committed English cache (source of truth)
- src/locale.ts: detectLocale() and createLocaleLookup() for runtime i18n resolution
- scripts/translate.ts: interactive translation script for adding new locales
- scripts/check-drift.ts: CI-safe drift detection ensuring caches stay current
- package.json scripts: translate, translate:agy, check:drift targets

For @pantoken/ai:

- Same structure mirrored: src/i18n.json, i18n-cache/en.json, scripts/translate.ts, scripts/check-drift.ts
- Separate bundle for AI-specific CLI strings (init/scaffold subcommand descriptions)
- Will reuse detectLocale/createLocaleLookup from @pantoken/scaffold/cli

Extended vite.config.ts generate task to emit locale bundles: generated/locales/{en,hu}.ts + index.ts

Hungarian translations deferred to later phase once English strings stabilize.
