[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / toDtcg

# تابع: toDtcg()

> **toDtcg**(`tokens`, `mode?`): `Record`\<`string`, [`DtcgNode`](../type-aliases/DtcgNode.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Convert an IR token list into a DTCG document.

## پارامترها

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Which colour mode to resolve (default `"light"`).

## مقدار بازگشتی

`Record`\<`string`, [`DtcgNode`](../type-aliases/DtcgNode.md)\>

A nested DTCG token tree.

## نمونه‌ها

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
