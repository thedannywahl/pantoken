[pantoken](../../../../../index.md) / [plugins/postcss/flatten-property/src](../index.md) / flattenProperty

# متغير: flattenProperty

> `const` **flattenProperty**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء إضافة PostCSS flatten-`@property`.

يتجوّل في جميع at-rules من نوع `@property` في ملف الأنماط، يستخرج كل واصف `initial-value`، يُزيل الـ at-rule، ويُقدّم قاعدة واحدة من نوع `injectSelector { --name: value; … }` تحتوي على كل الإعلانات المُستخرَجة. تُحذف القواعد الفارغة وكتل `@layer` المتبقية بعد الإزالة.

## Type Declaration

## المعلمات

### options?

[`FlattenPropertyOptions`](../interfaces/FlattenPropertyOptions.md)

[FlattenPropertyOptions](../interfaces/FlattenPropertyOptions.md).

## القيم المرجعة

[`Plugin`](https://postcss.org/api/#plugin)

إضافة PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

علامة مكوّن PostCSS المطلوبة.

## أمثلة

**الحقن الافتراضي في :root**

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

**الحقن في :scope (للاستخدام داخل كتل النطاق)**

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty({ injectSelector: ":scope" })]).process(css, { from: undefined }).css;
```

```ts
Preserve
```
