[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# Função: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## Parâmetros

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Retorna

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## Exemplo

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
