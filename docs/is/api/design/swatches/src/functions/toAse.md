[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Fall: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Færibreytur

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Skilar

`Uint8Array`

The ASE file as bytes.

## Dæmi

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
