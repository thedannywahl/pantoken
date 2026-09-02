[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Funzione: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Look up an icon by name.

## Parametri

### name

`string`

## Restituisce

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Esempio

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
