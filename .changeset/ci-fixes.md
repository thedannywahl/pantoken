---
"@pantoken/pantoken": patch
"@pantoken/typedoc-plugin-demo": patch
---

Fix CI failures: add missing @eslint/css dependency, add existsSync check in typedoc plugin to prevent unnecessary file reads, and update upstream-diff test mock to throw errors when baseline file doesn't exist.
