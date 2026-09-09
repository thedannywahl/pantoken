---
"@pantoken/i18n-engine": patch
"@pantoken/docs": patch
---

fix: don't restamp a catalog's revision date when nothing changed

Every `serializePot`/`serializePo` call stamps a fresh `PO-Revision-Date`, and every writer wrote
its result unconditionally. Because `translate` now re-extracts a template on each run, an
otherwise no-op run still rewrote every `l10n/*.pot` with a new timestamp — showing up as a dirty
working tree, a spurious diff in review, and a busted build cache for any task keyed on those files.

Catalog writes now go through `writeCatalog`, which leaves the file completely untouched (mtime
included) when the new content differs from what is on disk only by that timestamp. A real unit
change still writes, and still restamps the date.
