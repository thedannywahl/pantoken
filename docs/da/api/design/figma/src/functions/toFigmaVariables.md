[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaVariables

# Funktion: toFigmaVariables()

> **toFigmaVariables**(`tokens`, `options?`): [`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Konverter en IR-tokenliste til en Figma Variables-payload.

## Parametre

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en (f.eks. fra `@pantoken/tokens`).

### options?

[`ToFigmaOptions`](../interfaces/ToFigmaOptions.md) = `{}`

[ToFigmaOptions](../interfaces/ToFigmaOptions.md).

## Returnerer

[`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

En [FigmaVariablesPayload](../interfaces/FigmaVariablesPayload.md).

## Eksempler

**Konverter token-IR til en Variables-payload**

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens); // { collection, modes, variables }
```

**Omdøb samlingen og tilstandene**

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens, {
  collection: "Instructure Rebrand",
  modes: ["Light", "Dark"],
});
```
