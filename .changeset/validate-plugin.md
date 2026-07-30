---
"@pantoken/plugin-kit": patch
---

Export `validatePlugin(plugin)`: asserts non-empty name, all hooks are
functions, and no unrecognised keys are present. Called automatically by
`definePlugin` and available for hand-authored plugins. Throws a descriptive
error on any violation.
