# CHANGELOG

## 1.0.0

### Major Changes

- aaf4751: Global utility modifiers (background/text/border color, border-radius, border-width, box-shadow, font-weight, font-family, line-height, opacity, display, text-align, position, overflow, cursor, stacking, mask, truncate, margin/padding/gap spacing) are now spelled with a **double dash** (`--bg-secondary`, `--mt-xl`, `--display-flex`, ...) instead of a single dash (`-bg-secondary`). This is a breaking rename: the old single-dash global-modifier classes no longer exist.

  Why: a single-dash global modifier could collide in name with — and lose the cascade to — a component's own single-dash modifier, entirely dependent on unpredictable CSS import order (`cssdoc.jsonc`'s `globalPrecedence` only ever affected generated documentation, never real browser cascade). The `--` namespace never collides, and now wins deterministically via the modifier class repeated 3x, giving it (0,3,0) specificity — a guaranteed edge over any 2-class component-modifier compound, regardless of source order.

  This also means every global modifier now works on **any** registered component automatically — core (`@pantoken/components`) or plugin-authored (e.g. `@pantoken/plugin-custom-components`'s `card`/`agent-shell`) — with no per-package enumeration and no author effort, and `spacing` gained the same chainable behavior other utilities already had (previously bare-only, to avoid a real ~3s/940KB generation-time regression from enumerating every core component per rule — the new mechanism has a fixed selector size per rule regardless of component count).

  `@pantoken/utils`'s `colorUtilitiesCss`/`tokenUtilitiesCss` dropped the `chainTargets` option (superseded by the new `globalModifierSelector` mechanism, exported from `@pantoken/utils`). `@pantoken/plugin-primitives`'s font-family/font-weight utility classes (built on `tokenUtilitiesCss`) are renamed the same way; its color (`bg`/`fg`/`border`) classes are unaffected (authored separately, not through the shared helper).

### Patch Changes

- Updated dependencies [aaf4751]
- Updated dependencies [aaf4751]
  - @pantoken/utils@1.0.0

## 0.1.11

### Patch Changes

- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
  - @pantoken/utils@0.5.0

## 0.1.10

### Patch Changes

- Updated dependencies [90ce910]
  - @pantoken/utils@0.4.0

## 0.1.9

### Patch Changes

- Updated dependencies [db834de]
  - @pantoken/utils@0.3.0

## 0.1.8

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/utils@0.2.6

## 0.1.7

### Patch Changes

- Updated dependencies [8391068]
  - @pantoken/utils@0.2.5

## 0.1.6

### Patch Changes

- Updated dependencies [0306bf4]
  - @pantoken/utils@0.2.4

## 0.1.5

### Patch Changes

- Updated dependencies [2e5bb88]
  - @pantoken/utils@0.2.3

## 0.1.4

### Patch Changes

- @pantoken/utils@0.2.2

## 0.1.3

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/utils@0.2.1

## 0.1.2

### Patch Changes

- Updated dependencies [c8b956d]
  - @pantoken/utils@0.2.0

## 0.1.1

### Changed

- Updated internal workspace dependency versions.

## 0.1.0

### Added

- Initial release of @pantoken/plugin-primitives.
