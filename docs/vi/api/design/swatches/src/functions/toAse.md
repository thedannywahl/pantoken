[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Hàm: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Tham số

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Trả về

`Uint8Array`

The ASE file as bytes.

## Ví dụ

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
