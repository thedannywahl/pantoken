[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / flattenProperty

# Variable: flattenProperty

> `const` **flattenProperty**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

إنشاء مكون flatten-`@property` PostCSS الإضافي.

يمشي عبر جميع قواعس `@property` في ورقة الأنماط، ويستخرج كل وصفة `initial-value`، ويزيل القاعدة، ويسبق قاعدة `injectSelector { --name: value; … }` واحدة تحتوي على جميع الإعلانات المستخرجة. يتم إسقاط القواعد الفارغة وكتل `@layer` المتبقية بعد الإزالة.

## Type Declaration

## Parameters

### options?

[`FlattenPropertyOptions`](../interfaces/FlattenPropertyOptions.md)

[FlattenPropertyOptions](../interfaces/FlattenPropertyOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

مكون إضافي PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

علامة المكون الإضافي PostCSS المطلوبة.

## Examples

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

const out = postcss([flattenProperty({ injectSelector: ":scope" })]).process(css, {
  from: undefined,
}).css;
```

```ts
Preserve;
```
