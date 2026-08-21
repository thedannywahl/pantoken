---
"@pantoken/tokens": patch
---

The token generator no longer fails the build on a syntax mismatch covered by `formats/tokens/known-syntax-issues.json` — it patches the value (to the entry's `rewriteValue`, or the `unset` CSS-wide keyword by default) and warns instead. The ledger self-maintains on every generator run: entries that stop reproducing are dropped, and newly discovered mismatches are appended for review via the committed file's git diff.
