# CHANGELOG

## 0.1.2

### Patch Changes

- 424f57a: Internal code-quality baseline: dead-code removal, behavior-preserving refactors of oversized/complex functions, TSDoc coverage on exported symbols, and expanded test coverage to the new 85% floor. No API or behavior changes.

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

## 0.1.0

### Added

- Initial release of @pantoken/typedoc-plugin-live-example.
