[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / swatches

# 變數: swatches

> `const` **swatches**: [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

The `rebrand` colour swatches (the default palette).

## 範例

**Encode the ready-made palette to any format**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
writeFileSync("instructure.gpl", toGpl(swatches));
```
