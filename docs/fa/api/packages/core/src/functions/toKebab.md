[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# تابع: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Convert a CamelCase / spaced string to kebab-case.

## پارامترها

### str

`string`

## مقدار بازگشتی

`string`

## نمونه

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
