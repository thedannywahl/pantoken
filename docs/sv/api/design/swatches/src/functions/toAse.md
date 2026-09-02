[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Funktion: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Parametrar

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Returnerar

`Uint8Array`

The ASE file as bytes.

## Exempel

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
