[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Fonction: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Look up an icon by name.

## Paramètres

### name

`string`

## Renvoie

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Exemple

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
