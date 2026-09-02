[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# تابع: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## پارامترها

### raw

`string`

## مقدار بازگشتی

`string`

## نمونه

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
