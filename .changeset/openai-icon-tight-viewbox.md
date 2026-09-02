---
"@pantoken/plugin-custom-icons": patch
---

The `openai` custom icon now fills its box. Its source SVG carried a `0 0 716 716` viewBox around a
glyph that only spanned `180.5 → 535.18`, so the mask painter (`center / contain`) rendered it about
half-size next to every other icon. The viewBox is now the glyph's own bounds, and the redundant
`width`/`height` attributes are gone.
