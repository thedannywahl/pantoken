[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# Функция: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).

## Параметры

### kebab

`string`

## Возвращаемое значение

`string`

## Пример

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
