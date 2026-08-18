# CHANGELOG

## 0.3.7

### Patch Changes

- Updated dependencies [db834de]
  - @pantoken/components@0.6.0
  - @pantoken/css@0.3.3
  - @pantoken/tokens@0.2.3

## 0.3.6

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/components@0.5.1
  - @pantoken/css@0.3.2
  - @pantoken/plugin-props-minify@0.1.2
  - @pantoken/tokens@0.2.3

## 0.3.5

### Patch Changes

- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
  - @pantoken/components@0.5.0

## 0.3.4

### Patch Changes

- Updated dependencies [d4ba8fe]
  - @pantoken/components@0.4.1

## 0.3.3

### Patch Changes

- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
  - @pantoken/components@0.4.0
  - @pantoken/css@0.3.1

## 0.3.2

### Patch Changes

- Updated dependencies [231680f]
  - @pantoken/css@0.3.0

## 0.3.1

### Patch Changes

- Updated dependencies [7879f6b]
  - @pantoken/components@0.3.0

## 0.3.0

### Minor Changes

- 658021f: `buildPendoCss` gains two new options: `flatten` (converts `@property` at-rules to plain declarations, injected into `:scope`) and `mangle` (renames `--instui-*` to minimal base-26 identifiers). Both accept `boolean` for defaults or a full options object for fine-grained control. The static `global.css` now ships with both transforms applied, reducing its size from ~74 KB to ~59 KB before `@tsdown/css` minification.

### Patch Changes

- Updated dependencies [658021f]
- Updated dependencies [658021f]
- Updated dependencies [658021f]
  - @pantoken/components@0.2.9
  - @pantoken/css@0.2.8
  - @pantoken/plugin-props-minify@0.1.1

## 0.2.0

### Minor Changes

- f97aeb6: **`@pantoken/plugin-logos`** — adds a `current-color` color mode. Six new source SVGs (one per brand: canvas, igniteai, instructure ×2, learnplatform, mastery, parchment) use `currentColor` so the logo adapts to the surrounding text color via CSS. The generate script now recognises `current-color` as a valid mode; new tokens follow the `--instui-logo-<product>-<layout>-current-color` naming convention.

  **`@pantoken/pendo`** — CSS architecture cleanup and token aliases:

  - File structure renamed: `manual.css` → `vars.css`, `view.css` → `chrome.css`; `video.css`, `img.css`, and `mask.css` merged into `chrome.css`. The `"icons"` cascade layer is removed; `"vars"` and `"chrome"` replace `"manual"`, `"view"`, `"mask"`, and `"img"` in `LAYER_ORDER`.
  - New `--pendo-*` aliases in `vars.css`: `--pendo-space-0`, `--pendo-alert-indent`, `--pendo-embedded-width`, `--pendo-overlay-width`, `--pendo-input-border-style` (workaround for missing upstream border-style token). All 38 `--instui-component-shared-tokens-spacing-general-space-none` references replaced with `--pendo-space-0`.
  - Focus-outline delegation extended: `select._pendo-multi-choice-poll-select`, `._pendo-open-text-poll-input`, and `input.pendo-radio` added to `FOCUSABLES`; verbose 5-declaration `:focus` outline blocks removed from `select.css`, `textarea.css`, and `radio-group.css`; only component-specific `background`/`border-color` resets and radio sibling suppression remain.
  - Radio-group token overrides resolved: `width`/`height` corrected from `--instui-component-shared-tokens-spacing-general-space-lg` to `--instui-component-radio-input-control-size-sm`; checked-inset `/ 2` compensation removed; `@TODO` comments cleared.
  - `@layer` order declaration moved inside `@scope` (was previously hoisted outside by `addScope`, making it dead code); `addScope` now only hoists `@property` at-rules.

  **`@pantoken/components`** — adds `/* fallow-ignore-next-line css-duplicate-block */` comments to structurally required duplicate declaration blocks: the visually-hidden clip pattern in `alert.css`, `form-field-messages.css`, and `screen-reader-content.css`; vendor pseudo-element pairs in `range-input.css`.

### Patch Changes

- Updated dependencies [f97aeb6]
- Updated dependencies [f97aeb6]
  - @pantoken/plugin-prune-custom-props@0.1.4
  - @pantoken/components@0.2.8
  - @pantoken/tokens@0.2.2

## 0.1.10

### Patch Changes

- Updated dependencies [2f21a66]
  - @pantoken/plugin-prune-custom-props@0.1.3

## 0.1.9

### Patch Changes

- Updated dependencies [2b814bd]
  - @pantoken/css@0.2.7
  - @pantoken/components@0.2.7
  - @pantoken/tokens@0.2.2

## 0.1.8

### Patch Changes

- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/plugin-prune-custom-props@0.1.2
  - @pantoken/css@0.2.6
  - @pantoken/tokens@0.2.2
  - @pantoken/components@0.2.6

## 0.1.7

### Patch Changes

- Updated dependencies [0306bf4]
  - @pantoken/components@0.2.5
  - @pantoken/css@0.2.5
  - @pantoken/tokens@0.2.1

## 0.1.6

### Patch Changes

- @pantoken/tokens@0.2.1
- @pantoken/components@0.2.4
- @pantoken/css@0.2.4

## 0.1.5

### Patch Changes

- 424f57a: Internal code-quality baseline: dead-code removal, behavior-preserving refactors of oversized/complex functions, TSDoc coverage on exported symbols, and expanded test coverage to the new 85% floor. No API or behavior changes.
- Updated dependencies [424f57a]
- Updated dependencies [424f57a]
  - @pantoken/components@0.2.3
  - @pantoken/tokens@0.2.1
  - @pantoken/css@0.2.3

## 0.1.4

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/tokens@0.2.0
  - @pantoken/model@0.2.0
  - @pantoken/components@0.2.2
  - @pantoken/css@0.2.2

## 0.1.3

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/components@0.2.1
  - @pantoken/css@0.2.1
  - @pantoken/model@0.1.1
  - @pantoken/plugin-prune-custom-props@0.1.1
  - @pantoken/tokens@0.1.1

## 0.1.2

### Patch Changes

- Updated dependencies [c8b956d]
  - @pantoken/css@0.2.0
  - @pantoken/components@0.2.0
  - @pantoken/tokens@0.1.0

## 0.1.1

### Changed

- Updated internal workspace dependencies:
  - @pantoken/components: 0.1.0 -> 0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/pendo.
