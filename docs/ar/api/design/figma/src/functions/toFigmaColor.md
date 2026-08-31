[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaColor

# Function: toFigmaColor()

> **toFigmaColor**(`hex`): [`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

قم بتحليل `#rgb`/`#rrggbb`/`#rrggbbaa` إلى Figma RGBA (0–1)، أو `undefined` إذا لم يكن لون hex.

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
