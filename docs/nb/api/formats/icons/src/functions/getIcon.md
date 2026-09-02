[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Funksjon: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Look up an icon by name.

## Parametere

### name

`string`

## Returnerer

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Eksempel

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
