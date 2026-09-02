[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# 関数: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Convert a CamelCase / spaced string to kebab-case.

## パラメーター

### str

`string`

## 戻り値

`string`

## 例

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
