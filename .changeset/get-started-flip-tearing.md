---
"@pantoken/docs": patch
---

Fix visual tearing on the homepage get-started flip card in Firefox: the tilted flip faces
(`rotateY(-15deg)`/`rotateY(165deg)`) re-rasterized on every typewriter keystroke, producing 1px
seams at the card edges that let the page background bleed through. Added `will-change: transform`
to the flipper and its faces so Firefox keeps the tilted bitmap on a stable compositor layer
instead of re-rasterizing it on each text repaint.
