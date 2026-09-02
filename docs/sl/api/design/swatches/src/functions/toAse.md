[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Funkcija: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Parametri

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Vrne

`Uint8Array`

The ASE file as bytes.

## Primer

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
