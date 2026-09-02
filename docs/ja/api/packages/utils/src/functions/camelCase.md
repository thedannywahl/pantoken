[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# 関数: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).

## パラメーター

### kebab

`string`

## 戻り値

`string`

## 例

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
