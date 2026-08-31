[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# Function: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Cert quan un connector es va crear per [definePlugin](definePlugin.md) (o [extendPlugin](extendPlugin.md)).

## Parameters

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Returns

`boolean`

## Example

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) }); // → false
```
