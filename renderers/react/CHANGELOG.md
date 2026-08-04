# CHANGELOG

## 0.1.17

### Patch Changes

- Updated dependencies [ebe77e5]
  - @pantoken/web-components@0.4.0
  - @pantoken/i18n@0.1.4

## 0.1.16

### Patch Changes

- @pantoken/web-components@0.3.2
- @pantoken/i18n@0.1.3

## 0.1.15

### Patch Changes

- Updated dependencies [03a9dc1]
  - @pantoken/web-components@0.3.1
  - @pantoken/i18n@0.1.2

## 0.1.14

### Patch Changes

- Updated dependencies [e1f356b]
  - @pantoken/i18n@0.1.1

## 0.1.13

### Patch Changes

- 40987c4: Add locale convenience APIs to the framework renderer packages.

  - **`@pantoken/react`** — `<TokenProvider>` accepts a `locale` prop (`string | LocaleBundle`); when set it calls `registerLocalized(locale)` instead of `register()`. Re-exports `registerLocalized` from `@pantoken/i18n` for callers that register manually.
  - **`@pantoken/vue`** — `app.use(PantokenVue, { locale })` accepts an optional `locale` option (`string | LocaleBundle`); when set it calls `registerLocalized(locale)` instead of `register()`.
  - **`@pantoken/svelte`** — re-exports `registerLocalized` from `@pantoken/i18n` for callers who register outside a component lifecycle.

- Updated dependencies [40987c4]
  - @pantoken/web-components@0.3.0
  - @pantoken/i18n@0.1.0

## 0.1.12

### Patch Changes

- @pantoken/web-components@0.2.10

## 0.1.11

### Patch Changes

- @pantoken/web-components@0.2.9

## 0.1.10

### Patch Changes

- @pantoken/web-components@0.2.8

## 0.1.9

### Patch Changes

- @pantoken/web-components@0.2.7

## 0.1.8

### Patch Changes

- @pantoken/web-components@0.2.6

## 0.1.7

### Patch Changes

- @pantoken/web-components@0.2.5

## 0.1.6

### Patch Changes

- 424f57a: Internal code-quality baseline: dead-code removal, behavior-preserving refactors of oversized/complex functions, TSDoc coverage on exported symbols, and expanded test coverage to the new 85% floor. No API or behavior changes.
- Updated dependencies [424f57a]
  - @pantoken/web-components@0.2.4

## 0.1.5

### Patch Changes

- @pantoken/web-components@0.2.3

## 0.1.4

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/web-components@0.2.2

## 0.1.3

### Patch Changes

- Updated dependencies [9ecba6c]
  - @pantoken/web-components@0.2.1

## 0.1.2

### Patch Changes

- Updated dependencies [c8b956d]
  - @pantoken/web-components@0.2.0

## 0.1.1

### Changed

- Updated internal workspace dependencies:
  - @pantoken/web-components: 0.1.0 -> 0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/react.
