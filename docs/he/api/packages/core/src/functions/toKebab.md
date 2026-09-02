[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# פונקציה: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Convert a CamelCase / spaced string to kebab-case.

## פרמטרים

### str

`string`

## מחזיר

`string`

## דוגמה

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
