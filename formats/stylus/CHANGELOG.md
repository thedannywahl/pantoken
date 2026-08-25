# CHANGELOG

## 0.1.13

### Patch Changes

- 8aa88bb: Migrate published `dependencies`/`peerDependencies` to `pnpm-workspace.yaml` `catalog:` references. No
  behavior change — the resolved versions are unchanged, but the `package.json` a consumer installs now
  points at the shared catalog entry instead of an inline semver range, so the range is no longer visible
  at a glance without cross-referencing `pnpm-workspace.yaml`.
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

- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/utils@1.0.1
  - @pantoken/model@0.3.1
  - @pantoken/tokens@0.3.0

## 0.1.12

### Patch Changes

- Updated dependencies [aaf4751]
- Updated dependencies [aaf4751]
  - @pantoken/utils@1.0.0
  - @pantoken/tokens@0.2.4

## 0.1.11

### Patch Changes

- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
  - @pantoken/tokens@0.2.4
  - @pantoken/utils@0.5.0

## 0.1.10

### Patch Changes

- Updated dependencies [90ce910]
  - @pantoken/utils@0.4.0
  - @pantoken/tokens@0.2.3

## 0.1.9

### Patch Changes

- Updated dependencies [db834de]
  - @pantoken/utils@0.3.0
  - @pantoken/tokens@0.2.3

## 0.1.8

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/tokens@0.2.3
  - @pantoken/utils@0.2.6

## 0.1.7

### Patch Changes

- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/utils@0.2.5
  - @pantoken/tokens@0.2.2

## 0.1.6

### Patch Changes

- Updated dependencies [0306bf4]
  - @pantoken/utils@0.2.4
  - @pantoken/tokens@0.2.1

## 0.1.5

### Patch Changes

- Updated dependencies [2e5bb88]
  - @pantoken/utils@0.2.3
  - @pantoken/tokens@0.2.1

## 0.1.4

### Patch Changes

- Updated dependencies [424f57a]
  - @pantoken/tokens@0.2.1

## 0.1.3

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/tokens@0.2.0
  - @pantoken/model@0.2.0
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
  - @pantoken/tokens@0.1.1
  - @pantoken/utils@0.2.1

## 0.1.1

### Patch Changes

- Updated dependencies [c8b956d]
  - @pantoken/utils@0.2.0
  - @pantoken/tokens@0.1.0

## 0.1.0

### Added

- Initial release of @pantoken/stylus.
