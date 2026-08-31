[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Function: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Codificar mostres com a bytes ASE. Les mostres no hexadecimal s'omet.

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

La paleta.

## Returns

`Uint8Array`

El fitxer ASE com a bytes.

## Example

**Escriure una paleta Adobe .ase**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
