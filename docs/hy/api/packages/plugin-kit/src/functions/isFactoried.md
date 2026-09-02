[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# Ֆունկցիա: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ճիշտ, երբ լրացուցիչ մոդուլ ստեղծվել է [definePlugin](definePlugin.md)-ի կամ [extendPlugin](extendPlugin.md)-ի կողմից:

## Պարամետրեր

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Վերադարձվող արժեք

`boolean`

## Օրինակ

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
