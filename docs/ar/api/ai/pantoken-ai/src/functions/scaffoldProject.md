[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / scaffoldProject

# Function: scaffoldProject()

> **scaffoldProject**(`platform`, `dir?`, `options?`): `Promise`\<`string`[]\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

حفر مشروع بدء لمنصة، مع pantoken المثبت بالفعل والموصل.

## Parameters

### platform

`string`

منصة حفر [ScaffoldPlatform](../type-aliases/ScaffoldPlatform.md).

### dir?

`string`

الدليل المستهدف (الافتراضي `"."`). اسمه الأساسي (أو `"pantoken-app"` لـ `"."`) يتم استبداله بـ `{{projectName}}` في ملفات النموذج.

### options?

`theme`/`mode` تحديد ملفات ورقة رمز `@pantoken/css` المحفورة التي تستورد (الافتراضي `"rebrand"`/`"light"`)، مطبقة عبر كل منصة. `cdn` تحديد موفر CDN `canvas-theme-editor`'s `theme.css`/`theme.js` مبني لـ (الافتراضي jsDelivr)؛ تم تجاهله من قبل كل منصة أخرى.

#### theme?

`ThemeVariant`

#### mode?

`ThemeMode`

#### cdn?

`string`

## Returns

`Promise`\<`string`[]\>

المسارات المكتوبة.

## Example

**حفر بدء React**

```ts
import { scaffoldProject } from "@pantoken/scaffold";

scaffoldProject("react", "./my-app");
scaffoldProject("vue", "./my-vue-app", { theme: "canvas" });
```
