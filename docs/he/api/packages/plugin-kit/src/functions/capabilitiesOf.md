[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# פונקציה: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## פרמטרים

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## מחזיר

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## דוגמה

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
