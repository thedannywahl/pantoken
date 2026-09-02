[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# Hàm: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).

## Tham số

### kebab

`string`

## Trả về

`string`

## Ví dụ

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
