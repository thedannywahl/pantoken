[pantoken](../../../index.md) / figma

# figma

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

`@pantoken/figma` — convert the Instructure token IR into a Figma Variables payload.

It produces one variable collection with `light`/`dark` modes: colour tokens become `COLOR`
variables (RGBA 0–1), dimensions/numbers become `FLOAT`, everything else `STRING`. Icons are
excluded (they'd be Figma components, not variables). Feed [toFigmaVariables](functions/toFigmaVariables.md) to a Figma
plugin (the Variables plugin API) or the Variables REST API — the README has the plugin glue.

## 接口

- [FigmaColor](interfaces/FigmaColor.md)
- [FigmaVariable](interfaces/FigmaVariable.md)
- [FigmaVariablesPayload](interfaces/FigmaVariablesPayload.md)
- [ToFigmaOptions](interfaces/ToFigmaOptions.md)

## 函数

- [toFigmaColor](functions/toFigmaColor.md)
- [toFigmaVariables](functions/toFigmaVariables.md)

## 引用

### default

Renames and re-exports [toFigmaVariables](functions/toFigmaVariables.md)
