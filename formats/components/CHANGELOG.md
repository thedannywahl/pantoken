# CHANGELOG

## 0.4.0

### Minor Changes

- 47f3275: abstract component interactions into shared package
- 47f3275: Add component-attached spacing helper aliases so utilities like `.instui-mb-sm` can also be used as `-mb-sm` modifiers on any InstUI component class.

  Also add the `none` spacing step alias that maps to the shared `space-none` token (same value as `0`).

### Patch Changes

- 47f3275: Document the wildcard `-icon-*` modifier on the icon utility so cssdoc and IDE checkers can reference it properly.
- 47f3275: add toggle example to checkbox documentation

## 0.3.0

### Minor Changes

- 7879f6b: support exporting individual icons

## 0.2.9

### Patch Changes

- 658021f: Generated stylesheets (`base.css`, `components.css`, `prose.css`, `select.css`) now pass through `applyMinify({ flatten: true })` during the generate step, consistent with the cross-pipeline flattening approach. No behavioral change — component CSS does not contain `@property` blocks.

## 0.2.8

### Patch Changes

- f97aeb6: **`@pantoken/plugin-logos`** — adds a `current-color` color mode. Six new source SVGs (one per brand: canvas, igniteai, instructure ×2, learnplatform, mastery, parchment) use `currentColor` so the logo adapts to the surrounding text color via CSS. The generate script now recognises `current-color` as a valid mode; new tokens follow the `--instui-logo-<product>-<layout>-current-color` naming convention.

  **`@pantoken/pendo`** — CSS architecture cleanup and token aliases:

  - File structure renamed: `manual.css` → `vars.css`, `view.css` → `chrome.css`; `video.css`, `img.css`, and `mask.css` merged into `chrome.css`. The `"icons"` cascade layer is removed; `"vars"` and `"chrome"` replace `"manual"`, `"view"`, `"mask"`, and `"img"` in `LAYER_ORDER`.
  - New `--pendo-*` aliases in `vars.css`: `--pendo-space-0`, `--pendo-alert-indent`, `--pendo-embedded-width`, `--pendo-overlay-width`, `--pendo-input-border-style` (workaround for missing upstream border-style token). All 38 `--instui-component-shared-tokens-spacing-general-space-none` references replaced with `--pendo-space-0`.
  - Focus-outline delegation extended: `select._pendo-multi-choice-poll-select`, `._pendo-open-text-poll-input`, and `input.pendo-radio` added to `FOCUSABLES`; verbose 5-declaration `:focus` outline blocks removed from `select.css`, `textarea.css`, and `radio-group.css`; only component-specific `background`/`border-color` resets and radio sibling suppression remain.
  - Radio-group token overrides resolved: `width`/`height` corrected from `--instui-component-shared-tokens-spacing-general-space-lg` to `--instui-component-radio-input-control-size-sm`; checked-inset `/ 2` compensation removed; `@TODO` comments cleared.
  - `@layer` order declaration moved inside `@scope` (was previously hoisted outside by `addScope`, making it dead code); `addScope` now only hoists `@property` at-rules.

  **`@pantoken/components`** — adds `/* fallow-ignore-next-line css-duplicate-block */` comments to structurally required duplicate declaration blocks: the visually-hidden clip pattern in `alert.css`, `form-field-messages.css`, and `screen-reader-content.css`; vendor pseudo-element pairs in `range-input.css`.

## 0.2.7

### Patch Changes

- 2b814bd: Restore elevation and focus-outline foundation variables in the docs site's custom multi-theme token sheet.

## 0.2.6

### Patch Changes

- Updated dependencies [8391068]
  - @pantoken/utils@0.2.5

## 0.2.5

### Patch Changes

- 0306bf4: Add explicit type annotations required by `isolatedDeclarations`; no API changes.
- Updated dependencies [0306bf4]
  - @pantoken/utils@0.2.4

## 0.2.4

### Patch Changes

- Updated dependencies [2e5bb88]
  - @pantoken/utils@0.2.3

## 0.2.3

### Patch Changes

- 424f57a: Internal code-quality baseline: dead-code removal, behavior-preserving refactors of oversized/complex functions, TSDoc coverage on exported symbols, and expanded test coverage to the new 85% floor. No API or behavior changes.

## 0.2.2

### Patch Changes

- @pantoken/utils@0.2.2

## 0.2.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/plugin-colors@0.1.1
  - @pantoken/utils@0.2.1

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

### Patch Changes

- Updated dependencies [c8b956d]
  - @pantoken/utils@0.2.0

## 0.1.1

### Changed

- Updated internal workspace dependency versions.

## 0.1.0

### Added

- Initial release of @pantoken/components.
