---
"@pantoken/tinymce-codemirror": patch
---

Fixed the pretty-print (format) button being silently unavailable in `display: "footer"` mode
(used by the canvas-theme-editor scaffold and the docs Canvas RCE guide) — it was only ever
registered for `display: "toolbar"`/`"both"`. Source mode now also auto-formats on entry, and a
failed `prettier` format surfaces a TinyMCE notification instead of failing silently.
