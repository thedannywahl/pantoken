[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# Fušla: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## Parametera

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Gullii / Gávdnat

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## Exempel

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
