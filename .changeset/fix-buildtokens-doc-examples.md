---
"@pantoken/dtcg": patch
"@pantoken/plugin-deprecations": patch
"@pantoken/plugin-simple-icons": patch
"@pantoken/plugin-stacking": patch
"@pantoken/plugin-transition": patch
"@pantoken/plugin-custom-icons": patch
---

docs: fix `buildTokens` example imports to use `@pantoken/core/build`

`buildTokens` moved off `@pantoken/core`'s main entry onto `@pantoken/core/build`; update the
README/doc-comment usage examples that showed `import { buildTokens } from "@pantoken/core"` to match.
