# CHANGELOG

## 0.2.0

### Minor Changes

- 8391068: **Breaking (minor/beta)**: Plugin hook contexts are now data-only to enable Worker thread
  serialisation.

  - `TokenHookContext` drops the `define` helper; plugins import `defineToken` from
    `@pantoken/model` (or `@pantoken/core` for CSS-syntax inference).
  - `IconHookContext` changes from `{ add, resolve }` to `{ icons, theme }` where `icons` is
    a lightweight list of already-registered icon names. The `icons` hook now returns
    `IconEntry[] | void` instead of mutating via `add`.
  - `@pantoken/model` exports a new zero-dependency `defineToken(input): Token` helper.
  - `@pantoken/plugin-kit` exports `SandboxedPluginEntry`, `isSandboxed`, and `runPluginHook`
    for running individual plugin hooks in an isolated Worker thread (`sandbox: 'thread'`)
    or child process with `--permission` flags (`sandbox: 'process'`).
  - All four first-party pantoken plugins migrated to the new context API.
  - `extendPlugin` icons composition now merges returned `IconEntry[]` arrays.

### Patch Changes

- 8391068: Export `validatePlugin(plugin)`: asserts non-empty name, all hooks are
  functions, and no unrecognised keys are present. Called automatically by
  `definePlugin` and available for hand-authored plugins. Throws a descriptive
  error on any violation.
- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/utils@0.2.5

## 0.1.5

### Patch Changes

- Updated dependencies [0306bf4]
  - @pantoken/utils@0.2.4

## 0.1.4

### Patch Changes

- Updated dependencies [2e5bb88]
  - @pantoken/utils@0.2.3

## 0.1.3

### Patch Changes

- Updated dependencies [e099a51]
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
  - @pantoken/utils@0.2.1

## 0.1.1

### Patch Changes

- Updated dependencies [c8b956d]
  - @pantoken/utils@0.2.0

## 0.1.0

### Added

- Initial release of @pantoken/plugin-kit.
