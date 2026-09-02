[pantoken](../../../../index.md) / flatten-property

# flatten-property

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-flatten-property` — تحويل قواعد at-rules الخاصة بـ `@property` إلى تصريحات خاصية-مخصصة عادية.

`@property` at-rules تسجل خصائص CSS المخصصة المُنَفرة بالأنواع باستخدام واصفات `syntax` و `inherits` و
`initial-value`. إنها تضيف حملًا كبيرًا من البايت — ~60 بايت من القالب لكل
خاصية — وهي غير ضرورية عندما يكون ملف الأنماط حزمة مكتفية ذاتيًا حيث لا توفر تسجيلات النوع
فائدة في وقت التشغيل. يستبدل هذا المكون الإضافي كل كتلة `@property` بـ
تصريح `--name: value` بسيط داخل محدد مختار، مستعيدًا كل ذلك الحمل الزائد.

**ملاحظة دلالية:** إزالة `@property` يؤدي إلى فقدان تسجيل نوع CSS. الانتقالات/التحريكات المطبقة بالأنواع،
`@starting-style`، وCSS Typed OM تعتمد عليه. طبّق هذا فقط على الحزم التي لا تكون فيها هذه الدلالات
مطلوبة.

## مثال

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";
const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

## واجهات

- [FlattenPropertyOptions](interfaces/FlattenPropertyOptions.md)

## المتغيرات

- [flattenProperty](variables/flattenProperty.md)
