[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / pantokenPreset

# 变量: pantokenPreset

> `const` **pantokenPreset**: [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

The ready-made `rebrand` Panda preset.

## 示例

**Spread it into panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";

export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```
