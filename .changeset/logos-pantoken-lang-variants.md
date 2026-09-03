---
"@pantoken/plugin-logos": minor
---

Added the `pantoken` product logo, including localized wordmark variants keyed by a trailing
language code (e.g. `horizontal-full-color-ar.svg`, `horizontal-reversed-zh.svg`). `LogoMeta` gained
an optional `lang` field, and `getLogoSvg`/`getLogoDataUri` accept an optional `lang` argument to
resolve a localized variant.
