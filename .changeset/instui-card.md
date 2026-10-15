---
"@pantoken/components": minor
"@pantoken/demo": patch
"@pantoken/docs": patch
"@pantoken/next": patch
"@pantoken/plugin-custom-components": patch
"@pantoken/scaffold": patch
"@pantoken/tokens": patch
---

Upgrade InstUI to 11.7.10 and bless the unchanged token/icon content with updated ui-icons provenance. Promote Card to `@pantoken/components` with the official `base`/`nested` variants and container-width sizing, while retaining the custom-components CSS and `cardRules` APIs as deprecated aliases. Keep Card's existing localized API pages and translations, migrating their stylesheet imports without retranslation; mark locale-specific identical API prose as verbatim to avoid repeat translation attempts. Update scaffold guidance and the Next compatibility record.
