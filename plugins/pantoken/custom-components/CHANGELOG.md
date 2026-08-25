# @pantoken/plugin-custom-components

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

- 8aa88bb: Publish `./model.json` — a cssdoc `CssDocEntry[]` provider model for the documented `card`/`agent-shell`
  (custom-components) and `wrapper` (layouts) records, built from the unminified generated CSS (the
  published `.css` exports are minified and strip doc comments, so they can't be used as raw-CSS
  providers). Downstream consumers can now wire these packages into their own `cssdoc.json` `providers`
  array, the same way `@pantoken/pantoken/model.json` already works for `@pantoken/components`.

### Patch Changes

- 8aa88bb: Fix cssdoc consumer-side lint incorrectly flagging `@global` utility modifiers (e.g. `--p-lg`,
  `--mt-2xl`, `--mx-none` from the spacing/gap/layout/etc. utilities) as `unknown-modifier` when chained
  onto a component outside `@pantoken/components`' own scope. The utilities are authored in `.ts`, so
  their doc comments only ever existed in the unminified `generated/utilities.css` — which no
  `cssdoc.jsonc` referenced as a `providers` entry. Wired it into the root config and the `layouts`/
  `custom-components` configs alongside the existing `_records.css` entry. Also removed
  `modifierConvention`/`inlineComments` re-declarations in `layouts`/`custom-components` that were
  already inherited from the root config.
- Updated dependencies [8aa88bb]
  - @pantoken/model@0.3.1
  - @pantoken/plugin-kit@0.2.7

## 0.2.6

### Patch Changes

- 343c59d: Migrate the custom card component to nested scoped root selectors so `-variant-container` child styling follows the modern alert-style authoring pattern.

## 0.2.5

### Patch Changes

- @pantoken/plugin-kit@0.2.6

## 0.2.4

### Patch Changes

- @pantoken/plugin-kit@0.2.5

## 0.2.3

### Patch Changes

- @pantoken/plugin-kit@0.2.4

## 0.2.2

### Patch Changes

- @pantoken/plugin-kit@0.2.3

## 0.2.1

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/plugin-kit@0.2.2

## 0.2.0

### Minor Changes

- 853659c: Expose per-item CSS as individual package exports. `@pantoken/plugin-logos` now ships a `<product>.css` sheet per product (canvas, igniteai, instructure, learnplatform, mastery, parchment) and a `<name>.css` sheet per individual logo variant, alongside the existing combined `logos.css`. `@pantoken/plugin-custom-components` now exposes its existing per-component sheets (`card.css`, `agent-shell.css`) as real package exports via a `./*.css` wildcard, matching `@pantoken/components`' pattern.

## 0.1.1

### Patch Changes

- d4ba8fe: Add custom components and layouts plugin packages, wire them into docs CSS API generation and watch tasks, and align lint/tooling config for the new cssdoc-style sources.
- d4ba8fe: Add package README files for the custom-components and layouts plugins.
