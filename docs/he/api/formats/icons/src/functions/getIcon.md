[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# פונקציה: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Look up an icon by name.

## פרמטרים

### name

`string`

## מחזיר

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## דוגמה

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
