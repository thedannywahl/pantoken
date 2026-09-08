---
"@pantoken/docs": patch
---

Replaced the literal NUL byte embedded in `translation-memory.ts`'s `keyFor` cache-key separator with
an escaped `\0` sequence. The raw byte made the file appear binary to `grep`/`rg`/GitHub code search,
so this load-bearing separator was invisible to normal text search. The escaped form produces an
identical runtime string (and identical cache-key hashes), so no cache entries change.
