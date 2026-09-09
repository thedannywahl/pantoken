---
"@pantoken/scaffold": patch
---

fix: allow pnpm's exotic-subdep gate for scaffolded projects

`@pantoken/tokens` pulls in a git-resolved upstream dependency several levels
deep, which pnpm's default `blockExoticSubdeps` policy rejects for non-direct
consumers — a fresh `pnpm install` in any scaffolded project failed with
`ERR_PNPM_EXOTIC_SUBDEP`. Every template's `pnpm-workspace.yaml` now also sets
`blockExoticSubdeps: false`, alongside the existing `core-js`/`ttf2woff2`
`allowBuilds` entries.
