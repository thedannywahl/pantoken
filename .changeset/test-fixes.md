---
"@pantoken/tinymce": patch
"@pantoken/web-components": patch
---

Fix test failures:

- **web-components**: Resolve i18n.json path relative to check-drift.ts script directory using `import.meta.url`, fixing module import errors in tests.
- **tinymce**: Defend onChange handlers against missing properties with optional chaining to prevent TypeError in test scenarios.
