[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / pantokenPreset

# متغير: pantokenPreset

> `const` **pantokenPreset**: [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

الإعداد المسبق الجاهز `rebrand` من Panda.

## مثال

**ادمجه في panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";

export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```
