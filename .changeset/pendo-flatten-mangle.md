---
"@pantoken/pendo": minor
---

`buildPendoCss` gains two new options: `flatten` (converts `@property` at-rules to plain declarations, injected into `:scope`) and `mangle` (renames `--instui-*` to minimal base-26 identifiers). Both accept `boolean` for defaults or a full options object for fine-grained control. The static `global.css` now ships with both transforms applied, reducing its size from ~74 KB to ~59 KB before `@tsdown/css` minification.
