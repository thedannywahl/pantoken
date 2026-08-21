# CHANGELOG

## 0.2.0

### Minor Changes

- 90ce910: Add `buildExampleSrcdoc()` and `escapeSrcdoc()`, exported for building an isolated `<iframe srcdoc>` document for a live example preview — its own document, so no host page styles can leak into it.

## 0.1.5

### Patch Changes

- d4ba8fe: Support heading `-flag` tokens on HTML examples in demo rendering and refactor markdown flag migration to satisfy complexity gates.

## 0.1.4

### Patch Changes

- f97aeb6: Ensure this branch has explicit changeset coverage for every touched package.

  No API changes are introduced for these packages in this commit; this records branch-level package touch coverage per release policy.

## 0.1.3

### Patch Changes

- 2f21a66: Refactor internal functions to reduce cognitive complexity. `svgToGlyphPath` extracts the ClipperLib stroke-offset loop into `strokeSubpathsToFilled`; `OnceExit` extracts the transitive-dependency fixpoint into `expandTransitiveDeps`; the demo runner extracts `handleObservedBodyResize`, `shouldLatchUserResize`, `settleResizeState`, and `handlerForMessage` from their inline call sites.

## 0.1.2

### Patch Changes

- 424f57a: Resolve Snyk Code (SAST) findings and two latent web-component bugs.

  - File server: contain resolved paths inside `serveDir` (path-traversal fix).
  - Demo runner and docs theme: target the host origin instead of `"*"`, drop cross-origin messages, and sanitize highlighted code before `innerHTML` (DOM-XSS fix).
  - Web components: scope the `withSpacing` observer to the spacing attributes so it no longer self-triggers, and route Invoker `command`/`commandfor` through a per-target handler map so drilldown and shared-document cases resolve correctly.

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

## 0.1.0

### Added

- Initial release of @pantoken/demo.
