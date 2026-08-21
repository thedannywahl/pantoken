# CHANGELOG

## 0.1.14

### Patch Changes

- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
  - @pantoken/tokens@0.2.4
  - @pantoken/core@0.2.6

## 0.1.13

### Patch Changes

- @pantoken/core@0.2.5
- @pantoken/tokens@0.2.3

## 0.1.12

### Patch Changes

- @pantoken/core@0.2.4
- @pantoken/tokens@0.2.3

## 0.1.11

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/core@0.2.3
  - @pantoken/tokens@0.2.3

## 0.1.10

### Patch Changes

- f97aeb6: Ensure this branch has explicit changeset coverage for every touched package.

  No API changes are introduced for these packages in this commit; this records branch-level package touch coverage per release policy.

- Updated dependencies [f97aeb6]
  - @pantoken/core@0.2.2
  - @pantoken/tokens@0.2.2

## 0.1.9

### Patch Changes

- 2f21a66: Refactor internal functions to reduce cognitive complexity. `svgToGlyphPath` extracts the ClipperLib stroke-offset loop into `strokeSubpathsToFilled`; `OnceExit` extracts the transitive-dependency fixpoint into `expandTransitiveDeps`; the demo runner extracts `handleObservedBodyResize`, `shouldLatchUserResize`, `settleResizeState`, and `handlerForMessage` from their inline call sites.

## 0.1.8

### Patch Changes

- @pantoken/core@0.2.1
- @pantoken/tokens@0.2.2

## 0.1.7

### Patch Changes

- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/core@0.2.0
  - @pantoken/tokens@0.2.2

## 0.1.6

### Patch Changes

- @pantoken/core@0.1.6
- @pantoken/tokens@0.2.1

## 0.1.5

### Patch Changes

- Updated dependencies [2e5bb88]
- Updated dependencies [2e5bb88]
  - @pantoken/core@0.1.5
  - @pantoken/tokens@0.2.1

## 0.1.4

### Patch Changes

- 424f57a: Normalize SVG arcs (`unarc`) before outlining stroked glyphs, so paths with packed arc flags no longer break the outline step and the icon font builds correctly end to end.
- Updated dependencies [424f57a]
- Updated dependencies [424f57a]
  - @pantoken/core@0.1.4
  - @pantoken/tokens@0.2.1

## 0.1.3

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/tokens@0.2.0
  - @pantoken/model@0.2.0
  - @pantoken/core@0.1.3

## 0.1.2

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/core@0.1.2
  - @pantoken/model@0.1.1
  - @pantoken/tokens@0.1.1

## 0.1.1

### Patch Changes

- @pantoken/core@0.1.1
- @pantoken/tokens@0.1.0

## 0.1.0

### Added

- Initial release of @pantoken/icon-font.
