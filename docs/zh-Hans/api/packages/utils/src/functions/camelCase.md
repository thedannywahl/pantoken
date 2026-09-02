[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# 函数: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).

## 参数

### kebab

`string`

## 返回值

`string`

## 示例

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
