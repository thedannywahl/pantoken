---
"@pantoken/i18n-engine": patch
"@pantoken/web-components": patch
"@pantoken/scaffold": patch
"@pantoken/ai": patch
"@pantoken/canvas-theme-editor": patch
---

Adds a reusable `i18n.source.schema.json` and attaches it to normalized package and template message sources. All current package-owned i18n entries now use explicit `{message, translate}` objects.
