[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toGpl

# Ֆունկցիա: toGpl()

> **toGpl**(`swatches`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Կոդավորել նմուշները որպես GIMP `.gpl` գունապնակի տող։

## Պարամետրեր

### swatches

readonly [`Swatch`](../interfaces/Swatch.md)[]

Գունապնակը։

### options?

[`ToGplOptions`](../interfaces/ToGplOptions.md) = `{}`

[ToGplOptions](../interfaces/ToGplOptions.md).

## Վերադարձվող արժեք

`string`

## Օրինակներ

**Գրել GIMP .gpl գունապնակ**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.gpl", toGpl(swatches));
```

**Հատուկ գունապնակի անվամբ**

```ts
import { swatches, toGpl } from "@pantoken/swatches";

const gpl = toGpl(swatches, { name: "Instructure Rebrand" });
```
