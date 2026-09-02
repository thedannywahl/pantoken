---
"@pantoken/docs": patch
---

Fix the home page's tilted terminal rendering without antialiasing and tearing in Firefox. The
typewriter row now reserves the width of the longest command so typing can't reflow the card, and
`will-change` / `transform-style: preserve-3d` are applied only while the flip transition runs —
at rest Firefox rasterizes the card in screen space, which restores its antialiased edges and
unresampled text. The drop shadow is a pre-blurred gradient instead of an animated `filter: blur()`.
