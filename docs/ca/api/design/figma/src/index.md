[pantoken](../../../index.md) / figma

# figma

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/figma` — convertir el token IR de Instructure en una càrrega de Figma Variables.

Produeix una col·lecció de variables amb modes `light`/`dark`: els tokens de color es converteixen en `COLOR`
variables (RGBA 0–1), les dimensions/números es converteixen en `FLOAT`, tot el que no és `STRING`. Les icones
estan excloses (serien components Figma, no variables). Alimenteu [toFigmaVariables](functions/toFigmaVariables.md) a un
complement Figma (l'API del plugin de Variables) o l'API de Variables REST — el README té el pegat del plugin.

## Interfaces

- [FigmaColor](interfaces/FigmaColor.md)
- [FigmaVariable](interfaces/FigmaVariable.md)
- [FigmaVariablesPayload](interfaces/FigmaVariablesPayload.md)
- [ToFigmaOptions](interfaces/ToFigmaOptions.md)

## Functions

- [toFigmaColor](functions/toFigmaColor.md)
- [toFigmaVariables](functions/toFigmaVariables.md)

## References

### default

Canvia el nom i re-exporta [toFigmaVariables](functions/toFigmaVariables.md)
