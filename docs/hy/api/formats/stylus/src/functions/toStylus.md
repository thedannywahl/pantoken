[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / toStylus

# Function: toStylus()

> **toStylus**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ստեղծել Stylus փոփոխականներ token IR-ի համար։

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### options?

[`ToStylusOptions`](../interfaces/ToStylusOptions.md) = `{}`

[ToStylusOptions](../interfaces/ToStylusOptions.md).

## Returns

`string`

Stylus աղբյուրի տողը։

## Examples

**Առաքել լռելյալ (թեթև) փոփոխականները**

```ts
import { toStylus } from "@pantoken/stylus";
import { tokens } from "@pantoken/tokens";

toStylus(tokens); // "instui-color-brand = #0374b5\n…"
```

**Լուծել մեկ այլ թեմայի암기 ռեժիմը**

```ts
import { toStylus } from "@pantoken/stylus";
import { byTheme } from "@pantoken/tokens";

toStylus(byTheme("canvas"), { mode: "dark" });
```
