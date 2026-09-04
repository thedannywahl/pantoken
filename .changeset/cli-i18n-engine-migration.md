---
"@pantoken/scaffold": minor
"@pantoken/ai": minor
---

Migrates the scaffold and AI CLI localization surfaces from per-package JSON caches to keyed PO catalogs managed by `@pantoken/i18n-engine`.

Existing translations are preserved in `l10n/<locale>/cli.scaffold.po` and `l10n/<locale>/cli.ai.po`; generated `MESSAGES` bundles now resolve from those catalogs.
