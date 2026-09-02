[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / toDtcg

# Fušla: toDtcg()

> **toDtcg**(`tokens`, `mode?`): `Record`\<`string`, [`DtcgNode`](../type-aliases/DtcgNode.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Convert an IR token list into a DTCG document.

## Parametera

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Which colour mode to resolve (default `"light"`).

## Gullii / Gávdnat

`Record`\<`string`, [`DtcgNode`](../type-aliases/DtcgNode.md)\>

A nested DTCG token tree.

## Exempla

**Convert the default IR to a DTCG tree**

```ts
import { toDtcg } from "@pantoken/dtcg";
import { tokens } from "@pantoken/tokens";

const doc = toDtcg(tokens);
// doc.color.background.brand === { $value: "#0374b5", $type: "color" }
```

**Resolve the dark mode of another theme**

```ts
import { toDtcg } from "@pantoken/dtcg";
import { byTheme } from "@pantoken/tokens";

toDtcg(byTheme("canvas"), "dark");
```
