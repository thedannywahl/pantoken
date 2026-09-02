[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Funktion: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Kodér prøver som ASE-bytes. Ikke-hex-prøver springes over.

## Parametre

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Paletten.

## Returnerer

`Uint8Array`

ASE-filen som bytes.

## Eksempel

**Skriv en Adobe .ase-palet**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
