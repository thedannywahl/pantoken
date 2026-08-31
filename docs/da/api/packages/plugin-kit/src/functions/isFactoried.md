[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# Function: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Sandt når et plugin blev skabt af [definePlugin](definePlugin.md) (eller [extendPlugin](extendPlugin.md)).

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
