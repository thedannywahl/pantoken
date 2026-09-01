[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaColor

# دالة: toFigmaColor()

> **toFigmaColor**(`hex`): [`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

قم بتحليل `#rgb`/`#rrggbb`/`#rrggbbaa` إلى صيغة RGBA الخاصة بـ Figma (0–1)، أو `undefined` إذا لم تكن قيمة لون سداسية.

## المعلمات

### hex

`string`

## القيم المرجعة

[`FigmaColor`](../interfaces/FigmaColor.md) \| `undefined`

## مثال

```ts
import { toFigmaColor } from "@pantoken/figma";

toFigmaColor("#ff0000"); // { r: 1, g: 0, b: 0, a: 1 }
toFigmaColor("not-a-color"); // undefined
```
