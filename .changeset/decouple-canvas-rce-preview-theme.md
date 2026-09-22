---
"@pantoken/plugin-custom-theme-colors": minor
"@pantoken/scaffold": patch
---

Decouple the `canvas-theme-editor` scaffold's chrome from its preview:

- The docs page's active theme (rebrand/canvas/canvas high contrast) and color now restyle the
  scaffold's own chrome (toolbar, buttons outside the tray) — previously only the color synced, and
  only the tray's active-button highlight, not the chrome itself.
- The tray's theme/color pickers only drive the live preview now. Picking a theme/color in the tray
  no longer touches the docs-driven chrome, and the docs page's theme/color broadcasts no longer
  touch the tray's selection or the preview.
- The tray itself (its buttons and the 13 reference color swatches) always renders true, unremapped
  colors, regardless of which color the chrome currently has active — previously the swatches (and
  the tray's own controls) visually shifted to match whatever color was active site-wide.

`@pantoken/plugin-custom-theme-colors`'s `customThemeColorsCss()` (and the `customThemeColors()`
plugin) gained two options to support this: `selector` scopes the conditional
`[data-pantoken-color="…"]` rules to something other than `:root`, so more than one independently
themed instance can run on the same page; `resetSelector` emits an unconditional block pinning a
subtree back to its true base colors, immune to any ancestor's active color scope.
