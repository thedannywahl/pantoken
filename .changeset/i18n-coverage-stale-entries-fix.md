---
"@pantoken/i18n-engine": patch
---

Fix `i18n stats` reporting coverage over 100% for locales whose PO catalog has stale entries (translated units removed from the source since the last `msgmerge`, but not pruned as `#~` obsolete). Only PO entries that still exist in the current POT count toward `translated`.
