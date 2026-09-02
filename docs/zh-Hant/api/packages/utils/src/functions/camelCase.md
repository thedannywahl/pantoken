[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# 函式: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).

## 參數

### kebab

`string`

## 回傳

`string`

## 範例

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
