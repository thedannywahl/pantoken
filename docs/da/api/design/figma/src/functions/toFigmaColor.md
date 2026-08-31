[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaColor

# Function: toFigmaColor()

> **toFigmaColor**(`hex`): [`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Fortolk `#rgb`/`#rrggbb`/`#rrggbbaa` til en Figma RGBA (0–1), eller `undefined` hvis ikke en hexfarve.

## Parameters

### hex

`string`

## Returns

[`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

## Example

```ts
import { toFigmaColor } from "@pantoken/figma";

toFigmaColor("#ff0000"); // { r: 1, g: 0, b: 0, a: 1 }
toFigmaColor("not-a-color"); // undefined
```
