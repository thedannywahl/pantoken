---
"@pantoken/components": patch
"@pantoken/web-components": minor
"@pantoken/scaffold": patch
"@pantoken/ai": patch
---

Correct drawer-layout and member examples to use valid, explicitly named regions. Align the web
component's pane elements with InstUI's inline regions and add reactive `tray-label` and
`content-label` attributes. Supply nonempty labels when using the custom element; labels on slotted
content don't name the shadow regions. Synchronize consumer guidance.
