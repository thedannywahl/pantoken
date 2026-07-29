---
"@pantoken/pantoken": patch
"@pantoken/typedoc-plugin-demo": patch
---

Fix CI failures: add missing @eslint/css dependency, add existsSync check in typedoc plugin to prevent unnecessary file reads, update upstream-diff test mock to throw errors when baseline file doesn't exist, and mark test files as entry points in fallow config to prevent dead-code regressions.
