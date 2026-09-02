[pantoken](../../../../index.md) / [bundlers/tailwind/src](../index.md) / pantokenPreset

# 函式: pantokenPreset()

> **pantokenPreset**(`options?`): [`TailwindPreset`](../interfaces/TailwindPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Build the pantoken Tailwind preset.

## 參數

### options?

[`PantokenPresetOptions`](../interfaces/PantokenPresetOptions.md) = `{}`

[PantokenPresetOptions](../interfaces/PantokenPresetOptions.md).

## 回傳

[`TailwindPreset`](../interfaces/TailwindPreset.md)

A Tailwind preset contributing `colors`, `spacing`, and `fontFamily`.

## 範例

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
