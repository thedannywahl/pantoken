# @pantoken/tinymce-a11y

## 0.2.0

### Minor Changes

- f475012: Add a standalone TinyMCE accessibility checker with configurable DOM rules and a native results dialog.
- f475012: Upgrade the peer dependency and catalog pin from TinyMCE 5 to TinyMCE 8. Self-hosted consumers must now set a `license_key` option (`"gpl"` for the open-source license, or a commercial key) when calling `tinymce.init()`.

### Patch Changes

- f475012: Several canvas theme editor and TinyMCE dark-mode/UX fixes:

  - The standalone shell's "System" appearance now applies immediately on load instead of only after picking another option and switching back — a dark OS no longer starts the app in light mode.
  - The Color menu marks "Navy" as selected by default, matching the app's actual starting color.
  - The brand mark is now a link to pantoken.app (opens in a new tab), styled as a primary icon button so its glyph contrasts correctly in both light and dark mode.
  - The desktop preview width no longer renders narrower than the tablet preset in side-by-side layout.
  - The Theme and Language menus close when you click outside them or press Escape.
  - In stacked layout, the editor pane is no longer capped below its resized height — TinyMCE's own resize handle can grow it freely, matching side-by-side layout.
  - Fixed a TinyMCE dialog bug where the primary button rendered white text on a white background in dark mode.
  - The icons picker's selected tile now shows a persistent indicator that doesn't disappear when you stop hovering it.
  - Inserted icon glyphs are now selectable in the editor, with a context toolbar to change their color or size, or delete them.
  - Fixed the accessibility checker's statusbar icon staying black in dark mode instead of matching the other icons.

- f475012: Fix the contrast checker missing real issues: it no longer requires an explicit
  `background-color` on the exact element being checked (most content inherits its background from an
  ancestor instead), no longer excludes icon-font spans with empty/placeholder text content (e.g. a
  zero-width space used for caret placement), and no longer always reports failure for hex colors due
  to a hex-channel parsing bug. Also adds an opt-in `colorSchemes`/`setColorScheme`/`getColorScheme`
  config hook so a host app can check contrast under both light and dark rendering; `A11yIssue.detail`
  now carries per-instance context (e.g. which scheme failed).
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
