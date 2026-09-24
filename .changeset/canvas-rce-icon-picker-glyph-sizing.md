---
"@pantoken/tinymce": patch
---

Fix the `::name` icon-picker autocompleter rendering Simple Icons results far larger and blurrier
than every other icon source — those SVGs carry no explicit `width`/`height` (only a `viewBox`), so
the browser fell back to its default replaced-element size and then downscaled it awkwardly. Rows
now pin the glyph to a consistent size regardless of source, and no longer show a redundant source
label — just the glyph and the icon's name, matching the dialog's own rows.
