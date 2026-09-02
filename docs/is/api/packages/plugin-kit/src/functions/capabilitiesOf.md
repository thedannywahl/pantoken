[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# Fall: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## Færibreytur

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Skilar

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## Dæmi

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
