---
"@pantoken/plugin-custom-theme-colors": patch
"@pantoken/tinymce": patch
"@pantoken/scaffold": patch
---

Fix several issues in the `canvas-theme-editor` scaffold's live preview tool:

- Navy and blue color schemes rendered fully transparent — `customThemeColorsCss()` emitted a
  self-referencing (circular, guaranteed-invalid) custom property when a color remapped to its own
  primitive scale.
- The tray's Config/CSS/JS tabs didn't work in the built docs site — `@pantoken/interactions`'s
  IIFE was loaded via a fire-and-forget dynamic `import()`, which a production bundler can
  tree-shake away from a `"sideEffects": false` package. It's now loaded via a real `<script>` tag.
- The scaffold's source-view (code) toggle was a second, drifted reimplementation of
  `@pantoken/tinymce`'s `createSourceTogglePlugin` — now newly exported from `@pantoken/tinymce`
  and reused directly instead of being duplicated.
- The editor and preview panes had fixed heights, so TinyMCE's resize handle could only shrink the
  editor, and preview content overflowed into an internally-scrolling iframe. The editor pane now
  uses `min-height`, and the preview iframe grows to match its content's measured height with no
  scrollbar.
- Added a large/medium/small preview-width toggle (100% / `--instui-breakpoints-lg` /
  `--instui-breakpoints-md`) above the preview pane.
- Added missing standard toolbar buttons/plugins: bold, italic, underline, undo, redo, bullet/
  numbered lists, and link.
