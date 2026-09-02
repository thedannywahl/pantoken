[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Funktion: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Kodér prøver som et Sketch-palet-objekt (serialiser med `JSON.stringify`).

## Parametre

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Paletten.

## Returnerer

[`SketchPalette`](../interfaces/SketchPalette.md)

## Eksempel

**Skriv en Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
