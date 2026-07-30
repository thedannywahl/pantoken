# CHANGELOG

## 0.1.2

### Patch Changes

- 8391068: Replace post-hoc `fn.postcss = true` assignment with `Object.assign` + explicit
  type declaration to satisfy `--isolatedDeclarations`. No behaviour change.

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

## 0.1.0

### Added

- Initial release of @pantoken/plugin-prune-custom-props.
