[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# دالة: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

إصدار XML لموارد Android لموضوع مسمّى (باستخدام IR المزود من `@pantoken/tokens`).

## المعلمات

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## القيم المرجعة

`Promise`\<`string`[]\>

مسارات الـ `colors.xml` و `dimens.xml` المكتوبة.

## مثال

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
