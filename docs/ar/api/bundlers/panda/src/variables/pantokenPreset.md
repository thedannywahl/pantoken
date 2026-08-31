[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / pantokenPreset

# Variable: pantokenPreset

> `const` **pantokenPreset**: [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

إعداد Panda المسبق الجاهز `rebrand`.

## Example

**انشره في panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";

export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```
