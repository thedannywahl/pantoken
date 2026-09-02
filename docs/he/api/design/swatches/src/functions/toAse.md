[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# פונקציה: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## פרמטרים

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## מחזיר

`Uint8Array`

The ASE file as bytes.

## דוגמה

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
