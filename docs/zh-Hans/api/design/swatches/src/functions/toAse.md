[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# 函数: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## 参数

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## 返回值

`Uint8Array`

The ASE file as bytes.

## 示例

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
