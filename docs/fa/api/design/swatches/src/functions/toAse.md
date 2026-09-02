[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# تابع: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## پارامترها

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## مقدار بازگشتی

`Uint8Array`

The ASE file as bytes.

## نمونه

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
