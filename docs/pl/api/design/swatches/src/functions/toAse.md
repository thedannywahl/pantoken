[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Funkcja: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Parametry

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Zwraca

`Uint8Array`

The ASE file as bytes.

## Przykład

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
