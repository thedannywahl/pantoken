[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Fušla: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Look up an icon by name.

## Parametera

### name

`string`

## Gullii / Gávdnat

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Exempel

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
