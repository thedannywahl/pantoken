[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / hexToRgb

# دالة: hexToRgb()

> **hexToRgb**(`hex`): [`Rgb`](../interfaces/Rgb.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

قم بتحليل `#rgb`/`#rrggbb`/`#rrggbbaa` إلى قنوات 0–255، أو `undefined` إذا لم يكن لونًا سداسيًا.

## المعلمات

### hex

`string`

## القيم المرجعة

[`Rgb`](../interfaces/Rgb.md) \| `undefined`

## مثال

```ts
import { hexToRgb } from "@pantoken/swatches";

hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
hexToRgb("nope"); // undefined
```
