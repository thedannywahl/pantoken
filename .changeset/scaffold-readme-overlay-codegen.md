---
"@pantoken/scaffold": patch
---

Generate localized scaffold README overlays directly from their committed PO catalogs.

The overlay generator previously read an ignored render tree, so a clean checkout had the catalogs
but built an empty overlay unless someone first ran a separate render command. Builds now read each
locale's `scaffold.readme.po` directly and select non-fuzzy translations by their English README
`msgid`, making release output reproducible from tracked files.
