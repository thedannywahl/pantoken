[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaColor

# Fonction: toFigmaColor()

> **toFigmaColor**(`hex`): [`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to a Figma RGBA (0–1), or `undefined` if not a hex colour.

## Paramètres

### hex

`string`

## Renvoie

[`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

## Exemple

```ts
import { toFigmaColor } from "@pantoken/figma";

toFigmaColor("#ff0000"); // { r: 1, g: 0, b: 0, a: 1 }
toFigmaColor("not-a-color"); // undefined
```
