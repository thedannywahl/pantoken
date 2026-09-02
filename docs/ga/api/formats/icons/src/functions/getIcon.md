[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Feidhm: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Look up an icon by name.

## Paraiméadair

### name

`string`

## Tuairisceáin

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Sampla

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
