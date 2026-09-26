# @pantoken/scope

## 0.4.0

### Minor Changes

- f475012: Support several pantoken themes and color schemes in one document.

  Theme blocks are now keyed to `data-pantoken-theme` on any element rather than `:root`, so theming is
  a property of a subtree instead of the page. New `@pantoken/css/properties.css` and
  `@pantoken/css/scope.css` split the document-global `@property` registrations from the per-theme
  declarations, and `[data-pantoken-scheme]` forcing blocks let a light subtree sit beside a dark one.

  The new `@pantoken/scope` package resolves the theme, scheme, and color in effect for any element by
  walking its ancestors, and lets an embedded app declare its own scope — with its own persisted state,
  its own frame messages, and an optional hard boundary — so two pantoken instances on a page no longer
  overwrite each other.

### Patch Changes

- Updated dependencies [f475012]
  - @pantoken/utils@1.1.0
