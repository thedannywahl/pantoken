---
"@pantoken/scaffold": patch
---

Improve browser locale detection for the generated Canvas Theme Editor by resolving browser language preferences against the supported locale registry, including region and script fallbacks such as `fr-CA` and `zh-TW`. This keeps standalone editor instances aligned with the user's system language when the docs shell is no longer controlling locale.
