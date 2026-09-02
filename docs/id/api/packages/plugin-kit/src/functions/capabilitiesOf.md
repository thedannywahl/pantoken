[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# Fungsi: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## Parameter

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Mengembalikan

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## Contoh

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
