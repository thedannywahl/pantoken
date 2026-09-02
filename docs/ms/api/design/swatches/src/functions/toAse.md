[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Fungsi: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Parameter

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Mengembalikan

`Uint8Array`

The ASE file as bytes.

## Contoh

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
