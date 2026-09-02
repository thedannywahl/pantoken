[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSvg

# Fonksyon: toSvg()

> **toSvg**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Render swatches as a grouped SVG specimen sheet.

## Paramèt

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

The palette (e.g. from `toSwatches`).

### options?

[`ToSvgOptions`](../interfaces/ToSvgOptions.md) = `{}`

[ToSvgOptions](../interfaces/ToSvgOptions.md).

## Retounen

`string`

The SVG document as a string.

## Egzanp

**Render a specimen sheet for a README**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSvg } from "@pantoken/swatches";

writeFileSync("palette.svg", toSvg(swatches));
```

**Specimen only the core palette, with a title and wider grid**

```ts
import { swatches, toSvg } from "@pantoken/swatches";

const core = swatches.filter((s) => !s.name.startsWith("primitive-"));
const svg = toSvg(core, { title: "Instructure core colors", columns: 8 });
```
