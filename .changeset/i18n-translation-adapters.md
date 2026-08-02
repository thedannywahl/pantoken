---
"@pantoken/translation-adapters": minor
---

Add `TranslationMemory` and `sha256` to the shared adapter primitives.

`TranslationMemory` is a content-addressed translation cache backed by a committed JSON file, parameterised by a `prune` option. Both the docs and i18n pipelines now use it as their shared cache core, wrapping it with pipeline-specific key-construction logic and factory methods.

`sha256(input)` is a thin helper over `node:crypto` used by both pipeline `keyFor` functions.
