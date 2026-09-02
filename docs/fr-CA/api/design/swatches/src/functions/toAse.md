[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Fonction: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Paramètres

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Retourne

`Uint8Array`

The ASE file as bytes.

## Exemple

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
