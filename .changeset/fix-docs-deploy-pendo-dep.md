---
"@pantoken/docs": patch
---

fix(docs): declare `@pantoken/pendo` as a devDependency

`docs/scripts/stage-pendo-asset.ts` imports `renderers/pendo/src/index.ts` directly, which needs
`renderers/pendo/generated/embedded.ts` (produced by pendo's own `embed`/`generate` build steps).
Because `@pantoken/pendo` wasn't declared as a dependency of `@pantoken/docs`, the release-gated
deploy workflow's filtered build (`vp run -F "@pantoken/docs..." build`) never ran pendo's build
task, so a clean checkout was missing the generated file and `docs:assets` failed with
`ERR_MODULE_NOT_FOUND`.
