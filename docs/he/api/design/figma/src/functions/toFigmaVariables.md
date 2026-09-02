[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaVariables

# פונקציה: toFigmaVariables()

> **toFigmaVariables**(`tokens`, `options?`): [`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Convert an IR token list into a Figma Variables payload.

## פרמטרים

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### options?

[`ToFigmaOptions`](../interfaces/ToFigmaOptions.md) = `{}`

[ToFigmaOptions](../interfaces/ToFigmaOptions.md).

## מחזיר

[`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

A [FigmaVariablesPayload](../interfaces/FigmaVariablesPayload.md).

## דוגמאות

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
