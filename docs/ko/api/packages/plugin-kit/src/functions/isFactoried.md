[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# 함수: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

True when a plugin was created by [definePlugin](definePlugin.md) (or [extendPlugin](extendPlugin.md)).

## 매개변수

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## 반환값

`boolean`

## 예제

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
