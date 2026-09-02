[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# 関数: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## パラメーター

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## 戻り値

`Uint8Array`

The ASE file as bytes.

## 例

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
