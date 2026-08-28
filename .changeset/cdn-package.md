---
"@pantoken/cdn": minor
---

New package. Model CDN providers (`jsdelivr` default, `unpkg`, `esmsh`) and build correct asset
URLs for any npm package/path, combining multiple files into one request where the provider
supports it (jsDelivr) and falling back to one URL per file where it doesn't (unpkg, esm.sh).
Bring your own provider with `defineCdnProvider`.
