---
"@pantoken/plugin-custom-components": minor
"@pantoken/scaffold": patch
"@pantoken/tinymce": patch
---

Add a `button-set` component: a seamed (flush, zero-gap, outer-corners-only) row of buttons whose
own chained modifiers (color, size, shape, toggle, condensed, without-background/border,
display-block) default onto every child `.pfx-button` that doesn't carry its own modifier in the
same category — a button's own modifier class always wins.

Make Canvas Theme Editor's download actions a primary seamed icon-button set, synchronize its
preview scheme with the app appearance, and improve TinyMCE icon picker glyph sizing and selected
tile contrast.
