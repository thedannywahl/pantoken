[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / pantokenPreset

# Variabel: pantokenPreset

> `const` **pantokenPreset**: [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Det færdiglavede `rebrand` Panda preset.

## Eksempel

**Spred det ind i panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";

export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```
