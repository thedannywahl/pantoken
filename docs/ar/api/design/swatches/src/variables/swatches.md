[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / swatches

# Variable: swatches

> `const` **swatches**: [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

عينات اللون `rebrand` (اللوحة الافتراضية).

## Example

**ترميز اللوحة الجاهزة بأي تنسيق**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
writeFileSync("instructure.gpl", toGpl(swatches));
```
