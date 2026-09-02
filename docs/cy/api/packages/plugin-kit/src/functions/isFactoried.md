[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# Swyddogaeth: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

True when a plugin was created by [definePlugin](definePlugin.md) (or [extendPlugin](extendPlugin.md)).

## Paramedrau

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Yn dychwelyd

`boolean`

## Enghraifft

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
