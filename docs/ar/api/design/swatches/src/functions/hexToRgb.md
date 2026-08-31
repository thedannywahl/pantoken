[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# Function: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

قم بتحليل `#rgb`/`#rrggbb`/`#rrggbbaa` إلى قنوات 0–255، أو `undefined` إذا لم يكن لون hex.

## Parameters

### hex

`string`

## Returns

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## Example

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
