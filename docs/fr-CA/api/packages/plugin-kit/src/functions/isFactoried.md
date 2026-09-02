[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# Fonction: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

True when a plugin was created by [definePlugin](definePlugin.md) (or [extendPlugin](extendPlugin.md)).

## Paramètres

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Retourne

`boolean`

## Exemple

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
