[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# Fonction: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## Paramètres

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Renvoie

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## Exemple

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
