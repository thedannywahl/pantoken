[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toGpl

# Function: toGpl()

> **toGpl**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Kodér prøver som en GIMP `.gpl`-paletstring.

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Paletten.

### options?

[`ToGplOptions`](../interfaces/ToGplOptions.md) = `{}`

[ToGplOptions](../interfaces/ToGplOptions.md).

## Returns

`string`

## Examples

**Skriv en GIMP .gpl-palet**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.gpl", toGpl(swatches));
```

**Med et brugerdefineret palet navn**

```ts
import { swatches, toGpl } from "@pantoken/swatches";

const gpl = toGpl(swatches, { name: "Instructure Rebrand" });
```
