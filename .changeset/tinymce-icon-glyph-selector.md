---
"@pantoken/tinymce": patch
---

Fix pantoken icon glyphs rendering a blank square when inserted inside TinyMCE dialogs whose own classes happen to contain the substring "-icon-" (e.g. the media/embed plugin's icon input) — the glyph painter now requires the `.instui-icon` class pantoken always pairs with its `-icon-<name>` modifier.
