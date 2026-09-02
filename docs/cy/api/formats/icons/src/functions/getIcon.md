[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Swyddogaeth: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Look up an icon by name.

## Paramedrau

### name

`string`

## Yn dychwelyd

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Enghraifft

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
