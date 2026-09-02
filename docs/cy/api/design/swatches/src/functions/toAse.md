[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Swyddogaeth: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Paramedrau

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Yn dychwelyd

`Uint8Array`

The ASE file as bytes.

## Enghraifft

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
