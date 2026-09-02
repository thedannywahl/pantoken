[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# تابع: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## پارامترها

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## مقدار بازگشتی

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## نمونه

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
