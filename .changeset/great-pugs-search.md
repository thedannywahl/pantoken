---
"@pantoken/components": patch
---

Fix tooltip placement in RTL: the top/bottom bubble flips its centering translate under `:dir(rtl)` so it stays under its trigger instead of drifting to the side, and the start/end gap now follows the inline direction.
