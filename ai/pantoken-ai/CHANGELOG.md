# CHANGELOG

## 0.1.3

### Patch Changes

- 582d4f2: Refresh @pantoken/ai guidance and installer behavior.

  - Update consumer agent assets with current pantoken CLI target coverage and usage guidance.
  - Add explicit runtime validation and help output for `pantoken-ai init --tool` handling.
  - Expand package tests for invalid tool rejection.
  - Document @pantoken/ai in the package guide and add contributor/maintainer checklist language to keep AI assets in sync with user-facing refinements.

## 0.1.2

### Patch Changes

- 0306bf4: Add explicit type annotations required by `isolatedDeclarations`; no API changes.

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

## 0.1.0

### Added

- Initial release of @pantoken/ai.
