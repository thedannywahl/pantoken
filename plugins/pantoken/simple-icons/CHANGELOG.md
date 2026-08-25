# CHANGELOG

## 0.3.6

### Patch Changes

- 8aa88bb: Migrate published `dependencies`/`peerDependencies` to `pnpm-workspace.yaml` `catalog:` references. No
  behavior change — the resolved versions are unchanged, but the `package.json` a consumer installs now
  points at the shared catalog entry instead of an inline semver range, so the range is no longer visible
  at a glance without cross-referencing `pnpm-workspace.yaml`.
- Updated dependencies [8aa88bb]
  - @pantoken/model@0.3.1
  - @pantoken/plugin-kit@0.2.7

## 0.3.5

### Patch Changes

- @pantoken/plugin-kit@0.2.6

## 0.3.4

### Patch Changes

- @pantoken/plugin-kit@0.2.5

## 0.3.3

### Patch Changes

- @pantoken/plugin-kit@0.2.4

## 0.3.2

### Patch Changes

- @pantoken/plugin-kit@0.2.3

## 0.3.1

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/plugin-kit@0.2.2

## 0.3.0

### Minor Changes

- 7879f6b: support exporting individual icons

## 0.2.1

### Patch Changes

- Updated dependencies [2b814bd]
  - @pantoken/plugin-kit@0.2.1

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

- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/plugin-kit@0.2.0

## 0.1.5

### Patch Changes

- @pantoken/plugin-kit@0.1.5

## 0.1.4

### Patch Changes

- @pantoken/plugin-kit@0.1.4

## 0.1.3

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/model@0.2.0
  - @pantoken/plugin-kit@0.1.3

## 0.1.2

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/model@0.1.1
  - @pantoken/plugin-kit@0.1.2

## 0.1.1

### Patch Changes

- @pantoken/plugin-kit@0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/plugin-simple-icons.
