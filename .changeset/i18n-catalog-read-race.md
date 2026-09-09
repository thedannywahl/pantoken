---
"@pantoken/i18n-engine": patch
"@pantoken/docs": patch
---

fix: read catalogs directly instead of checking existence first

`writeCatalog` and the PO loaders asked `existsSync` before reading, a check-then-use pattern
(CWE-367) that leaves a window in which the file can be created or removed between the two calls.
They now read through a shared `readCatalog`, which returns `undefined` on `ENOENT` and rethrows
anything else, so the missing-file case is handled by the read itself rather than by a prior probe.
