# CHANGELOG

## 0.2.10

### Patch Changes

- Updated dependencies [658021f]
  - @pantoken/components@0.2.9

## 0.2.9

### Patch Changes

- Updated dependencies [f97aeb6]
  - @pantoken/components@0.2.8

## 0.2.8

### Patch Changes

- Updated dependencies [2b814bd]
  - @pantoken/components@0.2.7

## 0.2.7

### Patch Changes

- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/icons@0.1.4
  - @pantoken/components@0.2.6

## 0.2.6

### Patch Changes

- Updated dependencies [0306bf4]
  - @pantoken/components@0.2.5

## 0.2.5

### Patch Changes

- @pantoken/components@0.2.4

## 0.2.4

### Patch Changes

- 424f57a: Resolve Snyk Code (SAST) findings and two latent web-component bugs.

  - File server: contain resolved paths inside `serveDir` (path-traversal fix).
  - Demo runner and docs theme: target the host origin instead of `"*"`, drop cross-origin messages, and sanitize highlighted code before `innerHTML` (DOM-XSS fix).
  - Web components: scope the `withSpacing` observer to the spacing attributes so it no longer self-triggers, and route Invoker `command`/`commandfor` through a per-target handler map so drilldown and shared-document cases resolve correctly.

- Updated dependencies [424f57a]
  - @pantoken/components@0.2.3
  - @pantoken/icons@0.1.3

## 0.2.3

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/model@0.2.0
  - @pantoken/components@0.2.2
  - @pantoken/icons@0.1.2

## 0.2.2

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/components@0.2.1
  - @pantoken/icons@0.1.1
  - @pantoken/model@0.1.1

## 0.2.1

### Patch Changes

- 9ecba6c: # Fix a TypeDoc link warning in the `register()` doc comment

  De-link the internal `NESTED_DEPS` reference and the `ELEMENTS` reference in `register()`'s `@param options` comment, so the API docs (and the Angular re-export that inherits this comment) generate without warnings. Comment-only change — no runtime or type-shape change.

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
  - @pantoken/components@0.2.0

## 0.1.1

### Changed

- Updated internal workspace dependencies:
  - @pantoken/components: 0.1.0 -> 0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/web-components.
