---
"@pantoken/tinymce": patch
---

Fix the `::name` icon-picker autocompleter rendering Simple Icons results far larger and blurrier
than every other icon source — those SVGs carry no explicit `width`/`height` (only a `viewBox`), so
the browser fell back to its default replaced-element size and then downscaled it awkwardly. Rows
now pin the glyph to a consistent size regardless of source, and no longer show a redundant source
label — just the glyph and the icon's name, matching the dialog's own rows.

Also fix the component modifier helper/menu so modifier suggestions are semantically sorted,
long-form aliases like `-size-small` are suppressed in favour of their canonical short forms, and
single-property utility groups do not produce empty nested menu paths. Finally, fix Next Gen
TinyMCE dark-mode tooltip contrast and make pseudo-focus rings prefer the live Pantoken focus token
so they adapt to the active light/dark scheme and theme colour.
