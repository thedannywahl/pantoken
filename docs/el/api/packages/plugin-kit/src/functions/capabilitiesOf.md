[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# Συνάρτηση: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## Παράμετροι

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Επιστρέφει

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## Παράδειγμα

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
