[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# 関数: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## パラメーター

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## 戻り値

[`SketchPalette`](../interfaces/SketchPalette.md)

## 例

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
