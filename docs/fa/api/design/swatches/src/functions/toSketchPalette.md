[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# تابع: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## پارامترها

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## مقدار بازگشتی

[`SketchPalette`](../interfaces/SketchPalette.md)

## نمونه

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
