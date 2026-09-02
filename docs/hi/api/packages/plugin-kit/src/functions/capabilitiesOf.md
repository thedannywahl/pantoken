[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# फंक्शन: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## पैरामीटर

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## वापसी

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## उदाहरण

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
