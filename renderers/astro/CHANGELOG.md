# CHANGELOG

## 0.1.16

### Patch Changes

- @pantoken/css@0.3.6
- @pantoken/tokens@0.2.4

## 0.1.15

### Patch Changes

- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
  - @pantoken/tokens@0.2.4
  - @pantoken/css@0.3.5

## 0.1.14

### Patch Changes

- @pantoken/css@0.3.4
- @pantoken/tokens@0.2.3

## 0.1.13

### Patch Changes

- @pantoken/css@0.3.3
- @pantoken/tokens@0.2.3

## 0.1.12

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/css@0.3.2
  - @pantoken/tokens@0.2.3

## 0.1.11

### Patch Changes

- Updated dependencies [47f3275]
  - @pantoken/css@0.3.1

## 0.1.10

### Patch Changes

- Updated dependencies [231680f]
  - @pantoken/css@0.3.0

## 0.1.9

### Patch Changes

- Updated dependencies [658021f]
  - @pantoken/css@0.2.8

## 0.1.8

### Patch Changes

- Updated dependencies [2b814bd]
  - @pantoken/css@0.2.7
  - @pantoken/tokens@0.2.2

## 0.1.7

### Patch Changes

- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/css@0.2.6
  - @pantoken/tokens@0.2.2

## 0.1.6

### Patch Changes

- @pantoken/css@0.2.5
- @pantoken/tokens@0.2.1

## 0.1.5

### Patch Changes

- @pantoken/tokens@0.2.1
- @pantoken/css@0.2.4

## 0.1.4

### Patch Changes

- 424f57a: Internal code-quality baseline: dead-code removal, behavior-preserving refactors of oversized/complex functions, TSDoc coverage on exported symbols, and expanded test coverage to the new 85% floor. No API or behavior changes.
- Updated dependencies [424f57a]
  - @pantoken/tokens@0.2.1
  - @pantoken/css@0.2.3

## 0.1.3

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/tokens@0.2.0
  - @pantoken/model@0.2.0
  - @pantoken/css@0.2.2

## 0.1.2

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/css@0.2.1
  - @pantoken/model@0.1.1
  - @pantoken/tokens@0.1.1

## 0.1.1

### Patch Changes

- Updated dependencies [c8b956d]
  - @pantoken/css@0.2.0
  - @pantoken/tokens@0.1.0

## 0.1.0

### Added

- Initial release of @pantoken/astro.
