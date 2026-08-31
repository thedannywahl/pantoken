[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaVariables

# Function: toFigmaVariables()

> **toFigmaVariables**(`tokens`, `options?`): [`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Convertir una llista de tokens IR en una càrrega de Figma Variables.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

La IR (p. ex. de `@pantoken/tokens`).

### options?

[`ToFigmaOptions`](../interfaces/ToFigmaOptions.md) = `{}`

[ToFigmaOptions](../interfaces/ToFigmaOptions.md).

## Returns

[`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

Una [FigmaVariablesPayload](../interfaces/FigmaVariablesPayload.md).

## Examples

**Convertir el token IR a una càrrega de Variables**

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens); // { collection, modes, variables }
```

**Canviar el nom de la col·lecció i els modes**

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens, {
  collection: "Instructure Rebrand",
  modes: ["Light", "Dark"],
});
```
