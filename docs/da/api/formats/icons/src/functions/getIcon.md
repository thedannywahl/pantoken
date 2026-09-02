[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Funktion: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Slå et ikon op efter navn.

## Parametre

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
