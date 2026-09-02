[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Funció: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Codificar mostres com a un objecte de paleta Sketch (serialitzar amb `JSON.stringify`).

## Paràmetres

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

La paleta.

## Retorna

[`SketchPalette`](../interfaces/SketchPalette.md)

## Exemple

**Escriure un .sketchpalette de Sketch**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
