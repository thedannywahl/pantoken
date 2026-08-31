[pantoken](../../../index.md) / swatches

# swatches

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/swatches` — eksportér Instructure-farver som designerprøvepaletter.

Prøver er en flad reduktion af tokens til navngivne farver, leveret _direkte til en designer_
for at importere til deres værktøj. Dette er ikke et udvekslingsformat (brug `@pantoken/dtcg` eller
`@pantoken/figma` til det) — det er en terminalpalettfil: Adobe ASE, GIMP `.gpl`, eller Sketch
`.sketchpalette`.

## Interfaces

- [ToGplOptions](interfaces/ToGplOptions.md)
- [Swatch](interfaces/Swatch.md)
- [Rgb](interfaces/Rgb.md)
- [SketchPalette](interfaces/SketchPalette.md)
- [ToSvgOptions](interfaces/ToSvgOptions.md)

## Type Aliases

- [Mode](type-aliases/Mode.md)

## Variables

- [swatches](variables/swatches.md)

## Functions

- [toAse](functions/toAse.md)
- [toGpl](functions/toGpl.md)
- [hexToRgb](functions/hexToRgb.md)
- [toSwatches](functions/toSwatches.md)
- [toSketchPalette](functions/toSketchPalette.md)
- [toSvg](functions/toSvg.md)
