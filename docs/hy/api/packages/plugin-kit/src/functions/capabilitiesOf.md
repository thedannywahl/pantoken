[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# Ֆունկցիա: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Գործիքներ, որ գործարանացված լրացուցիչ մոդուլ հայտարարում, կամ `undefined` ոչ-գործարանացված լրացուցիչ մոդուլի համար:

## Պարամետրեր

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Վերադարձվող արժեք

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## Օրինակ

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
