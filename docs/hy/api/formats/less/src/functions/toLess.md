[pantoken](../../../../index.md) / [formats/less/src](../index.md) / toLess

# Function: toLess()

> **toLess**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Առաքել Less փոփոխականներ տոկեն IR-ի համար:

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### options?

[`ToLessOptions`](../interfaces/ToLessOptions.md) = `{}`

[ToLessOptions](../interfaces/ToLessOptions.md).

## Returns

`string`

Less աղբյուրի հաղորդագիր:

## Examples

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
