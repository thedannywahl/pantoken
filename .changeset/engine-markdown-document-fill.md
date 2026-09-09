---
"@pantoken/i18n-engine": minor
---

Translate whole-file content units as Markdown documents.

A content space with `segment: "file"` now fills its catalog one document per request, with fenced
and inline code, package names, escaped angle brackets, and `{{template}}` tokens masked out before
the model sees them — the batched JSON prompt used for short keyed strings would have flattened the
document's structure. The masking and prompt helpers moved into `@pantoken/translation-adapters`
(`preserveMarkdown`, `restoreMarkdown`, `buildMarkdownTranslationPrompt`, `stripMarkdownEnvelope`)
so the docs pipeline and the engine share one implementation.
