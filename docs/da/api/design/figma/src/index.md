[pantoken](../../../index.md) / figma

# figma

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/figma` — konverter Instructure token IR til en Figma Variables-payload.

Det producerer en variabelsamling med `light`/`dark` tilstande: farvetokens bliver til `COLOR`
variabler (RGBA 0–1), dimensioner/tal bliver til `FLOAT`, alt andet `STRING`. Ikoner er
eksluderet (de ville være Figma-komponenter, ikke variabler). Feed [toFigmaVariables](functions/toFigmaVariables.md) til et Figma-plugin
(Variables plugin API) eller Variables REST API — README'en har plugin-koden.

## Interfaces

- [FigmaColor](interfaces/FigmaColor.md)
- [FigmaVariable](interfaces/FigmaVariable.md)
- [FigmaVariablesPayload](interfaces/FigmaVariablesPayload.md)
- [ToFigmaOptions](interfaces/ToFigmaOptions.md)

## Funktioner

- [toFigmaColor](functions/toFigmaColor.md)
- [toFigmaVariables](functions/toFigmaVariables.md)

## Referencer

### default

Omdøber og geeksporterer [toFigmaVariables](functions/toFigmaVariables.md)
