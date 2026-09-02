[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# 函式: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

True when a plugin was created by [definePlugin](definePlugin.md) (or [extendPlugin](extendPlugin.md)).

## 參數

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## 回傳

`boolean`

## 範例

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
