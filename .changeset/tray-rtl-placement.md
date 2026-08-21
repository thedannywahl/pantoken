---
"@pantoken/components": patch
---

Fix `tray`'s slide-in transform to mirror automatically under an ancestor `[dir="rtl"]`, so the default (start) and `-placement-end` edges open from the correct physical side in right-to-left layouts without extra markup.
