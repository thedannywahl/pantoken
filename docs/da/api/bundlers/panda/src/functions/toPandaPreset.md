[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / toPandaPreset

# Function: toPandaPreset()

> **toPandaPreset**(`tokens`): [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Byg et Panda-preset fra en token IR.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en (f.eks. fra `@pantoken/tokens`).

## Returns

[`PandaPreset`](../interfaces/PandaPreset.md)

Et preset-objekt til Pandas `definePreset`.

## Example

**Byg et preset fra en brugerdefineret IR**

```ts
import { defineConfig } from "@pandacss/dev";
import { toPandaPreset } from "@pantoken/panda";
import { byTheme } from "@pantoken/tokens";

const preset = toPandaPreset(byTheme("rebrand"));
export default defineConfig({ presets: [preset] });
```
