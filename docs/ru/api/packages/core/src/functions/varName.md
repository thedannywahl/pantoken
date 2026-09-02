[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# Функция: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Build a `--instui-[prefix-]<kebab path>` custom-property name.

## Параметры

### prefix

`string`

### path

`string`[]

## Возвращаемое значение

`string`

## Пример

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
