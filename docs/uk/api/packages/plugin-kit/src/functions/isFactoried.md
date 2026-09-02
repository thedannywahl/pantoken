[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# Функція: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

True when a plugin was created by [definePlugin](definePlugin.md) (or [extendPlugin](extendPlugin.md)).

## Параметри

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Повертає

`boolean`

## Приклад

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
