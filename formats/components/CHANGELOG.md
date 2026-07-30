# CHANGELOG

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
