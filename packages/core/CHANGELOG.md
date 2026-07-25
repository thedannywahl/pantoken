# CHANGELOG

## 0.1.4

### Patch Changes

- 424f57a: Internal code-quality baseline: dead-code removal, behavior-preserving refactors of oversized/complex functions, TSDoc coverage on exported symbols, and expanded test coverage to the new 85% floor. No API or behavior changes.

## 0.1.3

### Patch Changes

- e099a51: Upgrade to Instructure UI 11.7.4 and design tokens v1.5.0, and add a reusable upgrade pipeline.

  - **`@pantoken/tokens`** re-vendors from `@instructure/instructure-design-tokens` v1.5.0 (now pinned to
    a release tag) and `@instructure/ui-icons` 11.7.4 — 52 new icons, a renamed icon, a new
    `badge-primary-text-color` token, and a smaller `badge-size`. Adds a `./meta` export exposing the
    vendored provenance (the design-tokens ref + commit and the ui-icons version), and reshapes the
    `./raw` provenance to match. Bakes in token deprecation shims so dropped upstream tokens keep
    resolving.
  - **`@pantoken/plugin-deprecations`** (new) emits lifecycle-aware compatibility shims for dropped
    upstream tokens from a hand-authored ledger — either a `var()` forward or a frozen last-known value —
    tracking when each was deprecated and the upstream minor that will remove it.
  - **`@pantoken/model`** adds the `DeprecationEntry` / `DeprecationLedger` types and a `deprecated`
    field on `TokenMeta`.
  - **`@pantoken/core`** tolerates lucide-react's `.js` → `.mjs` ESM layout so an `@instructure/ui-icons`
    bump can't break icon ingestion.

  Deprecated this release (kept as working shims until design-tokens v1.6.0 is adopted):
  `--instui-component-truncate-text-line-height` (forwards to `--instui-line-height-paragraph-base`; the
  upstream Truncate v2 no longer sets line-height) and `--instui-component-badge-notification-z-index`
  (frozen to `1`; dropped upstream with no replacement).

- Updated dependencies [e099a51]
  - @pantoken/model@0.2.0
  - @pantoken/plugin-kit@0.1.3
  - @pantoken/utils@0.2.2

## 0.1.2

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/model@0.1.1
  - @pantoken/plugin-kit@0.1.2
  - @pantoken/utils@0.2.1

## 0.1.1

### Patch Changes

- Updated dependencies [c8b956d]
  - @pantoken/utils@0.2.0
  - @pantoken/plugin-kit@0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/core.
