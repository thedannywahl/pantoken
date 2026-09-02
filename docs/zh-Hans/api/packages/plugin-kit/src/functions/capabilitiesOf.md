[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# 函数: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## 参数

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## 返回值

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## 示例

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
