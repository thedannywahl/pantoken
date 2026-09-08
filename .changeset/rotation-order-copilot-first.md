---
"@pantoken/i18n-engine": patch
"@pantoken/translation-adapters": patch
---

Changed the default provider-rotation order to `copilot` → `agy` → `claude` (was `claude` → `agy` →
`copilot`), in both `i18n.config.json`'s default `provider.circuitBreaker.rotation`/`provider.default`
and the shim's docs.
