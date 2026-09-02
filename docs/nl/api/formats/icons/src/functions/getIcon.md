[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Functie: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Look up an icon by name.

## Parameters

### name

`string`

## Retourneert

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Voorbeeld

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
