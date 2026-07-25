---
"@pantoken/icon-font": patch
"@pantoken/cli": patch
---

Normalize SVG arcs (`unarc`) before outlining stroked glyphs, so paths with packed arc flags no longer break the outline step and the icon font builds correctly end to end.
