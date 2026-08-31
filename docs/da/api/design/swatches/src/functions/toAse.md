[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Function: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Kodér prøver som ASE-bytes. Ikke-hex-prøver springes over.

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Paletten.

## Returns

`Uint8Array`

ASE-filen som bytes.

## Example

**Skriv en Adobe .ase-palet**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
