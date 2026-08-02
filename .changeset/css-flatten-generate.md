---
"@pantoken/css": patch
---

`@property` at-rules are now flattened to plain `--name: value` declarations in the generated `style.css` and `style.lean.css`, reducing bundle size. The CSS Typed OM registration semantics are removed; consumers who rely on typed transitions or `@starting-style` against these properties should opt out by removing `@pantoken/plugin-css-minify` from their generate step.
