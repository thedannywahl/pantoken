[pantoken](../../../../index.md) / [bundlers/tailwind/src](../index.md) / pantokenPreset

# دالة: pantokenPreset()

> **pantokenPreset**(`options?`): [`TailwindPreset`](../interfaces/TailwindPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

بناء إعداد pantoken المسبق لـ Tailwind.

## المعلمات

### options?

[`PantokenPresetOptions`](../interfaces/PantokenPresetOptions.md) = `{}`

[PantokenPresetOptions](../interfaces/PantokenPresetOptions.md).

## القيم المرجعة

[`TailwindPreset`](../interfaces/TailwindPreset.md)

إعداد مسبق لـ Tailwind يضيف `colors` و `spacing` و `fontFamily`.

## أمثلة

**سجل الإعداد المسبق في tailwind.config.ts**

```ts
import { pantokenPreset } from "@pantoken/tailwind";

export default {
  presets: [pantokenPreset()],
  content: ["./src/**/*.{ts,tsx}"],
};
// then use utilities like `bg-color-background-base p-space-md`
```

**اعرض أيضًا لوحة الألوان primitive تحت بادئة primitive-**

```ts
import { pantokenPreset } from "@pantoken/tailwind";

export default {
  presets: [pantokenPreset({ includePrimitives: true })],
};
```
