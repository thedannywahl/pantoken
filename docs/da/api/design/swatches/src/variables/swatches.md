[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / swatches

# Variabel: swatches

> `const` **swatches**: [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

De `rebrand` farveprøver (standardpaletten).

## Eksempel

**Kodér den klar-til-brug palett til ethvert format**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
writeFileSync("instructure.gpl", toGpl(swatches));
```
