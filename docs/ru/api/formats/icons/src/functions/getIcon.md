[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Функция: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Look up an icon by name.

## Параметры

### name

`string`

## Возвращаемое значение

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Пример

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
