---
"@pantoken/tinymce": patch
---

Preserve imported, pasted, and source-edited HTML instead of automatically adding pantoken classes during passive editor events. Apply class-aware formatting only to explicit command targets, without rewriting unrelated content.

Existing authored classes and inline styles remain intact. Native inline formatting and intentionally selected Inline-provider conversion still apply their requested markup and styles.
