[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / validatePlugin

# Function: validatePlugin()

> **validatePlugin**(`plugin`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

التأكيد من أن المكون الإضافي له بنية صحيحة: اسم غير فارغ، جميع الخطافات هي وظائف،
وعدم سقوط مفتاح خطاف خارج مجموعة المرحلة المعروفة.

يتم الاتصال به تلقائياً بواسطة [definePlugin](definePlugin.md). قم بتصديره حتى يمكن التحقق من المكونات الإضافية المكتوبة يدويًا
قبل تمريرها إلى مشغل المرحلة.

## Parameters

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Returns

`void`

## Throws

عندما يفشل المكون الإضافي في التحقق من الصحة الهيكلية.

## Example

**تحقق من صحة مكون إضافي مكتوب يدويًا**

```ts
import { validatePlugin } from "@pantoken/plugin-kit";

validatePlugin({ name: "brand", css: () => ({}) }); // ok
validatePlugin({ name: "", css: () => ({}) }); // throws
```
