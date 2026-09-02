[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaVariables

# Funzione: toFigmaVariables()

> **toFigmaVariables**(`tokens`, `options?`): [`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Convert an IR token list into a Figma Variables payload.

## Parametri

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### options?

[`ToFigmaOptions`](../interfaces/ToFigmaOptions.md) = `{}`

[ToFigmaOptions](../interfaces/ToFigmaOptions.md).

## Restituisce

[`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

A [FigmaVariablesPayload](../interfaces/FigmaVariablesPayload.md).

## Esempi

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
