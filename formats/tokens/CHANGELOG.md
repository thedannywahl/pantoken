# CHANGELOG

## 0.3.0

### Minor Changes

- 8aa88bb: Bump `@instructure/instructure-design-tokens` from `v1.5.0` to `v1.8.0`.
  
  - New dedicated `--instui-component-card-*` tokens (border-radius, padding, background, nested-border,
    and breakpoints) replace the legacy `--instui-component-shared-tokens-*card*` variables the custom
    `card` component previously used. `card`'s `lg` breakpoint moves from 684px (42.75rem) to 640px
    (40rem) to match the new dedicated `--instui-component-card-breakpoint-lg` value — a visible sizing
    change at that breakpoint.
  - New `banner` custom component (`@pantoken/plugin-custom-components`), backed by the new
    `--instui-component-banner-*` tokens: `-size-relaxed`/`-size-compact`, `-color-violet`/`-color-sea`,
    and a `-variant-ai` gradient fill, plus an icon swatch and close-button placement.
  - New `--instui-component-tag-lead-element-label` spacing token (not yet consumed by `tag`).
  - New `--instui-color-background-pastel-{violet,sea}` semantic colors (feed the new `banner` tokens).
  - `rebrandLight`'s `interactive.action.secondary.{base,hover,active}` colors were recolored upstream
    (flows through automatically; no code change).
  - Retired two deprecation-ledger shims whose `removeIn` milestone (`design-tokens@v1.6.0`) was reached:
    `--instui-component-truncate-text-line-height` (the `truncate` utility now references its replacement,
    `--instui-line-height-paragraph-base`, directly) and `--instui-component-badge-notification-z-index`
    (the real upstream token has returned with a proper `<integer>` `@property` syntax, so the frozen
    shim is no longer needed).
- 8aa88bb: Retire two deprecation shims that passed their removeIn window:
  
  - --instui-component-truncate-text-line-height
  - --instui-component-badge-notification-z-index
  
  This aligns deprecations with the current upstream contract and unblocks the upstream-drift gate.

### Patch Changes

- 8aa88bb: Migrate published `dependencies`/`peerDependencies` to `pnpm-workspace.yaml` `catalog:` references. No
  behavior change — the resolved versions are unchanged, but the `package.json` a consumer installs now
  points at the shared catalog entry instead of an inline semver range, so the range is no longer visible
  at a glance without cross-referencing `pnpm-workspace.yaml`.
- Updated dependencies [8aa88bb]
  - @pantoken/model@0.3.1

## 0.2.4

### Patch Changes

- e6c0d3b: The token generator no longer fails the build on a syntax mismatch covered by `formats/tokens/known-syntax-issues.json` — it patches the value (to the entry's `rewriteValue`, or the `unset` CSS-wide keyword by default) and warns instead. The ledger self-maintains on every generator run: entries that stop reproducing are dropped, and newly discovered mismatches are appended for review via the committed file's git diff.
- e6c0d3b: `known-syntax-issues.json` entries can now declare `supplemental` tokens to add to the IR alongside a patched value, for upstream bugs that squash two properties into one bad string (e.g. `--instui-component-text-content-quote-font-weight: "Medium Italic"` now also emits `--instui-component-text-content-quote-font-style: italic`). `@pantoken/utils`' token syntax validator also gains a real `font-style` property mapping. The component CSS/utilities and `base.css` that hand-authored a `500`/`italic` literal fallback for the broken token now reference it directly.
- e6c0d3b: Add `syntaxMismatches` to `@pantoken/utils/token-syntax`: validates a resolved token's value against the real CSS grammar for the property its name implies (via `css-tree`'s `mdn-data`-backed lexer), catching upstream data corruption a value-shape sniff alone would miss. It's a separate entry point (not the main `@pantoken/utils` barrel) because `css-tree` isn't Node-free — bundling it into a browser/SSR graph breaks its runtime JSON require. `@pantoken/tokens`' generator now fails the build on a mismatch (e.g. a `font-weight` token holding a non-numeric string) and warns on a token name with no modeled CSS property.

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
