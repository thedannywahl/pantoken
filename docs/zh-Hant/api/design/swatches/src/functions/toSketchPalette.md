[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# 函式: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## 參數

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## 回傳

[`SketchPalette`](../interfaces/SketchPalette.md)

## 範例

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
