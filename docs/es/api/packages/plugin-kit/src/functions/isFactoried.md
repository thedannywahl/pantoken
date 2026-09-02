[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# Función: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

True when a plugin was created by [definePlugin](definePlugin.md) (or [extendPlugin](extendPlugin.md)).

## Parámetros

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Devuelve

`boolean`

## Ejemplo

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
