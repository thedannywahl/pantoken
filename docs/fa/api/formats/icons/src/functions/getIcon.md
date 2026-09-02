[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# تابع: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Look up an icon by name.

## پارامترها

### name

`string`

## مقدار بازگشتی

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## نمونه

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
