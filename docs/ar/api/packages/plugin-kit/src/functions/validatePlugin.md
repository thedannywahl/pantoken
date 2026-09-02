[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / validatePlugin

# دالة: validatePlugin()

> **validatePlugin**(`plugin`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تأكد من أن المكوّن الإضافي له بنية صحيحة: اسم غير فارغ، جميع الـ hooks هي دوال،
ولا يقع مفتاح أي hook خارج مجموعة المراحل المعترف بها.

يتم استدعاؤه تلقائيًا بواسطة [definePlugin](definePlugin.md). صدّره حتى يمكن التحقق من المكوّنات الإضافية المكتوبة يدويًا
قبل تمريرها إلى مشغّل المرحلة.

## المعلمات

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## القيم المرجعة

`void`

## يرمي

عندما يفشل المكوّن الإضافي في التحقق البنيوي.

## مثال

**التحقق من مكوّن إضافي مكتوب يدويًا**

```ts
import { validatePlugin } from "@pantoken/plugin-kit";

validatePlugin({ name: "brand", css: () => ({}) }); // ok
validatePlugin({ name: "", css: () => ({}) });      // throws
```
