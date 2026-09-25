---
"@pantoken/tinymce": minor
"@pantoken/plugin-lucide-lab": minor
---

TinyMCE's icons picker now also offers Lucide Lab glyphs and pantoken's vendored custom icons,
alongside Instructure UI and Simple Icons — each in its own picker tab. Fixed the picker's icon-CSS
bundle, which was loading the lean `component-icons.css` (only the handful of icons the component
sheets reference) instead of the full glyph set, causing most Instructure UI icons to render as
unmasked, filled squares. `@pantoken/plugin-lucide-lab` now publishes `manifest.json` (the sorted
list of icon names), matching `@pantoken/plugin-simple-icons`. TinyMCE's own toolbar, menu, dialog,
and status icons now use an InstUI/Pantoken/Lucide icon pack instead of TinyMCE's stock glyphs.
