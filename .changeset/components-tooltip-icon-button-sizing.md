---
"@pantoken/components": patch
---

Fix icon-only `instui-button` geometry when a tooltip bubble is composed directly on the button. The tooltip `.tip` child no longer contributes to the trigger's intrinsic inline size, and icon-only button selectors now treat a screen-reader label plus tooltip bubble as label-less for square sizing and glyph centering.
