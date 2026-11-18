# CHANGELOG

## 0.3.0

### Minor Changes

- 5b6ecfc: @pantoken/angular: retire aged-out majors; retained verified support starts at 22.2.0.

  @pantoken/bootstrap: verified 5.2.0, 5.2.3, 5.3.8, 5.3.9; support starts at 5.2.0.

  @pantoken/jekyll: verified 3.9.4, 4.4.1; support starts at 3.9.4.

  @pantoken/tinymce: verified 8.9.2, 8.9.3, 8.10.2; support starts at 8.9.2.

  @pantoken/vite: verified 8.0.0, 8.0.16, 8.1.5, 8.2.2, 8.3.1, 8.3.2, 8.3.4, 8.3.7, 8.3.8; support starts at 8.0.0.

  Update @lucide/lab to ^0.13.0.

  Update pnpm to 12.20.0.

  Update pnpm/setup to v3.2.0.

## 0.2.0

### Minor Changes

- 962c640: Theme Bootstrap 5.2.0–5.3.8 body and primary-button variables with Instructure tokens, backed by real stylesheet checks.

## 0.1.3

### Patch Changes

- 7d964ee: Update the `homepage` field to `https://pantoken.app` across all package manifests.

## 0.1.2

### Patch Changes

- 8aa88bb: Migrate published `dependencies`/`peerDependencies` to `pnpm-workspace.yaml` `catalog:` references. No
  behavior change — the resolved versions are unchanged, but the `package.json` a consumer installs now
  points at the shared catalog entry instead of an inline semver range, so the range is no longer visible
  at a glance without cross-referencing `pnpm-workspace.yaml`.

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

## 0.1.0

### Added

- Initial release of @pantoken/bootstrap.
