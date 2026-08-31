---
"@pantoken/demo": patch
"@pantoken/docs": patch
---

Carry text direction into isolated demo iframes. `buildExampleSrcdoc()` gains a `dir` option (defaults
to `ltr`) so the docs' isolated `.css-example` srcdoc previews render `rtl` on Arabic/Persian/Hebrew
locale pages instead of always defaulting to `ltr` — a `srcdoc` document never inherits `dir` from its
embedder. The `/play` runner (same-origin with its embedding page) now also mirrors the embedding
page's `dir` onto its own chrome and its nested result iframe, the same way it already mirrors
light/dark mode.
