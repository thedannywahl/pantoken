# CHANGELOG

## 0.1.9

### Patch Changes

- @pantoken/icons@0.1.7
- @pantoken/rehype@0.1.7

## 0.1.8

### Patch Changes

- @pantoken/icons@0.1.6
- @pantoken/rehype@0.1.6

## 0.1.7

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/icons@0.1.5
  - @pantoken/rehype@0.1.5

## 0.1.6

### Patch Changes

- 2b814bd: Avoid rendering empty image src attributes in Markdown image overrides by skipping img output when src is missing.
  - @pantoken/rehype@0.1.4

## 0.1.5

### Patch Changes

- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/icons@0.1.4
  - @pantoken/rehype@0.1.4

## 0.1.4

### Patch Changes

- 2e5bb88: Update workspace configuration to integrate fast-check property-based testing framework.
  - @pantoken/rehype@0.1.3

## 0.1.3

### Patch Changes

- 424f57a: Internal code-quality baseline: dead-code removal, behavior-preserving refactors of oversized/complex functions, TSDoc coverage on exported symbols, and expanded test coverage to the new 85% floor. No API or behavior changes.
  - @pantoken/icons@0.1.3
  - @pantoken/rehype@0.1.3

## 0.1.2

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/model@0.2.0
  - @pantoken/icons@0.1.2
  - @pantoken/rehype@0.1.2

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/icons@0.1.1
  - @pantoken/model@0.1.1
  - @pantoken/rehype@0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/react-markdown.
