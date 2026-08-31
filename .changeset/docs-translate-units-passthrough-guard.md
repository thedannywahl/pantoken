---
"@pantoken/docs": patch
---

`translateUnits` (the shared prose translation driver used by the docs API/guide/demo/glossary
pipelines) now detects the same passthrough-failure pattern as the CLI i18n pipeline: a markdown,
text, or batched translation whose result is a trimmed, case-insensitive match of its English source
is treated as a failed translation — not cached, logged with a warning, and retried on the next run —
instead of silently freezing the untranslated source into the committed translation memory. A
previously-cached hit that matches its source is likewise re-translated instead of served as-is.
