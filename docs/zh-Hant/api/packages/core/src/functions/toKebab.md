[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# 函式: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Convert a CamelCase / spaced string to kebab-case.

## 參數

### str

`string`

## 回傳

`string`

## 範例

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
