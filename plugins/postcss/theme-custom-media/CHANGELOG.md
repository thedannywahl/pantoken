# CHANGELOG

## 0.2.1

### Patch Changes

- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
  - @pantoken/tokens@0.2.4

## 0.2.0

### Minor Changes

- 90ce910: Add breakpoint `@custom-media` aliases: `--breakpoint-{xs,sm,md,lg,xl}-{up,down}` (sourced from
  `@pantoken/tokens`' `--instui-component-tray-width-*` scale, each also aliased to a long-form
  spelling — `x-small`…`x-large` — and a device name — `mobile`/`phablet`/`tablet`/`laptop`/`desktop`),
  plus the unscaled, theme-dependent `--breakpoint-content-{up,down}` and
  `--breakpoint-content-full-width-{up,down}` (the main content area's max-width: 1100px/1580px in
  `rebrand`, 59.25em in `canvas`/`canvasHighContrast`). Adds a new runtime dependency on
  `@pantoken/tokens`.

### Patch Changes

- @pantoken/tokens@0.2.3

## 0.1.5

### Patch Changes

- 8391068: Replace post-hoc `fn.postcss = true` assignment with `Object.assign` + explicit
  type declaration to satisfy `--isolatedDeclarations`. No behaviour change.

## 0.1.4

### Patch Changes

- 424f57a: Internal code-quality baseline: dead-code removal, behavior-preserving refactors of oversized/complex functions, TSDoc coverage on exported symbols, and expanded test coverage to the new 85% floor. No API or behavior changes.

## 0.1.3

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

## 0.1.2

### Changed

- Updated internal workspace dependency versions.

## 0.1.1

### Changed

- Updated internal workspace dependency versions.

## @pantoken/plugin-theme-custom-media

## 0.1.0

- Initial release of @pantoken/plugin-theme-custom-media.
