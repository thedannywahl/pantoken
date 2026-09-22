---
"@pantoken/tinymce": minor
"@pantoken/tinymce-codemirror": minor
"@pantoken/tinymce-a11y": patch
"@pantoken/scaffold": minor
---

`@pantoken/tinymce` gains three new plugins: `createSupSubPlugin` (a combined
superscript/subscript toolbar dropdown), `createFullscreenFooterPlugin`, and
`createSearchReplaceFooterPlugin` (footer/statusbar buttons for TinyMCE's native
fullscreen and search & replace, which otherwise ship as toolbar-only controls).

`@pantoken/tinymce-codemirror`'s `createSourceTogglePlugin` accepts a new `display`
option (`"toolbar" | "footer" | "both"`, defaulting to `"toolbar"`) so the source-view
toggle can be registered in TinyMCE's footer/statusbar instead of (or alongside) the
toolbar.

`@pantoken/tinymce-a11y`'s footer checker button is now prepended, not appended, to
the statusbar so it consistently leads (before word count) instead of landing wherever
DOM order happened to put it.

`canvas-theme-editor` scaffold: reordered the local authoring editor's toolbar into
undo/redo, the pantoken menu, font size/heading pickers, inline formatting (including
color and superscript/subscript), link/image/placeholder-image, text align, lists, and
clear formatting/table/embed groups. The accessibility checker, word count, source-view
toggle, fullscreen, and find & replace all moved out of the toolbar into the footer/
status bar (in that order), and the element-path breadcrumb is now hidden.
