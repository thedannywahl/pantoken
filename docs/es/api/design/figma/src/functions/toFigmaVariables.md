[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaVariables

# Función: toFigmaVariables()

> **toFigmaVariables**(`tokens`, `options?`): [`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Convert an IR token list into a Figma Variables payload.

## Parámetros

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### options?

[`ToFigmaOptions`](../interfaces/ToFigmaOptions.md) = `{}`

[ToFigmaOptions](../interfaces/ToFigmaOptions.md).

## Devuelve

[`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

A [FigmaVariablesPayload](../interfaces/FigmaVariablesPayload.md).

## Ejemplos

**Convert the token IR to a Variables payload**

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens); // { collection, modes, variables }
```

**Rename the collection and modes**

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens, {
  collection: "Instructure Rebrand",
  modes: ["Light", "Dark"],
});
```
