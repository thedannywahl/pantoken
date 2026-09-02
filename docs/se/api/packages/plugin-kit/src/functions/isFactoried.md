[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# Fušla: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

True when a plugin was created by [definePlugin](definePlugin.md) (or [extendPlugin](extendPlugin.md)).

## Parametera

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Gullii / Gávdnat

`boolean`

## Exempel

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
