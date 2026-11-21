---
"@pantoken/docs": patch
---

fix: adjust i18n drift policy for docs.api and exclude compatibility.md from guides check

- Temporarily exclude compatibility.md from guides drift check until all locales have translations
- Adjust docs.api drift policy to warn (not block) for primary/secondary locales, as new API documentation may not have immediate translations for all locales
