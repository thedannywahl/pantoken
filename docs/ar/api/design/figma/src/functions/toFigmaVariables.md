[pantoken](../../../../index.md) / [design/figma/src](../index.md) / toFigmaVariables

# دالة: toFigmaVariables()

> **toFigmaVariables**(`tokens`, `options?`): [`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

حوّل قائمة رموز IR إلى حمولة Figma Variables.

## المعلمات

### tokens

للقراءة فقط [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

الـ IR (على سبيل المثال من `@pantoken/tokens`).

### options?

[`ToFigmaOptions`](../interfaces/ToFigmaOptions.md) = `{}`

[ToFigmaOptions](../interfaces/ToFigmaOptions.md).

## القيم المرجعة

[`FigmaVariablesPayload`](../interfaces/FigmaVariablesPayload.md)

حمولة [FigmaVariablesPayload](../interfaces/FigmaVariablesPayload.md).

## أمثلة

**حوّل IR الرموز إلى حمولة Variables**

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens); // { collection, modes, variables }
```

**أعد تسمية المجموعة والأوضاع**

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens, {
  collection: "Instructure Rebrand",
  modes: ["Light", "Dark"],
});
```
