[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Funzione: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Parametri

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Restituisce

[`SketchPalette`](../interfaces/SketchPalette.md)

## Esempio

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
