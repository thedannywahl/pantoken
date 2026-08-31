[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaVariables

# Function: toFigmaVariables()

> **toFigmaVariables**(`tokens`, `options?`): [`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

تحويل قائمة IR token إلى Figma Variables payload.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (على سبيل المثال من `@pantoken/tokens`).

### options?

[`ToFigmaOptions`](../interfaces/ToFigmaOptions.md) = `{}`

[ToFigmaOptions](../interfaces/ToFigmaOptions.md).

## Returns

[`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

A [FigmaVariablesPayload](../interfaces/FigmaVariablesPayload.md).

## Examples

**تحويل token IR إلى Variables payload**

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens); // { collection, modes, variables }
```

**إعادة تسمية المجموعة والأوضاع**

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens, {
  collection: "Instructure Rebrand",
  modes: ["Light", "Dark"],
});
```
