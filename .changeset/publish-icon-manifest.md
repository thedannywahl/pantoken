---
"@pantoken/docs": patch
---

Publish a stable, aggregated `icon-manifest.json` to `docs/public/` (mirroring
`component-capabilities.json`), tagging every InstUI/Simple Icons/custom-icon/logo
entry with its source and exact per-item CDN CSS URL — so external tools have a
single fetchable index instead of scraping picker JSON. Also refresh the
`component-capabilities.json` public copy from its authoritative source
(`@pantoken/interactions`), which nothing was previously keeping in sync.
