# @pantoken/plugin-custom-theme-colors

## 0.3.0

### Minor Changes

- f475012: Add a `custom` color scale derived from any brand hex. `deriveCustomColorScale()` puts the input on
  the step with the nearest perceptual lightness, using the mean OKLCH curve of the 13 shipped families
  from white (0) to black (210). It snaps the input to that step's lightness, then fills in every
  other step with the input's hue. `customColorCss()` and the new `custom` option emit a
  `[data-pantoken-color="custom"]` rule. The Canvas theme editor adds a Custom swatch with a hex field
  and includes the rule in the preview, presets, and the
  downloaded `theme.css`.

  The editor's header color menu also offers Custom. A new dependency-free
  `@pantoken/plugin-custom-theme-colors/scale` entry, plus `customColorReferenceCurve()` and
  `customColorRemapCss()`, lets a browser derive the scale without the token set. Demo frames from
  `@pantoken/demo` apply a posted `customScale` (20 `#rrggbb` values) to the `custom` color.

- f475012: Decouple the `canvas-theme-editor` scaffold's chrome from its preview:

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

- f475012: Recolor secondary action and brand button colors with the selected theme color. Upstream flattens
  some tokens to literal hex with a baked alpha, so the primitive remap alone never reached them and
  secondary buttons — most visibly `-toggle` buttons in their pressed state — stayed navy-blue under
  every palette. Those literals are now traced back to the brand primitive they came from and
  relinked to the selected scale via `color-mix()`, on both sides of `light-dark()` values.

  Elevation shadow colors are excluded for now, pending a design decision on whether shadows should
  be brand-tinted.

### Patch Changes

- f475012: Add an element-scoped custom theme color stylesheet and make Canvas Theme Editor pages keep their selected `data-pantoken-color` on an editable outer content wrapper.
- f475012: Fix several issues in the `canvas-theme-editor` scaffold's live preview tool:

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

- f475012: Keep the custom color scale's internal hex conversion private and generate the docs reference curve before typechecking clean checkouts.
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
  - @pantoken/tokens@0.6.0
  - @pantoken/plugin-kit@0.3.2

## 0.2.2

### Patch Changes

- 23c9ffb: Update Alert floating and inline treatments, including automatic action button styling. Preserve
  semantic status colors when applying custom theme colors.
- Updated dependencies [23c9ffb]
- Updated dependencies [23c9ffb]
- Updated dependencies [23c9ffb]
  - @pantoken/model@0.4.0
  - @pantoken/tokens@0.5.0
  - @pantoken/plugin-kit@0.3.1

## 0.2.1

### Patch Changes

- Updated dependencies [1bbe6c6]
  - @pantoken/tokens@0.4.0

## 0.2.0

### Minor Changes

- c22ba83: Remove the duplicate `ash` color namespace from custom theme color generation and the docs color picker. Refresh the docs/demo theme assets and VitePress integration. The avatar `-color-ash` modifier remains functional but is now deprecated in favor of `-color-grey`.
