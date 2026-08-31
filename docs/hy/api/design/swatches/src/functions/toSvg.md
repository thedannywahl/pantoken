[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSvg

# Function: toSvg()

> **toSvg**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ցուցադրել նմուշները որպես խմբավորված SVG նմուշային թերթ։

## Parameters

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Գունապնակը (օր.՝ `toSwatches`-ից)։

### options?

[`ToSvgOptions`](../interfaces/ToSvgOptions.md) = `{}`

[ToSvgOptions](../interfaces/ToSvgOptions.md).

## Returns

`string`

SVG փաստաթուղթը որպես տող։

## Examples

**Ցուցադրել նմուշային թերթ README-ի համար**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toSvg } from "@pantoken/swatches";

writeFileSync("palette.svg", toSvg(swatches));
```

**Նմուշ միայն հիմնական գունապնակը, վերնագրով և ավելի լայն ցանցով**

```ts
import { swatches, toSvg } from "@pantoken/swatches";

const core = swatches.filter((s) => !s.name.startsWith("primitive-"));
const svg = toSvg(core, { title: "Instructure core colors", columns: 8 });
```
