[pantoken](../../../../index.md) / [bundlers/tailwind/src](../index.md) / pantokenPreset

# Function: pantokenPreset()

> **pantokenPreset**(`options?`): [`TailwindPreset`](../interfaces/TailwindPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Construïu el preset de Tailwind de pantoken.

## Parameters

### options?

[`PantokenPresetOptions`](../interfaces/PantokenPresetOptions.md) = `{}`

[PantokenPresetOptions](../interfaces/PantokenPresetOptions.md).

## Returns

[`TailwindPreset`](../interfaces/TailwindPreset.md)

Un preset de Tailwind que contribueix `colors`, `spacing` i `fontFamily`.

## Examples

**Registreu el preset a tailwind.config.ts**

```ts
import { pantokenPreset } from "@pantoken/tailwind";

export default {
  presets: [pantokenPreset()],
  content: ["./src/**/*.{ts,tsx}"],
};
// then use utilities like `bg-color-background-base p-space-md`
```

**Exponeu també la paleta primitiva sota un prefix primitiu-**

```ts
import { pantokenPreset } from "@pantoken/tailwind";

export default {
  presets: [pantokenPreset({ includePrimitives: true })],
};
```
