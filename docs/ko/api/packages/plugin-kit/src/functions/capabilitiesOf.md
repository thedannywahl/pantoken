[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# 함수: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## 매개변수

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## 반환값

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## 예제

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
