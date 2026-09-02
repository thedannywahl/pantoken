[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# Hàm: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## Tham số

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Trả về

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## Ví dụ

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
