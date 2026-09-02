[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Fonksiyon: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Parametreler

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Döndürür

[`SketchPalette`](../interfaces/SketchPalette.md)

## Örnek

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
