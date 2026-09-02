[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Fušla: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Parametera

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Gullii / Gávdnat

[`SketchPalette`](../interfaces/SketchPalette.md)

## Exempel

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
