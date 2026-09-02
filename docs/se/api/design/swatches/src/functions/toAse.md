[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Fušla: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Parametera

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Gullii / Gávdnat

`Uint8Array`

The ASE file as bytes.

## Exempel

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
