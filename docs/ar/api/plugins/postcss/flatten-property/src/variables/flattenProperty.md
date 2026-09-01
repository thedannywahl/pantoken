[pantoken](../../../../../index.md) / [plugins/postcss/flatten-property/src](../index.md) / flattenProperty

# متغير: flattenProperty

> `const` **flattenProperty**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء ملحق PostCSS المسمى flatten-`@property`.

يمر على جميع تعليمات at-rule من نوع `@property` في ورقة الأنماط، ويستخرج كل واصف `initial-value`، ويزيل
تعليمات at-rule، ثم يضيف في البداية قاعدة واحدة `injectSelector { --name: value; … }` تحتوي على جميع
التصريحات المستخرجة. تُسقط القواعد الفارغة وكتل `@layer` المتبقية بعد الإزالة.

## Type Declaration

## المعلمات

### options?

[`FlattenPropertyOptions`](../interfaces/FlattenPropertyOptions.md)

[FlattenPropertyOptions](../interfaces/FlattenPropertyOptions.md).

## القيم المرجعة

[`Plugin`](https://postcss.org/api/#plugin)

ملحق PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

مؤشر ملحق PostCSS المطلوب.

## أمثلة

**الحقن الافتراضي في :root**

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

**الحقن في :scope (لاستخدامه داخل كتل النطاق)**

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty({ injectSelector: ":scope" })]).process(css, { from: undefined }).css;
```

```ts
Preserve
```
