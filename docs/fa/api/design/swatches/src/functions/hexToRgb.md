[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# تابع: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to 0–255 channels, or `undefined` if not a hex colour.

## پارامترها

### hex

`string`

## مقدار بازگشتی

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## نمونه

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
