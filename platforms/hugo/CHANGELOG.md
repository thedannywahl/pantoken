# CHANGELOG

## 0.1.19

### Patch Changes

- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
  - @pantoken/components@0.7.0
  - @pantoken/css@0.3.4
  - @pantoken/scss@0.1.10

## 0.1.18

### Patch Changes

- Updated dependencies [db834de]
  - @pantoken/components@0.6.0
  - @pantoken/css@0.3.3
  - @pantoken/scss@0.1.9

## 0.1.17

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/components@0.5.1
  - @pantoken/css@0.3.2
  - @pantoken/scss@0.1.8

## 0.1.16

### Patch Changes

- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
  - @pantoken/components@0.5.0

## 0.1.15

### Patch Changes

- Updated dependencies [d4ba8fe]
  - @pantoken/components@0.4.1

## 0.1.14

### Patch Changes

- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
  - @pantoken/components@0.4.0
  - @pantoken/css@0.3.1

## 0.1.13

### Patch Changes

- Updated dependencies [231680f]
  - @pantoken/css@0.3.0

## 0.1.12

### Patch Changes

- Updated dependencies [7879f6b]
  - @pantoken/components@0.3.0

## 0.1.11

### Patch Changes

- Updated dependencies [658021f]
- Updated dependencies [658021f]
  - @pantoken/components@0.2.9
  - @pantoken/css@0.2.8

## 0.1.10

### Patch Changes

- Updated dependencies [f97aeb6]
  - @pantoken/components@0.2.8

## 0.1.9

### Patch Changes

- Updated dependencies [2b814bd]
  - @pantoken/css@0.2.7
  - @pantoken/components@0.2.7

## 0.1.8

### Patch Changes

- @pantoken/css@0.2.6
- @pantoken/scss@0.1.7
- @pantoken/components@0.2.6

## 0.1.7

### Patch Changes

- Updated dependencies [0306bf4]
  - @pantoken/components@0.2.5
  - @pantoken/css@0.2.5
  - @pantoken/scss@0.1.6

## 0.1.6

### Patch Changes

- @pantoken/components@0.2.4
- @pantoken/css@0.2.4
- @pantoken/scss@0.1.5

## 0.1.5

### Patch Changes

- Updated dependencies [424f57a]
  - @pantoken/components@0.2.3
  - @pantoken/css@0.2.3
  - @pantoken/scss@0.1.4

## 0.1.4

### Patch Changes

- @pantoken/components@0.2.2
- @pantoken/css@0.2.2
- @pantoken/scss@0.1.3

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

- Initial release of @pantoken/hugo.
