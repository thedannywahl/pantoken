---
"@pantoken/icons": minor
"@pantoken/rehype": patch
"@pantoken/markdown-it": patch
"@pantoken/ai": patch
"@pantoken/scaffold": patch
---

Export `buildIconResolverChain` from `@pantoken/icons` and use it from `@pantoken/rehype` and `@pantoken/markdown-it`, removing the duplicated resolver-chain logic between the two renderers.

Refactor the `pantoken-ai` CLI's command dispatch and `@pantoken/scaffold`'s JSONC comment stripping to reduce cognitive complexity; no behavior change.
