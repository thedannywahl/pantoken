[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSvg

# Function: toSvg()

> **toSvg**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Renderitzar mostres com a una fullana de mostra SVG agrupada.

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

La paleta (p. ex., de `toSwatches`).

### options?

[`ToSvgOptions`](../interfaces/ToSvgOptions.md) = `{}`

[ToSvgOptions](../interfaces/ToSvgOptions.md).

## Returns

`string`

El document SVG com a cadena.

## Examples

**Renderitzar una fullana de mostra per a un README**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSvg } from "@pantoken/swatches";

writeFileSync("palette.svg", toSvg(swatches));
```

**Mostrar només la paleta principal, amb un títol i una graella més ampla**

```ts
import { swatches, toSvg } from "@pantoken/swatches";

const core = swatches.filter((s) => !s.name.startsWith("primitive-"));
const svg = toSvg(core, { title: "Instructure core colors", columns: 8 });
```
