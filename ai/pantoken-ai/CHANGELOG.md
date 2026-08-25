# CHANGELOG

## 0.2.0

### Minor Changes

- efed45f: Split the `bootstrap-pantoken` Claude skill in two: `init-pantoken` now covers installing pantoken's agent assets (AGENTS.md, llms.txt, editor/agent rules, skills), while `scaffold-pantoken` covers scaffolding a new project or wiring pantoken into an existing one. Renamed the `bootstrap <platform>` CLI command to `scaffold <platform>` (it now wraps the new `@pantoken/scaffold` package's scaffold plus `init`'s agent-asset install into one command), and added a `scaffoldAndInit` API. `scaffoldProject`/`SCAFFOLD_PLATFORMS`/`ScaffoldPlatform` are now re-exported from the new `@pantoken/scaffold` package instead of being implemented locally.

### Patch Changes

- efed45f: Add a "Full documentation" section to `AGENTS.md` pointing agents at the hosted docs' `/llms.txt`, `/llms-full.txt`, per-page `.md` mirrors, and `/.well-known/api-catalog` for anything the bundled cheatsheet doesn't cover.
- efed45f: `pantoken-ai scaffold` and `scaffoldAndInit` now support the renamed `html` platform (was `web`) plus the new `angular` and `web-components` platforms, re-exported from the updated `@pantoken/scaffold`.
- efed45f: Sync the Cursor rule body with the Copilot instructions body at generate time so the two rule files can't drift out of sync, and refresh both with the current `@pantoken/components` package and full CLI target list.
- Updated dependencies [efed45f]
- Updated dependencies [efed45f]
- Updated dependencies [efed45f]
  - @pantoken/scaffold@0.2.0

## 0.1.4

### Patch Changes

- 47f3275: add interaction package information

## 0.1.3

### Patch Changes

- 582d4f2: Refresh @pantoken/ai guidance and installer behavior.

  - Update consumer agent assets with current pantoken CLI target coverage and usage guidance.
  - Add explicit runtime validation and help output for `pantoken-ai init --tool` handling.
  - Expand package tests for invalid tool rejection.
  - Document @pantoken/ai in the package guide and add contributor/maintainer checklist language to keep AI assets in sync with user-facing refinements.

## 0.1.2

### Patch Changes

- 0306bf4: Add explicit type annotations required by `isolatedDeclarations`; no API changes.

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

## 0.1.0

### Added

- Initial release of @pantoken/ai.
