---
"@pantoken/scaffold": patch
---

Remove the redundant README render step from scaffold translation scripts.

The package generator now reads committed `scaffold.readme` catalogs directly, so each `translate*`
script no longer launches `vp run render:readme`. This avoids a Vite+ process-spawn failure after a
successful translation run and leaves the resulting published overlay unchanged.
