[pantoken](../../../index.md) / swatches

# swatches

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

`@pantoken/swatches` — export Instructure colours as designer swatch palettes.

Swatches are a flat reduction of the tokens to named colours, delivered *directly to a designer*
to import into their tool. This is not an interchange format (use `@pantoken/dtcg` or
`@pantoken/figma` for that) — it's a terminal palette file: Adobe ASE, GIMP `.gpl`, or Sketch
`.sketchpalette`.

## Интерфейсы

- [ToGplOptions](interfaces/ToGplOptions.md)
- [Swatch](interfaces/Swatch.md)
- [Rgb](interfaces/Rgb.md)
- [SketchPalette](interfaces/SketchPalette.md)
- [ToSvgOptions](interfaces/ToSvgOptions.md)

## Псевдонимы типов

- [Mode](type-aliases/Mode.md)

## Переменные

- [swatches](variables/swatches.md)

## Функции

- [toAse](functions/toAse.md)
- [toGpl](functions/toGpl.md)
- [hexToRgb](functions/hexToRgb.md)
- [toSwatches](functions/toSwatches.md)
- [toSketchPalette](functions/toSketchPalette.md)
- [toSvg](functions/toSvg.md)
