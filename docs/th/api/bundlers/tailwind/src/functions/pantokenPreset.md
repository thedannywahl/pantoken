[pantoken](../../../../index.md) / [bundlers/tailwind/src](../index.md) / pantokenPreset

# ฟังก์ชัน: pantokenPreset()

> **pantokenPreset**(`options?`): [`TailwindPreset`](../interfaces/TailwindPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Build the pantoken Tailwind preset.

## พารามิเตอร์

### options?

[`PantokenPresetOptions`](../interfaces/PantokenPresetOptions.md) = `{}`

[PantokenPresetOptions](../interfaces/PantokenPresetOptions.md).

## คืนค่า

[`TailwindPreset`](../interfaces/TailwindPreset.md)

A Tailwind preset contributing `colors`, `spacing`, and `fontFamily`.

## ตัวอย่าง

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
