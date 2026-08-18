# CHANGELOG

## 0.2.3

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/plugin-kit@0.2.2
  - @pantoken/utils@0.2.6

## 0.2.2

### Patch Changes

- f97aeb6: `buildTokens({ includeIcons: false })` now skips the icon-plugin stage instead of running it against token-only plugins.

  This removes noisy "has no \"icons\" hook" warnings in token-only builds and tests while keeping token hooks unchanged.

## 0.2.1

### Patch Changes

- Updated dependencies [2b814bd]
  - @pantoken/plugin-kit@0.2.1

## 0.2.0

### Minor Changes

- 8391068: **Breaking (minor/beta)**: Plugin hook contexts are now data-only to enable Worker thread
  serialisation.

  - `TokenHookContext` drops the `define` helper; plugins import `defineToken` from
    `@pantoken/model` (or `@pantoken/core` for CSS-syntax inference).
  - `IconHookContext` changes from `{ add, resolve }` to `{ icons, theme }` where `icons` is
    a lightweight list of already-registered icon names. The `icons` hook now returns
    `IconEntry[] | void` instead of mutating via `add`.
  - `@pantoken/model` exports a new zero-dependency `defineToken(input): Token` helper.
  - `@pantoken/plugin-kit` exports `SandboxedPluginEntry`, `isSandboxed`, and `runPluginHook`
    for running individual plugin hooks in an isolated Worker thread (`sandbox: 'thread'`)
    or child process with `--permission` flags (`sandbox: 'process'`).
  - All four first-party pantoken plugins migrated to the new context API.
  - `extendPlugin` icons composition now merges returned `IconEntry[]` arrays.

### Patch Changes

- 8391068: Validate plugin hook output at the IR boundary in `runTokenPlugins` and
  `runIconPlugins`. Token names are checked against the CSS custom property
  pattern; invalid names are dropped with a warning. `<image>` tokens from
  plugins have their SVG data-URI sanitized through `sanitizeSvg`. Plugin-
  contributed `IconEntry.svg` values are sanitized before being encoded into
  the IR. Both layers are needed: `@pantoken/icons` sanitizes at decode time
  (vendored IR), this sanitizes at encode time (plugin output).
- Updated dependencies [8391068]
- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/plugin-kit@0.2.0
  - @pantoken/utils@0.2.5

## 0.1.6

### Patch Changes

- Updated dependencies [0306bf4]
  - @pantoken/utils@0.2.4
  - @pantoken/plugin-kit@0.1.5

## 0.1.5

### Patch Changes

- 2e5bb88: Integrate fast-check property-based testing framework to replace jazzer.js fuzzer infrastructure.
- 2e5bb88: Refactor shapeToPathData function to reduce cyclomatic complexity by extracting SVG shape conversion logic into separate helper functions.
- Updated dependencies [2e5bb88]
  - @pantoken/utils@0.2.3
  - @pantoken/plugin-kit@0.1.4

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
