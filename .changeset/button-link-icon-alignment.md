---
"@pantoken/components": patch
---

Fix glyph placement when a `-icon-*` modifier is applied to button and link action controls, keeping
button-like links aligned and spaced correctly while preserving the underlying component styling.
Buttons with only an icon and optional screen-reader label now use a square aspect ratio at every
size.
