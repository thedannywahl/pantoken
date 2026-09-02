[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / pantokenPreset

# 變數: pantokenPreset

> `const` **pantokenPreset**: [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

The ready-made `rebrand` Panda preset.

## 範例

**Spread it into panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";

export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```
