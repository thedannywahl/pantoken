[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# دالة: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

ترميز العيّنات ككائن لوحة ألوان لـ Sketch (التسلسل باستخدام `JSON.stringify`).

## المعلمات

### swatches

للقراءة فقط [`Swatch`](../interfaces/Swatch.md)[]

لوحة الألوان.

## القيم المرجعة

[`SketchPalette`](../interfaces/SketchPalette.md)

## مثال

**كتابة ملف Sketch بامتداد .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
