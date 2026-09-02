[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# ฟังก์ชัน: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## พารามิเตอร์

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## คืนค่า

[`SketchPalette`](../interfaces/SketchPalette.md)

## ตัวอย่าง

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
