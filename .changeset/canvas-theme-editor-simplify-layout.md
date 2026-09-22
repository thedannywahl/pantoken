---
"@pantoken/scaffold": patch
---

Simplify the `canvas-theme-editor` scaffold's page layout to a fixed header/description/controls/
content stack — the editor pane sits above the preview pane with no resize handle, orientation
toggle, pane-swap, or fullscreen controls. The TinyMCE editable area and the srcdoc preview now
both load the real CDN CSS for the selected provider/theme/mode (and any picker-inserted
component/icon/logo assets), instead of TinyMCE's editable area having no pantoken styling at all.
