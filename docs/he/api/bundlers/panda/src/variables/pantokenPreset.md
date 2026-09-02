[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / pantokenPreset

# משתנה: pantokenPreset

> `const` **pantokenPreset**: [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

The ready-made `rebrand` Panda preset.

## דוגמה

**Spread it into panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";

export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```
