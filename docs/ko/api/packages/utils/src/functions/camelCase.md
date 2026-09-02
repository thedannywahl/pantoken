[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# 함수: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).

## 매개변수

### kebab

`string`

## 반환값

`string`

## 예제

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
