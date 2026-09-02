[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Fungsi: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Parameter

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Mengembalikan

[`SketchPalette`](../interfaces/SketchPalette.md)

## Contoh

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
