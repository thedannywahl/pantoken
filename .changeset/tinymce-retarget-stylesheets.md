---
"@pantoken/tinymce": patch
---

Stylesheets the pickers and glyph sync inject are now tagged with the file they load, so `injectContentStylesheet` dedupes per file and the new `retargetContentStylesheets(editor, buildAssetUrl)` re-points them after a CDN provider switch. The icon picker's own sheet links follow the current provider on every open instead of keeping the first one.
