[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toGpl

# Funktion: toGpl()

> **toGpl**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Kodér prøver som en GIMP `.gpl`-paletstring.

## Parametre

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Paletten.

### options?

[`ToGplOptions`](../interfaces/ToGplOptions.md) = `{}`

[ToGplOptions](../interfaces/ToGplOptions.md).

## Returnerer

`string`

## Eksempler

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
