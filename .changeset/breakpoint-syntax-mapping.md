---
"@pantoken/utils": patch
---

`syntaxMismatches` now recognizes singular per-component `breakpoint-{lg,md,sm}` tokens (e.g.
`--instui-component-card-breakpoint-lg`) as lengths, alongside the existing plural `breakpoints-`
global tokens — previously these fell through as unmodeled.
