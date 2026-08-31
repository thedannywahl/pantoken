---
"@pantoken/ai": patch
"@pantoken/scaffold": patch
"@pantoken/web-components": patch
---

Added a combined `translate:agy:force` script (and root `i18n:translate:force:agy` umbrella task) so
the agy adapter can be re-run with the translation-memory cache bypassed across all i18n pipelines
(UI, docs, CLI), matching the existing `docs:locales:translate:agy:force` script.
