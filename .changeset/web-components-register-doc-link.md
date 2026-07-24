---
"@pantoken/web-components": patch
---

# Fix a TypeDoc link warning in the `register()` doc comment

De-link the internal `NESTED_DEPS` reference and the `ELEMENTS` reference in `register()`'s `@param options` comment, so the API docs (and the Angular re-export that inherits this comment) generate without warnings. Comment-only change — no runtime or type-shape change.
