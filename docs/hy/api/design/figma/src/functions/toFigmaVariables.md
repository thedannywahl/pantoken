[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaVariables

# Function: toFigmaVariables()

> **toFigmaVariables**(`tokens`, `options?`): [`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Փոխակերպել IR տոկենի ցանկը Figma Variables payload-ի։

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### options?

[`ToFigmaOptions`](../interfaces/ToFigmaOptions.md) = `{}`

[ToFigmaOptions](../interfaces/ToFigmaOptions.md).

## Returns

[`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

Մի [FigmaVariablesPayload](../interfaces/FigmaVariablesPayload.md)։

## Examples

**Փոխակերպել տոկենի IR-ը Variables payload-ի**

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens); // { collection, modes, variables }
```

**Վերանվանել հավաքածուն և ռեժիմները**

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens, {
  collection: "Instructure Rebrand",
  modes: ["Light", "Dark"],
});
```
