[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / toAndroid

# دالة: toAndroid()

> **toAndroid**(`tokens`, `options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

إنشاء ملف XML لموارد Android لتمثيل IR لرمز محدد.

## المعلمات

### tokens

للقراءة فقط [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## القيم المرجعة

`Promise`\<`string`[]\>

مسارات الـ `colors.xml` و `dimens.xml` المكتوبة.

## أمثلة

**إخراج IR لسمة محددة**

```ts
import { toAndroid } from "@pantoken/android";
import { byTheme } from "@pantoken/tokens";

const [colors, dimens] = await toAndroid(byTheme("canvas"), { outDir: "./app/src/main" });
// writes ./app/src/main/res/values/colors.xml and dimens.xml
```

**الوضع الداكن مع VectorDrawables للأيقونات**

```ts
import { toAndroid } from "@pantoken/android";
import { byTheme } from "@pantoken/tokens";

await toAndroid(byTheme("rebrand"), {
  outDir: "./app/src/main",
  mode: "dark",
  icons: ["add", "check"], // also emits res/drawable/ic_add.xml, ic_check.xml
});
```
