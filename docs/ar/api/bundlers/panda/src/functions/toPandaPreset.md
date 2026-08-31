[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / toPandaPreset

# Function: toPandaPreset()

> **toPandaPreset**(`tokens`): [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

بناء مسبقة Panda من رمز IR.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (على سبيل المثال من `@pantoken/tokens`).

## Returns

[`PandaPreset`](../interfaces/PandaPreset.md)

كائن مسبق لـ Panda's `definePreset`.

## Example

**بناء مسبقة من IR مخصص**

```ts
import { defineConfig } from "@pandacss/dev";
import { toPandaPreset } from "@pantoken/panda";
import { byTheme } from "@pantoken/tokens";

const preset = toPandaPreset(byTheme("rebrand"));
export default defineConfig({ presets: [preset] });
```
