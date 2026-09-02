[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# Swyddogaeth: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## Paramedrau

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Yn dychwelyd

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## Enghraifft

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
