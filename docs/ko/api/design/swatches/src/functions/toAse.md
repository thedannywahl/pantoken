[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# 함수: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## 매개변수

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## 반환값

`Uint8Array`

The ASE file as bytes.

## 예제

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
