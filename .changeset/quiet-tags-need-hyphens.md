---
"@pantoken/web-components": patch
---

Type the `prefix` option of `register()` and `registerLocalized()` as `string`, so `null` is a type error. Custom-element tags always need a `<prefix>-`; untyped callers passing an empty or null prefix still fall back to `instui`.
