[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# Functie: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to 0–255 channels, or `undefined` if not a hex colour.

## Parameters

### hex

`string`

## Retourneert

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## Voorbeeld

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
