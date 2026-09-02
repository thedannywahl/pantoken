[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# Функція: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).

## Параметри

### kebab

`string`

## Повертає

`string`

## Приклад

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
