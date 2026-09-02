[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# फंक्शन: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to 0–255 channels, or `undefined` if not a hex colour.

## पैरामीटर

### hex

`string`

## वापसी

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## उदाहरण

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
