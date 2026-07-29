# CHANGELOG

## 0.1.3

### Patch Changes

- 2e5bb88: Fix CI failures and resolve CodeQL security findings: add missing @eslint/css dependency; fix file-system-race (TOCTOU) in typedoc-plugin-demo (atomic writes, no existsSync guard), typedoc-plugin-live-example (Dirent-based readdir), and upstream-diff (try/catch instead of existsSync); fix polynomial-redos in utils, drupal, dtcg, figma, core, and react-markdown; fix prototype pollution in dtcg; add top-level permissions: read-all to release and copilot-setup-steps workflows; mark test files as fallow entry points.
- 2e5bb88: Update workspace configuration to integrate fast-check property-based testing framework.

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

- Initial release of @pantoken/typedoc-plugin-demo.
