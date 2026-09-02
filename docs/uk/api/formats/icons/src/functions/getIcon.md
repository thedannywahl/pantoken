[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Функція: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Look up an icon by name.

## Параметри

### name

`string`

## Повертає

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Приклад

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
