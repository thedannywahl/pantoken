[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# फंक्शन: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Encode swatches as a Sketch palette object (serialize with `JSON.stringify`).

## पैरामीटर

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## वापसी

[`SketchPalette`](../interfaces/SketchPalette.md)

## उदाहरण

**Write a Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
