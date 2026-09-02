[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Fonksyon: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Paramèt

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Retounen

[`SketchPalette`](../interfaces/SketchPalette.md)

## Egzanp

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
