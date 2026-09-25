---
"@pantoken/scaffold": patch
---

Fix the canvas-theme-editor starter's local-vs-CDN default detection: `import.meta.env.DEV` is baked to `false` for any `vite build` output, so a production-built preview served on localhost (e.g. the docs site's Canvas RCE page) always defaulted to a CDN provider instead of local assets. Now also checks the hostname at runtime, so any localhost preview correctly defaults to local assets.
