[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# फंक्शन: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

True when a plugin was created by [definePlugin](definePlugin.md) (or [extendPlugin](extendPlugin.md)).

## पैरामीटर

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## वापसी

`boolean`

## उदाहरण

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
