# CHANGELOG

## 0.1.10

### Patch Changes

- 8aa88bb: Export `buildIconResolverChain` from `@pantoken/icons` and use it from `@pantoken/rehype` and `@pantoken/markdown-it`, removing the duplicated resolver-chain logic between the two renderers.

  Refactor the `pantoken-ai` CLI's command dispatch and `@pantoken/scaffold`'s JSONC comment stripping to reduce cognitive complexity; no behavior change.

- 8aa88bb: Migrate published `dependencies`/`peerDependencies` to `pnpm-workspace.yaml` `catalog:` references. No
  behavior change — the resolved versions are unchanged, but the `package.json` a consumer installs now
  points at the shared catalog entry instead of an inline semver range, so the range is no longer visible
  at a glance without cross-referencing `pnpm-workspace.yaml`.
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/icons@0.2.0
  - @pantoken/model@0.3.1

## 0.1.9

### Patch Changes

- @pantoken/icons@0.1.9

## 0.1.8

### Patch Changes

- @pantoken/icons@0.1.8

## 0.1.7

### Patch Changes

- @pantoken/icons@0.1.7

## 0.1.6

### Patch Changes

- @pantoken/icons@0.1.6

## 0.1.5

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/icons@0.1.5

## 0.1.4

### Patch Changes

- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/icons@0.1.4

## 0.1.3

### Patch Changes

- @pantoken/icons@0.1.3

## 0.1.2

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/model@0.2.0
  - @pantoken/icons@0.1.2

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/icons@0.1.1
  - @pantoken/model@0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/rehype.
