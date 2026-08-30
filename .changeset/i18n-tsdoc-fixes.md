---
"@pantoken/docs": patch
---

Fix TSDoc and translation issues:

- **TSDoc**: Fix inline tag syntax by wrapping @part, @slot, @selector in braces per TSDoc specification, and escape template variable syntax in JSDoc with backticks.
- **tsdoc.json**: Add custom tag definitions for @part, @slot, @selector to enable layouts package documentation validation.
- **i18n**: Update Hungarian translation cache for CSS API docs to resolve translation drift after TSDoc modifications.
