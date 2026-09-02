[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toGpl

# Funció: toGpl()

> **toGpl**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Codificar mostres com a una cadena de paleta GIMP `.gpl`.

## Paràmetres

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

La paleta.

### options?

[`ToGplOptions`](../interfaces/ToGplOptions.md) = `{}`

[ToGplOptions](../interfaces/ToGplOptions.md).

## Retorna

`string`

## Exemples

**Escriure una paleta GIMP .gpl**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.gpl", toGpl(swatches));
```

**Amb un nom de paleta personalitzat**

```ts
import { swatches, toGpl } from "@pantoken/swatches";

const gpl = toGpl(swatches, { name: "Instructure Rebrand" });
```
