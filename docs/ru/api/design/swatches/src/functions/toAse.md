[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toAse

# Функция: toAse()

> **toAse**(`swatches`): `Uint8Array`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Encode swatches as ASE bytes. Non-hex swatches are skipped.

## Параметры

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

## Возвращаемое значение

`Uint8Array`

The ASE file as bytes.

## Пример

**Write an Adobe .ase palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
```
