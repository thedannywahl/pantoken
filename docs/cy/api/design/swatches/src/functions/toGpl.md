[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toGpl

# Swyddogaeth: toGpl()

> **toGpl**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Encode swatches as a GIMP `.gpl` palette string.

## Paramedrau

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

### options?

[`ToGplOptions`](../interfaces/ToGplOptions.md) = `{}`

[ToGplOptions](../interfaces/ToGplOptions.md).

## Yn dychwelyd

`string`

## Enghreifftiau

**Write a GIMP .gpl palette**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.gpl", toGpl(swatches));
```

**With a custom palette name**

```ts
import { swatches, toGpl } from "@pantoken/swatches";

const gpl = toGpl(swatches, { name: "Instructure Rebrand" });
```
