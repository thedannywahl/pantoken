[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Feidhm: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Paraiméadair

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Tuairisceáin

`Uint8Array`

The ASE file as bytes.

## Sampla

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
