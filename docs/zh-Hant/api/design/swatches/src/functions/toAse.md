[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# 函式: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## 參數

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## 回傳

`Uint8Array`

The ASE file as bytes.

## 範例

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
