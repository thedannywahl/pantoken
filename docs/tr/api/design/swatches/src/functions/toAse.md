[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Fonksiyon: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Parametreler

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Döndürür

`Uint8Array`

The ASE file as bytes.

## Örnek

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
