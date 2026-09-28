---
"@pantoken/plugin-logos": patch
---

Every logo SVG now carries `width` and `height` attributes derived from its `viewBox`, so inline SVGs and `<img>` renders of a logo's data URI get an intrinsic size instead of collapsing or defaulting to 300×150.
