[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / FULLSCREEN\_BUTTON\_HTML

# Variabile: FULLSCREEN\_BUTTON\_HTML

> `const` **FULLSCREEN\_BUTTON\_HTML**: `string`

A hoverable "view fullscreen" button, overlaid on a demo/example frame the same way VitePress's own
code-block "copy" button reveals on hover. Purely markup — wire a delegated click handler in your
host page (`button.closest(...).querySelector("iframe")?.requestFullscreen()`; see the pantoken docs
theme for the reference wiring) and style the reveal-on-hover with `@pantoken/demo/demo.css`.
