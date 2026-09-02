[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / pantokenPreset

# Փոփոխական: pantokenPreset

> `const` **pantokenPreset**: [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Պատրաստի `rebrand` Panda նախածանց:

## Օրինակ

**Ներգրավել այն panda.config.ts-ի մեջ**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";

export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```
