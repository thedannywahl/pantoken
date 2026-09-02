[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Funció: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Codificar mostres com a bytes ASE. Les mostres no hexadecimal s'omet.

## Paràmetres

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

La paleta.

## Retorna

`Uint8Array`

El fitxer ASE com a bytes.

## Exemple

**Escriure una paleta Adobe .ase**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
