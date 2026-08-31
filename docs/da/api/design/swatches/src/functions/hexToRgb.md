[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# Function: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Fortolk `#rgb`/`#rrggbb`/`#rrggbbaa` til 0–255-kanaler, eller `undefined` hvis ikke en hexfarve.

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
