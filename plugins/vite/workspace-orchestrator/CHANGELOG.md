# CHANGELOG

## 0.1.3

### Patch Changes

- 2b814bd: Add rate limiting and in-memory file caching to file server middleware to mitigate CWE-770 (allocation of resources without limits). Implements per-IP token bucket rate limiter (100 tokens capacity, 50 tokens/sec refill) and LRU file cache (50 files, 5 minute TTL) to prevent denial-of-service attacks and reduce expensive filesystem operations.

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

- Initial release of @pantoken/vite-workspace-orchestrator.
