---
"@pantoken/tinymce": patch
---

Fix inserted icon glyphs (`<span class="instui-icon -icon-*">`) getting silently deleted when toggling from the source-code view back to WYSIWYG — TinyMCE's schema strips genuinely empty inline elements on `setContent()`, so the icon markup now carries a zero-width space instead of being empty.
