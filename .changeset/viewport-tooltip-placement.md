---
"@pantoken/components": patch
"@pantoken/interactions": patch
"@pantoken/web-components": patch
---

Treat enhanced tooltip placements as preferences: flip to a side that fits when needed, clamp
the bubble into view, and wrap text to the viewport width. Keep pointer bridges aligned with the
effective side, including diagonal pointer travel after clamping. Reposition on resize, scrolling,
content, and direction changes, and restore authored positioning when the behavior is cleaned up.
