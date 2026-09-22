---
"@pantoken/components": minor
---

`dist/icons.css` is now self-contained: it declares the `--instui-icon-*` values alongside the
`.-icon-<name>` glyph classes. It previously shipped only the mapping, so loading it without the full
token sheet left every glyph unpainted — a filled square where the mask should be. This matches what
`dist/icons/<name>.css` and the icon plugin bundles already did. `iconGlyphsCss` takes a new `values`
option to opt into the same behavior.
