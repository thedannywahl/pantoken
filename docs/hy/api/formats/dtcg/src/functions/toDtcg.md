[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / toDtcg

# Function: toDtcg()

> **toDtcg**(`tokens`, `mode?`): `Record`\<`string`, [`DtcgNode`](../type-aliases/DtcgNode.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Փոխակերպել IR տոկեն ցանկը DTCG փورument-ի մեջ:

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Որ գույնի ռեժիմ լուծել (լռելյայն `"light"`).

## Returns

`Record`\<`string`, [`DtcgNode`](../type-aliases/DtcgNode.md)\>

Մեղջ DTCG տոկեն ծառ:

## Examples

**Փոխակերպել լռելի IR-ը DTCG ծառի մեջ**

```ts
import { toDtcg } from "@pantoken/dtcg";
import { tokens } from "@pantoken/tokens";

const doc = toDtcg(tokens);
// doc.color.background.brand === { $value: "#0374b5", $type: "color" }
```

**Լուծել մեկ այլ թեմայի암기 ռեժիմը**

```ts
import { toDtcg } from "@pantoken/dtcg";
import { byTheme } from "@pantoken/tokens";

toDtcg(byTheme("canvas"), "dark");
```
