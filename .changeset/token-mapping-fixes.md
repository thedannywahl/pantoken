---
"@pantoken/components": patch
"@pantoken/shadcn": patch
---

Fix Banner demo i18n.json structure and correct shadcn sidebar token mappings.

- Fixed Banner demo i18n.json to use required message metadata structure
- Corrected shadcn sidebar token mappings from non-existent globalNav token names
  to actual side-nav-bar tokens that exist in the generated token IR
