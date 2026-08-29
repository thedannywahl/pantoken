---
"@pantoken/docs": patch
---

Fix visual tearing on the homepage get-started flip card in Firefox: the tilted flip faces
(`rotateY(-15deg)`/`rotateY(165deg)`) re-rasterized on every interior repaint — typewriter
keystrokes, the copy button's hover transition, and the command dropdown popover — producing 1px
seams at the card edges that let the page background bleed through. Added
`will-change: transform` to the flipper, its faces, and the terminal card itself so Firefox keeps
the tilted bitmap on a stable compositor layer instead of re-rasterizing it on every interior
repaint.
