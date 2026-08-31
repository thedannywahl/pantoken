[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# Function: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ճիշտ, երբ լրացուցիչ մոդուլ ստեղծվել է [definePlugin](definePlugin.md)-ի կամ [extendPlugin](extendPlugin.md)-ի կողմից:

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
