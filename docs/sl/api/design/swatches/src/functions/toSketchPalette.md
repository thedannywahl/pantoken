[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Funkcija: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Parametri

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Vrne

[`SketchPalette`](../interfaces/SketchPalette.md)

## Primer

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
