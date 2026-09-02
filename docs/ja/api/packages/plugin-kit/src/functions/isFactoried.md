[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# 関数: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

True when a plugin was created by [definePlugin](definePlugin.md) (or [extendPlugin](extendPlugin.md)).

## パラメーター

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## 戻り値

`boolean`

## 例

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
