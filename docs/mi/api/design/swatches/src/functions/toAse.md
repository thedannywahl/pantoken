[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Mahi: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Ngā Tawhā

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Whakahokia

`Uint8Array`

The ASE file as bytes.

## Tauira

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
