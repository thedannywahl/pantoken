[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# Funció: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Cert quan un connector es va crear per [definePlugin](definePlugin.md) (o [extendPlugin](extendPlugin.md)).

## Paràmetres

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Retorna

`boolean`

## Exemple

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
