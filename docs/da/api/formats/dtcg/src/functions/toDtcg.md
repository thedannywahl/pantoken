[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / toDtcg

# Function: toDtcg()

> **toDtcg**(`tokens`, `mode?`): `Record`\<`string`, [`DtcgNode`](../type-aliases/DtcgNode.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Konverter en IR-tokenliste til et DTCG-dokument.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en (f.eks. fra `@pantoken/tokens`).

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Hvilken farvetilstand skal løses (standard `"light"`).

## Returns

`Record`\<`string`, [`DtcgNode`](../type-aliases/DtcgNode.md)\>

Et indlejret DTCG-token-træ.

## Examples

**Konverter standard IR til et DTCG-træ**

```ts
import { toDtcg } from "@pantoken/dtcg";
import { tokens } from "@pantoken/tokens";

const doc = toDtcg(tokens);
// doc.color.background.brand === { $value: "#0374b5", $type: "color" }
```

**Løs mørk tilstand for et andet tema**

```ts
import { toDtcg } from "@pantoken/dtcg";
import { byTheme } from "@pantoken/tokens";

toDtcg(byTheme("canvas"), "dark");
```
