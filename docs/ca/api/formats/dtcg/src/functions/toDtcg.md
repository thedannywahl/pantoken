[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / toDtcg

# Function: toDtcg()

> **toDtcg**(`tokens`, `mode?`): `Record`\<`string`, [`DtcgNode`](../type-aliases/DtcgNode.md)>>>>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Converteix una llista de tokens IR en un document DTCG.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

La IR (p. ex. de `@pantoken/tokens`).

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Quin mode de color resoldre (per defecte `"light"`).

## Returns

`Record`\<`string`, [`DtcgNode`](../type-aliases/DtcgNode.md)\>

Un arbre de tokens DTCG niuat.

## Examples

**Converteix l'IR per defecte a un arbre DTCG**

```ts
import { toDtcg } from "@pantoken/dtcg";
import { tokens } from "@pantoken/tokens";

const doc = toDtcg(tokens);
// doc.color.background.brand === { $value: "#0374b5", $type: "color" }
```

**Resol el mode fosc d'un altre tema**

```ts
import { toDtcg } from "@pantoken/dtcg";
import { byTheme } from "@pantoken/tokens";

toDtcg(byTheme("canvas"), "dark");
```
