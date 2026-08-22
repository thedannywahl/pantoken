# CHANGELOG

## 1.0.0

### Major Changes

- aaf4751: Global utility modifiers (background/text/border color, border-radius, border-width, box-shadow, font-weight, font-family, line-height, opacity, display, text-align, position, overflow, cursor, stacking, mask, truncate, margin/padding/gap spacing) are now spelled with a **double dash** (`--bg-secondary`, `--mt-xl`, `--display-flex`, ...) instead of a single dash (`-bg-secondary`). This is a breaking rename: the old single-dash global-modifier classes no longer exist.

  Why: a single-dash global modifier could collide in name with — and lose the cascade to — a component's own single-dash modifier, entirely dependent on unpredictable CSS import order (`cssdoc.jsonc`'s `globalPrecedence` only ever affected generated documentation, never real browser cascade). The `--` namespace never collides, and now wins deterministically via the modifier class repeated 3x, giving it (0,3,0) specificity — a guaranteed edge over any 2-class component-modifier compound, regardless of source order.

  This also means every global modifier now works on **any** registered component automatically — core (`@pantoken/components`) or plugin-authored (e.g. `@pantoken/plugin-custom-components`'s `card`/`agent-shell`) — with no per-package enumeration and no author effort, and `spacing` gained the same chainable behavior other utilities already had (previously bare-only, to avoid a real ~3s/940KB generation-time regression from enumerating every core component per rule — the new mechanism has a fixed selector size per rule regardless of component count).

  `@pantoken/utils`'s `colorUtilitiesCss`/`tokenUtilitiesCss` dropped the `chainTargets` option (superseded by the new `globalModifierSelector` mechanism, exported from `@pantoken/utils`). `@pantoken/plugin-primitives`'s font-family/font-weight utility classes (built on `tokenUtilitiesCss`) are renamed the same way; its color (`bg`/`fg`/`border`) classes are unaffected (authored separately, not through the shared helper).

### Minor Changes

- aaf4751: `colorUtilitiesCss` now emits `.--color-<name>` as an alias of `.--text-<name>` (same declaration, either class name works). `@pantoken/components`'s semantic text-color utilities (`--text-danger`, `--text-secondary`, ...) gain the matching `--color-*` class for free.

## 0.5.0

### Minor Changes

- e6c0d3b: `known-syntax-issues.json` entries can now declare `supplemental` tokens to add to the IR alongside a patched value, for upstream bugs that squash two properties into one bad string (e.g. `--instui-component-text-content-quote-font-weight: "Medium Italic"` now also emits `--instui-component-text-content-quote-font-style: italic`). `@pantoken/utils`' token syntax validator also gains a real `font-style` property mapping. The component CSS/utilities and `base.css` that hand-authored a `500`/`italic` literal fallback for the broken token now reference it directly.
- e6c0d3b: Add `syntaxMismatches` to `@pantoken/utils/token-syntax`: validates a resolved token's value against the real CSS grammar for the property its name implies (via `css-tree`'s `mdn-data`-backed lexer), catching upstream data corruption a value-shape sniff alone would miss. It's a separate entry point (not the main `@pantoken/utils` barrel) because `css-tree` isn't Node-free — bundling it into a browser/SSR graph breaks its runtime JSON require. `@pantoken/tokens`' generator now fails the build on a mismatch (e.g. a `font-weight` token holding a non-numeric string) and warns on a token name with no modeled CSS property.

## 0.4.0

### Minor Changes

- 90ce910: Make `view`'s and `text`'s key-value modifiers (background, border, shadow, display, position,
  overflow, cursor, colour, weight, size) available globally, without requiring the `.instui-view`/
  `.instui-text` base class:

  - Every one of these modifiers now also works as a bare, standalone class (`instui-bg-secondary`) and
    as a component-attached alias on any other component (`.instui-button.-bg-danger`) — the same dual
    pattern `spacing`/`gap` already used, generalized via a new shared `GLOBAL_ALIAS_TARGETS`/
    `globalSelectors()` helper.
  - Reuses existing global class words (`bg`, `text`, `border`, `border-radius`, `border-width`,
    `box-shadow`, `display`, `text-align`, `font-weight`) rather than inventing parallel vocabulary; only
    genuinely new concepts get a new utility (`position`, `overflow`, `cursor`, a new `font-size`
    utility, and a global `mask`/`mask-fullscreen`/`mask-blur` copy of the `mask` component's modifiers).
  - `view` and `mask` moved from `utilities/` to `components/` (still exported as `viewCss`/`maskCss`
    from the package root — their own chained modifiers are unchanged) so they can participate in the
    same component-list the dual selectors chain onto.
  - `@pantoken/utils`'s `colorUtilitiesCss`/`tokenUtilitiesCss` gained an optional `chainTargets` option
    for the dual-selector behavior, and `colorUtilitiesCss` now accepts explicit `[name, value]` pairs
    (not just prefix-relative names) so a component's own token family can feed the same class word.
    Also fixes a doc/code mismatch: the text-colour utility's class is now `.instui-text-<name>` (as its
    own doc comment always claimed), not `.instui-fg-<name>`.
  - `cssdoc.jsonc` pins `globalPrecedence: "base"` explicitly, so a component's own modifier always wins
    over a same-named global-utility copy.
  - `responsive`'s viewport/container show-hide classes stay bare-only (not dual-chained) — their
    breakpoint × infix × alias-name surface is already large enough that adding ~70 more chained
    selectors per rule makes the shared alias post-processors unusably slow.

## 0.3.0

### Minor Changes

- db834de: `@pantoken/components`: added a `gap` utility (`.instui-gap-<step>`, component-attached like margin/padding) and a fully long, word-spelled spelling for every margin/padding/gap class (`-margin-bottom-small` alongside `-mb-sm`), both component-attached (including `view`). Every component and the `view` utility now document wildcard `@modifier -m*`/`-p*`/`-gap*` families so consumer-side cssdoc lint (`@cssdoc/eslint-plugin`'s `valid-class-usage`) doesn't flag a chained spacing/gap modifier as unknown.

  `@pantoken/utils`: exported the shared spacing scale (`SPACING_STEPS`, `SPACING_AUTO_STEP`) so `@pantoken/components` and `@pantoken/interactions` share one source instead of two hand-maintained copies.

  `@pantoken/interactions`: `resolveSpace`'s keyword table is now built from the shared scale (no behavior change).

## 0.2.6

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.

## 0.2.5

### Patch Changes

- 8391068: Add `sanitizeSvg` to `@pantoken/utils`: a zero-dependency regex-based helper
  that strips `<script>` elements and `on*` event-handler attributes from SVG
  markup. Applied at decode time in `@pantoken/icons` so every icon in the
  `icons` array and `iconsByName` map has script injection removed before
  exposure to consumers. Defense-in-depth for the vendored IR; does not change
  clean SVG content.
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0

## 0.2.4

### Patch Changes

- 0306bf4: Add explicit type annotations required by `isolatedDeclarations`; no API changes.

## 0.2.3

### Patch Changes

- 2e5bb88: Update workspace configuration to integrate fast-check property-based testing framework.

## 0.2.2

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/model@0.2.0

## 0.2.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/model@0.1.1

## 0.2.0

### Minor Changes

- c8b956d: # CDN distribution: lean token sheet, component-icons, and web-component drop-ins

  Publish the files the CDN combine URLs (and the docs picker) point at:

  - **`@pantoken/css`** — new `style.lean.css` export: the full sheet minus the
    `--instui-icon-*` glyph set (~22.5 KB gzip vs ~140 KB), the recommended CDN
    foundation. Both sheets now carry the elevation + focus-outline custom
    properties. Adds a runtime dependency on `@pantoken/utils`.
  - **`@pantoken/components`** — new `component-icons.css` export (the ~11 icons the
    component sheets reference), so a per-component CDN load resolves its icons
    against the lean sheet. The elevation + focus-outline custom properties are no
    longer defined in `components.css`/`base.css` — they now ship in the token
    sheet, so load a token sheet alongside the component CSS (already required for
    all other tokens). Adds a runtime dependency on `@pantoken/utils`.
  - **`@pantoken/web-components`** — `register(target, { only })` registers a subset
    of elements (nested dependencies pulled in automatically); new
    `dist/web-components.iife.js` `<script>` drop-in. The `foundationCss` export and
    its auto-injected `<style>` are removed — the required token sheet now carries
    those custom properties.
  - **`@pantoken/utils`** — now owns the elevation + focus-outline declaration
    builders (`elevationDeclarations`, `focusOutlineDeclarations`, `focusOutlineRules`,
    `ELEVATION_NAMES`, `FOCUSABLE_SELECTOR`) so the token sheet can emit them.

## 0.1.0

### Added

- Initial release of @pantoken/utils.
