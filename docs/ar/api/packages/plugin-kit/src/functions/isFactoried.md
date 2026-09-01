[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / isFactoried

# دالة: isFactoried()

> **isFactoried**(`plugin`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

صحيح إذا تم إنشاء مكوّن إضافي بواسطة [definePlugin](definePlugin.md) (أو [extendPlugin](extendPlugin.md)).

## المعلمات

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## القيم المرجعة

`boolean`

## مثال

```ts
import { definePlugin, isFactoried } from "@pantoken/plugin-kit";

isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
isFactoried({ name: "hand-written", css: () => ({}) });        // → false
```
