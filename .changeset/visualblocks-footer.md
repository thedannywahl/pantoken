---
"@pantoken/tinymce": minor
"@pantoken/scaffold": patch
---

`@pantoken/tinymce` gains `createVisualBlocksFooterPlugin` (`pantoken_visualblocks_footer`), a
footer/statusbar button for TinyMCE's native `visualblocks` plugin, which otherwise ships as a
toolbar-only toggle. Also injects the dashed-outline CSS the plugin needs into the editor's
content document, since that CSS normally ships with the default Oxide skin's content.css and is
missing when a custom skin (like this scaffold's) is used instead.

`canvas-theme-editor` scaffold: registers TinyMCE's `visualblocks` plugin and surfaces its toggle
in the footer/status bar alongside the accessibility checker, word count, source-view toggle,
fullscreen, and find & replace controls.
