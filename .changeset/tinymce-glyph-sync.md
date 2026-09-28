---
"@pantoken/tinymce": patch
---

Icons and logos that arrive without a picker — pasted, set with `setContent`, restored from a saved draft, or typed in the HTML source view — now render in the editor. Empty `.instui-icon`/`.instui-logo` spans are normalized so TinyMCE keeps them, and each glyph's stylesheet is injected into the editing surface. `registerGlyphSync`, `injectUsedGlyphAssets`, and `normalizeGlyphHtml` are exported for hosts that wire their own plugins.
