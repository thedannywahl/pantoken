[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# Функция: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Convert a CamelCase / spaced string to kebab-case.

## Параметры

### str

`string`

## Возвращаемое значение

`string`

## Пример

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
