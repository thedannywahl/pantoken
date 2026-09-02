[pantoken](../../../../index.md) / [formats/less/src](../index.md) / toLess

# Ֆունկցիա: toLess()

> **toLess**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Առաքել Less փոփոխականներ տոկեն IR-ի համար:

## Պարամետրեր

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### options?

[`ToLessOptions`](../interfaces/ToLessOptions.md) = `{}`

[ToLessOptions](../interfaces/ToLessOptions.md).

## Վերադարձվող արժեք

`string`

Less աղբյուրի հաղորդագիր:

## Օրինակներ

**Առաքել լռելյալ (թեթև) փոփոխականները**

```ts
import { toLess } from "@pantoken/less";
import { tokens } from "@pantoken/tokens";

toLess(tokens); // "@instui-color-brand: #0374b5;\n…"
```

**Լուծել մեկ այլ թեմայի암기 ռեժիմը**

```ts
import { toLess } from "@pantoken/less";
import { byTheme } from "@pantoken/tokens";

toLess(byTheme("canvas"), { mode: "dark" });
```
