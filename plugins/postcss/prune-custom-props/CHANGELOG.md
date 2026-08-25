# CHANGELOG

## 0.1.5

### Patch Changes

- 8aa88bb: Migrate published `dependencies`/`peerDependencies` to `pnpm-workspace.yaml` `catalog:` references. No
  behavior change — the resolved versions are unchanged, but the `package.json` a consumer installs now
  points at the shared catalog entry instead of an inline semver range, so the range is no longer visible
  at a glance without cross-referencing `pnpm-workspace.yaml`.

## 0.1.4

### Patch Changes

- f97aeb6: Ensure this branch has explicit changeset coverage for every touched package.

  No API changes are introduced for these packages in this commit; this records branch-level package touch coverage per release policy.

## 0.1.3

### Patch Changes

- 2f21a66: Refactor internal functions to reduce cognitive complexity. `svgToGlyphPath` extracts the ClipperLib stroke-offset loop into `strokeSubpathsToFilled`; `OnceExit` extracts the transitive-dependency fixpoint into `expandTransitiveDeps`; the demo runner extracts `handleObservedBodyResize`, `shouldLatchUserResize`, `settleResizeState`, and `handlerForMessage` from their inline call sites.

## 0.1.2

### Patch Changes

- 8391068: Replace post-hoc `fn.postcss = true` assignment with `Object.assign` + explicit
  type declaration to satisfy `--isolatedDeclarations`. No behaviour change.

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

## 0.1.0

### Added

- Initial release of @pantoken/plugin-prune-custom-props.
