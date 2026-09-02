[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# Swyddogaeth: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to 0–255 channels, or `undefined` if not a hex colour.

## Paramedrau

### hex

`string`

## Yn dychwelyd

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## Enghraifft

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
