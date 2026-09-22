---
"@pantoken/docs": patch
---

Publish the `i18n.source.schema.json` and `i18n.config.schema.json` JSON schemas at
`https://pantoken.app/schemas/`, the `$id`/`$schema` URLs already referenced from every package and
template `i18n.json` file. A new `docs/scripts/stage-i18n-schemas.ts` step (wired into `docs:assets`)
copies them from `tools/i18n-engine/` into `public/schemas/` at build time.
