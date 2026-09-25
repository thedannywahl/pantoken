# @pantoken/tinymce-codemirror

## 0.2.0

### Minor Changes

- f475012: `@pantoken/tinymce` gains three new plugins: `createSupSubPlugin` (a combined
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

### Patch Changes

- f475012: Remove the unused direct `@codemirror/view` dependency while preserving the peer dependency contract.
- f475012: Restore syntax highlighting for HTML source views in both light and dark schemes.
- f475012: Fixed the pretty-print (format) button being silently unavailable in `display: "footer"` mode
  (used by the canvas-theme-editor scaffold and the docs Canvas RCE guide) — it was only ever
  registered for `display: "toolbar"`/`"both"`. Source mode now also auto-formats on entry, and a
  failed `prettier` format surfaces a TinyMCE notification instead of failing silently.
