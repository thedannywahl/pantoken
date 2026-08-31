[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSvg

# Function: toSvg()

> **toSvg**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Gengiv prøver som et grupperet SVG-prøveark.

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Paletten (f.eks. fra `toSwatches`).

### options?

[`ToSvgOptions`](../interfaces/ToSvgOptions.md) = `{}`

[ToSvgOptions](../interfaces/ToSvgOptions.md).

## Returns

`string`

SVG-dokumentet som en streng.

## Examples

**Gengiv et prøveark til en README**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSvg } from "@pantoken/swatches";

writeFileSync("palette.svg", toSvg(swatches));
```

**Prøve kun kernepeletten, med en titel og bredere gitter**

```ts
import { swatches, toSvg } from "@pantoken/swatches";

const core = swatches.filter((s) => !s.name.startsWith("primitive-"));
const svg = toSvg(core, { title: "Instructure core colors", columns: 8 });
```
