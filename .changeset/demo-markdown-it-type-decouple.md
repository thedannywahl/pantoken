---
"@pantoken/demo": patch
---

Decouple `demoMarkdownIt` from the `markdown-it` package's `MarkdownIt` type export, using a minimal structural shape instead — vitepress bundles its own copy of `markdown-it` that can differ from the repo's catalog version.
