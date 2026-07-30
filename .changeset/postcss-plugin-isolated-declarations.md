---
"@pantoken/plugin-prune-custom-props": patch
"@pantoken/plugin-theme-custom-media": patch
---

Replace post-hoc `fn.postcss = true` assignment with `Object.assign` + explicit
type declaration to satisfy `--isolatedDeclarations`. No behaviour change.
