[pantoken](../../../../index.md) / [bundlers/tailwind/src](../index.md) / pantokenPreset

# Function: pantokenPreset()

> **pantokenPreset**(`options?`): [`TailwindPreset`](../interfaces/TailwindPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

بناء إعداد Tailwind المسبق لـ pantoken.

## Parameters

### options?

[`PantokenPresetOptions`](../interfaces/PantokenPresetOptions.md) = `{}`

[PantokenPresetOptions](../interfaces/PantokenPresetOptions.md).

## Returns

[`TailwindPreset`](../interfaces/TailwindPreset.md)

إعداد Tailwind مسبق يساهم في `colors`، `spacing`، و `fontFamily`.

## Examples

**سجل الإعداد المسبق في tailwind.config.ts**

```ts
import { pantokenPreset } from "@pantoken/tailwind";

export default {
  presets: [pantokenPreset()],
  content: ["./src/**/*.{ts,tsx}"],
};
// then use utilities like `bg-color-background-base p-space-md`
```

**كما يمكن فضح لوحة الألوان الأساسية تحت بادئة primitive-**

```ts
import { pantokenPreset } from "@pantoken/tailwind";

export default {
  presets: [pantokenPreset({ includePrimitives: true })],
};
```
