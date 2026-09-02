[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSketchPalette

# Ֆունկցիա: toSketchPalette()

> **toSketchPalette**(`swatches`): [`SketchPalette`](../interfaces/SketchPalette.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Կոդավորել նմուշները որպես Sketch գունապնակի օբյեկտ (հաջորդականացնել `JSON.stringify`-ով)։

## Պարամետրեր

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Գունապնակը։

## Վերադարձվող արժեք

[`SketchPalette`](../interfaces/SketchPalette.md)

## Օրինակ

**Գրել Sketch .sketchpalette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSketchPalette } from "@pantoken/swatches";

writeFileSync("instructure.sketchpalette", JSON.stringify(toSketchPalette(swatches)));
```
