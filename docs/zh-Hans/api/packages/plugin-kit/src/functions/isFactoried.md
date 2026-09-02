[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# 函数: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

True when a plugin was created by [definePlugin](definePlugin.md) (or [extendPlugin](extendPlugin.md)).

## 参数

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## 返回值

`boolean`

## 示例

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
