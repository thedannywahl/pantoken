---
"@pantoken/tinymce": minor
"@pantoken/scaffold": patch
---

`@pantoken/tinymce` gains `createVisualBlocksFooterPlugin` (`pantoken_visualblocks_footer`), a
footer/statusbar button for TinyMCE's native `visualblocks` plugin, which otherwise ships as a
toolbar-only toggle.

`canvas-theme-editor` scaffold: registers TinyMCE's `visualblocks` plugin and surfaces its toggle
in the footer/status bar alongside the accessibility checker, word count, source-view toggle,
fullscreen, and find & replace controls.
