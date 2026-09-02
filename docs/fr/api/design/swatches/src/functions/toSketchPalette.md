[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Fonction: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## Paramètres

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Renvoie

[`SketchPalette`](../interfaces/SketchPalette.md)

## Exemple

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
