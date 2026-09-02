[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Hàm: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Tham số

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Trả về

[`SketchPalette`](../interfaces/SketchPalette.md)

## Ví dụ

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
