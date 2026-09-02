[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Function: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Returns

`Uint8Array`

The ASE file as bytes.

## Example

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
