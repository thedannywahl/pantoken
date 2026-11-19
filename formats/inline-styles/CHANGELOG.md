# @pantoken/inline-styles

## 0.2.1

### Patch Changes

- e687579: Refactor error checks to use Error.isError() instead of instanceof

  Replace 10 instanceof Error patterns with the standard Error.isError() helper
  (ES2022 feature) across:

  - packages/scaffold/src/cli.ts (3 occurrences)
  - packages/scaffold/scripts/sync-readme-locales.ts (1 occurrence)
  - packages/scaffold/tests/index.test.ts (1 occurrence)
  - formats/inline-styles/src/cli.ts (1 occurrence)
  - formats/components/scripts/audit-accessibility.ts (1 occurrence)
  - tools/translation-adapters/src/shim.ts (1 occurrence)
  - tools/i18n-engine/src/lint.ts (2 occurrences)

  Error.isError() is the standard, more explicit way to check if an unknown value
  is an Error instance, improving code clarity and consistency.

- e687579: TypeScript configuration modernization: update lib to ES2026 and enable future-forward compiler options

  - Updated `tsconfig.base.json` lib from ES2023 to ES2026 to enable TypeScript 7.1's support for the latest ECMAScript features
  - Added `useDefineForClassFields: true` for explicit class field semantics alignment with ES2022 standards
  - Added `noImplicitOverride: true` to enforce explicit override modifiers in class hierarchies for improved safety
  - Fixed override modifiers in `renderers/web-components` to comply with new noImplicitOverride setting

- e687579: refactor(tsconfig): align all packages to es2026 with dom support

  Remove redundant target/lib overrides that were constraining packages to older ES versions (es2023, es2022, es2020). All browser-facing packages now explicitly declare es2026 + dom + dom.iterable, ensuring consistent modern JavaScript support across the workspace and enabling future adoption of ES2026 features.

  Packages with package-level tsconfig.json files now cleanly inherit target from base while explicitly setting lib to include both es2026 and DOM types as needed.

## 0.2.0

### Minor Changes

- 8ef5ec9: Add a light-only browser snapshot entry that resolves the computed cascade and materializes supported static glyphs as PNG images. Correct inherited variable remapping and reject unresolved resolved-mode values.
- 8ef5ec9: Resolve variable values before omitting token declarations, reject circular stylesheet token definitions, and expose reference/resolved variable modes in the standalone CLI.
- 8ef5ec9: Inline component rules using :scope roots and optionally leave custom-property declarations in a companion theme stylesheet instead of copying tokens into HTML.

## 0.1.1

### Patch Changes

- b3cb818: Separate generic CSS inlining from email-safe pantoken HTML generation and add the email CLI target.
- b3cb818: Add package documentation for inline HTML styles and scoped theming.
