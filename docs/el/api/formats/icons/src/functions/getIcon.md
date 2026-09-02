[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Συνάρτηση: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Look up an icon by name.

## Παράμετροι

### name

`string`

## Επιστρέφει

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Παράδειγμα

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
