[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# 함수: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## 매개변수

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## 반환값

[`SketchPalette`](../interfaces/SketchPalette.md)

## 예제

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
