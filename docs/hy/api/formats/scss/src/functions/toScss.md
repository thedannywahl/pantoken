[pantoken](../../../../index.md) / [formats/scss/src](../index.md) / toScss

# Function: toScss()

> **toScss**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ստեղծել SCSS փոփոխականներ token IR-ի համար։

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### options?

[`ToScssOptions`](../interfaces/ToScssOptions.md) = `{}`

[ToScssOptions](../interfaces/ToScssOptions.md).

## Returns

`string`

SCSS աղբյուրի տողը։

## Examples

**Առաքել լռելյալ (թեթև) փոփոխականները**

```ts
import { toScss } from "@pantoken/scss";
import { tokens } from "@pantoken/tokens";

toScss(tokens); // "$instui-color-brand: #0374b5;\n…"
```

**Լուծել մեկ այլ թեմայի암기 ռեժիմը**

```ts
import { toScss } from "@pantoken/scss";
import { byTheme } from "@pantoken/tokens";

toScss(byTheme("canvas"), { mode: "dark" });
```
