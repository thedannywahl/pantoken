[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / swatches

# Variable: swatches

> `const` **swatches**: [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Les mostres de color `rebrand` (la paleta per defecte).

## Example

**Codificar la paleta prefabricada a qualsevol format**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
writeFileSync("instructure.gpl", toGpl(swatches));
```
