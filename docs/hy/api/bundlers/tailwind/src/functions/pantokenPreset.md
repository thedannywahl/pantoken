[pantoken](../../../../index.md) / [bundlers/tailwind/src](../index.md) / pantokenPreset

# Function: pantokenPreset()

> **pantokenPreset**(`options?`): [`TailwindPreset`](../interfaces/TailwindPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կառուցել pantoken Tailwind նախածանցը:

## Parameters

### options?

[`PantokenPresetOptions`](../interfaces/PantokenPresetOptions.md) = `{}`

[PantokenPresetOptions](../interfaces/PantokenPresetOptions.md).

## Returns

[`TailwindPreset`](../interfaces/TailwindPreset.md)

Tailwind նախածանց, որը նպաստում է `colors`, `spacing`, և `fontFamily`-ին:

## Examples

**Գրանցեք նախածանցը tailwind.config.ts-ում**

```ts
import { pantokenPreset } from "@pantoken/tailwind";

export default {
  presets: [pantokenPreset()],
  content: ["./src/**/*.{ts,tsx}"],
};
// then use utilities like `bg-color-background-base p-space-md`
```

**Նաև բացահայտեք պարզունակ պալիտրան primitive- նախածանցի տակ**

```ts
import { pantokenPreset } from "@pantoken/tailwind";

export default {
  presets: [pantokenPreset({ includePrimitives: true })],
};
```
