# CHANGELOG

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
