[pantoken](../../../index.md) / figma

# figma

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

`@pantoken/figma` — փոխակերպել Instructure տոկենի IR-ը Figma Variables payload-ի։

Այն արտադրում է մեկ փոփոխական հավաքածու `light`/`dark` ռեժիմներով. գույնի տոկենները դառնում են `COLOR`
փոփոխականներ (RGBA 0–1), չափերը/թվերը դառնում են `FLOAT`, մնացածը `STRING`։ Պատկերները
բացառված են (նրանք կլինեին Figma բաղադրիչներ, ոչ փոփոխականներ): Սնուցել [toFigmaVariables](functions/toFigmaVariables.md)-ը Figma
պլագինի (Variables plugin API) կամ Variables REST API — README-ն ունի plugin glue:

## Ինտերֆեյսներ

- [FigmaColor](interfaces/FigmaColor.md)
- [FigmaVariable](interfaces/FigmaVariable.md)
- [FigmaVariablesPayload](interfaces/FigmaVariablesPayload.md)
- [ToFigmaOptions](interfaces/ToFigmaOptions.md)

## Ֆունկցիաներ

- [toFigmaColor](functions/toFigmaColor.md)
- [toFigmaVariables](functions/toFigmaVariables.md)

## Հղումներ

### default

Վերանվանում և վերաարտահանում [toFigmaVariables](functions/toFigmaVariables.md)
