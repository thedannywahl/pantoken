[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# פונקציה: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## פרמטרים

### raw

`string`

## מחזיר

`string`

## דוגמה

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
