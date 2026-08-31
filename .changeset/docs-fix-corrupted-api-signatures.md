---
"@pantoken/docs": patch
---

Fixed corrupted TypeDoc generic-type signatures (e.g. `` `Readonly`\<`Record`\<`string`, `string`\>\> ``) across the `ar`/`ca`/`da`/`hy`/`nl` locale API reference — repeated `vp check --fix` passes had
duplicated bare `>` characters in front of the escaped closing brackets. oxfmt no longer formats
`docs/*/api` (generated, never hand-edited), so this shouldn't recur.
