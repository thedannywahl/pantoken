[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# 関数: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## パラメーター

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## 戻り値

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## 例

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
