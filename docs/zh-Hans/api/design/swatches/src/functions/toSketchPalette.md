[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# 函数: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## 参数

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## 返回值

[`SketchPalette`](../interfaces/SketchPalette.md)

## 示例

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
