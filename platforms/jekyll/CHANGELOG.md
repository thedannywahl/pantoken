# CHANGELOG

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
  - @pantoken/scss@0.1.2

## 0.1.2

### Patch Changes

- Updated dependencies [c8b956d]
  - @pantoken/css@0.2.0
  - @pantoken/components@0.2.0
  - @pantoken/scss@0.1.1

## 0.1.1

### Changed

- Updated internal workspace dependencies:
  - @pantoken/components: 0.1.0 -> 0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/jekyll.
