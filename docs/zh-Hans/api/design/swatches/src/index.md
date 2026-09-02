[pantoken](../../../index.md) / swatches

# swatches

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

`@pantoken/swatches` — export Instructure colours as designer swatch palettes.

Swatches are a flat reduction of the tokens to named colours, delivered *directly to a designer*
to import into their tool. This is not an interchange format (use `@pantoken/dtcg` or
`@pantoken/figma` for that) — it's a terminal palette file: Adobe ASE, GIMP `.gpl`, or Sketch
`.sketchpalette`.

## 接口

- [ToGplOptions](interfaces/ToGplOptions.md)
- [Swatch](interfaces/Swatch.md)
- [Rgb](interfaces/Rgb.md)
- [SketchPalette](interfaces/SketchPalette.md)
- [ToSvgOptions](interfaces/ToSvgOptions.md)

## 类型别名

- [Mode](type-aliases/Mode.md)

## 变量

- [swatches](variables/swatches.md)

## 函数

- [toAse](functions/toAse.md)
- [toGpl](functions/toGpl.md)
- [hexToRgb](functions/hexToRgb.md)
- [toSwatches](functions/toSwatches.md)
- [toSketchPalette](functions/toSketchPalette.md)
- [toSvg](functions/toSvg.md)
