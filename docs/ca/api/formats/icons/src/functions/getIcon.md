[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Funció: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Cercar una icona pel seu nom.

## Paràmetres

### name

`string`

## Retorna

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Exemple

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
