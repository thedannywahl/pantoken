[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / scaffoldProject

# دالة: scaffoldProject()

> **scaffoldProject**(`platform`, `dir?`, `options?`): `Promise`\<`string`[]\>

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

إنشاء مشروع تمهيدي لمنصة، مع تثبيت pantoken وإعداده مسبقًا.

## المعلمات

### platform

`string`

من نوع [ScaffoldPlatform](../type-aliases/ScaffoldPlatform.md).

### dir?

`string`

دليل الهدف (الافتراضي `"."`). يُستبدل اسم القاعدة الخاص به (أو `"pantoken-app"` for `"."`)
  بـ `{{projectName}}` في ملفات القالب.

### options?

`theme`/`mode` تحدد أي ملفات قوالب `@pantoken/css` لورقة الرموز يتم
  استيرادها (الافتراضي `"rebrand"`/`"light"`), وتُطبّق عبر كل منصة. `cdn` يحدد مزود CDN
  الذي تُبنى له `canvas-theme-editor`'s `theme.css`/`theme.js` (الافتراضي jsDelivr);
  ويُتجاهل بواسطة كل منصة أخرى.

#### theme?

`ThemeVariant`

#### mode?

`ThemeMode`

#### cdn?

`string`

## القيم المرجعة

`Promise`\<`string`[]\>

المسارات المكتوبة.

## مثال

**إنشاء مشروع React تمهيدي**

```ts
import { scaffoldProject } from "@pantoken/scaffold";

scaffoldProject("react", "./my-app");
scaffoldProject("vue", "./my-vue-app", { theme: "canvas" });
```
