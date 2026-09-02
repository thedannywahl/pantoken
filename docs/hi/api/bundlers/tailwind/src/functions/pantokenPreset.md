[pantoken](../../../../index.md) / [bundlers/tailwind/src](../index.md) / pantokenPreset

# फंक्शन: pantokenPreset()

> **pantokenPreset**(`options?`): [`TailwindPreset`](../interfaces/TailwindPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Build the pantoken Tailwind preset.

## पैरामीटर

### options?

[`PantokenPresetOptions`](../interfaces/PantokenPresetOptions.md) = `{}`

[PantokenPresetOptions](../interfaces/PantokenPresetOptions.md).

## वापसी

[`TailwindPreset`](../interfaces/TailwindPreset.md)

A Tailwind preset contributing `colors`, `spacing`, and `fontFamily`.

## उदाहरण

**Register the preset in tailwind.config.ts**

```ts
import { pantokenPreset } from "@pantoken/tailwind";

export default {
  presets: [pantokenPreset()],
  content: ["./src/**/*.{ts,tsx}"],
};
// then use utilities like `bg-color-background-base p-space-md`
```

**Also expose the primitive palette under a primitive- prefix**

```ts
import { pantokenPreset } from "@pantoken/tailwind";

export default {
  presets: [pantokenPreset({ includePrimitives: true })],
};
```
