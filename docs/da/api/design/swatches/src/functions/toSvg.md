[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSvg

# Funktion: toSvg()

> **toSvg**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Gengiv prøver som et grupperet SVG-prøveark.

## Parametre

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Paletten (f.eks. fra `toSwatches`).

### options?

[`ToSvgOptions`](../interfaces/ToSvgOptions.md) = `{}`

[ToSvgOptions](../interfaces/ToSvgOptions.md).

## Returnerer

`string`

SVG-dokumentet som en streng.

## Eksempler

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
