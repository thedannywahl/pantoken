[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toGpl

# Fonction: toGpl()

> **toGpl**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Encode swatches as a GIMP `.gpl` palette string.

## Paramètres

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette.

### options?

[`ToGplOptions`](../interfaces/ToGplOptions.md) = `{}`

[ToGplOptions](../interfaces/ToGplOptions.md).

## Retourne

`string`

## Exemples

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
