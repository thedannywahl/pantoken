[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# Funksjon: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to 0–255 channels, or `undefined` if not a hex colour.

## Parametrar

### hex

`string`

## Returnerer

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## Døme

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
