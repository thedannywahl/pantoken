---
"@pantoken/scaffold": patch
---

Moves the complete scaffold CLI catalog source into `packages/scaffold/src/i18n.json` and removes the duplicated `l10n/sources` snapshot. All entries, including template-derived strings, now use the `{message, translate}` schema.
