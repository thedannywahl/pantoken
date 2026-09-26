# CHANGELOG

## 0.5.0

### Minor Changes

- 626ffc1: Tokens Studio colour modifiers (`alpha` / `lighten` / `darken`) now keep their `var()` origin
  instead of being flattened to a hex. `@pantoken/core` emits the modifier as a CSS expression —
  `color-mix(in srgb, var(--…) 20%, transparent)`, `hsl(from var(--…) h s calc(…))` — and records the
  old flattened literal on the new `Token.flatValue`.

  This fixes derived brand colours that could never follow a custom theme colour. A secondary
  button's hover and active backgrounds (upstream: `lighten`/`darken` over the brand token) resolved
  to literals like `#4d7eb333` that matched no primitive step, so `@pantoken/plugin-custom-theme-colors`
  had nothing to re-point and they stayed navy under every `[data-pantoken-color]` scope — in both
  schemes, and on `.instui-button.-color-secondary` and `.instui-button.-color-secondary.-toggle`
  alike. They now resolve through the primitive the scope already overrides.

  Emitters that need a real colour rather than a CSS expression are unaffected: the shared resolver in
  `@pantoken/utils` (`makeResolver` / `resolveTokens`) prefers `flatValue`, so the native lineage,
  Figma, swatches, and the preprocessor formats keep emitting exactly the same literals as before.

  The `unknownReferences` drift check now accepts `--instui-*` properties declared in the stylesheet
  itself, so plugin-owned custom properties can be referenced without being mistaken for missing IR
  tokens.

## 0.4.0

### Minor Changes

- 23c9ffb: Validate and resolve Tokens Studio alpha, darken, and lighten modifiers into concrete IR colors.
- 23c9ffb: Support Tokens Studio darken and lighten modifiers that use the CIE LCH color space.

## 0.3.2

### Patch Changes

- 7d964ee: Update the `homepage` field to `https://pantoken.app` across all package manifests.

## 0.3.1

### Patch Changes

- 8aa88bb: Migrate published `dependencies`/`peerDependencies` to `pnpm-workspace.yaml` `catalog:` references. No
  behavior change — the resolved versions are unchanged, but the `package.json` a consumer installs now
  points at the shared catalog entry instead of an inline semver range, so the range is no longer visible
  at a glance without cross-referencing `pnpm-workspace.yaml`.

## 0.3.0

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

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

## 0.1.0

### Added

- Initial release of @pantoken/model.
