[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / toPandaPreset

# Function: toPandaPreset()

> **toPandaPreset**(`tokens`): [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կառուցել Panda preset token IR-ից:

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

## Returns

[`PandaPreset`](../interfaces/PandaPreset.md)

Preset օբյեկտ Panda-ի `definePreset`-ի համար:

## Example

**Կառուցել preset custom IR-ից:**

```ts
import { defineConfig } from "@pandacss/dev";
import { toPandaPreset } from "@pantoken/panda";
import { byTheme } from "@pantoken/tokens";

const preset = toPandaPreset(byTheme("rebrand"));
export default defineConfig({ presets: [preset] });
```
