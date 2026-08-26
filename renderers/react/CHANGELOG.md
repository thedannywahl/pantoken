# CHANGELOG

## 0.1.28

### Patch Changes

- @pantoken/web-components@0.5.8
  - @pantoken/i18n@0.1.15

## 0.1.27

### Patch Changes

- 8aa88bb: Add preset ledger infrastructure and platform presets for scaffold migration to Bingo.

  **Scaffold-Base Package (`@pantoken/scaffold-base`):**

  - Switch template source to `.jsonc` for comment support
  - Generate static `cssdoc.ts` at build time, template remains as source

  **Scaffold Presets:**

  - Create platform presets in `@pantoken/components`, `@pantoken/react`, `@pantoken/vue`, `@pantoken/web-components`
  - Each platform exports `./scaffold-preset` entry point with Bingo-compatible preset definition
  - Presets extend shared scaffold-base with common options (name, cssdoc block, wrapper context)

  **Scaffold Package (`@pantoken/scaffold`):**

  - Introduce `scan-presets.ts` script that discovers all packages exporting `./scaffold-preset`
  - Generate static `preset-ledger.ts` registry at pre-build time, used by CLI to validate platforms
  - Wire preset scanning into scaffold build/test/check pipeline
  - Update `scaffoldProject` function to async, validates platform is in PRESET_LEDGER
  - Update CLI to handle async scaffolding with proper error handling
  - Update scaffold/generate.ts to read cssdoc template from scaffold-base with JSONC parsing (strips comments for output)

  **Key Features:**

  - Decentralized preset ownership: each platform package maintains its own preset definition
  - Static ledger generation enables type-safe platform discovery at runtime
  - JSONC source templates with comments for documentation
  - Foundation for future Bingo template rendering integration (presets are now validated and available)

- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/scaffold-base@0.2.0
  - @pantoken/web-components@0.5.7
  - @pantoken/i18n@0.1.14

## 0.1.26

### Patch Changes

- @pantoken/web-components@0.5.6
- @pantoken/i18n@0.1.13

## 0.1.25

### Patch Changes

- @pantoken/web-components@0.5.5
- @pantoken/i18n@0.1.12

## 0.1.24

### Patch Changes

- Updated dependencies [e6c0d3b]
  - @pantoken/web-components@0.5.4
  - @pantoken/i18n@0.1.11

## 0.1.23

### Patch Changes

- @pantoken/web-components@0.5.3
- @pantoken/i18n@0.1.10

## 0.1.22

### Patch Changes

- @pantoken/web-components@0.5.2
- @pantoken/i18n@0.1.9

## 0.1.21

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/i18n@0.1.8
  - @pantoken/web-components@0.5.1

## 0.1.20

### Patch Changes

- Updated dependencies [853659c]
- Updated dependencies [853659c]
  - @pantoken/web-components@0.5.0
  - @pantoken/i18n@0.1.7

## 0.1.19

### Patch Changes

- @pantoken/web-components@0.4.2
- @pantoken/i18n@0.1.6

## 0.1.18

### Patch Changes

- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
  - @pantoken/web-components@0.4.1
  - @pantoken/i18n@0.1.5

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
