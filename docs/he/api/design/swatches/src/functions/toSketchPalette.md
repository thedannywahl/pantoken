[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# פונקציה: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## פרמטרים

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## מחזיר

[`SketchPalette`](../interfaces/SketchPalette.md)

## דוגמה

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
