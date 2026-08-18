# CHANGELOG

## 0.2.3

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.

## 0.2.2

### Patch Changes

- Updated dependencies [8391068]
  - @pantoken/model@0.3.0

## 0.2.1

### Patch Changes

- 424f57a: Export internal helpers in the token generate script so they can be unit-tested. No change to the generated token output.

## 0.2.0

### Minor Changes

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

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/model@0.2.0

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/model@0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/tokens.
