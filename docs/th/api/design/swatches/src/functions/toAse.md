[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# ฟังก์ชัน: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## พารามิเตอร์

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## คืนค่า

`Uint8Array`

The ASE file as bytes.

## ตัวอย่าง

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
